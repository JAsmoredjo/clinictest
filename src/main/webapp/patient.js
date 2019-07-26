var access;

function searchPatient(insuranceNumber) {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/clinic-test/api/user/verify", true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            userJSON = JSON.parse(xmlhttp.responseText);
            if (userJSON.access = access) {
                if (document.getElementById("newInsurance").innerHTML == "" || document.getElementById("editInsurance").innerHTML == "") {
                let xmlhttp = new XMLHttpRequest();
                xmlhttp.open("POST", "/clinic-test/api/insurance/all", true);
                xmlhttp.onreadystatechange = function() {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        insuranceJSON = JSON.parse(xmlhttp.responseText);
                        let option = "";
                        for (let insurance of insuranceJSON) {
                            option += "<option value=\"" + insurance.name + "\">" + insurance.insuranceCompany.name + " - " + insurance.name + "</option>";
                        }
                        document.getElementById("newInsurance").innerHTML = "<option value=\"\" disabled selected>Select Insurance</option>" + option;
                        document.getElementById("editInsurance").innerHTML = "<option value=\"\" disabled selected>Select New Insurance</option>" + option;
                        searchPatient();
                    }
                };
                xmlhttp.setRequestHeader("Content-Type", "application/json");
                xmlhttp.send();
                } else {
                    insuranceNumber = document.getElementById("insuranceNumber").value.toUpperCase();
                    if (insuranceNumber != null && insuranceNumber != "") {
                        let patient = {"insuranceNumber" : insuranceNumber};
                        let xmlhttp = new XMLHttpRequest();
                        xmlhttp.open("POST", "/clinic-test/api/patient/search", true);
                        xmlhttp.onreadystatechange = function() {
                            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                                patientJSON = JSON.parse(xmlhttp.responseText);
                                if (patientJSON.id > 0) {
                                    let date = patientJSON.dateOfBirth.split("-");
                                    let info = "<table><tr><th colspan=\"2\">Patient<button type=\"button\" onclick=\"document.getElementById('id02').style.display = 'block'\">Edit</button></th></tr><tr><th>Name</th><td>" + patientJSON.lastName + ", " + patientJSON.firstName + "</td></tr><tr><th>Date of Birth</th><td>" + date[2] + "-" + date[1] + "-" + date[0] + "</td></tr><tr><th>Address</th><td>" + patientJSON.address + "</td></tr><tr><th>Phone Number</th><td>" + patientJSON.phoneNumber + "</td></tr><tr><th>Insurance</th><td>" + patientJSON.insurance.insuranceCompany.name + " - " + patientJSON.insurance.name + "</td></tr><tr><th>Insurance Number</th><td>" + patientJSON.insuranceNumber + "</td></tr></table>";
                                    document.getElementById("info").innerHTML = info;
                                    document.getElementById("editID").value = patientJSON.id;
                                    document.getElementById("editLastName").value = patientJSON.lastName;
                                    document.getElementById("editFirstName").value = patientJSON.firstName;
                                    document.getElementById("editDateOfBirth").value = patientJSON.dateOfBirth;
                                    document.getElementById("editAddress").value = patientJSON.address;
                                    document.getElementById("editPhoneNumber").value = patientJSON.phoneNumber;
                                    document.getElementById("editInsurance").value = patientJSON.insurance.name;
                                    document.getElementById("editInsuranceNumber").value = patientJSON.insuranceNumber;
                                    document.getElementById("anamnesisInsuranceNumber").value = patientJSON.insuranceNumber;
                                    document.getElementById("anamnesis").value = "";
                                    let visitTable = "";
                                    if (patientJSON.visits.length > 0) {
                                        for (let visit of patientJSON.visits) {
                                            visitTable = "<tr><td>" + visit.date.dayOfMonth + "-" + visit.date.monthValue + "-" + visit.date.year + "</td><td>" + visit.anamnesis + "</td></tr>" + visitTable;
                                        }
                                        visitTable = "<table><tr><th>Date</th><th>Anamnesis<button type=\"button\" onclick=\"document.getElementById('id03').style.display = 'block'\">Add</button></th></tr>" + visitTable;
                                    } else {
                                        visitTable += "<table><tr><th>Date</th><th>Anamnesis<button type=\"button\" onclick=\"document.getElementById('id03').style.display = 'block'\">Add</button></th></tr>";
                                    }
                                    document.getElementById("visitTable").innerHTML = visitTable;
                                    document.getElementById("insuranceNumber").value = "";
                                    document.getElementById("searchError").innerHTML = "&nbsp;";
                                } else {
                                    document.getElementById("searchError").innerHTML = "Invalid Insurance Number";
                                }
                            }
                        };
                        xmlhttp.setRequestHeader("Content-Type", "application/json");
                        xmlhttp.send(JSON.stringify(patient));
                    } else {
                        document.getElementById("searchError").innerHTML = "Please Enter Insurance Number";
                    }
                }
            } else {
                window.location.reload();
            }
        }
    };
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify({"access" : access}));
}

function addAnamnesis() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/clinic-test/api/user/verify", true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            userJSON = JSON.parse(xmlhttp.responseText);
            if (userJSON.access = access) {
                let anamnesis = document.getElementById("anamnesis").value;
                if (anamnesis != null && anamnesis != "") {
                    let insuranceNumber = document.getElementById("anamnesisInsuranceNumber").value;
                    if (anamnesis != null && anamnesis != "") {
                        let patient = {"insuranceNumber" : insuranceNumber, "visits" : [{"anamnesis" : anamnesis}]};
                        let xmlhttp = new XMLHttpRequest();
                        xmlhttp.open("POST", "/clinic-test/api/patient/visit", true);
                        xmlhttp.onreadystatechange = function() {
                            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                                patientJSON = JSON.parse(xmlhttp.responseText);
                                let date = patientJSON.dateOfBirth.split("-");
                                let info = "<table><tr><th colspan=\"2\">Patient<button type=\"button\" onclick=\"document.getElementById('id02').style.display = 'block'\">Edit</button></th></tr><tr><th>Name</th><td>" + patientJSON.lastName + ", " + patientJSON.firstName + "</td></tr><tr><th>Date of Birth</th><td>" + date[2] + "-" + date[1] + "-" + date[0] + "</td></tr><tr><th>Address</th><td>" + patientJSON.address + "</td></tr><tr><th>Phone Number</th><td>" + patientJSON.phoneNumber + "</td></tr><tr><th>Insurance</th><td>" + patientJSON.insurance.insuranceCompany.name + " - " + patientJSON.insurance.name + "</td></tr><tr><th>Insurance Number</th><td>" + patientJSON.insuranceNumber + "</td></tr></table>";
                                document.getElementById("info").innerHTML = info;
                                document.getElementById("editID").value = patientJSON.id;
                                document.getElementById("editLastName").value = patientJSON.lastName;
                                document.getElementById("editFirstName").value = patientJSON.firstName;
                                document.getElementById("editDateOfBirth").value = patientJSON.dateOfBirth;
                                document.getElementById("editAddress").value = patientJSON.address;
                                document.getElementById("editPhoneNumber").value = patientJSON.phoneNumber;
                                document.getElementById("editInsurance").value = patientJSON.insurance.name;
                                document.getElementById("editInsuranceNumber").value = patientJSON.insuranceNumber;
                                document.getElementById("anamnesisInsuranceNumber").value = patientJSON.insuranceNumber;
                                let visitTable = "";
                                if (patientJSON.visits.length > 0) {
                                    for (let visit of patientJSON.visits) {
                                        visitTable = "<tr><td>" + visit.date.dayOfMonth + "-" + visit.date.monthValue + "-" + visit.date.year + "</td><td>" + visit.anamnesis + "</td></tr>" + visitTable;
                                    }
                                    visitTable = "<table><tr><th>Date</th><th>Anamnesis<button type=\"button\" onclick=\"document.getElementById('id03').style.display = 'block'\">Add</button></th></tr>" + visitTable;
                                } else {
                                    visitTable += "<table><tr><th>Date</th><th>Anamnesis<button type=\"button\" onclick=\"document.getElementById('id03').style.display = 'block'\">Add</button></th></tr>";
                                }
                                document.getElementById("visitTable").innerHTML = visitTable;
                                document.getElementById("anamnesis").value = "";
                                document.getElementById("anamnesisError").innerHTML = "&nbsp";
                                document.getElementById("id03").style.display = "none";
                            }
                        };
                        xmlhttp.setRequestHeader("Content-Type", "application/json");
                        xmlhttp.send(JSON.stringify(patient));
                    }
                } else {
                    document.getElementById("anamnesisError").innerHTML = "Please Enter Anamnesis";
                }
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

function openWaitingList() {
    win = window.open("", "parent");
    if (win.location.href.indexOf("waiting-list.html") != -1) {
        win.focus();
    } else {
        win.location.href = "waiting-list.html";
        win.focus();
    }
}

function openPatient() {
    window.location.href = "patient.html"
}

function openReport() {
    window.location.href = "report.html"
}

function openInsurance() {
    window.location.href = "insurance.html"
}

function openStaff() {
    window.location.href = "staff.html"
}

function openBackup() {
    window.location.href = "backup.html"
}

function getInsurance() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/clinic-test/api/user/verify", true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            userJSON = JSON.parse(xmlhttp.responseText);
            if (userJSON.access = access) {
                let xmlhttp = new XMLHttpRequest();
                xmlhttp.open("POST", "/clinic-test/api/insurance/all", true);
                xmlhttp.onreadystatechange = function() {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        insuranceJSON = JSON.parse(xmlhttp.responseText);
                        let option = "";
                        for (let insurance of insuranceJSON) {
                            option += "<option value=\"" + insurance.name + "\">" + insurance.insuranceCompany.name + " - " + insurance.name + "</option>";
                        }
                        document.getElementById("newInsurance").innerHTML = "<option value=\"\" disabled selected>Select Insurance</option>" + option;
                        document.getElementById("editInsurance").innerHTML = "<option value=\"\" disabled selected>Select New Insurance</option>" + option;
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

function editPatient() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/clinic-test/api/user/verify", true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            userJSON = JSON.parse(xmlhttp.responseText);
            if (userJSON.access = access) {
                if (document.getElementById("editID").value != null && document.getElementById("editID").value != "" && document.getElementById("editLastName").value != null && document.getElementById("editLastName").value != "" && document.getElementById("editFirstName").value != null && document.getElementById("editFirstName").value != "" && document.getElementById("editDateOfBirth").value != null && document.getElementById("editDateOfBirth").value != "" && document.getElementById("editAddress").value != null && document.getElementById("editAddress").value != "" && document.getElementById("editPhoneNumber").value != null && document.getElementById("editPhoneNumber").value != "" && document.getElementById("editInsurance").selectedIndex != 0 && document.getElementById("editInsuranceNumber").value != null && document.getElementById("editInsuranceNumber").value != "") {
                    let patient = {};
                    patient.id = document.getElementById("editID").value;
                    patient.lastName = document.getElementById("editLastName").value;
                    patient.firstName = document.getElementById("editFirstName").value;
                    patient.dateOfBirth = document.getElementById("editDateOfBirth").value;
                    patient.address = document.getElementById("editAddress").value;
                    patient.phoneNumber = document.getElementById("editPhoneNumber").value;
                    let insurance = document.getElementById("editInsurance");
                    patient.insurance = {"name" : insurance.options[insurance.selectedIndex].value};
                    patient.insuranceNumber = document.getElementById("editInsuranceNumber").value.toUpperCase();
                    let xmlhttp = new XMLHttpRequest();
                    xmlhttp.open("POST", "/clinic-test/api/patient/update", true);
                    xmlhttp.onreadystatechange = function() {
                        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                            patientJSON = JSON.parse(xmlhttp.responseText);
                            if (patientJSON.insuranceNumber != null) {
                                let date = patientJSON.dateOfBirth.split("-");
                                let info = "<table><tr><th colspan=\"2\">Patient<button type=\"button\" onclick=\"document.getElementById('id02').style.display = 'block'\">Edit</button></th></tr><tr><th>Name</th><td>" + patientJSON.lastName + ", " + patientJSON.firstName + "</td></tr><tr><th>Date of Birth</th><td>" + date[2] + "-" + date[1] + "-" + date[0] + "</td></tr><tr><th>Address</th><td>" + patientJSON.address + "</td></tr><tr><th>Phone Number</th><td>" + patientJSON.phoneNumber + "</td></tr><tr><th>Insurance</th><td>" + patientJSON.insurance.insuranceCompany.name + " - " + patientJSON.insurance.name + "</td></tr><tr><th>Insurance Number</th><td>" + patientJSON.insuranceNumber + "</td></tr></table>";
                                document.getElementById("info").innerHTML = info;
                                document.getElementById("editID").value = patientJSON.id;
                                document.getElementById("editLastName").value = patientJSON.lastName;
                                document.getElementById("editFirstName").value = patientJSON.firstName;
                                document.getElementById("editDateOfBirth").value = patientJSON.dateOfBirth;
                                document.getElementById("editAddress").value = patientJSON.address;
                                document.getElementById("editPhoneNumber").value = patientJSON.phoneNumber;
                                document.getElementById("editInsurance").value = patientJSON.insurance.name;
                                document.getElementById("editInsuranceNumber").value = patientJSON.insuranceNumber;
                                document.getElementById("anamnesisInsuranceNumber").value = patientJSON.insuranceNumber;
                                let visitTable = "";
                                if (patientJSON.visits.length > 0) {
                                    for (let visit of patientJSON.visits) {
                                        visitTable = "<tr><td>" + visit.date.dayOfMonth + "-" + visit.date.monthValue + "-" + visit.date.year + "</td><td>" + visit.anamnesis + "</td></tr>" + visitTable;
                                    }
                                    visitTable = "<table><tr><th>Date</th><th>Anamnesis<button type=\"button\" onclick=\"document.getElementById('id03').style.display = 'block'\">Add</button></th></tr>" + visitTable;
                                } else {
                                    visitTable += "<table><tr><th>Date</th><th>Anamnesis<button type=\"button\" onclick=\"document.getElementById('id03').style.display = 'block'\">Add</button></th></tr>";
                                }
                                document.getElementById("visitTable").innerHTML = visitTable;
                                document.getElementById("editError").innerHTML = "&nbsp;";
                                document.getElementById("id02").style.display = "none";
                            } else {
                                document.getElementById("editError").innerHTML = "Insurance Number Already Exist";
                            }
                        }
                    };
                    xmlhttp.setRequestHeader("Content-Type", "application/json");
                    xmlhttp.send(JSON.stringify(patient));
                } else {
                    document.getElementById("editError").innerHTML = "Please Enter All Fields";
                }
            } else {
                window.location.reload();
            }
        }
    };
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify({"access" : access}));
}

function newPatient() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/clinic-test/api/user/verify", true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            userJSON = JSON.parse(xmlhttp.responseText);
            if (userJSON.access = access) {
                if (document.getElementById("newLastName").value != null && document.getElementById("newLastName").value != "" && document.getElementById("newFirstName").value != null && document.getElementById("newFirstName").value != "" && document.getElementById("newDateOfBirth").value != null && document.getElementById("newDateOfBirth").value != "" && document.getElementById("newAddress").value != null && document.getElementById("newAddress").value != "" && document.getElementById("newPhoneNumber").value != null && document.getElementById("newPhoneNumber").value != "" && document.getElementById("newInsurance").selectedIndex > 0 && document.getElementById("newInsuranceNumber").value != null && document.getElementById("newInsuranceNumber").value != "") {
                    let patient = {};
                    patient.lastName = document.getElementById("newLastName").value;
                    patient.firstName = document.getElementById("newFirstName").value;
                    patient.dateOfBirth = document.getElementById("newDateOfBirth").value;
                    patient.address = document.getElementById("newAddress").value;
                    patient.phoneNumber = document.getElementById("newPhoneNumber").value;
                    let insurance = document.getElementById("newInsurance");
                    patient.insurance = {"name" : insurance.options[insurance.selectedIndex].value};
                    patient.insuranceNumber = document.getElementById("newInsuranceNumber").value.toUpperCase();
                    let xmlhttp = new XMLHttpRequest();
                    xmlhttp.open("POST", "/clinic-test/api/patient/register", true);
                    xmlhttp.onreadystatechange = function() {
                        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                            patientJSON = JSON.parse(xmlhttp.responseText);
                            if (patientJSON.insuranceNumber == null) {
                                document.getElementById("newError").innerHTML = "Insurance Number Already Exist";
                            } else {
                                let date = patientJSON.dateOfBirth.split("-");
                                let info = "<table><tr><th colspan=\"2\">Patient<button type=\"button\" onclick=\"document.getElementById('id02').style.display = 'block'\">Edit</button></th></tr><tr><th>Name</th><td>" + patientJSON.lastName + ", " + patientJSON.firstName + "</td></tr><tr><th>Date of Birth</th><td>" + date[2] + "-" + date[1] + "-" + date[0] + "</td></tr><tr><th>Address</th><td>" + patientJSON.address + "</td></tr><tr><th>Phone Number</th><td>" + patientJSON.phoneNumber + "</td></tr><tr><th>Insurance</th><td>" + patientJSON.insurance.insuranceCompany.name + " - " + patientJSON.insurance.name + "</td></tr><tr><th>Insurance Number</th><td>" + patientJSON.insuranceNumber + "</td></tr></table>";
                                document.getElementById("info").innerHTML = info;
                                document.getElementById("editID").value = patientJSON.id;
                                document.getElementById("editLastName").value = patientJSON.lastName;
                                document.getElementById("editFirstName").value = patientJSON.firstName;
                                document.getElementById("editDateOfBirth").value = patientJSON.dateOfBirth;
                                document.getElementById("editAddress").value = patientJSON.address;
                                document.getElementById("editPhoneNumber").value = patientJSON.phoneNumber;
                                document.getElementById("editInsurance").value = patientJSON.insurance.name;
                                document.getElementById("editInsuranceNumber").value = patientJSON.insuranceNumber;
                                document.getElementById("anamnesisInsuranceNumber").value = patientJSON.insuranceNumber;
                                let visitTable = "";
                                if (patientJSON.visits.length > 0) {
                                    for (let visit of patientJSON.visits) {
                                        visitTable = "<tr><td>" + visit.date.dayOfMonth + "-" + visit.date.monthValue + "-" + visit.date.year + "</td><td>" + visit.anamnesis + "</td></tr>" + visitTable;
                                    }
                                    visitTable = "<table><tr><th>Date</th><th>Anamnesis<button type=\"button\" onclick=\"document.getElementById('id03').style.display = 'block'\">Add</button></th></tr>" + visitTable;
                                } else {
                                    visitTable += "<table><tr><th>Date</th><th>Anamnesis<button type=\"button\" onclick=\"document.getElementById('id03').style.display = 'block'\">Add</button></th></tr>";
                                }
                                document.getElementById("visitTable").innerHTML = visitTable;
                                document.getElementById("newLastName").value = "";
                                document.getElementById("newFirstName").value = "";
                                document.getElementById("newDateOfBirth").value = "";
                                document.getElementById("newAddress").value = "";
                                document.getElementById("newPhoneNumber").value = "";
                                insurance.selectedIndex = 0;
                                document.getElementById("newInsuranceNumber").value = "";
                                document.getElementById("newError").innerHTML = "&nbsp;";
                                document.getElementById("id01").style.display = "none";
                            }
                        }
                    };
                    xmlhttp.setRequestHeader("Content-Type", "application/json");
                    xmlhttp.send(JSON.stringify(patient));
                } else {
                    document.getElementById("newError").innerHTML = "Please Enter All Fields";
                }
            } else {
                window.location.reload();
            }
        }
    };
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify({"access" : access}));
}

function logout() {
    win = window.open("", "parent");
    if (win.location.href.indexOf("waiting-list.html") != -1) {
        win.focus();
        window.close();
        win.logout();
    } else {
        win.location.href = "waiting-list.html";
        win.focus();
        window.close();
        win.logout();
    }
}