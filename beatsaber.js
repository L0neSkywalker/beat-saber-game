var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var blocks = [];
var blockSpeed = 5;
var blockWidth = 50;
var blockHeight = 50;
var playerWidth = 50;
var playerHeight = 50;
var playerX = canvas.width / 2 - playerWidth / 2;
var playerY = canvas.height - playerHeight - 10;
var score = 0;
var combo = 0;
var comboTimer = null;
var comboTimeout = 1000;
var hitSound = new Audio('hit.mp3');
var missSound = new Audio('miss.mp3');
var backgroundMusic = new Audio('music.mp3');
var gameOverMusic = new Audio('gameover.mp3');
var lastBlockSpawnTime = 0;

function spawnBlock() {
    var currentTime = Date.now();
    if (currentTime - lastBlockSpawnTime > 1000) {
        lastBlockSpawnTime = currentTime;
        var x = Math.floor(Math.random() * (canvas.width - blockWidth));
        var y = -blockHeight;
        var direction = Math.random() < 0.5 ? -1 : 1;
        var color = Math.random() < 0.5 ? "#ff0000" : "#00ff00";
        var block = { x: x, y: y, direction: direction, color: color };
        blocks.push(block);
    }
}

function update() {
    // Move player
    if (leftPressed && playerX > 0) {
        playerX -= 10;
    }
    if (rightPressed && playerX < canvas.width - playerWidth) {
        playerX += 10;
    }

    // Move blocks
    for (var i = 0; i < blocks.length; i++) {
        var block = blocks[i];
        block.y += blockSpeed;
        if (block.x + blockWidth >= playerX && block.x <= playerX + playerWidth && block.y + blockHeight >= playerY && block.y <= playerY + playerHeight) {
            // Block has been sliced
            score += 10;
            combo++;
            clearTimeout(comboTimer);
            comboTimer = setTimeout(function() {
                combo = 0;
            }, comboTimeout);
            hitSound.currentTime = 0;
            hitSound.play();
            blocks.splice(i, 1);
        } else if (block.y > canvas.height) {
            // Block has missed the player
            combo = 0;
            missSound.currentTime = 0;
            missSound.play();
            blocks.splice(i, 1);
        }
    }

    // Update score and combo display
    document.getElementById("score").innerHTML = "Score: " + score;
    document.getElementById("combo").innerHTML = "Combo: " + combo;

    // Check for game over
    if (combo === 0 && score > 0) {
        gameOver();
    }
}

function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player
    ctx.fillStyle = "#0000ff";
    ctx.fillRect(player)
}
