//canvas
const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");
const scorePoints = document.querySelector(".score");
const startBtn = document.querySelector("#startBtn");

//events
const checkDirFunc = event => {
  if (event.keyCode == 37) {
    snake.setDirection("left");
  } else if (event.keyCode == 38) {
    snake.setDirection("up");
  } else if (event.keyCode == 39) {
    snake.setDirection("right");
  } else if (event.keyCode == 40) {
    snake.setDirection("down");
  }
};

startNewGame = event => {
  document.location.reload();
};

document.addEventListener("keydown", checkDirFunc);
startBtn.addEventListener("click", startNewGame);

//vars
let score = 0;
let width = canvas.width;
let height = canvas.height;
const blockSize = 10;
const widthInBlocks = width / blockSize;
const heightInBlocks = height / blockSize;

//border DRAW-func
const drawBorder = () => {
  context.fillStyle = "black";
  context.fillRect(0, 0, width, blockSize);
  context.fillRect(0, height - blockSize, width, blockSize);
  context.fillRect(0, 0, blockSize, height);
  context.fillRect(width - blockSize, 0, blockSize, height);
};

//game status func
const gameOver = () => {
  clearInterval(intervalId);
  context.font = "70px Courier";
  context.fillStyle = "green";
  context.textAlign = "center";
  context.fillText("GAME OVER", width / 2, height / 2);
};
const win = () => {
  clearInterval(intervalId);
  context.font = "60px Courier";
  context.fillStyle = "gold";
  context.textAlign = "center";
  context.fillText("YOU WIN!!!", width / 2, height / 2);
};

//Func for fill Circle
const circle = (x, y, radius, isFillCircle) => {
  context.beginPath();
  context.arc(x, y, radius, Math.PI * 2, false);
  if (isFillCircle) {
    context.fill();
  } else {
    context.stroke();
  }
};

//block class 
class Block {
  constructor(col, row) {
    this.col = col;
    this.row = row;
  }

  //block for snake body
  drawSquare = color => {
    let x = this.col * blockSize;
    let y = this.row * blockSize;
    context.fillStyle = color;
    context.fillRect(x, y, blockSize, blockSize);
  };

  //block for meal(apple)
  drawCircle = color => {
    let centerX = this.col * blockSize + blockSize / 2;
    let centerY = this.row * blockSize + blockSize / 2;
    context.fillStyle = color;
    circle(centerX, centerY, blockSize / 2, true);
  };

  //true or false(blockPos=otherBlockPos)
  isEqual = otherBlock => {
    return this.col === otherBlock.col && this.row === otherBlock.row;
  };
}

//snake class
class Snake {
  constructor() {
      //snake body
    this.segments = [new Block(7, 5), new Block(6, 5), new Block(5, 5)];
    this.direction = "right";
    this.nextDirection = "right";
  }

  //draw snake body
  draw = () => {
    for (let i = 0; i < this.segments.length; i++) {
      this.segments[i].drawSquare("green");
    }
  };

  //snake moving
  move = () => {
    let head = this.segments[0];
    let newHead;
    this.direction = this.nextDirection;
    //new blocks for body 
    if (this.direction === "right") {
      newHead = new Block(head.col + 1, head.row);
    } else if (this.direction === "down") {
      newHead = new Block(head.col, head.row + 1);
    } else if (this.direction === "left") {
      newHead = new Block(head.col - 1, head.row);
    } else if (this.direction === "up") {
      newHead = new Block(head.col, head.row - 1);
    }
    //check collision func in move
    if (this.checkCollision(newHead)) {
      gameOver();
      return;
    }
    this.segments.unshift(newHead);
    if (newHead.isEqual(apple.position)) {
      score++;
      apple.move();
    } else {
        //delete last body blocks
      this.segments.pop();
    }
  };

  //check collision fjv
  checkCollision = head => {
    let leftCollision = head.col === 0;
    let topCollision = head.row === 0;
    let rightCollision = head.col === widthInBlocks - 1;
    let bottomCollision = head.row === heightInBlocks - 1;
    let wallCollision =
      leftCollision || topCollision || rightCollision || bottomCollision;
    let selfCollision = false;
    for (let i = 0; i < this.segments.length; i++) {
      if (head.isEqual(this.segments[i])) {
        selfCollision = true;
      }
    }
    return wallCollision || selfCollision;
  };

  setDirection = newDirection => {
    if (this.direction === "up" && newDirection === "down") {
      return;
    } else if (this.direction === "right" && newDirection === "left") {
      return;
    } else if (this.direction === "down" && newDirection === "up") {
      return;
    } else if (this.direction === "left" && newDirection === "right") {
      return;
    }
    this.nextDirection = newDirection;
  };
}

//apple class 
class Apple {
  constructor() {
    this.position = new Block(10, 10);
  }
  draw = () => {
    this.position.drawCircle("tomato");
  };
  move = () => {
    let randomCol = Math.floor(Math.random() * (widthInBlocks - 2)) + 1;
    let randomRow = Math.floor(Math.random() * (heightInBlocks - 2)) + 1;
    this.position = new Block(randomCol, randomRow);
  };
}

//instances of classes
let snake = new Snake();
let apple = new Apple();

//func for update per frame
let intervalId = setInterval(()=> {
  context.clearRect(0, 0, width, height);
  scorePoints.textContent = score;
  if (score === 777) {
    win();
  }
  snake.move();
  snake.draw();
  apple.draw();
  drawBorder();
}, 50);
