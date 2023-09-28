let inc =0.1;
let scl =10;
let rows,cols;
let zoff=0;
let particles=[];
let flowfield;
class particle{
  constructor(){
    this.pos = createVector(random(width),random(height));
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);
    this.maxspeed= 2;
    this.prevpos = this.pos.copy();
  }
  update(){
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.acc.mult(0);
  }
  follow(vectors){
    let x = floor(this.pos.x/scl);
    let y = floor(this.pos.y/scl);
    let index = x+y*cols;
    var force = vectors[index];
    this.applyforce(force);
  }
  applyforce(force){
    this.acc.add(force);
  }
  show(){
    stroke(255,10);
    strokeWeight(1);
    line(this.pos.x,this.pos.y,this.prevpos.x,this.prevpos.y);
    //point(this.pos.x,this.pos.y);
    this.updatePrev();
  }
  updatePrev(){
    this.prevpos.x=this.pos.x;
    this.prevpos.y =this.pos.y;
  }
  edges() {
    if (this.pos.x > width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.updatePrev();
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      this.updatePrev();
    }

  }
}
function setup() {
  createCanvas(600,400);
  rows = floor(height/scl);
  cols = floor(width/scl);
  flowfield = new Array(rows*cols);
  for(var i=0;i<300;i++){
    particles.push(new particle());
  }
   background(51);
}

function draw() {
  let yoff = 0;
  for(var y=0;y<rows;y++){
    let xoff =0;
   for(var x=0 ;x<cols;x++){
     let index = (x+y*cols);
     let angle = noise(xoff,yoff,zoff)*TWO_PI*4;
     var v = p5.Vector.fromAngle(angle);
     v.setMag(0.8);
     flowfield[index]=v;
     xoff += inc;
     /* stroke(0);
     push();
     translate(x*scl,y*scl);
     rotate(v.heading());
     strokeWeight(1);
     line(0,0,scl,0);
     pop(); */
   }
    yoff += inc;
    zoff += 0.0003;
  }
  
  for(var i=0;i<300;i++){
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].show();
    particles[i].edges();
  }
  

  
  
}