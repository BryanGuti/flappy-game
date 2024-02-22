import { Game } from './game.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const game = new Game(canvas, ctx);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  game.render();
  if ( !game.gameOver ) requestAnimationFrame(animate);
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  game.resize();
}

function mainSetup() {
  resizeCanvas();
  animate();
}

function updateGame(e) {
  if (
    ((e instanceof KeyboardEvent) && e.code === 'Space') ||
    ((e instanceof MouseEvent) && e.button === 0) ||
    (e instanceof TouchEvent)
  ) {
    game.updatePlayerPosition();
  }
}

// Main triggers

window.addEventListener('load', mainSetup);
window.addEventListener('resize', resizeCanvas);

// User events

window.addEventListener('keydown', updateGame)
canvas.addEventListener('mousedown', updateGame);
canvas.addEventListener('touchstart', updateGame);