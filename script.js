let startTime, elapsedTime = 0, timerInterval;
let isRunning = false;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('laps');

function startStopwatch() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTime, 10);
    isRunning = true;
    startStopBtn.textContent = 'Pause';
}

function stopStopwatch() {
    clearInterval(timerInterval);
    isRunning = false;
    startStopBtn.textContent = 'Start';
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    display.textContent = `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
}

function pad(number) {
    return number.toString().padStart(2, '0');
}

startStopBtn.addEventListener('click', () => {
    if (isRunning) {
        stopStopwatch();
    } else {
        startStopwatch();
    }
});

resetBtn.addEventListener('click', () => {
    stopStopwatch();
    elapsedTime = 0;
    display.textContent = '00:00:00';
    lapsList.innerHTML = '';
});

lapBtn.addEventListener('click', () => {
    if (isRunning) {
        const lapTime = display.textContent;
        const lapItem = document.createElement('li');
        lapItem.textContent = lapTime;
        lapsList.appendChild(lapItem);
    }
});
