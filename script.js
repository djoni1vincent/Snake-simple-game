const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const resetBtn = document.getElementById("reset");
const youDiedText = document.getElementById("you-died");

const cellSize = 10;
let dx = cellSize;
let dy = 0;
let speed = 100;
let score = 0;
let gameOver = false;
let changingDirection = false;

let snake = [
  { x: 150, y: 150 },
  { x: 140, y: 150 },
  { x: 130, y: 150 },
  { x: 120, y: 150 },
  { x: 110, y: 150 },
];

let foodX;
let foodY;
let snakeColor = "lime";

document.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);
document.addEventListener("keydown", (e) => {
  if (e.key === "r" || e.key === "R") resetGame();
});

function drawSnakePart(part) {
  ctx.fillStyle = snakeColor;
  ctx.shadowColor = snakeColor; 
  ctx.shadowBlur = 15;
  ctx.fillRect(part.x, part.y, cellSize, cellSize);
  ctx.shadowBlur = 0;
}

function changeDirection(event) {
  const LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;
  if (changingDirection) return; 
  changingDirection = true;

  const goingUp = dy === -cellSize;
  const goingDown = dy === cellSize;
  const goingRight = dx === cellSize;
  const goingLeft = dx === -cellSize;

  if (event.keyCode === LEFT && !goingRight) { dx = -cellSize; dy = 0; }
  else if (event.keyCode === UP && !goingDown) { dx = 0; dy = -cellSize; }
  else if (event.keyCode === RIGHT && !goingLeft) { dx = cellSize; dy = 0; }
  else if (event.keyCode === DOWN && !goingUp) { dx = 0; dy = cellSize; }
}

function advanceSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  if (head.x === foodX && head.y === foodY) {
    score += 10;
    document.getElementById("score").textContent = score;
    createFood();
    if (speed > 40) speed -= 3;
    snakeColor = randomColor();
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

function randomTen(min, max) {
  return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

function createFood() {
  foodX = randomTen(0, canvas.width - 10);
  foodY = randomTen(0, canvas.height - 10);
}

function drawFood(x, y) {
  ctx.fillStyle = "red";
  ctx.shadowColor = "red";
  ctx.shadowBlur = 20;
  ctx.fillRect(x, y, 10, 10);
  ctx.shadowBlur = 0;
}

function didGameEnd() {
  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
  }
  return (
    snake[0].x < 0 ||
    snake[0].x > canvas.width - 10 ||
    snake[0].y < 0 ||
    snake[0].y > canvas.height - 10
  );
}

function showYouDied() {
  youDiedText.style.opacity = 1;
}

function hideYouDied() {
  youDiedText.style.opacity = 0;
}

function randomColor() {
  const colors = ["lime", "cyan", "yellow", "magenta", "orange"];
  return colors[Math.floor(Math.random() * colors.length)];
}

function main() {
  if (didGameEnd()) {
    gameOver = true;
    showYouDied();
    return;
  }

  setTimeout(() => {
    changingDirection = false; // 👈 предотвращает двойной поворот
    clearCanvas();
    drawFood(foodX, foodY);
    advanceSnake();
    drawSnake();
    if (!gameOver) main();
  }, speed);
}

function resetGame() {
  gameOver = false;
  hideYouDied();
  speed = 100;
  dx = cellSize;
  dy = 0;
  score = 0;
  changingDirection = false;
  document.getElementById("score").textContent = score;
  snake = [
    { x: 150, y: 150 },
    { x: 140, y: 150 },
    { x: 130, y: 150 },
    { x: 120, y: 150 },
    { x: 110, y: 150 },
  ];
  createFood();
  clearCanvas();
  drawSnake();
  main();
}

createFood();
main();
