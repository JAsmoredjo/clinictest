var tickets;
var unavailableDoctor;
var queueJson;
var callWindow;

getList();

function getList() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/clinic-test/api/queue/today", true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            queueJson = JSON.parse(xmlhttp.responseText);
            for (let queue of queueJson) {
                if (tickets == undefined) {
                    tickets = [{id : [queue.id], ticket : queue.ticket, patients : [queue.patient], status : queue.status}]
                } else {
                    let newTicket = true;
                    let ticketIndex = 0;
                    for (let ticket of tickets) {
                        if (ticket.ticket == queue.ticket) {
                            newTicket = false;
                            ticketIndex = tickets.indexOf(ticket);
                            break;
                        }
                    }
                    if (newTicket) {
                        tickets.push({id : [queue.id], ticket : queue.ticket, patients : [queue.patient], status : queue.status});
                    } else {
                        tickets[ticketIndex].id.push(queue.id);
                        tickets[ticketIndex].patients.push(queue.patient);
                    }
                }
            }
            let list = "<table><tr><th>Ticket</th><th>Insurance Number</th><th>Patient</th><th>Doctor</th><th>Status</th><th><button type=\"button\" onclick=\"queuePatient()\">Queue</button></tr>";
            if (tickets != undefined && tickets.length > 0) {
                for (let ticket of tickets) {
                    list += "<tr><td rowspan=\"" + ticket.patients.length + "\">" + ticket.ticket + "</td><td>" + ticket.patients[0].insuranceNumber + "</td><td>" + ticket.patients[0].lastName + ", " + ticket.patients[0].firstName[0] + ".</td><td rowspan=\"" + ticket.patients.length + "\">" + ticket.patients[0].doctor.lastName + ", " + ticket.patients[0].doctor.firstName[0] + ".</td><td rowspan=\"" + ticket.patients.length + "\">" + ticket.status + "</td>";
                    if (ticket.status == "Waiting") {
                        list += "<td rowspan=\"" + ticket.patients.length + "\"><button type=\"button\" onclick=\"updateQueue([" + ticket.id + "], " + tickets.indexOf(ticket) + ", \'Calling\')\">Call</button><button type=\"button\" onclick=\"addQueue(" + tickets.indexOf(ticket) + ", " + ticket.ticket + ", \'" + ticket.status + "\')\">Add</button><button type=\"button\" onclick=\"updateQueue([" + ticket.id + "], " + tickets.indexOf(ticket) + ", \'Canceled\')\">Cancel</button></td></tr>";
                    } else if (ticket.status == "Calling") {
                        list += "<td rowspan=\"" + ticket.patients.length + "\"><button type=\"button\" onclick=\"updateQueue([" + ticket.id + "], " + tickets.indexOf(ticket) + ", \'In Progress\')\">Send</button><button type=\"button\" onclick=\"addQueue(" + tickets.indexOf(ticket) + ", " + ticket.ticket + ", \'" + ticket.status + "\')\">Add</button><button type=\"button\" onclick=\"updateQueue([" + ticket.id + "], " + tickets.indexOf(ticket) + ", \'Waiting\')\">Cancel</button></td></tr>";
                    } else if (ticket.status == "In Progress") {
                        list += "<td rowspan=\"" + ticket.patients.length + "\"><button type=\"button\" onclick=\"updateQueue([" + ticket.id + "], " + tickets.indexOf(ticket) + ", \'Finished\')\">Finish</button><button type=\"button\" onclick=\"addQueue(" + tickets.indexOf(ticket) + ", " + ticket.ticket + ", \'" + ticket.status + "\')\">Add</button></tr>";
                        if (unavailableDoctor == undefined) {
                            unavailableDoctor = [ticket.patients[0].doctor.lastName + ", " + ticket.patients[0].doctor.firstName];
                        } else {
                            unavailableDoctor.push(ticket.patients[0].doctor.lastName + ", " + ticket.patients[0].doctor.firstName);
                        }
                    } else {
                        list += "</tr>";
                    }
                    if (ticket.patients.length > 1) {
                        patientIndex = 1
                        while (patientIndex < ticket.patients.length) {
                            list += "<tr><td>" + ticket.patients[patientIndex].insuranceNumber + "</td><td>" + ticket.patients[patientIndex].lastName + ", " + ticket.patients[patientIndex].firstName[0] + ".</td>";
                            patientIndex += 1;
                        }
                    }
                }
            } else {
                list += "<tr><td>-</td><td>-</td><td>-</td></tr>";
            }
            list += "</table>";
            document.getElementById("list").innerHTML = list;
            if (callWindow == undefined) {
                callWindow = window.open("call.html");
            } else {
                callWindow.location.href = "call.html";
            }
        }
    };
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send();
}

function queuePatient() {
    let insuranceNumber = prompt("Please enter insurance number");
    if (insuranceNumber != null && insuranceNumber != "") {
        newTicket = 1
        for (let ticket of tickets) {
            if (ticket.ticket == newTicket) {
                newTicket += 1;
            }
        }
        let queue = {"ticket" : newTicket, "patient" : {"insuranceNumber" : insuranceNumber}, "status" : "Waiting"};
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", "/clinic-test/api/queue/queue", true);
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                queueJson = JSON.parse(xmlhttp.responseText);
                if (queueJson.patient != null) {
                    tickets.push({ticket : queueJson.ticket, patients : [queueJson.patient], status : queueJson.status});
                    let list = "<table><tr><th>Ticket</th><th>Insurance Number</th><th>Patient</th><th>Doctor</th><th>Status</th><th><button type=\"button\" onclick=\"queuePatient()\">Queue</button></tr>";
                    if (tickets != undefined && tickets.length > 0) {
                        for (let ticket of tickets) {
                            list += "<tr><td rowspan=\"" + ticket.patients.length + "\">" + ticket.ticket + "</td><td>" + ticket.patients[0].insuranceNumber + "</td><td>" + ticket.patients[0].lastName + ", " + ticket.patients[0].firstName[0] + ".</td><td rowspan=\"" + ticket.patients.length + "\">" + ticket.patients[0].doctor.lastName + ", " + ticket.patients[0].doctor.firstName[0] + ".</td><td rowspan=\"" + ticket.patients.length + "\">" + ticket.status + "</td>";
                            if (ticket.status == "Waiting") {
                                list += "<td rowspan=\"" + ticket.patients.length + "\"><button type=\"button\" onclick=\"updateQueue([" + ticket.id + "], " + tickets.indexOf(ticket) + ", \'Calling\')\">Call</button><button type=\"button\" onclick=\"addQueue(" + tickets.indexOf(ticket) + ", " + ticket.ticket + ", \'" + ticket.status + "\')\">Add</button><button type=\"button\" onclick=\"updateQueue([" + ticket.id + "], " + tickets.indexOf(ticket) + ", \'Canceled\')\">Cancel</button></td></tr>";
                            } else if (ticket.status == "Calling") {
                                list += "<td rowspan=\"" + ticket.patients.length + "\"><button type=\"button\" onclick=\"updateQueue([" + ticket.id + "], " + tickets.indexOf(ticket) + ", \'In Progress\')\">Send</button><button type=\"button\" onclick=\"addQueue(" + tickets.indexOf(ticket) + ", " + ticket.ticket + ", \'" + ticket.status + "\')\">Add</button><button type=\"button\" onclick=\"updateQueue([" + ticket.id + "], " + tickets.indexOf(ticket) + ", \'Waiting\')\">Cancel</button></td></tr>";
                            } else if (ticket.status == "In Progress") {
                                list += "<td rowspan=\"" + ticket.patients.length + "\"><button type=\"button\" onclick=\"updateQueue([" + ticket.id + "], " + tickets.indexOf(ticket) + ", \'Finished\')\">Finish</button><button type=\"button\" onclick=\"addQueue(" + tickets.indexOf(ticket) + ", " + ticket.ticket + ", \'" + ticket.status + "\')\">Add</button></tr>";
                            } else {
                                list += "</tr>";
                            }
                            if (ticket.patients.length > 1) {
                                patientIndex = 1
                                while (patientIndex < ticket.patients.length) {
                                    list += "<tr><td>" + ticket.patients[patientIndex].insuranceNumber + "</td><td>" + ticket.patients[patientIndex].lastName + ", " + ticket.patients[patientIndex].firstName[0] + ".</td>";
                                    patientIndex += 1;
                                }
                            }
                        }
                    } else {
                        list += "<tr><td>-</td><td>-</td><td>-</td></tr>";
                    }
                    list += "</table>";
                    document.getElementById("list").innerHTML = list;
                } else {
                    alert("Invalid Insurance Number");
                }
            }
        };
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(JSON.stringify(queue));
    }
}

function updateQueue(ids, ticketIndex, status) {
    if (status == "Calling" && (unavailableDoctor.indexOf(tickets[ticketIndex].patients[0].doctor.lastName + ", " + tickets[ticketIndex].patients[0].doctor.firstName) == -1)) {
        let queue;
        for (let id of ids) {
            if (queue == undefined) {
                queue = [{"id" : id, "status" : status}];
            } else {
                queue.push({"id" : id, "status" : status});
            }
        }
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", "/clinic-test/api/queue/update", true);
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                if (status == "Finished" || status == "Canceled") {
                    tickets.splice(ticketIndex, 1);
                } else {
                    tickets[ticketIndex].status = status;
                }
                let list = "<table><tr><th>Ticket</th><th>Insurance Number</th><th>Patient</th><th>Doctor</th><th>Status</th><th><button type=\"button\" onclick=\"queuePatient()\">Queue</button></tr>";
                if (tickets != undefined && tickets.length > 0) {
                    for (let ticket of tickets) {
                        list += "<tr><td rowspan=\"" + ticket.patients.length + "\">" + ticket.ticket + "</td><td>" + ticket.patients[0].insuranceNumber + "</td><td>" + ticket.patients[0].lastName + ", " + ticket.patients[0].firstName[0] + ".</td><td rowspan=\"" + ticket.patients.length + "\">" + ticket.patients[0].doctor.lastName + ", " + ticket.patients[0].doctor.firstName[0] + ".</td><td rowspan=\"" + ticket.patients.length + "\">" + ticket.status + "</td>";
                        if (ticket.status == "Waiting") {
                            list += "<td rowspan=\"" + ticket.patients.length + "\"><button type=\"button\" onclick=\"updateQueue([" + ticket.id + "], " + tickets.indexOf(ticket) + ", \'Calling\')\">Call</button><button type=\"button\" onclick=\"addQueue(" + tickets.indexOf(ticket) + ", " + ticket.ticket + ", \'" + ticket.status + "\')\">Add</button><button type=\"button\" onclick=\"updateQueue([" + ticket.id + "], " + tickets.indexOf(ticket) + ", \'Canceled\')\">Cancel</button></td></tr>";
                        } else if (ticket.status == "Calling") {
                            list += "<td rowspan=\"" + ticket.patients.length + "\"><button type=\"button\" onclick=\"updateQueue([" + ticket.id + "], " + tickets.indexOf(ticket) + ", \'In Progress\')\">Send</button><button type=\"button\" onclick=\"addQueue(" + tickets.indexOf(ticket) + ", " + ticket.ticket + ", \'" + ticket.status + "\')\">Add</button><button type=\"button\" onclick=\"updateQueue([" + ticket.id + "], " + tickets.indexOf(ticket) + ", \'Waiting\')\">Cancel</button></td></tr>";
                        } else if (ticket.status == "In Progress") {
                            list += "<td rowspan=\"" + ticket.patients.length + "\"><button type=\"button\" onclick=\"updateQueue([" + ticket.id + "], " + tickets.indexOf(ticket) + ", \'Finished\')\">Finish</button><button type=\"button\" onclick=\"addQueue(" + tickets.indexOf(ticket) + ", " + ticket.ticket + ", \'" + ticket.status + "\')\">Add</button></tr>";
                        } else {
                            list += "</tr>";
                        }
                        if (ticket.patients.length > 1) {
                            patientIndex = 1
                            while (patientIndex < ticket.patients.length) {
                                list += "<tr><td>" + ticket.patients[patientIndex].insuranceNumber + "</td><td>" + ticket.patients[patientIndex].lastName + ", " + ticket.patients[patientIndex].firstName[0] + ".</td>";
                                patientIndex += 1;
                            }
                        }
                    }
                } else {
                    list += "<tr><td>-</td><td>-</td><td>-</td></tr>";
                }
                list += "</table>";
                document.getElementById("list").innerHTML = list;
                if (callWindow == undefined) {
                    callWindow = window.open("call.html");
                } else {
                    callWindow.location.href = "call.html";
                }
            }
        };
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(JSON.stringify(queue));
    } else {
        alert("Dr. " + tickets[ticketIndex].patients[0].doctor.lastName + ", " + tickets[ticketIndex].patients[0].doctor.firstName[0] + ". already preoccupied");
    }
}

function addQueue(index, ticket, status) {
    let insuranceNumber = prompt("Please enter insurance number");
    if (insuranceNumber != null && insuranceNumber != "") {
        if (status == "Calling") {
            let queue = {"ticket" : ticket, "patient" : {"insuranceNumber" : insuranceNumber}, "status" : status};
        }
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", "/clinic-test/api/queue/queue", true);
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                queueJson = JSON.parse(xmlhttp.responseText);
                if (queueJson.patient != null) {
                    tickets[index].id.push(queueJson.id);
                    tickets[index].patients.push(queueJson.patient);
                    let list = "<table><tr><th>Ticket</th><th>Insurance Number</th><th>Patient</th><th>Doctor</th><th>Status</th><th><button type=\"button\" onclick=\"queuePatient()\">Queue</button></tr>";
                    if (tickets != undefined && tickets.length > 0) {
                        for (let ticket of tickets) {
                            list += "<tr><td rowspan=\"" + ticket.patients.length + "\">" + ticket.ticket + "</td><td>" + ticket.patients[0].insuranceNumber + "</td><td>" + ticket.patients[0].lastName + ", " + ticket.patients[0].firstName[0] + ".</td><td rowspan=\"" + ticket.patients.length + "\">" + ticket.patients[0].doctor.lastName + ", " + ticket.patients[0].doctor.firstName[0] + ".</td><td rowspan=\"" + ticket.patients.length + "\">" + ticket.status + "</td>";
                            if (ticket.status == "Waiting") {
                                list += "<td rowspan=\"" + ticket.patients.length + "\"><button type=\"button\" onclick=\"updateQueue([" + ticket.id + "], " + tickets.indexOf(ticket) + ", \'Calling\')\">Call</button><button type=\"button\" onclick=\"addQueue(" + tickets.indexOf(ticket) + ", " + ticket.ticket + ", \'" + ticket.status + "\')\">Add</button><button type=\"button\" onclick=\"updateQueue([" + ticket.id + "], " + tickets.indexOf(ticket) + ", \'Canceled\')\">Cancel</button></td></tr>";
                            } else if (ticket.status == "Calling") {
                                list += "<td rowspan=\"" + ticket.patients.length + "\"><button type=\"button\" onclick=\"updateQueue([" + ticket.id + "], " + tickets.indexOf(ticket) + ", \'In Progress\')\">Send</button><button type=\"button\" onclick=\"addQueue(" + tickets.indexOf(ticket) + ", " + ticket.ticket + ", \'" + ticket.status + "\')\">Add</button><button type=\"button\" onclick=\"updateQueue([" + ticket.id + "], " + tickets.indexOf(ticket) + ", \'Waiting\')\">Cancel</button></td></tr>";
                            } else if (ticket.status == "In Progress") {
                                list += "<td rowspan=\"" + ticket.patients.length + "\"><button type=\"button\" onclick=\"updateQueue([" + ticket.id + "], " + tickets.indexOf(ticket) + ", \'Finished\')\">Finish</button><button type=\"button\" onclick=\"addQueue(" + tickets.indexOf(ticket) + ", " + ticket.ticket + ", \'" + ticket.status + "\')\">Add</button></tr>";
                            } else {
                                list += "</tr>";
                            }
                            if (ticket.patients.length > 1) {
                                patientIndex = 1
                                while (patientIndex < ticket.patients.length) {
                                    list += "<tr><td>" + ticket.patients[patientIndex].insuranceNumber + "</td><td>" + ticket.patients[patientIndex].lastName + ", " + ticket.patients[patientIndex].firstName[0] + ".</td>";
                                    patientIndex += 1;
                                }
                            }
                        }
                    } else {
                        list += "<tr><td>-</td><td>-</td><td>-</td></tr>";
                    }
                    list += "</table>";
                    document.getElementById("list").innerHTML = list;
                } else {
                    alert("Invalid Insurance Number");
                }
            }
        };
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(JSON.stringify(queue));
    }
}