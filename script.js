const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let resetBtn = document.getElementById("reset")

const cellSize = 10;
let dx = cellSize;
let dy = 0;

let foodX;
let foodY;

let snake = [
  { x: 150, y: 150 },
  { x: 140, y: 150 },
  { x: 130, y: 150 },
  { x: 120, y: 150 },
  { x: 110, y: 150 },
];

function drawSnakePart(snakePart) {
  ctx.fillStyle = "lightgreen";
  ctx.strokeStyle = "darkgreen";
  ctx.fillRect(snakePart.x, snakePart.y, cellSize, cellSize);
  ctx.strokeRect(snakePart.x, snakePart.y, cellSize, cellSize);
}

function changeDirection(event) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;

  const keyPressed = event.keyCode;
  const goingUp = dy === -10;
  const goingDown = dy === 10;
  const goingRight = dx === 10;
  const goingLeft = dx === -10;

  if (keyPressed === LEFT_KEY && !goingRight) {
    dx = -10;
    dy = 0;
  } else if (keyPressed === UP_KEY && !goingDown) {
    dx = 0;
    dy = -10;
  } else if (keyPressed === RIGHT_KEY && !goingLeft) {
    dx = 10;
    dy = 0;
  } else if (keyPressed === DOWN_KEY && !goingUp) {
    dx = 0;
    dy = 10;
  }
}

function advanceSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  const didEatFood = snake[0].x === foodX && snake[0].y === foodY;
  if (didEatFood) {
    score += 10;
    document.getElementById("score").innerHTML = score;
    createFood();
  } else {
    snake.pop();
  }
}

function clearCanvas() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  snake.forEach(drawSnakePart);
}

let score = 0;

// mat
function randomTen(min, max) {
  return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

function createFood() {
  foodX = randomTen(0, canvas.width - 10);
  foodY = randomTen(0, canvas.height - 10);

  snake.forEach(function isFoodOnSnake(part) {
    const foodIsOnSnake = part.x == foodX && part.y == foodY;
    if (foodIsOnSnake) createFood();
  });
}

function drawFood(x, y) {
  ctx.fillStyle = "red";
  ctx.strokeStyle = "darkred";
  ctx.fillRect(x, y, 10, 10);
  ctx.strokeRect(x, y, 10, 10);
}

function didGameEnd() {
  for (let i = 4; i < snake.length; i++) {
    const didCollide = snake[i].x === snake[0].x && snake[i].y === snake[0].y;
    if (didCollide) return true;
  }
  const hitLeftWall = snake[0].x < 0;
  const hitRightWall = snake[0].x > gameCanvas.width - 10;
  const hitToptWall = snake[0].y < 0;
  const hitBottomWall = snake[0].y > gameCanvas.height - 10;
  return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall;
}

function main() {
  if (didGameEnd()) return;

  setTimeout(function onTick() {
    clearCanvas();
    drawFood(foodX, foodY);
    advanceSnake();
    drawSnake();
    main();
  }, 100);
}


document.addEventListener("keydown", changeDirection);
createFood();
main();

resetBtn.addEventListener("click", resetGame);

function resetGame() {
  snake = [
    { x: 150, y: 150 },
    { x: 140, y: 150 },
    { x: 130, y: 150 },
    { x: 120, y: 150 },
    { x: 110, y: 150 },
  ];
  dx = cellSize;
  dy = 0;
  score = 0;
  document.getElementById("score").innerHTML = score;
  createFood();
  clearCanvas();
  drawSnake();
  main();
}