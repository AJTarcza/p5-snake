//Enum for gameplay difficulty in terms of framerate
const Difficulty = {
  EASY: 10,
  MEDIUM: 12,
  HARD: 15,
}

//Current difficulty
var difficulty = Difficulty.EASY;

//The button representing the current difficulty
var activeBtn = document.getElementById("easyButton");

//Add onclick handlers
document.getElementById("easyButton").onclick = function() {activateButton("easyButton")};
document.getElementById("mediumButton").onclick = function() {activateButton("mediumButton")};
document.getElementById("hardButton").onclick = function() {activateButton("hardButton")};

//Returns the current difficulty
function getDifficulty() {
  return difficulty;
}

/**
 Actives the difficulty of a clicked button
 
 @params:
	id - id of the button that was clicked
*/
function activateButton(id) {
  switch(id) {
      case "easyButton":
        difficulty = Difficulty.EASY;
        break;
      case "mediumButton":
        difficulty = Difficulty.MEDIUM;
        break;
      case "hardButton":
        difficulty = Difficulty.HARD;
        break;
  }
  
  activeBtn = document.getElementById(id);
  updateButtons();
}

/**
 Updates the button classes to convey which difficulty is currently selected
*/
function updateButtons() {
  document.querySelectorAll(".difficultyButton").forEach(btn => {
    if(btn === activeBtn)
      btn.classList.add("active");
    else
      btn.classList.remove("active");
  });
}