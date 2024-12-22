// Storing variables
const bird = document.querySelector(".bird");
const gameContainer = document.querySelector(".game-container");
const gameHeight = gameContainer.offsetHeight;

let birdBottom = 280; // Starting position of the bird in pixels
let gravity = 4; // Gravity effect, in pixels
let isGameRunning = false; // To ensure the game starts only once

// Game start function
function startGAME() {
  if (!isGameRunning) { // Start the game only once
    isGameRunning = true;
    setInterval(gravityPull, 100); // Calls gravityPull every 100ms
  }
}

// Gravity function
function gravityPull() {
  birdBottom -= gravity; // Decrease bird's bottom position
  if (birdBottom >= 0) { // Prevent the bird from going below 0
    bird.style.bottom = birdBottom + "px"; // Update the style dynamically
  } else {
    birdBottom = 0; // Keep the bird at ground level
  }
}

function fly() {
    
  if(birdBottom + 98  < gameHeight) {
    birdBottom += 30;
    bird.style.bottom = birdBottom + 'px';
  }
  else{
    birdBottom = gameHeight - 98;
    bird.style.bottom = birdBottom
  }
  console.log(birdBottom)
}

// Initialize bird's position on page load
bird.style.bottom = birdBottom + "px";

// Event listener
document.addEventListener("click", startGAME);
document.addEventListener("click", fly);