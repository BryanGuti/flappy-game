import { Player } from "./player.js";
import { Background } from "./background.js";
import { Obstacle } from "./obstacle.js";

export class Game {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.ctx = context;
    this.baseHeight = 720;
    this.ratio;
    this.background = new Background(this);
    this.player = new Player(this);
    this.obstacles = [];
    this.numberOfObstacles = 10;
    this.obstacleSpacing;
    this.gravity;
    this.speed;
  }

  createObstacles() {
    this.obstacles = [];
    const firstX = this.baseHeight * this.ratio;

    for (let i = 0; i < this.numberOfObstacles; i++) {
      this.obstacles.push(
        new Obstacle(
          this,
          firstX + (i * this.obstacleSpacing)
        )
      );
    }
  }

  setupBackground(src) {
    this.background.setupImage(src);
  }

  render() {
    this.background.update();
    this.background.draw();
    this.player.update();
    this.player.draw();
    this.obstacles.forEach( obstacle => {
      obstacle.update();
      obstacle.draw();
    })
  }

  resize() {
    this.ratio = this.canvas.height / this.baseHeight;
    this.gravity = 0.15 * this.ratio;
    this.speed = 3 * this.ratio;
    this.background.resize();
    this.player.resize();
    this.obstacleSpacing = 600 * this.ratio;
    this.createObstacles();
    this.obstacles.forEach( obstacle => {
      obstacle.resize();
    });
  }

  updatePlayerPosition() {
    this.player.flap();
  }
}