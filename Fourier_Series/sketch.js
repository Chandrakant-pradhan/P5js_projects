let times = 0;
let wave = [];
let k = 6;
function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);
  translate(150,200);
  let x=0;
  let y=0;
  for(var i=0;i<k;i++){
    let n = 2*i+1;
    let radius = 70*(4/(n*PI));
    prevx = x;
    prevy = y;
    x += radius * cos(n*times);
    y += radius * sin(n*times);
    if( i== k-1){
    wave.unshift(y);
    }
    stroke(255,100);
    noFill();
    ellipse(prevx,prevy,radius*2);
    strokeWeight(2);
    stroke(255);
    fill(255);
    line(prevx,prevy,x,y);
    ellipse(x,y,1);
  }
  translate(200,0);
  line(x-200,y,0,wave[0]);
  stroke(255);
  beginShape();
  noFill();
  for(var j=0;j<wave.length;j++){
    vertex(j,wave[j]);
  }
  endShape();
  if(wave.length>500){
    wave.pop();
  }
  times -= 0.05;
}