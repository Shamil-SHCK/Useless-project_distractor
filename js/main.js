// --- 1. GET DOM ELEMENTS ---
const setupDiv = document.getElementById('setup');
const timerContainerDiv = document.getElementById('timer-container');
const startBtn = document.getElementById('startBtn');
const minutesInput = document.getElementById('minutes-input');
const countdownDisplay = document.getElementById('countdown');
const messageDisplay = document.getElementById('message');
const alarmSound = document.getElementById('alarm-sound');
const redirectBtn = document.getElementById('redirectBtn'); // Get the new button

// --- 2. GLOBAL VARIABLES ---
let timerInterval;
let totalSeconds;
let originalMinutes;

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
function updateTimer() {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    countdownDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    updateMessage();

    if (totalSeconds <= 0) {
        clearInterval(timerInterval);
        countdownDisplay.textContent = "DONE!";
        messageDisplay.textContent = "Your moment of chaos has arrived.";
        alarmSound.play();
        
        // Show the redirect button instead of opening a window automatically
        redirectBtn.classList.remove('hidden');
    } else {
        totalSeconds--;
    }
}

function updateMessage() {
    const percentageLeft = (totalSeconds / (originalMinutes * 60)) * 100;
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
    window.open(randomUrl, '_blank');
}

function resetUI() {
    timerContainerDiv.classList.add('hidden');
    redirectBtn.classList.add('hidden'); // Also hide the redirect button
    setupDiv.classList.remove('hidden');
    messageDisplay.textContent = "";
}

// --- 4. EVENT LISTENERS ---
startBtn.addEventListener('click', () => {
    originalMinutes = parseInt(minutesInput.value);

    if (isNaN(originalMinutes) || originalMinutes <= 0) {
        alert("Please enter a valid number of minutes.");
        return;
    }

    totalSeconds = originalMinutes * 60;

    setupDiv.classList.add('hidden');
    timerContainerDiv.classList.remove('hidden');

    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
});

// New listener for the redirect button
redirectBtn.addEventListener('click', () => {
    redirectToRandomSite(); // This is now a direct user action and will not be blocked
    resetUI(); // Reset the app after the user claims their distraction
});