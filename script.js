const gameArea = document.getElementById("gameArea");
const car = document.getElementById("car");
const scoreDisplay = document.getElementById("score");

let carLeft = 125;
let score = 0;
let gameOver = false;

// Move car
document.addEventListener("keydown", (e) => {
    if (gameOver) return;

    if (e.key === "ArrowLeft" && carLeft > 0) {
        carLeft -= 25;
    }
    if (e.key === "ArrowRight" && carLeft < 240) {
        carLeft += 25;
    }
    car.style.left = carLeft + "px";
});

// REAL collision detection (bounding box)
function isColliding(a, b) {
    const aRect = a.getBoundingClientRect();
    const bRect = b.getBoundingClientRect();

    return !(
        aRect.bottom < bRect.top ||
        aRect.top > bRect.bottom ||
        aRect.right < bRect.left ||
        aRect.left > bRect.right
    );
}

// Create obstacle
function createObstacle() {
    if (gameOver) return;

    const obstacle = document.createElement("div");
    obstacle.classList.add("obstacle");
    obstacle.style.left = Math.floor(Math.random() * 6) * 50 + "px";
    gameArea.appendChild(obstacle);

    let obstacleTop = -100;

    const moveObstacle = setInterval(() => {
        if (gameOver) {
            clearInterval(moveObstacle);
            return;
        }

        obstacleTop += 5;
        obstacle.style.top = obstacleTop + "px";

        // ✅ Correct collision check
        if (isColliding(car, obstacle)) {
            endGame();
            clearInterval(moveObstacle);
        }

        if (obstacleTop > 500) {
            obstacle.remove();
            clearInterval(moveObstacle);
        }
    }, 20);
}

// Score counter
const scoreInterval = setInterval(() => {
    if (!gameOver) {
        score++;
        scoreDisplay.innerText = "Score: " + score;
    }
}, 500);

// Obstacle generation
const obstacleInterval = setInterval(createObstacle, 1500);

function endGame() {
    if (gameOver) return;

    gameOver = true;
    clearInterval(scoreInterval);
    clearInterval(obstacleInterval);
    alert("Game Over! Your score: " + score);
}

function restartGame() {
    window.location.reload();
}
