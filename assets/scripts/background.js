export class Background {
  constructor( game ) {
    this.game = game;
    this.image = new Image();
    this.width = 2400;
    this.height = 720;
    this.scaleWidth;
    this.scaleHeight;
    this.positionX;
  }

  setupImage(src) {
    this.image.src = src
  }
  update(){
    this.positionX -= this.game.speed;

    if (this.positionX <= -this.scaleWidth) this.positionX = 0;
  }
  draw() {
    this.game.ctx.drawImage(
      this.image,
      this.positionX, 0,
      this.scaleWidth, this.scaleHeight
    );
    this.game.ctx.drawImage(
      this.image,
      this.positionX + this.scaleWidth - 1, 0,
      this.scaleWidth, this.scaleHeight
    );
  }

  resize() {
    this.scaleWidth = this.width * this.game.ratio;
    this.scaleHeight = this.height * this.game.ratio;
    this.positionX = 0;
  }
}