var insuranceJSON;
var doctorJSON;

getInsurance();

function getInsurance() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "/clinic-test/api/insurance/all", true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            insuranceJSON = JSON.parse(xmlhttp.responseText);
            let insuranceOption = "";
            for (let insurance of insuranceJSON) {
                insuranceOption += "<option value=\"" + insurance.insuranceCompany.name + " - " + insurance.name + "\">" + insurance.insuranceCompany.name + " - " + insurance.name + "</option>";
            }
            document.getElementById("insurance").innerHTML = insuranceOption;
            getDoctor();
        }
    };
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send();
}

function getDoctor() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "/clinic-test/api/staff/all", true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            doctorJSON = JSON.parse(xmlhttp.responseText);
            let doctorOption = "";
            for (let doctor of doctorJSON) {
                if (doctor.job == "Doctor") {
                    doctorOption += "<option value=\"Dr. " + doctor.lastName + ", " + doctor.firstName + "\">Dr. " + doctor.lastName + ", " + doctor.firstName + "</option>";
                }
            }
            document.getElementById("doctor").innerHTML = doctorOption;
        }
    };
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send();
}

function registerPatient() {
    let lastName = document.getElementById("lastName").value;
    let firstName = document.getElementById("firstName").value;
    let insuranceIndex = document.getElementById("insurance").selectedIndex;
    let insurance = insuranceJSON[insuranceIndex];
    let insuranceNumber = document.getElementById("insuranceNumber").value;
    let doctorIndex = document.getElementById("doctor").selectedIndex;
    let doctor = doctorJSON[doctorIndex];
    if (lastName != null && lastName != "" && firstName != null && firstName != "" && insurance != null && insurance != "" && insuranceNumber != null && insuranceNumber != "" && doctor != null && doctor != "") {
        let patient = {"lastName" : lastName, "firstName" : firstName, "insurance" : insurance, "insuranceNumber" : insuranceNumber, "doctor" : doctor};
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", "/clinic-test/api/patient/register", true);
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                let patientJSON = JSON.parse(xmlhttp.responseText);
                if (patientJSON.lastName == null && patientJSON.firstName == null) {
                    alert("Patient already exist");
                } else if (patientJSON.insuranceNumber == null) {
                    alert("Insurance number already exist");
                } else {
                    document.getElementById("lastName").value = "";
                    document.getElementById("firstName").value = "";
                    insurance = document.getElementById("insurance");
                    insurance.value = insurance.options[0].value;
                    document.getElementById("insuranceNumber").value = "";
                    doctor = document.getElementById("doctor");
                    doctor.value = doctor.options[0].value;
                    alert("Registration successful");
                }
            }
        };
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(JSON.stringify(patient));
    } else {
        alert("Please enter all fields");
    }
}