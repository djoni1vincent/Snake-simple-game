const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "red";
ctx.fillRect(0,0,300,300);

let snake = [ {x: 150, y: 150}, {x: 140, y: 150}, {x: 130, y: 150}, {x: 120, y: 150}, {x: 110, y: 150} ]