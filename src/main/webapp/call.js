var tickets;

callList()

function callList() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/clinic-test/api/queue/call", true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            queueJSON = JSON.parse(xmlhttp.responseText);
            for (let queue of queueJSON) {
                if (tickets == undefined) {
                    tickets = [{id : [queue.id], ticket : queue.ticket, patients : [queue.patient], status : queue.status}]
                } else {
                    let newTicket = true;
                    let ticketIndex = 0;
                    for (let ticket of tickets) {
                        if (ticket.ticket == queue.ticket) {
                            newTicket = false;
                            ticketIndex = tickets.indexOf(ticket);
                            break;
                        }
                    }
                    if (newTicket) {
                        tickets.push({id : [queue.id], ticket : queue.ticket, patients : [queue.patient], status : queue.status});
                    } else {
                        tickets[ticketIndex].id.push(queue.id);
                        tickets[ticketIndex].patients.push(queue.patient);
                    }
                }
            }
            let call = "";
            if (tickets.length > 0) {
                for (let ticket of tickets) {
                    call += "Ticket #" + ticket.ticket + " please go to Dr. " + ticket.patients[0].doctor.lastName + ", " + ticket.patients[0].doctor.firstName[0] + ".<br>";
                }
            } else {
                call += "Clinic Test";
            }
            document.getElementById("call").innerHTML = call;
        }
    };
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send();
}