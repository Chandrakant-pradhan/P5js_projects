
let grid;
let noofbees=40;
let available=[];
class cell{
  constructor(i,j){
    this.i=i;
    this.j=j;
    this.x=i*20;
    this.y=j*20;
    this.bee = false;
    this.revealed = false;
    this.neighbour = 0;
  }
  show(){
    strokeWeight(2);
    noFill();
    rect(this.x,this.y,20,20);
    if(this.revealed){
    if(this.bee){
      fill(200);
      ellipse(this.x +10 , this.y +10 ,10,10);
    }
    else{
      fill(200);
      rect(this.x, this.y, 20, 20);
      if (this.neighbour > 0) {
      textAlign(CENTER);
      fill(0);
      text(this.neighbour, this.x + 20* 0.5, this.y + 20 - 6);
    }
    }
    
    }
  }
  reveal(){
    this.revealed =true;
    if(this.neighbour==0){
      this.floodfill();
    }
  }
  floodfill(){
    for (var xoff = -1; xoff <= 1; xoff++) {
    var i = this.i + xoff;
    if (i < 0 || i >19) continue;

    for (var yoff = -1; yoff <= 1; yoff++) {
      var j = this.j + yoff;
      if (j < 0 || j > 19) continue;

      var neighbour = grid[i][j];
      if (!neighbour.revealed) {
        neighbour.reveal();
      }
    }
  }
    
  }
  
  beecount(){
    if (this.bee) {
    this.neighbour = -1;
    return;
  }
  var total = 0;
  for (var xoff = -1; xoff <= 1; xoff++) {
    var i = this.i + xoff;
    if (i < 0 || i >19) continue;

    for (var yoff = -1; yoff <= 1; yoff++) {
      var j = this.j + yoff;
      if (j < 0 || j > 19) continue;

      var neighbour = grid[i][j];
      if (neighbour.bee) {
        total++;
      }
    }
  }
  this.neighbour = total;
  }
  
}

function makegrid(x,y){
  let arr = new Array(x);
  for(var i=0;i<x;i++){
    arr[i] = new Array(y);
  }
  return arr;
}
function setup() {
  grid = makegrid(20,20);
  createCanvas(400, 400);
  for(var i=0;i<20;i++){
    for(var j=0;j<20;j++){
      grid[i][j]=new cell(i,j);
    }
  }
  options();
  allocation(); 
  for(var a=0;a<20;a++){
    for(var b=0;b<20;b++){
      grid[a][b].beecount();
    }
  }
  
}
function mousePressed(){
  let i = floor(mouseX/20);
  let j = floor(mouseY/20);
  if(grid[i][j].bee){
    gameover();
  }
  grid[i][j].reveal();
}
function options(){
  for(var i=0;i<20;i++){
    for(var j=0;j<20;j++){
      available.push([i,j]);
    }
  }
}
function gameover(){
  for(var i=0;i<20;i++){
    for(var j=0;j<20;j++){
      grid[i][j].revealed = true; 
    }
  }
}
function allocation(){
  for(var i=0;i<noofbees;i++){
    let index = random(available.length);
    let spot = available.splice(index,1)[0];
    grid[spot[0]][spot[1]].bee = true;
  }
}

function draw() {
  background(255);
  for(var i=0;i<20;i++){
    for(var j=0;j<20;j++){
      grid[i][j].show();
    }
  }
  
  
}