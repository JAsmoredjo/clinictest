var insuranceJSON;
var doctorJSON;

getInsurance();

function getInsurance() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "/test/api/insurance/all", true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            insuranceJSON = JSON.parse(xmlhttp.responseText);
            let insuranceOption = "";
            for (let insurance of insuranceJSON) {
                insuranceOption += "<option value=\"" + insurance.insuranceCompany.name + " - " + insurance.name + "\">" + insurance.insuranceCompany.name + " - " + insurance.name + "</option>";
            }
            document.getElementById("insurance").innerHTML = insuranceOption;
        }
    };
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send();
}

function registerPatient() {
    let lastName = document.getElementById("lastName").value;
    let firstName = document.getElementById("firstName").value;
    let dateOfBirth = document.getElementById("dateOfBirth").value;
    dateOfBirth = dateOfBirth.split("-")
    if (dateOfBirth.length == 3) {
        dateOfBirth = dateOfBirth[2] + "-" + dateOfBirth[1] + "-" + dateOfBirth[0]
    } else {
        dateOfBirth = ""
    }
    let address = document.getElementById("address").value;
    let phoneNumber = document.getElementById("phoneNumber").value;
    let insuranceIndex = document.getElementById("insurance").selectedIndex;
    let insurance = insuranceJSON[insuranceIndex];
    let insuranceNumber = document.getElementById("insuranceNumber").value;
    if (lastName != null && lastName != "" && firstName != null && firstName != "" && dateOfBirth != null && dateOfBirth != "" && address != null && address != "" && phoneNumber != null && phoneNumber != "" && insurance != null && insurance != "" && insuranceNumber != null && insuranceNumber != "") {
        let patient = {"lastName" : lastName, "firstName" : firstName, "dateOfBirth" : dateOfBirth, "address" : address, "phoneNumber" : phoneNumber, "insurance" : insurance, "insuranceNumber" : insuranceNumber};
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", "/test/api/patient/register", true);
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
                    document.getElementById("dateOfBirth").value = "";
                    document.getElementById("address").value = "";
                    document.getElementById("phoneNumber").value = "";
                    insurance = document.getElementById("insurance");
                    insurance.value = insurance.options[0].value;
                    document.getElementById("insuranceNumber").value = "";
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