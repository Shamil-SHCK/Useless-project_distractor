// 1. Create an array of the destination URLs.
const distractionUrls = [
    'https://www.youtube.com',
    'https://www.instagram.com',
    'https://www.facebook.com',
    'https://www.spotify.com',
    'https://www.pinterest.com',
    'https://www.reddit.com',
    'https://www.x.com' // Formerly Twitter
];

/**
 * Picks a random URL from the array and opens it in a new browser tab.
 */
function redirectToRandomSite() {
    // 2. Pick a random index from the array.
    // Math.random() gives a number between 0 and 1.
    // We multiply by the array length and use Math.floor() to get a whole number index.
    const randomIndex = Math.floor(Math.random() * distractionUrls.length);

    // Get the URL at that random index.
    const randomUrl = distractionUrls[randomIndex];

    // Optional: Log the chosen URL to the console for debugging.
    console.log(`Redirecting to: ${randomUrl}`);

    // 3. Open the chosen URL in a new tab.
    // The '_blank' parameter is what tells the browser to open a new tab.
    window.open(randomUrl, '_blank');
}