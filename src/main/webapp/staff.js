var access;

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

function openBackup() {
    window.location.href = "backup.html"
}

function searchStaff() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/clinic-test/api/user/verify", true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            userJSON = JSON.parse(xmlhttp.responseText);
            if (userJSON.access = access) {
                if (document.getElementById("name").value != null && document.getElementById("name").value != "") {
                    let staff = {"lastName" : document.getElementById("name").value};
                    let xmlhttp = new XMLHttpRequest();
                    xmlhttp.open("POST", "/clinic-test/api/staff/search", true);
                    xmlhttp.onreadystatechange = function() {
                        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                            staffJSON = JSON.parse(xmlhttp.responseText);
                            if (staffJSON.length > 0) {
                                let info = "";
                                for (let staff of staffJSON) {
                                    info += "<table><tr><th colspan=\"2\">Staff<button type=\"button\" onclick=\"updateRemove(" + staff.id + ", '" + staff.lastName + "', '" + staff.firstName + "')\">Remove</button></th></tr><tr><th>Name</th><td>" + staff.lastName + ", " + staff.firstName + "</td></tr><tr><th>Date of Birth</th><td>" + staff.dateOfBirth + "</td></tr><tr><th>Address</th><td>" + staff.address + "</td></tr><tr><th>Phone Number</th><td>" + staff.phoneNumber + "</td></tr><tr><th>Job</th><td>" + staff.job + "</td></tr></table>";
                                }
                                document.getElementById("info").innerHTML = info;
                                document.getElementById("name").value = "";
                                document.getElementById("searchError").innerHTML = "&nbsp;";
                            } else {
                                document.getElementById("searchError").innerHTML = "Invalid Name";
                            }
                        }
                    };
                    xmlhttp.setRequestHeader("Content-Type", "application/json");
                    xmlhttp.send(JSON.stringify(staff));
                } else {
                    document.getElementById("searchError").innerHTML = "Please Enter Name";
                }
            } else {
                window.location.reload();
            }
        }
    };
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify({"access" : access}));
}

function updateRemove(id, lastName, firstName) {
    document.getElementById("removeID").value = id;
    document.getElementById("removeLastName").value = lastName;
    document.getElementById("removeFirstName").value = firstName;
    document.getElementById("id02").style.display = "block";
}

function removeStaff() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/clinic-test/api/user/verify", true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            userJSON = JSON.parse(xmlhttp.responseText);
            if (userJSON.access = access) {
                let user = {"staff" : {"id" : document.getElementById("removeID").value}};
                let xmlhttp = new XMLHttpRequest();
                xmlhttp.open("POST", "/clinic-test/api/user/remove", true);
                xmlhttp.onreadystatechange = function() {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        userJSON = JSON.parse(xmlhttp.responseText);
                        if (userJSON.id == 0) {
                                document.getElementById("info").innerHTML = "<table><tr><th colspan=\"2\">Staff</th></tr><tr><th>Name</th><td>&nbsp;</td></tr><tr><th>Date of Birth</th><td>&nbsp;</td></tr><tr><th>Address</th><td>&nbsp;</td></tr><tr><th>Phone Number</th><td>&nbsp;</td></tr><tr><th>Job</th><td>&nbsp;</td></tr></table>";;
                                document.getElementById("removeError").innerHTML = "";
                                document.getElementById("id02").style.display = "none";
                        } else {
                            document.getElementById("removeError").innerHTML = "Couldn't Remove Staff";
                        }
                    }
                };
                xmlhttp.setRequestHeader("Content-Type", "application/json");
                xmlhttp.send(JSON.stringify(user));
            } else {
                window.location.reload();
            }
        }
    };
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify({"access" : access}));
}

function newStaff() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/clinic-test/api/user/verify", true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            userJSON = JSON.parse(xmlhttp.responseText);
            if (userJSON.access = access) {
                if (document.getElementById("newLastName").value != null && document.getElementById("newLastName").value != "" && document.getElementById("newFirstName").value != null && document.getElementById("newFirstName").value != "" && document.getElementById("newDateOfBirth").value != null && document.getElementById("newDateOfBirth").value != "" && document.getElementById("newAddress").value != null && document.getElementById("newAddress").value != "" && document.getElementById("newPhoneNumber").value != null && document.getElementById("newPhoneNumber").value != "" && document.getElementById("newJob").selectedIndex != 0 && document.getElementById("newUsername").value != null && document.getElementById("newUsername").value != "" && document.getElementById("newPassword").value != null && document.getElementById("newPassword").value != "" && document.getElementById("newRetypePassword").value != null && document.getElementById("newRetypePassword").value != "") {
                    if (document.getElementById("newPassword").value == document.getElementById("newRetypePassword").value) {
                        let staff = {};
                        staff.lastName = document.getElementById("newLastName").value;
                        staff.firstName = document.getElementById("newFirstName").value;
                        staff.dateOfBirth = document.getElementById("newDateOfBirth").value;
                        staff.address = document.getElementById("newAddress").value;
                        staff.phoneNumber = document.getElementById("newPhoneNumber").value;
                        let job = document.getElementById("newJob");
                        staff.job = job.options[job.selectedIndex].value;
                        let user = {"username": document.getElementById("newUsername").value, "password" : document.getElementById("newPassword").value};
                        user.staff = staff;
                        let xmlhttp = new XMLHttpRequest();
                        xmlhttp.open("POST", "/clinic-test/api/user/register", true);
                        xmlhttp.onreadystatechange = function() {
                            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                                userJSON = JSON.parse(xmlhttp.responseText);
                                if (userJSON.username == null) {
                                    document.getElementById("newError").innerHTML = "Username Already Exist";
                                } else {
                                    let info = "<table><tr><th colspan=\"2\">Staff<button type=\"button\" onclick=\"updateRemove(" + userJSON.staff.id + ", '" + userJSON.staff.lastName + "', '" + userJSON.staff.firstName + "')\">Remove</button></th></tr><tr><th>Name</th><td>" + userJSON.staff.lastName + ", " + userJSON.staff.firstName + "</td></tr><tr><th>Date of Birth</th><td>" + userJSON.staff.dateOfBirth + "</td></tr><tr><th>Address</th><td>" + userJSON.staff.address + "</td></tr><tr><th>Phone Number</th><td>" + userJSON.staff.phoneNumber + "</td></tr><tr><th>Job</th><td>" + userJSON.staff.job + "</td></tr></table>";
                                    document.getElementById("info").innerHTML = info;
                                    document.getElementById("newLastName").value = "";
                                    document.getElementById("newFirstName").value = "";
                                    document.getElementById("newDateOfBirth").value = "";
                                    document.getElementById("newAddress").value = "";
                                    document.getElementById("newPhoneNumber").value = "";
                                    document.getElementById("newJob").selectedIndex = 0;
                                    document.getElementById("newUsername").value = "";
                                    document.getElementById("newPassword").value = "";
                                    document.getElementById("newRetypePassword").value = "";
                                    document.getElementById("newError").innerHTML = "&nbsp";
                                    document.getElementById("id01").style.display = "none";
                                }
                            }
                        };
                        xmlhttp.setRequestHeader("Content-Type", "application/json");
                        xmlhttp.send(JSON.stringify(user));
                    }
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