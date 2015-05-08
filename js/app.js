// Frequently occuring values. Made easy to modify
var X_STEP = 100;
var Y_STEP = 80;
var CHAR_WIDTH = 101;
var CHAR_HEIGHT = 171;
var C_HEIGHT = 606;
var C_WIDTH = 505;


document.getElementById('again').addEventListener('click', function() {
  game.reset();
});

// Create game object to handle game actions independent of player or enemy
var Game = function() {
  this.isPaused = false;
  this.isOver = false;
}

Game.prototype.toggleState = function() {
  this.isPaused = !(this.isPaused);
  document.getElementById('paused').style.visibility = (this.isPaused) ? 'visible' : 'hidden';
}

Game.prototype.gameOver = function() {
  this.isOver = true;
  document.getElementById('game-over').style.visibility = 'visible';
  document.getElementById('again').style.visibility = 'visible';
}

Game.prototype.reset = function() {
  player.resetPosition();
  player.lives = 5;
  player.score = 0;
  this.isOver = false;
  document.getElementById('game-over').style.visibility = 'hidden';
  document.getElementById('again').style.visibility = 'hidden';
}

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

    // If enemy hits player
    if (hitTest(this)) {
      // Reduce player life by 1
      player.removeLife();
      // Reset player to original position
      player.resetPosition();
    }
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
    this.speed = Math.random() * (350 - 100) + 100 + (player.score * 5);
}

// Check if enemy hits player
var hitTest = function(enemy) {

    // Check if both enemy and player are on similar vertical positions
    if (((enemy.y <= player.y) && (enemy.y + CHAR_HEIGHT >= (player.y + 130)))
      || ((player.y <= enemy.y) && (player.y + CHAR_HEIGHT >= (enemy.y + 130)))) {

      // Check if both enemy and player are on similar horizontal positions
      if ((enemy.x + CHAR_WIDTH > player.x + 50 && enemy.x < player.x + CHAR_WIDTH - 50)) {
        return true;
      }
    }

    return;
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

function Player() {

    this.sprite = 'images/char-boy.png';
    this.lives = 5;
    this.score = 0;
    this.delay = 0;
    this.isScored = false;

    this.x = (C_WIDTH / 2) - (CHAR_WIDTH / 2);
    this.y = C_HEIGHT - (CHAR_HEIGHT + 50);
}

Player.prototype.update = function() {

  if (player.y <= 0) {
    
    if (!player.isScored) {
      player.score += 1;
      player.isScored = true;
      player.lives = (player.score % 5 == 0) ? player.lives + 1 : player.lives;
    }

    player.delay += 1;

    if (player.delay == 20)
      player.resetPosition();
  }

  document.getElementById('lives').innerText = player.lives;
  document.getElementById('points').innerText = player.score;
}

Player.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.removeLife = function() {
  this.lives -= 1;
  if (this.lives == 0)
    game.gameOver();
}

Player.prototype.resetPosition = function() {
  this.x = (C_WIDTH / 2) - (CHAR_WIDTH / 2);
  this.y = C_HEIGHT - (CHAR_HEIGHT + 50);
  this.delay = 0;
  this.isScored = false;
}

Player.prototype.handleInput = function(key) {

    if (key == 'up' && (this.y - Y_STEP) > -80 && !(game.isPaused))
        this.y = this.y - Y_STEP;
    else if (key == 'down' && (this.y + Y_STEP) < (C_HEIGHT - CHAR_HEIGHT) && !(game.isPaused))
        this.y = this.y + Y_STEP;
    else if (key == 'left' && (this.x - X_STEP) > 0 && !(game.isPaused))
        this.x = this.x - X_STEP;
    else if (key == 'right' && (this.x + X_STEP) < 500 && !(game.isPaused))
        this.x = this.x + X_STEP;
    else if (key == 'space')
        game.toggleState();
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// Instantiate Game object
var allEnemies = [];
var player = new Player();
var game = new Game();

for (var i = 0; i < 5; i++) {
    var enemy = new Enemy();
    enemy.initialize();
    allEnemies.push(enemy);
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        32: 'space',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    if (game.isOver == false)
      player.handleInput(allowedKeys[e.keyCode]);

});
