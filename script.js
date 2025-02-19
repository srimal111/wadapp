let isMonitoring = false;
const alertSound = document.getElementById('alertSound');
const statusText = document.getElementById('status');

document.getElementById('startButton').addEventListener('click', () => {
    isMonitoring = !isMonitoring;
    if (isMonitoring) {
        startMonitoring();
        statusText.textContent = "Monitoring is on";
    } else {
        stopMonitoring();
        statusText.textContent = "Monitoring is off";
    }
});

function startMonitoring() {
    window.addEventListener('deviceorientation', handleMotion);
}

function stopMonitoring() {
    window.removeEventListener('deviceorientation', handleMotion);
}

function handleMotion(event) {
    const x = event.beta; // Tilt left/right
    const y = event.gamma; // Tilt front/back

    // Check for significant movement
    if (Math.abs(x) > 10 || Math.abs(y) > 10) {
        if (!alertSound.paused) {
            alertSound.currentTime = 0; // Reset sound to start
        }
        alertSound.play();
    }
}
