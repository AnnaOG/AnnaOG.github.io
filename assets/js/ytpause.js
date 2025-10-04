// A global object to hold references to the YouTube player instances.
var players = {}; 

// 1. Load the YouTube IFrame Player API script asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 2. The API will call this function when the script is ready.
// It initializes the player objects for the two videos.
function onYouTubeIframeAPIReady() {
    // These IDs match the 'id="player1"' and 'id="player2"' in your HTML
    players['player1'] = new YT.Player('player1', {});
    players['player2'] = new YT.Player('player2', {});
}

// 3. The main function to pause all videos.
function pauseAllVideos() {
    for (var id in players) {
        if (players.hasOwnProperty(id)) {
            var player = players[id];
            
            // Check if the player exists and is currently playing (state code 1)
            if (player && player.getPlayerState && player.getPlayerState() === 1) {
                player.pauseVideo();
            }
        }
    }
}

// 4. Use a MutationObserver to reliably detect when the article is hidden.
document.addEventListener('DOMContentLoaded', function() {
    // Get a reference to the media article element
    const mediaArticle = document.getElementById('media');
    
    if (mediaArticle) {
        // Create an observer instance
        const observer = new MutationObserver(function(mutationsList, observer) {
            for(const mutation of mutationsList) {
                // We are only interested in changes to the 'class' attribute
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    
                    // In this template, navigating away removes the 'active' class.
                    // If the 'active' class is NOT present, the article is hidden, so we pause.
                    if (!mediaArticle.classList.contains('active')) {
                        pauseAllVideos();
                    }
                }
            }
        });

        // Start observing the target element for changes to its attributes (specifically the 'class')
        const config = { attributes: true, attributeFilter: ['class'] };
        observer.observe(mediaArticle, config);
    }
});