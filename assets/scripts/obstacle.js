import { getRandomNumber } from "./utils/random.js";

export class Obstacle {
  constructor( game, x ) {
    this.game = game;
    this.spriteWidth  = 120;
    this.spriteHeight = 120;
    this.scaleWidth;
    this.scaleHeight;
    this.positionX = x;
    this.positionY;
    this.collisionX;
    this.collisionY;
    this.collisionRadius;
    this.speedY;
    this.markForDeletion = false;
  }

  update() {
    this.positionX -= this.game.speed;
    this.positionY += this.speedY;

    this.collisionX = this.positionX + (this.scaleWidth / 2);
    this.collisionY = this.positionY + (this.scaleHeight / 2);

    if (
      (this.positionY + this.scaleHeight) >= this.game.canvas.height ||
      this.positionY <= 0
    ) {
      this.speedY *= (-1);
    }

    if (this.isOffScreen()) {
      this.markForDeletion = true;
      this.game.obstacles = this.game.obstacles.filter( obstacle => {
        return !obstacle.markForDeletion;
      });
      // Scoring system
      this.game.score++;
    }

    if (this.game.obstacles.length <= 0) this.game.gameOver = true;

    if (this.game.isThereCollision(this, this.game.player)) {
      this.game.gameOver = true;
      this.game.obstacles = [];
      this.game.player.collided = true;
    }
  }

  draw() {
    this.game.ctx.beginPath();
    this.game.ctx.strokeStyle = 'white';
    this.game.ctx.arc(this.collisionX, this.collisionY, this.collisionRadius, 0, 2 * Math.PI);
    this.game.ctx.stroke();
    this.game.ctx.closePath();
  }

  resize() {
    this.scaleWidth = this.spriteWidth * this.game.ratio;
    this.scaleHeight = this.spriteHeight * this.game.ratio;
    this.positionY = getRandomNumber(
      0.01, this.game.canvas.height - this.scaleHeight
    );
    this.collisionRadius = this.scaleWidth / 2;
    this.speedY = Math.random() < 0.5
      ? (-1 * this.game.ratio)
      : (1 * this.game.ratio);
  }

  isOffScreen() {
    return (this.positionX + this.scaleWidth) < 0;
  }
}