const API = "http://localhost:5000";

// Register
function register() {
  fetch(API + "/register", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      email: regEmail.value,
      password: regPassword.value
    })
  }).then(res => res.text())
    .then(data => alert(data));
}

// Login
function login() {
  fetch(API + "/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      email: email.value,
      password: password.value
    })
  }).then(res => res.text())
    .then(data => alert(data));
}

// Mark Attendance
function markAttendance() {
  fetch(API + "/mark-attendance", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      email: markEmail.value,
      present: status.value === "true"
    })
  }).then(res => res.text())
    .then(data => alert(data));
}

// Get Attendance
function getAttendance() {
  fetch(API + "/attendance/" + studentEmail.value)
    .then(res => res.json())
    .then(data => {
      let percent = data.percentage.toFixed(2);
      let result = document.getElementById("result");

      result.innerText = "Attendance: " + percent + "%";

      if (percent < 75) {
        result.className = "red";
        alert("Warning: Attendance below 75%");
      } else {
        result.className = "green";
      }
    });
}