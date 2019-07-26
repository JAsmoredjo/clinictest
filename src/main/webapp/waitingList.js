var childWindow;
var staffWindow;
var reportWindow;
var accountWindow;
var callWindow;
var inQueue = [];
var job;
var access;

function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    if (username != null && username != "" && password != null && password != "") {
        let user = {"username" : username, "password" : password};
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", "/clinic-test/api/user/login", true);
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                let userJSON = JSON.parse(xmlhttp.responseText);
                if (userJSON.username == username && userJSON.password == password) {
                    document.getElementById("username").value = "";
                    document.getElementById("password").value = "";
                    document.getElementById("loginError").value = "&nbsp;";
                    if (userJSON.staff.job == "Doctor") {
                        document.getElementById("myTopnav").innerHTML = "<a href=\"#\" class=\"active\">Waiting List</a><a href=\"#\" onclick=\"openPatient()\">Patient</a><a href=\"#\" onclick=\"openReport()\">Report</a><a href=\"#\" onclick=\"openInsurance()\">Insurance</a><a href=\"#\" onclick=\"openStaff()\">Staff</a><a href=\"#\" onclick=\"openBackup()\">Backup</a><a href=\"#\" class=\"logout\" onclick=\"logout()\">Logout</a><a href=\"javascript:void(0);\" class=\"icon\" onclick=\"myFunction()\">≡</a>";
                    }
                    job = userJSON.staff.job;
                    access = userJSON.access;
                    getList()
                    document.getElementById("id01").style.display = "none";
                } else {
                    document.getElementById("loginError").innerHTML = "Invalid Username or Password";
                }
            }
        };
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(JSON.stringify(user));
    } else {
        document.getElementById("loginError").innerHTML = "Please Enter Username and Password";
    }
}

function getList() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/clinic-test/api/user/verify", true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            userJSON = JSON.parse(xmlhttp.responseText);
            if (userJSON.access = access) {
                let xmlhttp = new XMLHttpRequest();
                xmlhttp.open("POST", "/clinic-test/api/queue/today", true);
                xmlhttp.onreadystatechange = function() {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        queueJson = JSON.parse(xmlhttp.responseText);
                        let list = "<table><tr><th>Insurance Number</th><th>Patient</th><th>Priority</th><th>Status</th><th><button type=\"button\" onclick=\"getList()\">Refresh</button></th></tr>";
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
                        if (callWindow == null || callWindow.closed) {
                            callWindow = window.open("call.html");
                            callWindow.onload = function() {
                                callWindow.access = access;
                                callWindow.callList();
                            }
                        }
                    }
                };
                xmlhttp.setRequestHeader("Content-Type", "application/json");
                xmlhttp.send();
            } else {
                window.location.reload();
            }
        }
    };
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify({"access" : access}));
}

function queuePatient() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/clinic-test/api/user/verify", true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            userJSON = JSON.parse(xmlhttp.responseText);
            if (userJSON.access = access) {
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
                                let list = "<table><tr><th>Insurance Number</th><th>Patient</th><th>Priority</th><th>Status</th><th><button type=\"button\" onclick=\"getList()\">Refresh</button></tr>";
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
                                if (callWindow == null || callWindow.closed) {
                                    callWindow = window.open("call.html");
                                    callWindow.onload = function() {
                                        callWindow.access = access;
                                        callWindow.callList();
                                    }
                                } else {
                                    callWindow.callList();
                                }
                                if (insuranceNumber == true) {
                                    document.getElementById("insuranceNumber").value = "";
                                    document.getElementById("queueError").innerHTML = "&nbsp;";
                                } else {
                                    document.getElementById("queueError").innerHTML = "Invalid Insurance Number";
                                }
                            }
                        };
                        xmlhttp.setRequestHeader("Content-Type", "application/json");
                        xmlhttp.send(JSON.stringify(queue));
                    } else if (inQueue.indexOf(insuranceNumber) > -1) {
                        document.getElementById("queueError").innerHTML = "Patient Already in Waiting List";
                    }
                } else {
                    document.getElementById("queueError").innerHTML = "Please Enter Insurance Number";
                }
            } else {
                window.location.reload();
            }
        }
    };
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify({"access" : access}));
}

function info(insuranceNumber) {
    if (childWindow == null || childWindow.closed) {
        window.name = "parent";
        childWindow = window.open("patient.html");
        childWindow.onload = function() {
            childWindow.access = access;
            if (job == "Doctor") {
                childWindow.document.getElementById("myTopnav").innerHTML = "<a href=\"#\" class=\"active\">Patient</a><a href=\"#\" onclick=\"openWaitingList()\">Waiting List</a><a href=\"#\" onclick=\"openReport()\">Report</a><a href=\"#\" onclick=\"openInsurance()\">Insurance</a><a href=\"#\" onclick=\"openStaff()\">Staff</a><a href=\"#\" onclick=\"openBackup()\">Backup</a><a href=\"#\" class=\"logout\" onclick=\"logout()\">Logout</a><a href=\"javascript:void(0);\" class=\"icon\" onclick=\"myFunction()\">≡</a>";
            }
            childWindow.document.getElementById("insuranceNumber").value = insuranceNumber;
            childWindow.searchPatient();
            childWindow.focus();
        }
    } else if (childWindow.location.href.indexOf("patient.html") == -1) {
        childWindow.close();
        childWindow = window.open("patient.html");
        childWindow.onload = function() {
            childWindow.access = access;
            if (job == "Doctor") {
                childWindow.document.getElementById("myTopnav").innerHTML = "<a href=\"#\" class=\"active\">Patient</a><a href=\"#\" onclick=\"openWaitingList()\">Waiting List</a><a href=\"#\" onclick=\"openReport()\">Report</a><a href=\"#\" onclick=\"openInsurance()\">Insurance</a><a href=\"#\" onclick=\"openStaff()\">Staff</a><a href=\"#\" onclick=\"openBackup()\">Backup</a><a href=\"#\" class=\"logout\" onclick=\"logout()\">Logout</a><a href=\"javascript:void(0);\" class=\"icon\" onclick=\"myFunction()\">≡</a>";
            }
            childWindow.document.getElementById("insuranceNumber").value = insuranceNumber;
            childWindow.searchPatient();
            childWindow.focus();
        }
    } else {
        childWindow.access = access;
        if (job == "Doctor") {
            childWindow.document.getElementById("myTopnav").innerHTML = "<a href=\"#\" class=\"active\">Patient</a><a href=\"#\" onclick=\"openWaitingList()\">Waiting List</a><a href=\"#\" onclick=\"openReport()\">Report</a><a href=\"#\" onclick=\"openInsurance()\">Insurance</a><a href=\"#\" onclick=\"openStaff()\">Staff</a><a href=\"#\" onclick=\"openBackup()\">Backup</a><a href=\"#\" class=\"logout\" onclick=\"logout()\">Logout</a><a href=\"javascript:void(0);\" class=\"icon\" onclick=\"myFunction()\">≡</a>";
        }
        childWindow.document.getElementById("insuranceNumber").value = insuranceNumber;
        childWindow.searchPatient();
        childWindow.focus();
    }
}

function updatePriority(id, priority) {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/clinic-test/api/user/verify", true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            userJSON = JSON.parse(xmlhttp.responseText);
            if (userJSON.access = access) {
                let queue = {"id" : id, "priority" : priority};
                let xmlhttp = new XMLHttpRequest();
                xmlhttp.open("POST", "/clinic-test/api/queue/update", true);
                xmlhttp.onreadystatechange = function() {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        queueJson = JSON.parse(xmlhttp.responseText);
                        let list = "<table><tr><th>Insurance Number</th><th>Patient</th><th>Priority</th><th>Status</th><th><button type=\"button\" onclick=\"getList()\">Refresh</button></tr>";
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
                        if (callWindow == null || callWindow.closed) {
                            callWindow = window.open("call.html");
                            callWindow.onload = function() {
                                callWindow.access = access;
                                callWindow.callList();
                            }
                        } else {
                            callWindow.callList();
                        }
                    }
                };
                xmlhttp.setRequestHeader("Content-Type", "application/json");
                xmlhttp.send(JSON.stringify(queue));
            } else {
                window.location.reload();
            }
        }
    };
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify({"access" : access}));
}

function updateStatus(id, status) {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/clinic-test/api/user/verify", true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            userJSON = JSON.parse(xmlhttp.responseText);
            if (userJSON.access = access) {
                let queue = {"id" : id, "status" : status};
                let xmlhttp = new XMLHttpRequest();
                xmlhttp.open("POST", "/clinic-test/api/queue/update", true);
                xmlhttp.onreadystatechange = function() {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        queueJson = JSON.parse(xmlhttp.responseText);
                        while (inQueue.length > 0) {
                            inQueue.pop();
                        }
                        let list = "<table><tr><th>Insurance Number</th><th>Patient</th><th>Priority</th><th>Status</th><th><button type=\"button\" onclick=\"getList()\">Refresh</button></tr>";
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
                        if (callWindow == null || callWindow.closed) {
                            callWindow = window.open("call.html");
                            callWindow.onload = function() {
                                callWindow.access = access;
                                callWindow.callList();
                            }
                        } else {
                            callWindow.callList();
                        }
                    }
                };
                xmlhttp.setRequestHeader("Content-Type", "application/json");
                xmlhttp.send(JSON.stringify(queue));
            } else {
                window.location.reload();
            }
        }
    };
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify({"access" : access}));
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
            childWindow.access = access;
            if (job == "Doctor") {
                childWindow.document.getElementById("myTopnav").innerHTML = "<a href=\"#\" class=\"active\">Patient</a><a href=\"#\" onclick=\"openWaitingList()\">Waiting List</a><a href=\"#\" onclick=\"openReport()\">Report</a><a href=\"#\" onclick=\"openInsurance()\">Insurance</a><a href=\"#\" onclick=\"openStaff()\">Staff</a><a href=\"#\" onclick=\"openBackup()\">Backup</a><a href=\"#\" class=\"logout\" onclick=\"logout()\">Logout</a><a href=\"javascript:void(0);\" class=\"icon\" onclick=\"myFunction()\">≡</a>";
            }
            childWindow.getInsurance();
            childWindow.focus();
        }
    } else if (childWindow.location.href.indexOf("patient.html") == -1) {
        childWindow.close();
        childWindow = window.open("patient.html");
        childWindow.onload = function() {
            childWindow.access = access;
            if (job == "Doctor") {
                childWindow.document.getElementById("myTopnav").innerHTML = "<a href=\"#\" class=\"active\">Patient</a><a href=\"#\" onclick=\"openWaitingList()\">Waiting List</a><a href=\"#\" onclick=\"openReport()\">Report</a><a href=\"#\" onclick=\"openInsurance()\">Insurance</a><a href=\"#\" onclick=\"openStaff()\">Staff</a><a href=\"#\" onclick=\"openBackup()\">Backup</a><a href=\"#\" class=\"logout\" onclick=\"logout()\">Logout</a><a href=\"javascript:void(0);\" class=\"icon\" onclick=\"myFunction()\">≡</a>";
            }
            childWindow.getInsurance();
            childWindow.focus();
        }
    } else {
        childWindow.access = access;
        if (job == "Doctor") {
            childWindow.document.getElementById("myTopnav").innerHTML = "<a href=\"#\" class=\"active\">Patient</a><a href=\"#\" onclick=\"openWaitingList()\">Waiting List</a><a href=\"#\" onclick=\"openReport()\">Report</a><a href=\"#\" onclick=\"openInsurance()\">Insurance</a><a href=\"#\" onclick=\"openStaff()\">Staff</a><a href=\"#\" onclick=\"openBackup()\">Backup</a><a href=\"#\" class=\"logout\" onclick=\"logout()\">Logout</a><a href=\"javascript:void(0);\" class=\"icon\" onclick=\"myFunction()\">≡</a>";
        }
        childWindow.getInsurance();
        childWindow.focus();
    }
}

function openReport() {
    if (childWindow == null || childWindow.closed) {
        window.name = "parent";
        childWindow = window.open("report.html");
        childWindow.onload = function() {
            childWindow.document.getElementById("accessCurrent").value = access;
            childWindow.document.getElementById("accessPrevious").value = access;
            childWindow.document.getElementById("accessCustom").value = access;
            if (job == "Doctor") {
                childWindow.document.getElementById("myTopnav").innerHTML = "<a href=\"#\" class=\"active\">Report</a><a href=\"#\" onclick=\"openWaitingList()\">Waiting List</a><a href=\"#\" onclick=\"openPatient()\">Patient</a><a href=\"#\" onclick=\"openInsurance()\">Insurance</a><a href=\"#\" onclick=\"openStaff()\">Staff</a><a href=\"#\" onclick=\"openBackup()\">Backup</a><a href=\"#\" class=\"logout\" onclick=\"logout()\">Logout</a><a href=\"javascript:void(0);\" class=\"icon\" onclick=\"myFunction()\">≡</a>";
            }
            childWindow.focus();
        }
    } else if (childWindow.location.href.indexOf("report.html") == -1) {
        childWindow.close();
        childWindow = window.open("report.html");
        childWindow.onload = function() {
            childWindow.document.getElementById("accessCurrent").value = access;
            childWindow.document.getElementById("accessPrevious").value = access;
            childWindow.document.getElementById("accessCustom").value = access;
            if (job == "Doctor") {
                childWindow.document.getElementById("myTopnav").innerHTML = "<a href=\"#\" class=\"active\">Report</a><a href=\"#\" onclick=\"openWaitingList()\">Waiting List</a><a href=\"#\" onclick=\"openPatient()\">Patient</a><a href=\"#\" onclick=\"openInsurance()\">Insurance</a><a href=\"#\" onclick=\"openStaff()\">Staff</a><a href=\"#\" onclick=\"openBackup()\">Backup</a><a href=\"#\" class=\"logout\" onclick=\"logout()\">Logout</a><a href=\"javascript:void(0);\" class=\"icon\" onclick=\"myFunction()\">≡</a>";
            }
            childWindow.focus();
        }
    } else {
        childWindow.document.getElementById("accessCurrent").value = access;
        childWindow.document.getElementById("accessPrevious").value = access;
        childWindow.document.getElementById("accessCustom").value = access;
        if (job == "Doctor") {
            childWindow.document.getElementById("myTopnav").innerHTML = "<a href=\"#\" class=\"active\">Report</a><a href=\"#\" onclick=\"openWaitingList()\">Waiting List</a><a href=\"#\" onclick=\"openPatient()\">Patient</a><a href=\"#\" onclick=\"openInsurance()\">Insurance</a><a href=\"#\" onclick=\"openStaff()\">Staff</a><a href=\"#\" onclick=\"openBackup()\">Backup</a><a href=\"#\" class=\"logout\" onclick=\"logout()\">Logout</a><a href=\"javascript:void(0);\" class=\"icon\" onclick=\"myFunction()\">≡</a>";
        }
        childWindow.focus();
    }
}

function openInsurance() {
    if (childWindow == null || childWindow.closed) {
        window.name = "parent";
        childWindow = window.open("insurance.html");
        childWindow.onload = function() {
            childWindow.access = access;
            if (job == "Doctor") {
                childWindow.document.getElementById("myTopnav").innerHTML = "<a href=\"#\" class=\"active\">Insurance</a><a href=\"#\" onclick=\"openWaitingList()\">Waiting List</a><a href=\"#\" onclick=\"openPatient()\">Patient</a><a href=\"#\" onclick=\"openReport()\">Report</a><a href=\"#\" onclick=\"openStaff()\">Staff</a><a href=\"#\" onclick=\"openBackup()\">Backup</a><a href=\"#\" class=\"logout\" onclick=\"logout()\">Logout</a><a href=\"javascript:void(0);\" class=\"icon\" onclick=\"myFunction()\">≡</a>";
            }
            childWindow.focus();
        }
    } else if (childWindow.location.href.indexOf("insurance.html") == -1) {
        childWindow.close();
        childWindow = window.open("insurance.html");
        childWindow.onload = function() {
            childWindow.access = access;
            if (job == "Doctor") {
                childWindow.document.getElementById("myTopnav").innerHTML = "<a href=\"#\" class=\"active\">Insurance</a><a href=\"#\" onclick=\"openWaitingList()\">Waiting List</a><a href=\"#\" onclick=\"openPatient()\">Patient</a><a href=\"#\" onclick=\"openReport()\">Report</a><a href=\"#\" onclick=\"openStaff()\">Staff</a><a href=\"#\" onclick=\"openBackup()\">Backup</a><a href=\"#\" class=\"logout\" onclick=\"logout()\">Logout</a><a href=\"javascript:void(0);\" class=\"icon\" onclick=\"myFunction()\">≡</a>";
            }
            childWindow.focus();
        }
    } else {
        childWindow.access = access;
        if (job == "Doctor") {
            childWindow.document.getElementById("myTopnav").innerHTML = "<a href=\"#\" class=\"active\">Insurance</a><a href=\"#\" onclick=\"openWaitingList()\">Waiting List</a><a href=\"#\" onclick=\"openPatient()\">Patient</a><a href=\"#\" onclick=\"openReport()\">Report</a><a href=\"#\" onclick=\"openStaff()\">Staff</a><a href=\"#\" onclick=\"openBackup()\">Backup</a><a href=\"#\" class=\"logout\" onclick=\"logout()\">Logout</a><a href=\"javascript:void(0);\" class=\"icon\" onclick=\"myFunction()\">≡</a>";
        }
        childWindow.focus();
    }
}

function openStaff() {
    if (childWindow == null || childWindow.closed) {
        window.name = "parent";
        childWindow = window.open("staff.html");
        childWindow.onload = function() {
            childWindow.access = access;
            childWindow.focus();
        }
    } else if (childWindow.location.href.indexOf("staff.html") == -1) {
        childWindow.close();
        childWindow = window.open("staff.html");
        childWindow.onload = function() {
            childWindow.access = access;
            childWindow.focus();
        }
    } else {
        childWindow.access = access;
        childWindow.focus();
    }
}

function openBackup() {
    if (childWindow == null || childWindow.closed) {
        window.name = "parent";
        childWindow = window.open("backup.html");
        childWindow.onload = function() {
            childWindow.document.getElementById("accessCreate") = access;
            childWindow.document.getElementById("accessRestore") = access;
            childWindow.focus();
        }
    } else if (childWindow.location.href.indexOf("backup.html") == -1) {
        childWindow.close();
        childWindow = window.open("backup.html");
        childWindow.onload = function() {
            childWindow.document.getElementById("accessCreate") = access;
            childWindow.document.getElementById("accessRestore") = access;
            childWindow.focus();
        }
    } else {
        childWindow.document.getElementById("accessCreate") = access;
        childWindow.document.getElementById("accessRestore") = access;
        childWindow.access = access;
        childWindow.focus();
    }
}

function logout() {
    if (callWindow != null) {
        callWindow.close();
    }
    if (childWindow != null) {
        childWindow.close();
    }
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/clinic-test/api/user/logout", true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            window.location.reload();
        }
    };
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify({"access" : access}));
}