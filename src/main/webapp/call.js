var access;

function callList() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/clinic-test/api/user/verify", true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            userJSON = JSON.parse(xmlhttp.responseText);
            if (userJSON.access = access) {
                let xmlhttp = new XMLHttpRequest();
                xmlhttp.open("POST", "/clinic-test/api/queue/today", true);
                xmlhttp.onreadystatechange = function() {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        queueJSON = JSON.parse(xmlhttp.responseText);
                        if (queueJSON.length > 0) {
                            for (let queue of queueJSON) {
                                if (queue.status == "Waiting") {
                                    document.getElementById("next").style.display = "block";
                                    document.getElementById("call").innerHTML = queue.patient.lastName + ", " + queue.patient.firstName[0] + "<br><br>";
                                    break;
                                }
                            }
                        } else {
                            document.getElementById("next").style.display = "none";
                            document.getElementById("call").innerHTML = "";
                        }
                    }
                };
                xmlhttp.setRequestHeader("Content-Type", "application/json");
                xmlhttp.send();
            } else {
                window.location.reload();
            }
        }
    };
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify({"access" : access}));
}