// --- 1. GET DOM ELEMENTS ---
const setupDiv = document.getElementById('setup');
const timerContainerDiv = document.getElementById('timer-container');
const startBtn = document.getElementById('startBtn');
const secondsInput = document.getElementById('seconds-input');
const countdownDisplay = document.getElementById('countdown');
const messageDisplay = document.getElementById('message');
const alarmSound = document.getElementById('alarm-sound');

// --- 2. GLOBAL VARIABLES ---
let timerInterval;
let totalSeconds;
let originalSeconds; 

const distractionUrls = [
    'https://www.youtube.com',
    'https://www.instagram.com',
    'https://www.facebook.com',
    'https://www.spotify.com',
    'https://www.pinterest.com',
    'https://www.reddit.com',
    'https://www.x.com'
];

// --- 3. CORE FUNCTIONS ---

// This function will run for timers 20 seconds or less
function simpleUpdateTimer() {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    countdownDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    updateMessage();

    if (totalSeconds < 0) {
        clearInterval(timerInterval);
        alarmSound.play();
        redirectToRandomSite(); 
    } else {
        totalSeconds--;
    }
}

// This function will run for timers longer than 20 seconds
function complexUpdateTimer() {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    countdownDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    updateMessage();

    // Check if 20 seconds have passed
    const elapsedSeconds = originalSeconds - totalSeconds;
    if (elapsedSeconds > 0 && elapsedSeconds % 20 === 0) {
        // Play sound and redirect every 20 seconds
        alarmSound.play();
        redirectToRandomSite();
    }

    if (totalSeconds < 0) {
        // When the main timer is done, just stop it.
        clearInterval(timerInterval);
        countdownDisplay.textContent = "DONE!";
    } else {
        totalSeconds--;
    }
}


function updateMessage() {
    const percentageLeft = (totalSeconds / originalSeconds) * 100;
    if (percentageLeft > 66) {
        messageDisplay.textContent = "You're doing great. Total concentration.";
    } else if (percentageLeft > 10) {
        messageDisplay.textContent = "Is that social media calling your name? Ignore it.";
    } else {
        messageDisplay.textContent = "Almost there. Prepare for... your reward.";
    }
}

function redirectToRandomSite() {
    const randomIndex = Math.floor(Math.random() * distractionUrls.length);
    const randomUrl = distractionUrls[randomIndex];
    window.location.href = randomUrl;
}

// --- 4. EVENT LISTENER ---
startBtn.addEventListener('click', () => {
    originalSeconds = parseInt(secondsInput.value);
    totalSeconds = originalSeconds;

    if (isNaN(totalSeconds) || totalSeconds <= 0) {
        alert("Please enter a valid number of seconds.");
        return;
    }

    setupDiv.classList.add('hidden');
    timerContainerDiv.classList.remove('hidden');

    // --- KEY CHANGE: Logic splits here ---
    if (originalSeconds > 20) {
        // Use the complex logic for timers > 20s
        updateTimer(complexUpdateTimer); // Initial call
        timerInterval = setInterval(complexUpdateTimer, 1000);
    } else {
        // Use the simple logic for timers <= 20s
        updateTimer(simpleUpdateTimer); // Initial call
        timerInterval = setInterval(simpleUpdateTimer, 1000);
    }
});

// A helper function to call the correct updater immediately
function updateTimer(updaterFunction) {
    updaterFunction();
}