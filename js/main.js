// --- 1. GET DOM ELEMENTS ---
const setupDiv = document.getElementById('setup');
const timerContainerDiv = document.getElementById('timer-container');
const startBtn = document.getElementById('startBtn');
const secondsInput = document.getElementById('seconds-input');
const countdownDisplay = document.getElementById('countdown');
const messageDisplay = document.getElementById('message');
const alarmSound = document.getElementById('alarm-sound');
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

// Timer logic for durations > 20 seconds
function complexUpdateTimer() {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    countdownDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    updateMessage();

    const elapsedSeconds = originalSeconds - totalSeconds;
    // Check for periodic redirect
    if (elapsedSeconds > 0 && elapsedSeconds % 20 === 0) {
        clearInterval(timerInterval); // Stop the timer
        triggerFinalRedirect(); // Fire the redirect sequence
        return; // Exit the function
    }

    // Check for final redirect if no periodic redirect happened
    if (totalSeconds < 0) {
        clearInterval(timerInterval);
        triggerFinalRedirect();
    } else {
        totalSeconds--;
    }
}

// Timer logic for durations <= 20 seconds
function simpleUpdateTimer() {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    countdownDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    updateMessage();

    if (totalSeconds < 0) {
        clearInterval(timerInterval);
        triggerFinalRedirect();
    } else {
        totalSeconds--;
    }
}

// Shows the final message, then redirects the page.
function triggerFinalRedirect() {
    timerContainerDiv.classList.add('hidden');
    distractionMessage.classList.remove('hidden');
    alarmSound.play();

    // Wait 2.5 seconds before redirecting
    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * distractionUrls.length);
        const randomUrl = distractionUrls[randomIndex];
        window.location.href = randomUrl;
    }, 100);
}


function updateMessage() {
    const percentageLeft = (totalSeconds / originalSeconds) * 100;
    if (percentageLeft > 66) {
        messageDisplay.textContent = "You're doing great. Total concentration.";
    } else if (percentageLeft > 10) {
        messageDisplay.textContent = "Is that social media calling your name? Lets enjoy it .";
    } else {
        messageDisplay.textContent = "Almost there. Prepare for... your Failure.";
    }
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

    // Split the logic based on the initial duration
    if (originalSeconds > 30){
        // Use the complex logic for long timers
        complexUpdateTimer(); // Call once immediately
        timerInterval = setInterval(complexUpdateTimer, 1000);
    } else {
        // Use the simple logic for short timers
        simpleUpdateTimer(); // Call once immediately
        timerInterval = setInterval(simpleUpdateTimer, 1000);
    }
});