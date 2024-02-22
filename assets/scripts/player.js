export class Player {
  constructor( game ) {
    this.game = game;
    this.positionX = 100;
    this.positionY;
    this.spriteWidth = 200;
    this.spriteHeight = 200;
    this.width;
    this.height;
    this.speedY;
    this.flapSpeed;
  }

  draw() {
    this.game.ctx.fillStyle = 'blue';
    this.game.ctx.beginPath();
    this.game.ctx.arc(this.positionX, this.positionY, this.width, 0, 2 * Math.PI);
    this.game.ctx.fill();
    this.game.ctx.closePath();
  }

  update() {
    this.positionY += this.speedY;

    if (!this.isTouchingBottom()) {
      this.speedY += this.game.gravity;
    }

    if (this.isTouchingBottom()) {
      this.positionY = this.game.canvas.height - this.height;
      this.speedY = 0;
    }
  }

  isTouchingBottom() {
    return (this.positionY + this.height) >= this.game.canvas.height;
  }

  isTouchingTop() {
    return this.positionY <= 0;
  }

  resize() {
    this.width = this.spriteWidth * this.game.ratio
    this.height = this.spriteHeight * this.game.ratio
    this.positionY = (this.game.canvas.height * 0.5) - (this.height * 0.5);
    this.speedY = -5 * this.game.ratio;
    this.flapSpeed = 5 * this.game.ratio;
  }

  flap() {
    if (!this.isTouchingTop()) {
      this.speedY = -this.flapSpeed;
    }
  }
}