function searchPatient() {
    document.getElementById("patientInfo").innerHTML = "";
    let insuranceNumber = document.getElementById("insuranceNumber").value;
    if (insuranceNumber != null && insuranceNumber != "") {
        let patient = {"insuranceNumber" : insuranceNumber};
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", "/clinic-test/api/patient/search", true);
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                let patientJSON = JSON.parse(xmlhttp.responseText);
                if (patientJSON.id != 0) {
                    document.getElementById("patientInfo").innerHTML = "Name: " + patientJSON.lastName + ", " + patientJSON.firstName + "<br>Insurance: " + patientJSON.insurance.insuranceCompany.name + " - " + patientJSON.insurance.name + "<br>Insurance Number: " + patientJSON.insuranceNumber + "<br>Doctor: Dr. " + patientJSON.doctor.lastName + ", " + patientJSON.doctor.firstName;
                } else {
                    document.getElementById("patientInfo").innerHTML = "No patient found";
                }
            }
        };
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(JSON.stringify(patient));
    } else {
        document.getElementById("patientInfo").innerHTML = "Please enter insurance number";
    }
}