getInsuranceCompany()

function getInsuranceCompany() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "/clinic-test/api/insurance-company/all", true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            insuranceCompanyJSON = JSON.parse(xmlhttp.responseText);
            let option = "";
            if (insuranceCompanyJSON.length > 0) {
                document.getElementById("newInsuranceCompanyNameLabel").style.display = "none";
                document.getElementById("newInsuranceCompanyName").style.display = "none";
                for (let insuranceCompany of insuranceCompanyJSON) {
                    option += "<option value=\"" + insuranceCompany.id + "\">" + insuranceCompany.name + "</option>";
                }
            }
            document.getElementById("newInsuranceCompany").innerHTML = "<option value=\"\" disabled selected>Select Insurance</option>" + option + "<option>New Insurance Company</option>";
        }
    };
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send();
}

function updateDisplay() {
    if (document.getElementById("newInsuranceCompany").selectedIndex == document.getElementById("newInsuranceCompany").length - 1) {
        document.getElementById("newInsuranceCompanyNameLabel").style.display = "block";
        document.getElementById("newInsuranceCompanyName").style.display = "block";
    } else {
        document.getElementById("newInsuranceCompanyNameLabel").style.display = "none";
        document.getElementById("newInsuranceCompanyName").style.display = "none";
    }
}

function searchInsurance() {
    if (document.getElementById("searchInsurance").value != null && document.getElementById("searchInsurance").value != "") {
        let insurance = {"name" : document.getElementById("searchInsurance").value, "insuranceCompany" : {"name" : document.getElementById("searchInsurance").value}};
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", "/clinic-test/api/insurance/search", true);
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                insuranceJSON = JSON.parse(xmlhttp.responseText);
                if (insuranceJSON.length > 0) {
                    let info = "<table><tr><th>Company</th><th>Insurance</th></tr>";
                    for (let insurance of insuranceJSON) {
                        info += "<tr><td>" + insurance.insuranceCompany.name + "</td><td>" + insurance.name + "</td></tr>";
                    }
                    document.getElementById("info").innerHTML = info + "</table>";
                    document.getElementById("searchInsurance").value = "";
                    document.getElementById("searchError").innerHTML = "&nbsp;";
                } else {
                    document.getElementById("searchError").innerHTML = "No Insurance Company or Insurance Found";
                }
            }
        };
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(JSON.stringify(insurance));
    } else {
        document.getElementById("searchError").innerHTML = "Please Enter Name";
    }
}

function registerInsurance() {
    if (((document.getElementById("newInsuranceCompany").selectedIndex == document.getElementById("newInsuranceCompany").length - 1 && document.getElementById("newInsuranceCompanyName").value != null && document.getElementById("newInsuranceCompanyName").value != "") || document.getElementById("newInsuranceCompany").selectedIndex > 0) && document.getElementById("newInsuranceName").value != null && document.getElementById("newInsuranceName").value != "") {
        let insurance = {};
        if (document.getElementById("newInsuranceCompany").selectedIndex != document.getElementById("newInsuranceCompany").length - 1) {
            let insuranceCompany = document.getElementById("newInsuranceCompany");
            insurance.insuranceCompany = {"id" : insuranceCompany.options[insuranceCompany.selectedIndex].value};
        } else {
            insurance.insuranceCompany = {"name" : document.getElementById("newInsuranceCompanyName").value};
        }
        insurance.name = document.getElementById("newInsuranceName").value;
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", "/clinic-test/api/insurance/register", true);
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                insuranceJSON = JSON.parse(xmlhttp.responseText);
                if (insuranceJSON.length > 0) {
                    let info = "<table><tr><th>Company</th><th>Insurance</th></tr>";
                    for (let insurance of insuranceJSON) {
                        info += "<tr><td>" + insurance.insuranceCompany.name + "</td><td>" + insurance.name + "</td></tr>";
                    }
                    document.getElementById("info").innerHTML = info + "</table>";
                    document.getElementById("newInsuranceName").value = "";
                    document.getElementById("newError").innerHTML = "&nbsp;";
                    document.getElementById("id01").style.display = "none";
                    if (document.getElementById("newInsuranceCompany").selectedIndex != document.getElementById("newInsuranceCompany").length - 1) {
                        document.getElementById("newInsuranceCompany").selectedIndex = 0;
                    } else {
                        document.getElementById("newInsuranceCompany").selectedIndex = 0;
                        document.getElementById("newInsuranceCompanyNameLabel").style.display = "none";
                        document.getElementById("newInsuranceCompanyName").value = "";
                        document.getElementById("newInsuranceCompanyName").style.display = "none";
                        getInsuranceCompany();
                    }
                } else {
                    document.getElementById("newError").innerHTML = "Insurance Already Exist";
                }
            }
        };
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(JSON.stringify(insurance));
    } else {
        document.getElementById("newError").innerHTML = "Please Enter All Fields";
    }
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

function openStaff() {
    window.location.href = "staff.html"
}

function openBackup() {
    window.location.href = "backup.html"
}

