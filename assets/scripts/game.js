import { Player } from "./player.js";
import { Background } from "./background.js";

export class Game {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.ctx = context;
    // this.width = this.canvas.width;
    // this.height = this.canvas.height;
    this.baseHeight = 720;
    this.ratio;
    this.background = new Background(this);
    this.player = new Player(this);
    this.gravity;
    this.speed;
  }

  setupBackground(src) {
    this.background.setupImage(src);
  }

  render() {
    // this.ctx.fillStyle = 'black';
    // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.background.update();
    this.background.draw();
    this.player.update();
    this.player.draw();
  }

  resize() {
    this.ratio = this.canvas.height / this.baseHeight;
    this.gravity = 0.15 * this.ratio;
    this.speed = 3 * this.ratio;
    this.background.resize();
    this.player.resize();
  }

  updatePlayerPosition() {
    this.player.flap();
  }
}