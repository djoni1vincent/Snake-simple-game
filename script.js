const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

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
        dx = -10; dy = 0;
    } else if(keyPressed === UP_KEY && !goingDown ){
       dx = 0; dy = -10; 
    } else if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 10; dy = 0 
    } else if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0; dy = 10;
    }
}

function advanceSnake () {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
    snake.pop();
};

function clearCanvas() {
    ctx.fillStyle = "black";
    ctx.fillRect(0,0, canvas.width, canvas.height);
}

function drawSnake() {
    snake.forEach(drawSnakePart);
}

function main() {
    setTimeout(function onTick() {  
        clearCanvas();  
        advanceSnake();  
        drawSnake();
        main();
    }, 100);
}

document.addEventListener("keydown", changeDirection);
main();
