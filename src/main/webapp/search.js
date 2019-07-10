function searchPatient() {
    let insuranceNumber = document.getElementById("insuranceNumber").value;
    if (insuranceNumber != null && insuranceNumber != "") {
        let patient = {"insuranceNumber" : insuranceNumber};
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", "/test/api/patient/search", true);
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                patientJSON = JSON.parse(xmlhttp.responseText);
                let info = "Name: " + patientJSON.lastName + ", " + patientJSON.firstName + "<br>Date of Birth: " + patientJSON.dateOfBirth + "<br>Address: " + patientJSON.address + "<br>Phone Number: " + patientJSON.phoneNumber + "<br>Insurance: " + patientJSON.insurance.insuranceCompany.name + " - " + patientJSON.insurance.name;
                document.getElementById("info").innerHTML = info;
                let visitTable = "";
                if (patientJSON.visits.length > 0) {
                    for (let visit of patientJSON.visits) {
                        visitTable = "<tr><td>" + visit.date.dayOfMonth + "-" + visit.date.monthValue + "-" + visit.date.year + "</td><td>" + visit.anamnesis + "</tr>" + visitTable;
                    }
                    visitTable = "<button type=\"button\" onclick=\"addAnamnesis('" + patientJSON.insuranceNumber + "')\">Add Anamnesis</button><br><table><tr><th>Date</th><th>Anamnesis</th></tr>" + visitTable;
                } else {
                    visitTable += "<button type=\"button\" onclick=\"addAnamnesis('" + patientJSON.insuranceNumber + "')\">Add Anamnesis</button><br>";
                }
                document.getElementById("visitTable").innerHTML = visitTable;
            }
        };
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(JSON.stringify(patient));
    } else {
        alert("Please enter insurance number");
    }
}

function addAnamnesis(insuranceNumber) {
    let anamnesis = prompt("Enter anamnesis")
    if (anamnesis != null && anamnesis != "") {
        let patient = {"insuranceNumber" : insuranceNumber, "visits" : [{"anamnesis" : anamnesis}]};
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", "/test/api/patient/visit", true);
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                patientJSON = JSON.parse(xmlhttp.responseText);
                let info = "Name: " + patientJSON.lastName + ", " + patientJSON.firstName + "<br>Date of Birth: " + patientJSON.dateOfBirth + "<br>Address: " + patientJSON.address + "<br>Phone Number: " + patientJSON.phoneNumber + "<br>Insurance: " + patientJSON.insurance.insuranceCompany.name + " - " + patientJSON.insurance.name;
                document.getElementById("info").innerHTML = info;
                let visitTable = "";
                if (patientJSON.visits.length > 0) {
                    for (let visit of patientJSON.visits) {
                        visitTable = "<tr><td>" + visit.date.dayOfMonth + "-" + visit.date.monthValue + "-" + visit.date.year + "</td><td>" + visit.anamnesis + "</tr>" + visitTable;
                    }
                    visitTable = "<button type=\"button\" onclick=\"addAnamnesis('" + patientJSON.insuranceNumber + "')\">Add Anamnesis</button><br><table><tr><th>Date</th><th>Anamnesis</th></tr>" + visitTable;
                }
                document.getElementById("visitTable").innerHTML = visitTable;
            }
        };
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(JSON.stringify(patient));
    }
}