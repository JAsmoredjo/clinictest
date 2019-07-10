function registerUser() {
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
    let job = "";
    if (document.getElementById("doctor").checked) {
        job = "Doctor";
    } else {
        job = "Nurse";
    }
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let retypePassword = document.getElementById("retypePassword").value;
    if (lastName != null && lastName != "" && firstName != null && firstName != "" && dateOfBirth != null && dateOfBirth != "" && address != null && address != "" && phoneNumber != null && phoneNumber != "" && job != null && job != "" && username != null && username != "" && password != null && password != "" && retypePassword != null && retypePassword != "") {
        if (password == retypePassword) {
            let user = {"username" : username, "password" : password, "staff" : {"lastName" : lastName, "firstName" : firstName, "dateOfBirth" : dateOfBirth, "address" : address, "phoneNumber" : phoneNumber, "job" : job}};
            let xmlhttp = new XMLHttpRequest();
            xmlhttp.open("POST", "/test/api/user/register", true);
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    let userJSON = JSON.parse(xmlhttp.responseText);
                    if (userJSON.username == null) {
                        alert("Username already exist");
                    } else if (userJSON.staff == null) {
                        alert("Staff member already exist");
                    } else {
                        document.getElementById("lastName").value = "";
                        document.getElementById("firstName").value = "";
                        document.getElementById("dateOfBirth").value = "";
                        document.getElementById("address").value = "";
                        document.getElementById("phoneNumber").value = "";
                        document.getElementById("username").value = "";
                        document.getElementById("password").value = "";
                        document.getElementById("retypePassword").value = "";
                        alert("Registration successful");
                    }
                }
            };
            xmlhttp.setRequestHeader("Content-Type", "application/json");
            xmlhttp.send(JSON.stringify(user));
        } else {
            alert("Retype password doesn't match password");
        }
    } else {
        alert("Please enter all fields");
    }
}