let isAlarmActive = false;
let sensitivity = 15;
let previousX = 0, previousY = 0, previousZ = 0;

document.getElementById("activateBtn").addEventListener("click", () => {
    isAlarmActive = true;
    document.getElementById("status").innerText = "Alarm is active!";
    document.getElementById("activateBtn").style.display = "none";
    document.getElementById("deactivateBtn").style.display = "inline-block";
});

document.getElementById("deactivateBtn").addEventListener("click", () => {
    let password = prompt("Enter Password to Stop Alarm:");
    if (password === "1234") { // Change this to a secure password system
        isAlarmActive = false;
        document.getElementById("alarmSound").pause();
        document.getElementById("alarmSound").currentTime = 0;
        document.getElementById("status").innerText = "Alarm Deactivated.";
        document.getElementById("activateBtn").style.display = "inline-block";
        document.getElementById("deactivateBtn").style.display = "none";
    } else {
        alert("Wrong Password!");
    }
});

window.addEventListener("devicemotion", (event) => {
    if (!isAlarmActive) return;

    let x = event.acceleration.x || 0;
    let y = event.acceleration.y || 0;
    let z = event.acceleration.z || 0;

    let diffX = Math.abs(x - previousX);
    let diffY = Math.abs(y - previousY);
    let diffZ = Math.abs(z - previousZ);

    if (diffX > sensitivity || diffY > sensitivity || diffZ > sensitivity) {
        document.getElementById("alarmSound").play();
    }

    previousX = x;
    previousY = y;
    previousZ = z;
});