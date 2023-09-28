let leftmost;
let points=[]
class dots{
  constructor(tempx,tempy){
    this.x = tempx;
    this.y = tempy;
  }
  show(){
    fill(0);
    ellipse(this.x,this.y,5,5);
  }
}
function setup() {
  createCanvas(400, 400);
  for(var i=0;i<50;i++){
    let tx = random(10,390);
    let ty = random(10,390);
    points.push(new dots(tx,ty));
  }
  leftmost = points[0];
}

function nextpoint(p,v){
  let bestangle=Infinity;
  let bestvector;
  let index;
  for(var i=0 ; i<points.length ; i++){
    if(points[i]==p){continue;}
    let tempv = createVector(points[i].x-p.x , points[i].y-p.y)
    let angle = v.angleBetween(tempv);
    if(angle<bestangle){
      bestangle = angle;
      bestvector= tempv;
      index = i;      
    }   
  }
  fill(255);
  line(p.x,p.y,points[index].x,points[index].y);
  nextpoint(points[index],bestvector);
  return points[index];
 
}
function draw() {
  background(255);
  for(var i=0;i<points.length;i++){
    points[i].show();
    if(points[i].x < leftmost.x){
      leftmost = points[i];
    }    
  }
  let v0 = createVector(0,1);
  nextpoint(leftmost , v0);
}