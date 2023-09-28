
let block1;
let block2;
let count = 0;
let digits = 8;
let countDiv;
const timeSteps = 10 ** (digits - 1);


class Block{
  constructor(x,w,m,v,xc){
    this.x=x;
    this.y=height-w;
    this.w=w;
    this.m=m;
    this.v=v;
    this.xConstraint=xc;
  }
  update(){
    this.x += this.v;
  }
  show(){
    fill(255);
    const x = constrain(this.x, this.xConstraint, width);
    rect(x,height-this.w*0.5,this.w,this.w);
  }
  reverse(){
    this.v *= -1;
  }
  hitWall(){
    if(this.x<= 0){
      return true;
    }
  }
  collide(other) {
    return !(this.x + this.w < other.x ||
      this.x > other.x + other.w);
  }
  bounce(other){
    let sumM= this.m + other.m;
    let newV = (this.m - other.m)/sumM * this.v;
    newV += (2*other.m/sumM)*other.v;
    return newV;
  }
  
}
function setup() {
  createCanvas(windowWidth, 200);
  block1 = new Block(100, 20, 1, 0, 0);
  const m2 = pow(100, digits - 1);
  block2 = new Block(300, 100, m2, -1 / timeSteps, 20);
  countDiv = createDiv(count);
  countDiv.style('font-size', '72pt');
}

function draw() {
  background(200);
 for (let i = 0; i < timeSteps; i++) {
    if (block1.collide(block2)) {
      const v1 = block1.bounce(block2);
      const v2 = block2.bounce(block1);
      block1.v = v1;
      block2.v = v2;
      count++;
    }

    if (block1.hitWall()) {
      block1.reverse();
      count++;
    }

    block1.update();
    block2.update();
  }
  block1.show();
  block2.show();

  countDiv.html(nf(count, digits));
}