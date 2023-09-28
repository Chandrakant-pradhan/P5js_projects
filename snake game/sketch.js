let s;
let col=20;
let food;
class snake{
  constructor(){
    this.x=0;
    this.y=0;
    this.speedx=1;
    this.speedy=0;
    this.total=0;
    this.tail=[];
  }
  update(){
    for (var i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }
    if (this.total >= 1) {
      this.tail[this.total - 1] = createVector(this.x, this.y);
    }

    this.x = this.x + this.speedx * col;
    this.y = this.y + this.speedy * col;

    this.x = constrain(this.x, 0, width - col);
    this.y = constrain(this.y, 0, height - col);
  }

  show() {
    fill(255);
    for (var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, col, col);
    }
    rect(this.x, this.y, col, col);

  }
  dir(x,y){
    this.speedx =x;
    this.speedy =y;
  }
  eat(pos){
    var d=dist(this.x,this.y,pos.x,pos.y);
    if(d<1){ this.total++ ; return true;}
    else{return false;}
    
  }
  death() {
    for (var i = 0; i < this.tail.length; i++) {
      var pos = this.tail[i];
      var d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
        console.log('starting over');
        this.total = 0;
        this.tail = [];
      }
    }
  }

}
function setup() {
  createCanvas(400, 400);
  frameRate(10)
  s=new snake();
  picklocation();
}
function picklocation(){
   food = createVector(floor(random(width/col)),floor(random(height/col)));
  food.mult(col);
}

function keyPressed(){
  if(keyCode === UP_ARROW){s.dir(0,-1);}
  if(keyCode === DOWN_ARROW){s.dir(0,1);}
  if(keyCode === RIGHT_ARROW){s.dir(1,0);}
  if(keyCode === LEFT_ARROW){s.dir(-1,0);}
  
  
  
}

function draw() {
  background(0);
  s.show();
  s.update();
  s.death();
  fill(150);
  rect(food.x,food.y,20,20);
  if(s.eat(food)){
    picklocation();
  }
}