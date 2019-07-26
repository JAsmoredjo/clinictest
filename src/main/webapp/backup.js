function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className == "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

function openWaitingList() {
    win = window.open("", "parent");
    if (win.location.href.indexOf("waiting-list.html") != -1) {
        win.focus();
    } else {
        win.location.href = "waiting-list.html";
        win.focus();
    }
}

function openPatient() {
    window.location.href = "patient.html"
}

function openReport() {
    window.location.href = "report.html"
}

function openInsurance() {
    window.location.href = "insurance.html"
}

function openStaff() {
    window.location.href = "staff.html"
}

function logout() {
    win = window.open("", "parent");
    if (win.location.href.indexOf("waiting-list.html") != -1) {
        win.focus();
        window.close();
        win.logout();
    } else {
        win.location.href = "waiting-list.html";
        win.focus();
        window.close();
        win.logout();
    }
}