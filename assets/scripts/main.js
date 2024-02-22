import { Game } from './game.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const game = new Game(canvas, ctx);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  game.render();
  requestAnimationFrame(animate);
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  game.resize();
}

function mainSetup() {
  resizeCanvas();
  game.setupBackground('./assets/img/background_single.png')
  animate();
}

function updateGame(e) {
  if ((e instanceof KeyboardEvent) && e.code === 'Space') {
    game.updatePlayerPosition();
  }
  if ((e instanceof MouseEvent) && e.button === 0) {
    game.updatePlayerPosition();
  }
  if (e instanceof TouchEvent) {
    game.updatePlayerPosition();
  }
}

// Triggers

window.addEventListener('load', mainSetup);
window.addEventListener('resize', resizeCanvas);
window.addEventListener('keydown', updateGame)
canvas.addEventListener('mousedown', updateGame);
canvas.addEventListener('touchstart', updateGame);