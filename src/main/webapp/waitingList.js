var childWindow;
var staffWindow;
var reportWindow;
var accountWindow;
var callWindow;
var inQueue = [];
getList();

function getList() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/clinic-test/api/queue/today", true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            queueJson = JSON.parse(xmlhttp.responseText);
            let list = "<table><tr><th>Insurance Number</th><th>Patient</th><th>Priority</th><th>Status</th><th>&nbsp;</th></tr>";
            if (queueJson.length > 0) {
                for (let queue of queueJson) {
                    if (queue.status == "Waiting") {
                        inQueue.push(queue.patient.insuranceNumber.toUpperCase());
                        if (queue.priority) {
                            list += "<tr><td><button type=\"button\" onclick=\"info('" + queue.patient.insuranceNumber + "')\">" + queue.patient.insuranceNumber + "</button></td><td>" + queue.patient.lastName + ", " + queue.patient.firstName[0] + ".</td><td><input type=\"radio\" checked>Yes</input><input type=\"radio\" onclick=\"updatePriority(" + queue.id + ", false)\">No</input></td><td>" + queue.status + "</td><td><button type=\"button\" onclick=\"updateStatus(" + queue.id + ", 'Finished')\" class=\"confirmbtn\">Finish</button><button type=\"button\" onclick=\"updateStatus(" + queue.id + ", 'Canceled')\" class=\"cancelbtn\">Cancel</button></td></tr>";
                        } else{
                            list += "<tr><td><button type=\"button\" onclick=\"info('" + queue.patient.insuranceNumber + "')\">" + queue.patient.insuranceNumber + "</button></td><td>" + queue.patient.lastName + ", " + queue.patient.firstName[0] + ".</td><td><input type=\"radio\" onclick=\"updatePriority(" + queue.id + ", true)\">Yes</input><input type=\"radio\" checked>No</input></td><td>" + queue.status + "</td><td><button type=\"button\" onclick=\"updateStatus(" + queue.id + ", 'Finished')\" class=\"confirmbtn\">Finish</button><button type=\"button\" onclick=\"updateStatus(" + queue.id + ", 'Canceled')\" class=\"cancelbtn\">Cancel</button></td></tr>";
                        }
                    } else {
                        list += "<tr><td>" + queue.patient.insuranceNumber + "</td><td>" + queue.patient.lastName + ", " + queue.patient.firstName[0] + ".</td><td>&nbsp;</td><td>" + queue.status + "</td><td>&nbsp;</td></tr>";
                    }
                }
            } else {
                list += "<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>";
            }
            list += "</table>";
            document.getElementById("list").innerHTML = list;
            if (callWindow == null) {
                callWindow = window.open("call.html");
            }
        }
    };
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send();
}

function queuePatient() {
    insuranceNumber = document.getElementById("insuranceNumber").value.toUpperCase();
    if (insuranceNumber != null && insuranceNumber != "") {
        if (inQueue.indexOf(insuranceNumber) == -1) {
            let queue = {"patient" : {"insuranceNumber" : insuranceNumber}};
            let xmlhttp = new XMLHttpRequest();
            xmlhttp.open("POST", "/clinic-test/api/queue/queue", true);
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    queueJson = JSON.parse(xmlhttp.responseText);
                    while (inQueue.length > 0) {
                        inQueue.pop();
                    }
                    let list = "<table><tr><th>Insurance Number</th><th>Patient</th><th>Priority</th><th>Status</th><th>&nbsp;</tr>";
                    if (queueJson.length > 0) {
                        for (let queue of queueJson) {
                            if (queue.status == "Waiting") {
                                if (queue.patient.insuranceNumber.toUpperCase() == insuranceNumber) {
                                    insuranceNumber = true;
                                }
                                inQueue.push(queue.patient.insuranceNumber.toUpperCase());
                                if (queue.priority) {
                                    list += "<tr><td><button type=\"button\" onclick=\"info('" + queue.patient.insuranceNumber + "')\">" + queue.patient.insuranceNumber + "</button></td><td>" + queue.patient.lastName + ", " + queue.patient.firstName[0] + ".</td><td><input type=\"radio\" checked>Yes</input><input type=\"radio\" onclick=\"updatePriority(" + queue.id + ", false)\">No</input></td><td>" + queue.status + "</td><td><button type=\"button\" onclick=\"updateStatus(" + queue.id + ", 'Finished')\" class=\"confirmbtn\">Finish</button><button type=\"button\" onclick=\"updateStatus(" + queue.id + ", 'Canceled')\" class=\"cancelbtn\">Cancel</button></td></tr>";
                                } else{
                                    list += "<tr><td><button type=\"button\" onclick=\"info('" + queue.patient.insuranceNumber + "')\">" + queue.patient.insuranceNumber + "</button></td><td>" + queue.patient.lastName + ", " + queue.patient.firstName[0] + ".</td><td><input type=\"radio\" onclick=\"updatePriority(" + queue.id + ", true)\">Yes</input><input type=\"radio\" checked>No</input></td><td>" + queue.status + "</td><td><button type=\"button\" onclick=\"updateStatus(" + queue.id + ", 'Finished')\" class=\"confirmbtn\">Finish</button><button type=\"button\" onclick=\"updateStatus(" + queue.id + ", 'Canceled')\" class=\"cancelbtn\">Cancel</button></td></tr>";
                                }
                            } else {
                                list += "<tr><td>" + queue.patient.insuranceNumber + "</td><td>" + queue.patient.lastName + ", " + queue.patient.firstName[0] + ".</td><td>&nbsp;</td><td>" + queue.status + "</td><td>&nbsp;</td></tr>";
                            }
                        }
                    } else {
                        list += "<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>";
                    }
                    list += "</table>";
                    document.getElementById("list").innerHTML = list;
                    if (callWindow == undefined) {
                        callWindow = window.open("call.html");
                    } else {
                        callWindow.callList();
                    }
                    if (insuranceNumber == true) {
                        document.getElementById("insuranceNumber").value = "";
                        document.getElementById("error").innerHTML = "&nbsp;";
                    } else {
                        document.getElementById("error").innerHTML = "Invalid Insurance Number";
                    }
                }
            };
            xmlhttp.setRequestHeader("Content-Type", "application/json");
            xmlhttp.send(JSON.stringify(queue));
        } else if (inQueue.indexOf(insuranceNumber) > -1) {
            document.getElementById("error").innerHTML = "Patient Already in Waiting List";
        }
    } else {
        document.getElementById("error").innerHTML = "Please Enter Insurance Number";
    }
}

function info(insuranceNumber) {
    if (childWindow == null || childWindow.closed) {
        window.name = "parent";
        childWindow = window.open("patient.html");
        childWindow.onload = function() {
            childWindow.document.getElementById("insuranceNumber").value = insuranceNumber;
            childWindow.searchPatient();
            childWindow.focus();
        }
    } else if (childWindow.location.href.indexOf("patient.html") == -1) {
        childWindow.close();
        childWindow = window.open("patient.html");
        childWindow.onload = function() {
            childWindow.document.getElementById("insuranceNumber").value = insuranceNumber;
            childWindow.searchPatient();
            childWindow.focus();
        }
    } else {
        childWindow.document.getElementById("insuranceNumber").value = insuranceNumber;
        childWindow.searchPatient();
        childWindow.focus();
    }
}

function updatePriority(id, priority) {
    let queue = {"id" : id, "priority" : priority};
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/clinic-test/api/queue/update", true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            queueJson = JSON.parse(xmlhttp.responseText);
            let list = "<table><tr><th>Insurance Number</th><th>Patient</th><th>Priority</th><th>Status</th><th>&nbsp;</tr>";
            if (queueJson.length > 0) {
                for (let queue of queueJson) {
                    if (queue.status == "Waiting") {
                        inQueue.push(queue.patient.insuranceNumber.toUpperCase());
                        if (queue.priority) {
                            list += "<tr><td><button type=\"button\" onclick=\"info('" + queue.patient.insuranceNumber + "')\">" + queue.patient.insuranceNumber + "</button></td><td>" + queue.patient.lastName + ", " + queue.patient.firstName[0] + ".</td><td><input type=\"radio\" checked>Yes</input><input type=\"radio\" onclick=\"updatePriority(" + queue.id + ", false)\">No</input></td><td>" + queue.status + "</td><td><button type=\"button\" onclick=\"updateStatus(" + queue.id + ", 'Finished')\" class=\"confirmbtn\">Finish</button><button type=\"button\" onclick=\"updateStatus(" + queue.id + ", 'Canceled')\" class=\"cancelbtn\">Cancel</button></td></tr>";
                        } else{
                            list += "<tr><td><button type=\"button\" onclick=\"info('" + queue.patient.insuranceNumber + "')\">" + queue.patient.insuranceNumber + "</button></td><td>" + queue.patient.lastName + ", " + queue.patient.firstName[0] + ".</td><td><input type=\"radio\" onclick=\"updatePriority(" + queue.id + ", true)\">Yes</input><input type=\"radio\" checked>No</input></td><td>" + queue.status + "</td><td><button type=\"button\" onclick=\"updateStatus(" + queue.id + ", 'Finished')\" class=\"confirmbtn\">Finish</button><button type=\"button\" onclick=\"updateStatus(" + queue.id + ", 'Canceled')\" class=\"cancelbtn\">Cancel</button></td></tr>";
                        }
                    } else {
                        list += "<tr><td>" + queue.patient.insuranceNumber + "</td><td>" + queue.patient.lastName + ", " + queue.patient.firstName[0] + ".</td><td>&nbsp;</td><td>" + queue.status + "</td><td>&nbsp;</td></tr>";
                    }
                }
            } else {
                list += "<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>";
            }
            list += "</table>";
            document.getElementById("list").innerHTML = list;
            if (callWindow == null) {
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
    xmlhttp.open("POST", "/clinic-test/api/queue/update", true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            queueJson = JSON.parse(xmlhttp.responseText);
            while (inQueue.length > 0) {
                inQueue.pop();
            }
            let list = "<table><tr><th>Insurance Number</th><th>Patient</th><th>Priority</th><th>Status</th><th>&nbsp;</tr>";
            if (queueJson.length > 0) {
                for (let queue of queueJson) {
                    if (queue.status == "Waiting") {
                        inQueue.push(queue.patient.insuranceNumber.toUpperCase());
                        if (queue.priority) {
                            list += "<tr><td><button type=\"button\" onclick=\"info('" + queue.patient.insuranceNumber + "')\">" + queue.patient.insuranceNumber + "</button></td><td>" + queue.patient.lastName + ", " + queue.patient.firstName[0] + ".</td><td><input type=\"radio\" checked>Yes</input><input type=\"radio\" onclick=\"updatePriority(" + queue.id + ", false)\">No</input></td><td>" + queue.status + "</td><td><button type=\"button\" onclick=\"updateStatus(" + queue.id + ", 'Finished')\" class=\"confirmbtn\">Finish</button><button type=\"button\" onclick=\"updateStatus(" + queue.id + ", 'Canceled')\" class=\"cancelbtn\">Cancel</button></td></tr>";
                        } else{
                            list += "<tr><td><button type=\"button\" onclick=\"info('" + queue.patient.insuranceNumber + "')\">" + queue.patient.insuranceNumber + "</button></td><td>" + queue.patient.lastName + ", " + queue.patient.firstName[0] + ".</td><td><input type=\"radio\" onclick=\"updatePriority(" + queue.id + ", true)\">Yes</input><input type=\"radio\" checked>No</input></td><td>" + queue.status + "</td><td><button type=\"button\" onclick=\"updateStatus(" + queue.id + ", 'Finished')\" class=\"confirmbtn\">Finish</button><button type=\"button\" onclick=\"updateStatus(" + queue.id + ", 'Canceled')\" class=\"cancelbtn\">Cancel</button></td></tr>";
                        }
                    } else {
                        list += "<tr><td>" + queue.patient.insuranceNumber + "</td><td>" + queue.patient.lastName + ", " + queue.patient.firstName[0] + ".</td><td>&nbsp;</td><td>" + queue.status + "</td><td>&nbsp;</td></tr>";
                    }
                }
            } else {
                list += "<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>";
            }
            list += "</table>";
            document.getElementById("list").innerHTML = list;
            if (callWindow == null) {
                callWindow = window.open("call.html");
            } else {
                callWindow.callList();
            }
        }
    };
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify(queue));
}

function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className == "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

function openPatient() {
    if (childWindow == null || childWindow.closed) {
        window.name = "parent";
        childWindow = window.open("patient.html");
        childWindow.onload = function() {
            childWindow.focus();
        }
    } else if (childWindow.location.href.indexOf("patient.html") == -1) {
        childWindow.close();
        childWindow = window.open("patient.html");
        childWindow.onload = function() {
            childWindow.focus();
        }
    } else {
        childWindow.focus();
    }
}

function openReport() {
    if (childWindow == null || childWindow.closed) {
        window.name = "parent";
        childWindow = window.open("report.html");
        childWindow.onload = function() {
            childWindow.focus();
        }
    } else if (childWindow.location.href.indexOf("report.html") == -1) {
        childWindow.close();
        childWindow = window.open("report.html");
        childWindow.onload = function() {
            childWindow.focus();
        }
    } else {
        childWindow.focus();
    }
}

function openInsurance() {
    if (childWindow == null || childWindow.closed) {
        window.name = "parent";
        childWindow = window.open("insurance.html");
        childWindow.onload = function() {
            childWindow.focus();
        }
    } else if (childWindow.location.href.indexOf("insurance.html") == -1) {
        childWindow.close();
        childWindow = window.open("insurance.html");
        childWindow.onload = function() {
            childWindow.focus();
        }
    } else {
        childWindow.focus();
    }
}

function openStaff() {
    if (childWindow == null || childWindow.closed) {
        window.name = "parent";
        childWindow = window.open("staff.html");
        childWindow.onload = function() {
            childWindow.focus();
        }
    } else if (childWindow.location.href.indexOf("staff.html") == -1) {
        childWindow.close();
        childWindow = window.open("staff.html");
        childWindow.onload = function() {
            childWindow.focus();
        }
    } else {
        childWindow.focus();
    }
}

function openBackup() {
    if (childWindow == null || childWindow.closed) {
        window.name = "parent";
        childWindow = window.open("backup.html");
        childWindow.onload = function() {
            childWindow.focus();
        }
    } else if (childWindow.location.href.indexOf("backup.html") == -1) {
        childWindow.close();
        childWindow = window.open("backup.html");
        childWindow.onload = function() {
            childWindow.focus();
        }
    } else {
        childWindow.focus();
    }
}

