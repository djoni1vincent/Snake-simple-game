const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "silver";
ctx.fillRect(0,0,300,300);

const cellSize = 10;
let dx = cellSize;
let dy = 0;


let snake = [  
        {x: 150, y: 150},
        {x: 140, y: 150},
        {x: 130, y: 150},
        {x: 120, y: 150},
        {x: 110, y: 150},
    ];

function drawSnakePart(snakePart) {
    ctx.fillStyle = "lightgreen"; 
    ctx.strokeStyle = "darkgreen";
    ctx.fillRect(snakePart.x, snakePart.y, 10, 10); 
    ctx.strokeRect(snakePart.x, snakePart.y, 10, 10); 
}

function advanceSnake () {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
    snake.pop();
};

function clearCanvas() {
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.fillRect(0,0, gameCanvas.width, gameCanvas.height);
    ctx.strokeRect(0,0, gameCanvas.width, gameCanvas.height);
}

function drawSnake() {snake.forEach(drawSnakePart)};

function main() {
    setTimeout(function onTick() {  
    clearCanvas();  
    advanceSnake();  
    drawSnake();main();}, 100);
}
main();