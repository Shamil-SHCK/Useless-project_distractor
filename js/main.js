// --- 1. GET DOM ELEMENTS ---
const setupDiv = document.getElementById('setup');
const timerContainerDiv = document.getElementById('timer-container');
const startBtn = document.getElementById('startBtn');
const minutesInput = document.getElementById('minutes-input');
const countdownDisplay = document.getElementById('countdown');
const messageDisplay = document.getElementById('message');
const alarmSound = document.getElementById('alarm-sound');

// --- 2. GLOBAL VARIABLES ---
let timerInterval; // Will hold the setInterval function
let totalSeconds;
let originalMinutes;

// The heart of the sabotage! Using the new list of sites.
const distractionUrls = [
    'https://www.youtube.com/shorts/axhb24mTWoY',
    'https://www.instagram.com',
    'https://www.spotify.com',
    'https://www.reddit.com',
    'https://x.com/fabrizioromano'
];

// --- 3. TIMER LOGIC ---
function updateTimer() {
    // Calculate minutes and seconds from totalSeconds
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    // Format time with leading zeros
    countdownDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    // Update motivational message based on progress
    updateMessage();

    // Check if the timer has finished
    if (totalSeconds <= 0) {
        clearInterval(timerInterval);
        countdownDisplay.textContent = "STOP!";
        alarmSound.play();
        
        // Open a random distracting website
        redirectToRandomSite();

        // Reset the UI after a short delay
        setTimeout(resetUI, 2000);
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
    // Switch visibility back to the setup screen
    timerContainerDiv.classList.add('hidden');
    setupDiv.classList.remove('hidden');
    messageDisplay.textContent = ""; // Clear the message
}

// --- 4. EVENT LISTENER ---
startBtn.addEventListener('click', () => {
    originalMinutes = parseInt(minutesInput.value);

    // Basic validation
    if (isNaN(originalMinutes) || originalMinutes <= 0) {
        alert("Please enter a valid number of minutes.");
        return;
    }

    totalSeconds = originalMinutes * 60;

    // Switch UI visibility
    setupDiv.classList.add('hidden');
    timerContainerDiv.classList.remove('hidden');

    // Start the countdown
    updateTimer(); // Call once immediately to show the initial time
    timerInterval = setInterval(updateTimer, 1000);
});