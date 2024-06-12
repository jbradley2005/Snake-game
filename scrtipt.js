const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const canvasSize = 400;
const snakeColor = '#00FF00';
const foodColor = '#FF0000';
const backgroundColor = '#000000';

let snake = [{ x: gridSize * 5, y: gridSize * 5 }];
let direction = { x: 0, y: 0 };
let food = { x: gridSize * 10, y: gridSize * 10 };
let score = 0;

function drawRect(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, gridSize, gridSize);
}

function clearCanvas() {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvasSize, canvasSize);
}

function drawSnake() {
    snake.forEach(segment => drawRect(segment.x, segment.y, snakeColor));
}

function drawFood() {
    drawRect(food.x, food.y, foodColor);
}

function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        generateFood();
    } else {
        snake.pop();
    }
}

function generateFood() {
    food = {
        x: Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize,
        y: Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize
    };
    console.log(`New food generated at (${food.x}, ${food.y})`);
}

function changeDirection(event) {
    const keyPressed = event.keyCode;
    const goingUp = direction.y === -gridSize;
    const goingDown = direction.y === gridSize;
    const goingRight = direction.x === gridSize;
    const goingLeft = direction.x === -gridSize;

    if (keyPressed === 37 && !goingRight) {
        direction = { x: -gridSize, y: 0 };
    }
    if (keyPressed === 38 && !goingDown) {
        direction = { x: 0, y: -gridSize };
    }
    if (keyPressed === 39 && !goingLeft) {
        direction = { x: gridSize, y: 0 };
    }
    if (keyPressed === 40 && !goingUp) {
        direction = { x: 0, y: gridSize };
    }
    console.log(`Direction changed to (${direction.x}, ${direction.y})`);
}

function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
        console.log('Collision with wall detected');
        return true;
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            console.log('Collision with self detected');
            return true;
        }
    }
    return false;
}

function gameLoop() {
    if (checkCollision()) {
        alert('Game Over');
        snake = [{ x: gridSize * 5, y: gridSize * 5 }];
        direction = { x: 0, y: 0 };
        score = 0;
        generateFood();
    } else {
        clearCanvas();
        drawFood();
        moveSnake();
        drawSnake();
    }
}

document.addEventListener('keydown', changeDirection);

setInterval(gameLoop, 100);

// Initial setup
generateFood();
clearCanvas();
drawFood();
drawSnake();
