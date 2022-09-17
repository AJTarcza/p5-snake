//Enum for what direction the snake is currently going
const Direction = {
  UP: "up",
  RIGHT: "right",
  DOWN: "down",
  LEFT: "left",
}

/**
 Class representing a snake object
*/
class Snake {    
  
  /**
    Constructor for a snake object
	
	@params:
		pos - Position object representing the snake's starting position
		size - The size in pixels of a single segment of the snake's body
  */
  constructor(pos, size) {
    this.size = size;
    this.body = [pos];
    this.tailSize = 1;
    
    this.vx = 0;
    this.vy = 0;
    this.xIdx = pos.x / size;
    this.yIdx = 0;
    
    this.direction = undefined;
    this.collisionPos = undefined;
  }
  
  /**
    Handles moving the entire snake one position on the grid based on its current direction. Also handles the snake colliding with either the canvas boundaries or its own tail.
	
	@returns: Whether or not the move was valid
  */
  move() {
    let head = this.body[0];

    let newYIdx = this.yIdx + this.vy;
    let newXIdx = this.xIdx + this.vx;

    //Head will collide with boundaries
    if(!this.checkBounds(newYIdx, newXIdx)) {
      this.collisionPos = head;
      return false;
    }

    this.yIdx = newYIdx;
    this.xIdx = newXIdx;

    let newHead = grid[this.yIdx][this.xIdx];
    
    //Head collided with tail
    for(var i = 0; i < this.body.length; i++) {
      if(this.body[i] === newHead) {
        this.collisionPos = this.body[i];
        return false;
      }
    }

    this.body.unshift(newHead);
    this.body = this.body.slice(0, this.tailSize);

    return true;
  }
  
  /**
   Checks if the indices for the game grid are still in bounds
   
   @returns: Whether or not both of the indices are in the grid boundaries
  */
  checkBounds(yIdx, xIdx) {
    if(yIdx < 0 || xIdx < 0)
      return false;
    
    if(yIdx >= grid.length || xIdx >= grid[yIdx].length)
      return false;
    
    return true;
  }
  
  /**
    Draws every segment of the snake
  */
  draw() {
    this.body.forEach(seg => {
      //Highlight the point where the snake collided if applicable
	  if(seg === this.collisionPos)
        fill(255, 95, 31);
      else
        fill(44, 250, 31);
      rect(seg.x, seg.y, this.size);
    });
  }
  
  /**
    Retrieves the position of the snake's head
	
	@returns: The current position of the head
  */
  getHeadPos() {
    return this.body[0];
  }
  
  /**
    Updates the snake's direction based on what the user has set it to
  */
  updateDir() {
    switch(this.direction) {
      case Direction.RIGHT:
        if(this.vx != -1) {
          this.vx = 1;
          this.vy = 0;
          this.direction = Direction.RIGHT;
        }
        break;
        
      case Direction.DOWN:
        if(this.vy != -1) {
          this.vx = 0;
          this.vy = 1;
          this.direction = Direction.DOWN;
        }
        break;
        
      case Direction.LEFT:
        if(this.vx != 1) {
          this.vx = -1;
          this.vy = 0;
          this.direction = Direction.LEFT;
        }
        break;
        
      case Direction.UP:
        if(this.vy != 1) {
          this.vx = 0;
          this.vy = -1;
          this.direction = Direction.UP;
        }
        break;
    }
  }
  
  /**
    Sets the snake's current direction based on user input
	
	@returns: Whether or not the input was a valid direction
  */
  setDirection(key) {
    if(key === RIGHT_ARROW) {
      this.direction = Direction.RIGHT;
      return true;
    }
    else if(key === DOWN_ARROW) {
      this.direction = Direction.DOWN;
      return true;
    }
    else if(key === LEFT_ARROW ) {
      this.direction = Direction.LEFT;
      return true;
    }
    else if(key === UP_ARROW) {
      this.direction = Direction.UP;
      return true;
    }
    return false;
  }
}