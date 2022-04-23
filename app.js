function loop(){
  requestAnimationFrame(loop);
  animateParticleArray(particleArray);
  fadeCanvas();
  mouse.animate();
}
loop();
