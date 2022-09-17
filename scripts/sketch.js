//Key to restart from game over state
const RESTART_KEY = 'R';

//Lookup table for gameplay text displays
const GAME_TEXT = {
	"START": "PRESS ANY ARROW KEY TO BEGIN",
	"GAME_OVER": `GAME OVER! PRESS '${RESTART_KEY}' TO RESET`,
};

//Canvas elements
var gridSize = 0;
var canvasSize = 0;
var grid = [];

//Game elements
var snake;
var food;
var gameLoop;
var score;

//Game state trackers
var isActive;
var hasStarted;

/**
 Preloaded data for the canvas
*/
function preload() {
  pixelFont = loadFont('../fonts/subway.ttf');
}

/**
 Sets up the initial canvas
*/
function setup() {
  setSizes();
  createCanvas(canvasSize, canvasSize);
  initGame();
}

/**
 Initializes everything needed to start a game of snake
*/
function initGame() {
  isActive = false;
  hasStarted = false;
  
  score = 0;

  grid = buildGameGrid();
  toggleDifficultyButtons(true);
  
  snake = new Snake(grid[0][0], gridSize)
  food = new Food(gridSize);
  food.changePos();
  loop();
}

/**
 Main drawing loop that handles the gameplay
*/
function draw() {
  background(0);
  
  //Check if the user has started the game yet
  if(isActive) {
    //Set the snake's direction
	snake.updateDir();

	//Handle the snake's movement on the grid
    gameLoop = snake.move();

	//If the snake collided with anything then end the game
    if(!gameLoop) {
      gameOver();
	  return;
	}

	//Draw the game elements and check if the snake collected the food
    snake.draw();
    food.draw();
    checkFood();
  }
  else {
    //Draw the initial snake and food positions and then prompt the user to start
	snake.draw();
    food.draw();
	drawText("START");
  }
  document.getElementById("scoreText").innerHTML = `${score}`;
}

/**
 End the game loop and prompt the suer to restart
*/
function gameOver() {
  snake.draw();
  food.draw();
  drawText("GAME_OVER");
  noLoop();
}

/**
 Draws text for a given game event in the middle of the canvas
 
 @params:
	event - The event we are drawing text for based on a lookup table
*/
function drawText(event) {
  fill(255);
  stroke(0);
  strokeWeight(2);
  textFont(pixelFont);
  textAlign(CENTER, CENTER);
  textSize(canvasSize / 24);
  text(GAME_TEXT[event], canvasSize / 2, canvasSize / 2);
}

/**
 Applies the game difficulty and enables the flag to start the main gameplay loop
*/
function startGame() {
  hasStarted = true;
  frameRate(getDifficulty());
  toggleDifficultyButtons(false);
}

/**
 Toggles visibility of the difficulty selector buttons
 
 @params:
	value - Whether to hide or show the buttons
*/
function toggleDifficultyButtons(value) {
  if(value)
	  document.querySelectorAll(".difficultyButton").forEach(btn => {btn.style.visibility = ""});
  else
	  document.querySelectorAll(".difficultyButton").forEach(btn => {btn.style.visibility = "hidden"});
}

/**
 Builds a grid of position objects based on the canvas size
 
 @returns: A grid of positions
*/
function buildGameGrid() {
  var temp = [];
  for(var row = 0; row < height / gridSize; row ++) {
    let colArr = [];
    for(var col = 0; col < width / gridSize; col++) {
      colArr.push(new Position((col * gridSize), (row * gridSize)));
    }
    temp[row] = (colArr);
  }
  return temp;
}

/**
 Checks if the head of the snake has picked up the food
*/
function checkFood() {
  if(snake.getHeadPos() === food.getPos()) {
    snake.tailSize++;
    score++;
    food.changePos();
  }
}

/**
 Handles key inputs from the user and branches based on what key was entered and what state the game was in
*/
function keyPressed() {
  //Handles both mid game direction inputs and the initial input to start the game
  isActive = snake.setDirection(keyCode);
  if(!hasStarted && isActive)
    startGame();

  //Handles restarting the game
  if(!isLooping() && key.toUpperCase() === RESTART_KEY) {
	initGame();
	loop();
  }
  return false;
}

/*
 Sets the canvas and grid sizes based on the viewport
 */
function setSizes() {
  canvasSize = windowWidth / 4;
  gridSize = windowWidth / 120;
}

/*
 Handles the viewport being resized
*/
function windowResized() {
	//Resize the canvas and restart the game
	setSizes();
	resizeCanvas(canvasSize, canvasSize);
	initGame();
}