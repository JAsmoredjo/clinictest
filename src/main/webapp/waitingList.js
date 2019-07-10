var infoWindow;
var callWindow;

getList();

function getList() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/test/api/queue/today", true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            queueJson = JSON.parse(xmlhttp.responseText);
            let list = "<table><tr><th>Insurance Number</th><th>Patient</th><th>Priority</th><th>Status</th><th><button type=\"button\" onclick=\"queuePatient()\">Queue</button></tr>";
            if (queueJson.length > 0) {
                for (let queue of queueJson) {
                    if (queue.priority) {
                        list += "<tr><td>" + queue.patient.insuranceNumber + "</td><td>" + queue.patient.lastName + ", " + queue.patient.firstName[0] + ".</td><td>Yes</td><td>" + queue.status + "</td><td><button type=\"button\" onclick=\"info('" + queue.patient.insuranceNumber + "')\">Info</button><button type=\"button\" onclick=\"updatePriority(" + queue.id + ", false)\">Decrease Priority</button><button type=\"button\" onclick=\"updateStatus(" + queue.id + ", 'Finished')\">Finish</button><button type=\"button\" onclick=\"updateStatus(" + queue.id + ", 'Canceled')\">Cancel</button></td></tr>";
                    } else{
                        list += "<tr><td>" + queue.patient.insuranceNumber + "</td><td>" + queue.patient.lastName + ", " + queue.patient.firstName[0] + ".</td><td>No</td><td>" + queue.status + "</td><td><button type=\"button\" onclick=\"info('" + queue.patient.insuranceNumber + "')\">Info</button><button type=\"button\" onclick=\"updatePriority(" + queue.id + ", true)\">Increase Priority</button><button type=\"button\" onclick=\"updateStatus(" + queue.id + ", 'Finished')\">Finish</button><button type=\"button\" onclick=\"updateStatus(" + queue.id + ", 'Canceled')\">Cancel</button></td></tr>";
                    }
                }
            } else {
                list += "<tr><td>-</td><td>-</td><td>-</td></tr>";
            }
            list += "</table>";
            document.getElementById("list").innerHTML = list;
            if (callWindow == null) {
                callWindow = window.open("call.html");
            }
            if (infoWindow == null) {
                infoWindow = window.open("search.html");
            }
        }
    };
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send();
}

function queuePatient() {
    let insuranceNumber = prompt("Please enter insurance number");
    if (insuranceNumber != null && insuranceNumber != "") {
        let queue = {"patient" : {"insuranceNumber" : insuranceNumber}};
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", "/test/api/queue/queue", true);
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                queueJson = JSON.parse(xmlhttp.responseText);
                let list = "<table><tr><th>Insurance Number</th><th>Patient</th><th>Priority</th><th>Status</th><th><button type=\"button\" onclick=\"queuePatient()\">Queue</button></tr>";
                if (queueJson.length > 0) {
                    for (let queue of queueJson) {
                        if (queue.patient.insuranceNumber == insuranceNumber) {
                            insuranceNumber = true;
                        }
                        if (queue.priority) {
                            list += "<tr><td>" + queue.patient.insuranceNumber + "</td><td>" + queue.patient.lastName + ", " + queue.patient.firstName[0] + ".</td><td>Yes</td><td>" + queue.status + "</td><td><button type=\"button\" onclick=\"info('" + queue.patient.insuranceNumber + "')\">Info</button><button type=\"button\" onclick=\"updatePriority(" + queue.id + ", false)\">Decrease Priority</button><button type=\"button\" onclick=\"updateStatus(" + queue.id + ", 'Finished')\">Finish</button><button type=\"button\" onclick=\"updateStatus(" + queue.id + ", 'Canceled')\">Cancel</button></td></tr>";
                        } else{
                            list += "<tr><td>" + queue.patient.insuranceNumber + "</td><td>" + queue.patient.lastName + ", " + queue.patient.firstName[0] + ".</td><td>No</td><td>" + queue.status + "</td><td><button type=\"button\" onclick=\"info('" + queue.patient.insuranceNumber + "')\">Info</button><button type=\"button\" onclick=\"updatePriority(" + queue.id + ", true)\">Increase Priority</button><button type=\"button\" onclick=\"updateStatus(" + queue.id + ", 'Finished')\">Finish</button><button type=\"button\" onclick=\"updateStatus(" + queue.id + ", 'Canceled')\">Cancel</button></td></tr>";
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
                    callWindow.callList();
                }
                if (insuranceNumber != true) {
                    alert("Invalid Insurance Number")
                }
            }
        };
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(JSON.stringify(queue));
    }
}

function info(insuranceNumber) {
    if (infoWindow == null) {
        infoWindow = window.open("search.html");
    } else {
        infoWindow.document.getElementById("insuranceNumber").value = insuranceNumber;
        infoWindow.searchPatient();
    }
}

function updatePriority(id, priority) {
    let queue = {"id" : id, "priority" : priority};
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/test/api/queue/update", true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            queueJson = JSON.parse(xmlhttp.responseText);
            let list = "<table><tr><th>Insurance Number</th><th>Patient</th><th>Priority</th><th>Status</th><th><button type=\"button\" onclick=\"queuePatient()\">Queue</button></tr>";
            if (queueJson.length > 0) {
                for (let queue of queueJson) {
                    if (queue.priority) {
                        list += "<tr><td>" + queue.patient.insuranceNumber + "</td><td>" + queue.patient.lastName + ", " + queue.patient.firstName[0] + ".</td><td>Yes</td><td>" + queue.status + "</td><td><button type=\"button\" onclick=\"info('" + queue.patient.insuranceNumber + "')\">Info</button><button type=\"button\" onclick=\"updatePriority(" + queue.id + ", false)\">Decrease Priority</button><button type=\"button\" onclick=\"updateStatus(" + queue.id + ", 'Finished')\">Finish</button><button type=\"button\" onclick=\"updateStatus(" + queue.id + ", 'Canceled')\">Cancel</button></td></tr>";
                    } else{
                        list += "<tr><td>" + queue.patient.insuranceNumber + "</td><td>" + queue.patient.lastName + ", " + queue.patient.firstName[0] + ".</td><td>No</td><td>" + queue.status + "</td><td><button type=\"button\" onclick=\"info('" + queue.patient.insuranceNumber + "')\">Info</button><button type=\"button\" onclick=\"updatePriority(" + queue.id + ", true)\">Increase Priority</button><button type=\"button\" onclick=\"updateStatus(" + queue.id + ", 'Finished')\">Finish</button><button type=\"button\" onclick=\"updateStatus(" + queue.id + ", 'Canceled')\">Cancel</button></td></tr>";
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
                callWindow.callList();
            }
        }
    };
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify(queue));
}

function updateStatus(id, status) {
    let queue = {"id" : id, "status" : status};
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/test/api/queue/update", true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            queueJson = JSON.parse(xmlhttp.responseText);
            let list = "<table><tr><th>Insurance Number</th><th>Patient</th><th>Priority</th><th>Status</th><th><button type=\"button\" onclick=\"queuePatient()\">Queue</button></tr>";
            if (queueJson.length > 0) {
                for (let queue of queueJson) {
                    if (queue.priority) {
                        list += "<tr><td>" + queue.patient.insuranceNumber + "</td><td>" + queue.patient.lastName + ", " + queue.patient.firstName[0] + ".</td><td>Yes</td><td>" + queue.status + "</td><td><button type=\"button\" onclick=\"info('" + queue.patient.insuranceNumber + "')\">Info</button><button type=\"button\" onclick=\"updatePriority(" + queue.id + ", false)\">Decrease Priority</button><button type=\"button\" onclick=\"updateStatus(" + queue.id + ", 'Finished')\">Finish</button><button type=\"button\" onclick=\"updateStatus(" + queue.id + ", 'Canceled')\">Cancel</button></td></tr>";
                    } else{
                        list += "<tr><td>" + queue.patient.insuranceNumber + "</td><td>" + queue.patient.lastName + ", " + queue.patient.firstName[0] + ".</td><td>No</td><td>" + queue.status + "</td><td><button type=\"button\" onclick=\"info('" + queue.patient.insuranceNumber + "')\">Info</button><button type=\"button\" onclick=\"updatePriority(" + queue.id + ", true)\">Increase Priority</button><button type=\"button\" onclick=\"updateStatus(" + queue.id + ", 'Finished')\">Finish</button><button type=\"button\" onclick=\"updateStatus(" + queue.id + ", 'Canceled')\">Cancel</button></td></tr>";
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
                callWindow.callList();
            }
        }
    };
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify(queue));
}
