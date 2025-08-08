// --- 1. GET DOM ELEMENTS ---
const setupDiv = document.getElementById('setup');
const timerContainerDiv = document.getElementById('timer-container');
const startBtn = document.getElementById('startBtn');
// Changed to get the new input field
const secondsInput = document.getElementById('seconds-input');
const countdownDisplay = document.getElementById('countdown');
const messageDisplay = document.getElementById('message');
const alarmSound = document.getElementById('alarm-sound');
const redirectBtn = document.getElementById('redirectBtn');

// --- 2. GLOBAL VARIABLES ---
let timerInterval;
let totalSeconds;
// We now track the original seconds for the percentage calculation
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
function updateTimer() {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    countdownDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    updateMessage();

    if (totalSeconds < 0) { // Changed to < 0 to ensure 00:00 is displayed
        clearInterval(timerInterval);
        countdownDisplay.textContent = "DONE!";
        messageDisplay.textContent = "Your moment of chaos has arrived.";
        alarmSound.play();
        
        redirectBtn.classList.remove('hidden');
    } else {
        totalSeconds--;
    }
}

function updateMessage() {
    // Changed logic to use originalSeconds for percentage
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
    window.open(randomUrl, '_blank');
}

function resetUI() {
    timerContainerDiv.classList.add('hidden');
    redirectBtn.classList.add('hidden');
    setupDiv.classList.remove('hidden');
    messageDisplay.textContent = "";
}

// --- 4. EVENT LISTENERS ---
startBtn.addEventListener('click', () => {
    // We now read the value directly as seconds
    originalSeconds = parseInt(secondsInput.value);
    
    // The totalSeconds is now the same as the input value
    totalSeconds = originalSeconds;

    if (isNaN(totalSeconds) || totalSeconds <= 0) {
        alert("Please enter a valid number of seconds.");
        return;
    }

    setupDiv.classList.add('hidden');
    timerContainerDiv.classList.remove('hidden');

    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
});

redirectBtn.addEventListener('click', () => {
    redirectToRandomSite();
    resetUI();
});