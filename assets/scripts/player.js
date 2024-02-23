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
    this.collisionX;
    this.collisionY;
    this.collisionRadius;
    this.collided;
    this.energy = 30;
    this.maxEnergy = this.energy * 2;
    this.minEnergy = this.energy / 2;
  }

  draw() {
    this.game.ctx.strokeStyle = 'black';
    this.game.ctx.beginPath();
    this.game.ctx.arc(this.collisionX, this.collisionY, this.collisionRadius, 0, 2 * Math.PI);
    this.game.ctx.stroke();
    this.game.ctx.closePath();
  }

  update() {
    this.handleEnergy();
    this.positionY += this.speedY;
    this.collisionY = this.positionY + (this.height / 2);

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
    this.collisionX = this.positionX + (this.width / 2);
    this.collisionRadius = this.width / 2;
    this.collided = false;
  }

  handleEnergy() {
    if (this.energy < this.maxEnergy) {
      this.energy += 0.1;
    }
  }

  flap() {
    if (!this.isTouchingTop()) {
      this.speedY = -this.flapSpeed;
    }
  }
}