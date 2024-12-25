// script.js

// Storing variables
const bird = document.querySelector(".bird");
const gameContainer = document.querySelector(".game-container");
const gameHeight = gameContainer.offsetHeight;
const gameWidth = gameContainer.offsetWidth;

let birdBottom = 280; 
let gravity = 4;
let isGameRunning = false; 
let gameIntervals = []; // To track active intervals

// Game start function
function startGAME() {
  if (!isGameRunning) { 
    isGameRunning = true;
    gameIntervals.push(setInterval(gravityPull, 100));
    gameIntervals.push(setInterval(generateObstacle, 3000));
  }
}

// Gravity function
function gravityPull() {
  birdBottom -= gravity; 
  birdBottom = Math.max(birdBottom, 0); // Prevent falling below ground
  bird.style.bottom = birdBottom + "px";

  checkCollision(); // Check for collisions
}

function fly() {
  if (birdBottom + 98 < gameHeight) {
    birdBottom += 30;
    bird.style.bottom = birdBottom + "px";
  } else {
    birdBottom = gameHeight - 98;
    bird.style.bottom = birdBottom + "px";
  }
}

// Generate obstacles
function generateObstacle() {
  const obstacle = document.createElement("div");
  const obstacleTop = document.createElement("div");

  obstacle.classList.add("obstacle");
  obstacleTop.classList.add("obstacleTop");

  let obstacleLeft = gameWidth;
  const gap = 150; // Fixed gap between obstacles
  const obstacleHeight = Math.random() * (200 - 100) + 100;

  obstacle.style.height = `${obstacleHeight}px`;
  obstacleTop.style.height = `${gameHeight - obstacleHeight - gap}px`;

  obstacle.style.left = `${obstacleLeft}px`;
  obstacleTop.style.left = `${obstacleLeft}px`;

  gameContainer.appendChild(obstacle);
  gameContainer.appendChild(obstacleTop);

  function moveLeft() {
    obstacleLeft -= 5;
    obstacle.style.left = `${obstacleLeft}px`;
    obstacleTop.style.left = `${obstacleLeft}px`;

    // Remove obstacles if they go off-screen
    if (obstacleLeft < -50) {
      obstacle.remove();
      obstacleTop.remove();
    }

    checkCollision(); // Check for collisions
  }

  const obstacleTimer = setInterval(moveLeft, 50);
  gameIntervals.push(obstacleTimer);
}

// Collision Detection
function checkCollision() {
  const birdRect = bird.getBoundingClientRect();
  const obstacles = document.querySelectorAll(".obstacle, .obstacleTop");

  obstacles.forEach((obstacle) => {
    const obstacleRect = obstacle.getBoundingClientRect();

    if (
      birdRect.left < obstacleRect.right &&
      birdRect.right > obstacleRect.left &&
      birdRect.top < obstacleRect.bottom &&
      birdRect.bottom > obstacleRect.top
    ) {
      endGame();
    }
  });
}

// End Game
function endGame() {
  isGameRunning = false;
  alert("Game Over!");

  // Clear all active intervals
  gameIntervals.forEach(clearInterval);
  gameIntervals = [];
}

// Initialize bird's position
bird.style.bottom = birdBottom + "px";

// Event listeners
document.addEventListener("click", startGAME);
document.addEventListener("click", fly);