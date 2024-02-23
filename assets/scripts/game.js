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
    this.score;
    this.timer;
    this.gameOver;
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

  render( deltaTime ) {
    this.timer += deltaTime;
    this.background.update();
    this.background.draw();
    this.player.update();
    this.player.draw();
    this.obstacles.forEach( obstacle => {
      obstacle.update();
      obstacle.draw();
    });
    this.drawPlayerStatus();
  }

  resize() {
    this.ratio = this.canvas.height / this.baseHeight;
    this.gravity = 0.15 * this.ratio;
    this.speed = 3 * this.ratio;
    this.setupBackground('./assets/img/background_single.png');
    this.background.resize();
    this.player.resize();
    this.obstacleSpacing = 600 * this.ratio;
    this.createObstacles();
    this.obstacles.forEach( obstacle => {
      obstacle.resize();
    });
    this.score = 0;
    this.timer = 0;
    this.gameOver = false;
    this.ctx.font = '2rem Bungee';
    this.ctx.textAlign = 'right';
  }

  updatePlayerPosition() {
    this.player.flap();
  }

  formatTimer() {
    return (this.timer * 0.001).toFixed(1);
  }

  drawPlayerStatus() {
    this.ctx.save();
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(
      `Score: ${this.score}`,
      this.canvas.width - 20,
      30
    );
    this.ctx.textAlign = 'left';
    this.ctx.fillText(
      `Timer: ${this.formatTimer()}`,
      20,
      30
    );
    this.ctx.restore();
  }
}