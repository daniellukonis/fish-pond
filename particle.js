
class Particle {
  constructor(){
    // this.x = canvas.width / 2;
    // this.y = canvas.height / 2;
    this.x = canvas.width * fxrand();
    this.y = canvas.height * fxrand();
    // this.x = 0;
    // this.y = 0;
    this.xTarget = 0;
    this.yTarget = 0;
    // this.xMidCanvas = canvas.width / 2;
    // this.yMidCanvas = canvas.height / 2;
    this.xMidCanvas = canvas.width * fxrand();
    this.yMidCanvas = canvas.height * fxrand();
    // this.v = 2 * fxrand() + 1;
    this.v = 0.5 * fxrand();
    this.l = 1;
    this.r = 200;
    this.rMax = 200;
    this.fillStyle = '#00000020';
    this.angle = Math.PI * 2 * fxrand();
    this.angleVelocity = Math.PI / 100 * fxrand();
    this.calcMaxRadius();
  }

  calcMaxRadius(){
    const rMax = canvas.width > canvas.height ? canvas.height : canvas.width;
    this.rMax = rMax / 4;
    this.r = ((this.rMax - 10) * fxrand()) + 10;
  }

  //returns angle between two points
  calcAngle(x1, y1, x2, y2){
    return Math.atan2(y2 - y1, x2 - x1);
  }

  //return distance between two points
  calcDistance(x1, y1, x2, y2){
    return Math.sqrt((x2 - x1)**2 + (y2 - y1)**2);
  }


  //return coords based on starting coords plus angle and distance
  calcCoord(x1, y1, angle, distance){
    const x2 = x1 + distance * Math.cos(angle);
    const y2 = y1 + distance * Math.sin(angle);
    return {x2, y2};
  };

  calcTarget(){
    const {x2, y2} = this.calcCoord(this.xMidCanvas, this.yMidCanvas, this.angle, this.r);
    this.xTarget = x2;
    this.yTarget = y2;
  }

  variSpeed({x: x1, y: y1, xTarget: x2, yTarget: y2} = this){

    const xThresh = Math.abs(x1 - x2) < this.rMax * 2 ? true : false;
    const yThresh = Math.abs(y1 - y2) < this.rMax * 2 ? true : false;
    this.v = xThresh && yThresh ? 1 * fxrand() + 1 : 0.5 * fxrand();
  }

  drawParticle({x, y, l} = this){
    context.save();
    context.fillStyle = this.fillStyle;
    context.beginPath();
    context.arc(x, y, l, 0, Math.PI * 2);
    context.fill();
    context.restore();
  }

  drawTarget(){
    context.save();
    context.lineWidth = 3;
    context.fillStyle = '#00000015';
    context.beginPath();
    // context.moveTo(this.xMidCanvas, this.yMidCanvas);
    // context.lineTo(this.xTarget, this.yTarget);
    // context.lineTo(this.x, this.y);
    context.arc(this.xTarget,this.yTarget, 2, 0, Math.PI * 2);
    context.fill();
    context.restore();
  }

  rotateTarget(){
    this.angle += this.angleVelocity;
  }

  approachTarget(){
    const angle = this.calcAngle(this.x, this.y, this.xTarget, this.yTarget);
    const distance = this.v;
    const {x2, y2} = this.calcCoord(this.x, this.y, angle, distance);
    this.x = x2;
    this.y = y2;
  }

  setMidCanvas(x, y){
    this.xMidCanvas = x;
    this.yMidCanvas = y;
  }

  animate(){
    this.variSpeed();
    this.rotateTarget();
    this.calcTarget();
    // this.drawTarget();
    this.approachTarget();
    this.drawParticle();
  }
}

const particle = new Particle();

function createParticleArray(quantity){
  const particleArray = Array();
  for(let i = 0; i < quantity; i++){
    particleArray.push(new Particle());
  }
  return particleArray;
}

const particleArray = createParticleArray(1000);

function animateParticleArray(particleArray){
  particleArray.forEach(e => {
    e.setMidCanvas(mouse.x ,mouse.y);
    e.animate();
  });
}
