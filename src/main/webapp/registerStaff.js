function registerUser() {
    let lastName = document.getElementById("lastName").value;
    let firstName = document.getElementById("firstName").value;
    let job = "";
    let status = "";
    if (document.getElementById("doctor").checked) {
        job = "Doctor";
        status = "Free";
    } else {
        job = "Nurse";
        status = "N/A";
    }
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let retypePassword = document.getElementById("retypePassword").value;
    if (lastName != null && lastName != "" && firstName != null && firstName != "" && job != null && job != "" && username != null && username != "" && password != null && password != "" && retypePassword != null && retypePassword != "") {
        if (password == retypePassword) {
            let user = {"username" : username, "password" : password, "staff" : {"lastName" : lastName, "firstName" : firstName, "job" : job, "status" : status}};
            let xmlhttp = new XMLHttpRequest();
            xmlhttp.open("POST", "/clinic-test/api/user/register", true);
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