getInfo()

function getInfo() {
    let patient = {"doctor" : {"firstName" : "Jarrad", "lastName" : "Hoffman"}};
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/clinic-test/api/patient/info", true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            patientJSON = JSON.parse(xmlhttp.responseText);
            if (patientJSON.length > 0) {
                let info = "";
                for (let patient of patientJSON) {
                    info += "Name: " + patient.lastName + ", " + patient.firstName +
                    "<br>Insurance: " + patient.insurance.insuranceCompany.name + " - " + patient.insurance.name +
                    "<br>Insurance Number: " + patient.insuranceNumber +
                    "<br>Visit:";
                    if (patient.visits.length > 0) {
                        info += "<ul>"
                        for (let visit of patient.visits) {
                            info += "<li>Date: " + visit.date.dayOfMonth + "-" + visit.date.monthValue + "-" + visit.date.year +
                            "<br>Service: " + visit.service.name +
                            "<br>Comment: " + visit.comment + "</li>";
                        }
                        info += "</ul>";
                    }
                    info += "<br><br>";
                }
                document.getElementById("info").innerHTML = info;
            } else {
                alert("No patients in queue")
            }
        }
    };
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify(patient));
}