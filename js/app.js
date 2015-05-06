// Frequently occuring values. Made easy to modify
var X_STEP = 100;
var Y_STEP = 80;
var CHAR_WIDTH = 101;
var CHAR_HEIGHT = 171;
var C_HEIGHT = 606;
var C_WIDTH = 505;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = 0;
    this.speed = 0;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (this.speed * dt);

    if (this.x > C_WIDTH)
        this.initialize();


    hitTest(this);
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Initialize enemy postion and speed to random values
Enemy.prototype.initialize = function() {

    var enemyPositions = [60, 120, 180, 240, 300];

    this.x = Math.random() * (-CHAR_WIDTH + 100) - 100;
    this.y = enemyPositions[parseInt(Math.random() * (enemyPositions.length - 0) + 0)];
    this.speed = Math.random() * (350 - 100) + 100;
}

// Check if enemy hits player
var hitTest = function(enemy) {

    var playerBounds = {

        leftTop: {
            x: player.x,
            y: player.y
        },

        rightBottom: {
            x: player.x + CHAR_WIDTH,
            y: player.y + CHAR_HEIGHT,
        }
    };

    var enemyBounds = {

        leftTop: {
            x: enemy.x,
            y: enemy.y
        },

        rightBottom: {
            x: enemy.x + CHAR_WIDTH,
            y: enemy.y + CHAR_HEIGHT,
        }
    };

    
    
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

function Player() {

    this.sprite = 'images/char-boy.png';
    this.lives = 5;
    this.score = 0;

    this.x = (C_WIDTH / 2) - (CHAR_WIDTH / 2);
    this.y = C_HEIGHT - (CHAR_HEIGHT + 50);
}

Player.prototype.update = function() {

}

Player.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(key) {

    if (key == 'up' && (this.y - Y_STEP) > -80)
        this.y = this.y - Y_STEP;
    else if (key == 'down' && (this.y + Y_STEP) < (C_HEIGHT - CHAR_HEIGHT))
        this.y = this.y + Y_STEP;
    else if (key == 'left' && (this.x - X_STEP) > 0)
        this.x = this.x - X_STEP;
    else if (key == 'right' && (this.x + X_STEP) < 500)
        this.x = this.x + X_STEP;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player();

for (var i = 0; i < 5; i++) {
    var enemy = new Enemy();
    enemy.initialize();
    allEnemies.push(enemy);
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
