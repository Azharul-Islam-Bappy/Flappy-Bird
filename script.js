// Storing variables
const bird = document.querySelector(".bird");
const gameContainer = document.querySelector(".game-container");
const gameHeight = gameContainer.offsetHeight;
const gameWidth = gameContainer.offsetWidth;

let birdBottom = 280; // Starting position of the bird in pixels
let gravity = 4; // Gravity effect, in pixels
let isGameRunning = false; // To ensure the game starts only once

// Game start function
function startGAME() {
  if (!isGameRunning) { // Start the game only once
    isGameRunning = true;
    setInterval(gravityPull, 100); // Calls gravityPull every 100ms
    setInterval(generateObstacle, 3000);
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

function generateObstacle () {
  const obstacle = document.createElement("div");
  const obstacleTop = document.createElement("div");
  
  // adding class name
  obstacleTop.classList.add("obstacleTop");
  obstacle.classList.add("obstacle");
  
  gameContainer.appendChild(obstacle);
  gameContainer.appendChild(obstacleTop);
  
  let obstacleLeft = gameWidth;
  obstacle.style.left = obstacleLeft + 'px';
  obstacleTop.style.left = obstacleLeft + 'px';
  
  function moveLeft () {
    obstacleLeft -= 5; 
    obstacle.style.left = obstacleLeft + 'px';
    obstacleTop.style.left = obstacleLeft + 'px';
    
    if (obstacleLeft < -10) {
      // clearInterval(obstacleTimer);
      obstacle.remove();
      obstacleTop.remove();
    }
  }
  
  // random height generator 
  let maxHeight = 280, minHeight = 90;
  const obstacleTopHeight = Math.random() * (maxHeight - minHeight) + minHeight;
  const obstacleHeight = Math.random() * (maxHeight - minHeight) + minHeight;
  
  
  
  obstacleTop.style.height = obstacleTopHeight + 'px';
  obstacle.style.height = obstacleHeight + 'px';
  
  setInterval(moveLeft, 50);
}

// Initialize bird's position on page load
bird.style.bottom = birdBottom + "px";



// Event listener
document.addEventListener("click", startGAME);
document.addEventListener("click", fly);