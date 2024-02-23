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
    this.message1;
    this.message2;
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

  isThereCollision(obstacle, player) {
    const dx = obstacle.collisionX - player.collisionX;
    const dy = obstacle.collisionY - player.collisionY;
    const distance = Math.hypot(dx, dy);
    const sumOfRadius = obstacle.collisionRadius + player.collisionRadius;
    return distance <= sumOfRadius;
  }

  setupBackground(src) {
    this.background.setupImage(src);
  }

  render( deltaTime ) {
    if (!this.gameOver) this.timer += deltaTime;
    // this.timer += deltaTime;
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

    if (this.gameOver) {
      if (this.player.collided){
        this.message1 = 'Getting rusty?';
        this.message2 = `Collision time ${this.formatTimer()} seconds`;
      } else if (this.obstacles.length <= 0) {
        this.message1 = 'Nailed it!';
        this.message2 = `Can you do it faster than ${this.formatTimer()} seconds?`;
      }
      this.ctx.font = '5rem Bungee';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(
        this.message1,
        this.canvas.width / 2,
        (this.canvas.height / 2) - 30
        );
        this.ctx.font = '3rem Bungee';
        this.ctx.fillText(
          this.message2,
          this.canvas.width / 2,
        (this.canvas.height / 2) + 5
      );
        this.ctx.font = '2rem Bungee';
        this.ctx.fillText(
          'Press \'R\' to try again!',
          this.canvas.width / 2,
        (this.canvas.height / 2) + 40
      );
    }

    this.ctx.restore();
  }
}