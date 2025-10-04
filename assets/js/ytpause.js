// 1. Array to hold player objects
var players = {};

// 2. Load the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function is automatically called when the API is ready.
function onYouTubeIframeAPIReady() {
    players['player1'] = new YT.Player('player1', {});
    players['player2'] = new YT.Player('player2', {});
}

// 4. Function to pause all embedded videos
function pauseAllVideos() {
    for (var id in players) {
        if (players.hasOwnProperty(id)) {
            // Player state 1 is 'playing', so only pause if it's currently playing
            if (players[id].getPlayerState() === 1) {
                players[id].pauseVideo();
            }
        }
    }
}

// 5. Connect to your navigation logic
// (This is an example and depends on how your SPA navigation works)
// You would call 'pauseAllVideos()' right before hiding the 'Media' article.
// Example for a simple click event:
// document.getElementById('home-link').addEventListener('click', pauseAllVideos);