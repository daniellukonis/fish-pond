const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

function resizeCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();

function fadeCanvas(){
  context.save();
  context.fillStyle = '#FFFFFF05'
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.restore();
}
