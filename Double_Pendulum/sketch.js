let r1= 100;
let r2 = 100;
let m1 = 10;
let m2 = 10;
let a1 ;
let a2 ;
let a1_v = 0;
let a2_v = 0;
let a1_a;
let a2_a ;
let g=0.2;
function setup() {
  createCanvas(400, 400);
  a1 = PI/3;
  a2 = PI/6;
}

function draw() {
  let num1 = -g * (2 * m1 + m2) * sin(a1);
  let num2 = -m2 * g * sin(a1 - 2 * a2);
  let num3 = -2 * sin(a1 - a2) * m2;
  let num4 = a2_v * a2_v * r2 + a1_v * a1_v * r1 * cos(a1 - a2);
  let den = r1 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
  a1_a = (num1 + num2 + num3 * num4) / den;

  num1 = 2 * sin(a1 - a2);
  num2 = (a1_v * a1_v * r1 * (m1 + m2));
  num3 = g * (m1 + m2) * cos(a1);
  num4 = a2_v * a2_v * r2 * m2 * cos(a1 - a2);
  den = r2 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
  a2_a = (num1 * (num2 + num3 + num4)) / den;
  background(225);
  stroke(0);
  strokeWeight(2);
  translate(200,50);
  let x1 = r1 * sin(a1);
  let y1 = r1* cos(a1);
  let x2 = x1+r2 * sin(a2);
  let y2 = y1+r2 * cos(a2);
  line(0,0,x1,y1);
  fill(0);
  ellipse(x1,y1,m1,m1);
  line(x1,y1,x2,y2);
  ellipse(x2,y2,m2,m2);
  a1 += a1_v;
  a2 += a2_v;
  a1_v +=a1_a;
  a2_v+= a2_a;
}