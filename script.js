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
    if (e.key === "ArrowRight" && carLeft < 250) {
        carLeft += 25;
    }
    car.style.left = carLeft + "px";
});

// Create obstacle
function createObstacle() {
    const obstacle = document.createElement("div");
    obstacle.classList.add("obstacle");
    obstacle.style.left = Math.floor(Math.random() * 6) * 50 + "px";
    gameArea.appendChild(obstacle);

    let obstacleTop = -100;

    const moveObstacle = setInterval(() => {
        if (gameOver) return;

        obstacleTop += 5;
        obstacle.style.top = obstacleTop + "px";

        // Collision detection
        if (
            obstacleTop > 380 &&
            obstacleTop < 460 &&
            parseInt(obstacle.style.left) === carLeft
        ) {
            endGame();
        }

        if (obstacleTop > 500) {
            obstacle.remove();
            clearInterval(moveObstacle);
        }
    }, 20);
}

// Score counter
setInterval(() => {
    if (!gameOver) {
        score++;
        scoreDisplay.innerText = "Score: " + score;
    }
}, 500);

// Obstacle generation
setInterval(createObstacle, 1500);

function endGame() {
    gameOver = true;
    alert("Game Over! Your score: " + score);
}

function restartGame() {
    window.location.reload();
}
