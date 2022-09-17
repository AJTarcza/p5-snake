/**
 Class representing the food object in a game of snake
*/
class Food {
  
  /**
    Constructor for the food object
	
	@params:
		size - The size in pixels of the object
  */
  constructor(size) {
    this.pos = undefined;
    this.size = size;
  }
  
  /**
    Draws the food at its current position
  */
  draw() {
    fill(255, 0, 0);
    rect(this.pos.x, this.pos.y, this.size);
  }
  
  /**
	Returns the current position of the food
	
	@returns: The current position of the food
  */
  getPos() {
    return this.pos;
  }
  
  /**
	Changes the current position of the food
  */
  changePos() {
    let newPos;
    
    //Make sure the new position doesn't overlap with the snake
    do {
      let yIdx = Math.floor(random(0, grid.length - 1));
      let xIdx = Math.floor(random(0, grid[0].length - 1));
      newPos = grid[yIdx][xIdx];
    } while(snake.body.includes(newPos));
    
    this.pos = newPos;
    
    draw();
  }
}