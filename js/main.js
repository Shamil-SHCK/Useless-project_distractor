// --- 1. GET DOM ELEMENTS ---
const setupDiv = document.getElementById('setup');
const timerContainerDiv = document.getElementById('timer-container');
const startBtn = document.getElementById('startBtn');
const secondsInput = document.getElementById('seconds-input');
const countdownDisplay = document.getElementById('countdown');
const messageDisplay = document.getElementById('message');
const alarmSound = document.getElementById('alarm-sound');
// Get the new distraction message element
const distractionMessage = document.getElementById('distraction-message');

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

// This function will run for all timers
function updateTimer() {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    countdownDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    // For long timers, check for periodic distraction
    if (originalSeconds > 20) {
        const elapsedSeconds = originalSeconds - totalSeconds;
        if (elapsedSeconds > 0 && elapsedSeconds % 20 === 0) {
            flashDistractionMessage();
        }
    }

    // Check if the main timer has finished
    if (totalSeconds < 0) {
        clearInterval(timerInterval);
        triggerFinalRedirect();
    } else {
        totalSeconds--;
    }
}

// Shows the message temporarily, then hides it.
function flashDistractionMessage() {
    alarmSound.play();
    distractionMessage.classList.remove('hidden');
    // Hide the message again after 2 seconds
    setTimeout(() => {
        distractionMessage.classList.add('hidden');
    }, 2000);
}

// Shows the message permanently, then redirects the page.
function triggerFinalRedirect() {
    // Hide the timer UI and show the message
    timerContainerDiv.classList.add('hidden');
    distractionMessage.classList.remove('hidden');
    alarmSound.play();

    // Wait 2.5 seconds before redirecting
    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * distractionUrls.length);
        const randomUrl = distractionUrls[randomIndex];
        window.location.href = randomUrl;
    }, 2500);
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

    // Start the single, unified timer
    updateTimer(); // Call once immediately
    timerInterval = setInterval(updateTimer, 1000);
});