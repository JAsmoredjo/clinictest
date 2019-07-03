function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    if (username != null && username != "" && password != null && password != "") {
        let user = {"username" : username, "password" : password};
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", "/clinic-test/api/user/login", true);
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                let userJSON = JSON.parse(xmlhttp.responseText);
                if (userJSON.username == username && userJSON.password == password) {
                    document.getElementById("loginError").innerHTML = "<br>";
                    if (userJSON.staff.job == "Doctor") {
                        window.location.href = "main-menu.html";
                    } else {
                        window.location.href = "waiting-list.html";
                    }
                } else {
                    document.getElementById("loginError").innerHTML = "Invalid Username/Password";
                }
            }
        };
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(JSON.stringify(user));
    } else {
        document.getElementById("loginError").innerHTML = "Please enter your username and password";
    }
}