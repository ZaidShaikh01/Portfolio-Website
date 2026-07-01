const gameBoard = document.querySelector('#gameBoard');
const ctx = gameBoard.getContext('2d');
// const scoreText = document.querySelector('#scoreText');
// const resetBtn = document.querySelector('#resetBtn');
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = '#1D293D';
const snakeColor = '#46ECD5';
const snakeBorder = '#46ECD5';
const foodColor = '#46ECD5';
const unitSize = 15;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
  { x: unitSize * 4, y: 0 },
  { x: unitSize * 3, y: 0 },
  { x: unitSize * 2, y: 0 },
  { x: unitSize, y: 0 },
  { x: 0, y: 0 },
];

window.addEventListener('keydown', changeDirection);
// resetBtn.addEventListener('click', resetGame);
gameStart();

function gameStart() {
  running = true;
  // scoreText.textContent = score;
  createFood();
  drawFood();
  nextTick();
}
function nextTick() {
  if (running) {
    setTimeout(() => {
      clearBoard();
      drawFood();
      moveSnake();
      drawSnake();
      checkGameOver();
      nextTick();
    }, 100);
  } else {
    displayGameOver();
  }
}
function clearBoard() {
  ctx.fillStyle = boardBackground;
  ctx.fillRect(0, 0, gameWidth, gameHeight);
}
function createFood() {
  function randomFood(min, max) {
    const randNum =
      Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;

    return randNum;
  }
  foodX = randomFood(0, gameWidth - unitSize);
  foodY = randomFood(0, gameWidth - unitSize);
  console.log(foodX);
}
function drawFood() {
  ctx.fillStyle = foodColor;
  ctx.fillRect(foodX, foodY, unitSize, unitSize);
  
  
}
function drawFood() {
    const cx = foodX + unitSize / 2;
    const cy = foodY + unitSize / 2;

    const colors = [
        "#43D9AD",
        "#63E5BE",
        "#8EF0D4",
        "#BDF8E8",
        "#FFFFFF"
    ];

    for (let i = 0; i < colors.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = colors[i];
        ctx.arc(
            cx,
            cy,
            unitSize * (0.45 - i * 0.08),
            0,
            Math.PI * 2
        );
        ctx.fill();
    }
}
function moveSnake() {
  const head = { x: snake[0].x + xVelocity, y: snake[0].y + yVelocity };
  snake.unshift(head);
  // if food is eaten
  if (snake[0].x == foodX && snake[0].y == foodY) {
    score += 1;
    // scoreText.textContent = score;
    createFood();
  } else {
    snake.pop();
  }
}
// function drawSnake() {
//   ctx.fillStyle = snakeColor;
//   ctx.strokeStyle = snakeBorder;
//   snake.forEach((snakePart) => {
//     ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
//     ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
//   });

//   // for (let i = 0; i < snake.length; i++) {
//   //   if (i == 0) {
//   //     ctx.roundRect(snake[0].x, snake[0].y, unitSize, unitSize, [40]);
//   //     ctx.stroke();
//   //   }
//   //   ctx.fillRect(snake[i].x, snake[i].y, unitSize, unitSize);
//   //   ctx.strokeRect(snake[i].x, snake[i].y, unitSize, unitSize);
//   // }
// }
function drawSnake() {
  const head = snake[0];
  const tail = snake[snake.length - 1];

  const gradient = ctx.createLinearGradient(
    head.x,
    head.y,
    tail.x,
    tail.y
);

gradient.addColorStop(0.00, "#43D9ADFF"); // 100%
gradient.addColorStop(0.25, "#43D9ADCC"); // 80%
gradient.addColorStop(0.50, "#43D9AD99"); // 60%
gradient.addColorStop(0.75, "#43D9AD4D"); // 30%
gradient.addColorStop(1.00, "#43D9AD00"); // 0%

  ctx.strokeStyle = gradient;
  ctx.lineWidth = unitSize/1.8;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  ctx.beginPath();
  ctx.moveTo(head.x + unitSize / 2, head.y + unitSize / 2);

  for (let i = 1; i < snake.length; i++) {
    ctx.lineTo(snake[i].x + unitSize / 2, snake[i].y + unitSize / 2);
  }

  ctx.stroke();
}

function changeDirection() {
  const keyPressed = event.keyCode;
  const LEFT = 37;
  const UP = 38;
  const RIGHT = 39;
  const DOWN = 40;

  const goingUp = yVelocity == -unitSize;
  const goingDown = yVelocity == unitSize;
  const goingRight = xVelocity == unitSize;
  const goingLeft = xVelocity == -unitSize;

  switch (true) {
    case keyPressed == LEFT && !goingRight: {
      xVelocity = -unitSize;
      yVelocity = 0;
      break;
    }
    case keyPressed == RIGHT && !goingLeft: {
      xVelocity = unitSize;
      yVelocity = 0;
      break;
    }
    case keyPressed == UP && !goingDown: {
      xVelocity = 0;
      yVelocity = -unitSize;
      break;
    }
    case keyPressed == DOWN && !goingUp: {
      xVelocity = 0;
      yVelocity = unitSize;
      break;
    }
  }
}
function checkGameOver() {
  switch (true) {
    case snake[0].x < 0:
      running = false;
      break;
    case snake[0].x >= gameWidth:
      running = false;
      break;
    case snake[0].y < 0:
      running = false;
      break;
    case snake[0].y >= gameHeight:
      running = false;
      break;
  }
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
      running = false;
    }
  }
}
function displayGameOver() {
  ctx.font = '50px MV Boli';
  ctx.fillStyle = 'black';
  ctx.texAlign = 'center';
  ctx.fillText('Game Over!', gameWidth / 2 - 150, gameHeight / 2);

  running = false;
}
function resetGame() {
  score = 0;
  xVelocity = unitSize;
  yVelocity = 0;
  snake = [
    { x: unitSize * 4, y: 0 },
    { x: unitSize * 3, y: 0 },
    { x: unitSize * 2, y: 0 },
    { x: unitSize, y: 0 },
    { x: 0, y: 0 },
  ];
  gameStart();
}
