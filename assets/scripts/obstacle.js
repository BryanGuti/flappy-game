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
    this.speedY;
    this.markForDeletion = false;
  }

  update() {
    this.positionX -= this.game.speed;
    this.positionY += this.speedY;

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
    }
  }
  draw() {
    this.game.ctx.fillStyle = 'white';
    this.game.ctx.fillRect(this.positionX, this.positionY, this.scaleWidth, this.scaleHeight)
  }

  resize() {
    this.scaleWidth = this.spriteWidth * this.game.ratio;
    this.scaleHeight = this.spriteHeight * this.game.ratio;
    this.positionY = getRandomNumber(
      0.01, this.game.canvas.height - this.scaleHeight
    );
    this.speedY = Math.random() < 0.5
      ? (-1 * this.game.ratio)
      : (1 * this.game.ratio);
  }

  isOffScreen() {
    return (this.positionX + this.scaleWidth) < 0;
  }
}