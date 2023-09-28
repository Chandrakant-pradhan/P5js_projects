var cols, rows;
var scl = 20;
var w = 1400;
var h = 1000;
let terrain;
let flying=0;
function grid(r , c){
  let arr = new Array(r);
  for(var i=0;i<c;i++){
    arr[i] = new Array(c);
  }
  return arr;
}
function setup() {
  createCanvas(600, 400, WEBGL);
  cols = w / scl;
  rows = h / scl;
  terrain = grid(rows,cols);
}

function draw() {
  flying -= 0.1;
  background(0);
  translate(0, 50);
  rotateX(PI / 3);
  fill(200, 200, 200, 150);
  translate(-w / 2, -h / 2);
  let yoff = flying;
    for (var y = 0; y < rows ; y++) {
      xoff =0;
        for (var x = 0; x < cols; x++) {
          terrain[x][y] =map(noise(xoff,yoff),0,1,-100,100);
          xoff += 0.1;
     }
      yoff += 0.1;
  }
  for (var y = 0; y < rows-1 ; y++) {
    beginShape(TRIANGLE_STRIP);
    for (var x = 0; x < cols; x++) {
      vertex(x * scl, y * scl,terrain[x][y]);
      vertex(x * scl, (y + 1) * scl,terrain[x][y+1]);
    }
    endShape();
  }
}