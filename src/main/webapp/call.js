callList()

function callList() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/clinic-test/api/queue/today", true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            queueJSON = JSON.parse(xmlhttp.responseText);
            if (queueJSON.length > 0) {
                for (let queue of queueJSON) {
                    if (queue.status == "Waiting") {
                        document.getElementById("call").innerHTML = "Up Next<br>" + queue.patient.lastName + ", " + queue.patient.firstName[0] + "<br><br>";
                        break;
                    }
                }
            } else {
                document.getElementById("call").innerHTML = "Clinic Test";
            }
        }
    };
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send();
}