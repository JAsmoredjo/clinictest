callList()

function callList() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/test/api/queue/today", true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            queueJSON = JSON.parse(xmlhttp.responseText);
            let call = "";
            for (let queue of queueJSON) {
                if (queueJSON.indexOf(queue) == 0) {
                    call += queue.patient.lastName + ", " + queue.patient.firstName[0] + "<br><br>";
                } else {
                    call += queue.patient.lastName + ", " + queue.patient.firstName[0] + "<br>";
                }
            }
            document.getElementById("call").innerHTML = call;
        }
    };
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send();
}