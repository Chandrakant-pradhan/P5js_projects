let board =[
  ['','',''],
  ['','',''],
  ['','','']
];
let w = 100;
let h =  100;
let ai='x';
let human='o';
let players=['x','o'];
let available=[];
let currentplayer;
function setup() {
  createCanvas(300, 300);
  currentplayer = players[floor(random(2))];
  for(var i=0;i<3;i++){
    for(var j=0;j<3;j++){
      available.push([i,j]); 
    }
  }
}

function bestmove(){
  if(currentplayer==ai){
  let bestscore= -Infinity;
  let move;
  for(var i=0;i<3;i++){
    for(var j=0;j<3;j++){
      if(board[i][j]==''){
        board[i][j]=ai;
        let score=minimax(board,0,false);
        board[i][j]='';
        if(score > bestscore){
          bestscore = score;
          move={i,j};
        }
      }
    }
  }
  let result=checkwinner();
  if(result != 'tie'){
  board[move.i][move.j]=ai;}
  currentplayer=human;
  }
  if(mouseIsPressed){
    mousePressed();
  }

}
let s= {x: 1 , o:-1 ,tie:0};

function minimax(board,depth,ismaximizing){
  let result = checkwinner();
  if(result !=null){
    return s[result];
  }
  if(ismaximizing){
    let bestscore=-Infinity;
    for(var i=0;i<3;i++){
      for(var j=0;j<3;j++){
        if(board[i][j]==''){
          board[i][j]=ai;
          score = minimax(board,depth+1,false);
          board[i][j]='';
          bestscore=max(score,bestscore);
        }
      }
    }
    return bestscore;
  }
  else{
    let bestscore=Infinity;
    for(var i=0;i<3;i++){
      for(var j=0;j<3;j++){
        if(board[i][j]==''){
          board[i][j]=human;
          score = minimax(board,depth+1,true);
          board[i][j]='';
          bestscore=min(score,bestscore);
        }
      }
    }
    return bestscore;
  }
  
}
function equals3(a, b, c) {
  return (a == b && b == c && a != '');
}

function mousePressed(){
  if (currentplayer == human) {
    // Human make turn
    let i = floor(mouseX / w);
    let j = floor(mouseY / h);
    // If valid turn
    if (board[i][j] == '') {
      board[i][j] = human;
      currentplayer = ai;
      bestmove();
    }
  }
}

  

function checkwinner(){
  let winner= null;
  //horizontal
  for(var i=0;i<3;i++){
    if(equals3(board[i][0], board[i][1], board[i][2])){
      winner=board[i][0];
    }
  }
    //vertical
    for(var j=0;j<3;j++){
      if(equals3(board[0][j], board[1][j], board[2][j])){
        winner = board[0][j];
      }
    }
    //diagonal
    if(equals3(board[0][0], board[1][1], board[2][2])){winner = board[0][0];}
    if(equals3(board[2][0], board[1][1], board[0][2])){winner = board[0][2];}
  let count=0;
  for(var a=0;a<3;a++){
    for(var b=0;b<3;b++){
      if(board[a][b]==''){
        count++;
      }
    }
  }
  
  if(winner==null && count==0){
    return 'tie';
  }
  else{
    return winner;
  }
  
  
}
function draw() {
  background(220);
 
  strokeWeight(2);
  line(w,0,w,height);
  line(2*w,0,2*w,height);
  line(0,h,width,h);
  line(0,2*h,width,2*h);
  for(var i=0;i<3;i++){
    for(var j=0;j<3;j++){
      let x = w*i + w/2;
      let y = h*j + h/2;
      let spot = board[i][j];
      if(spot==players[1]){
        noFill();
        ellipse(x,y,w/2);
      }
      if(spot==players[0]){
        line(x-w/4,y-h/4,x+w/4,y+h/4);
        line(x+w/4,y-h/4,x-w/4,y+h/4);
      }
    }
  }
  let result =checkwinner();
  if(result != null){
    noLoop();
    let resultP = createP('');
    resultP.style('font-size', '32pt');
    if (result == 'tie') {
      resultP.html("Tie!")
    } else {
      resultP.html(`${result} wins!`);
    }
  } 
  else{
    bestmove();
  }
    
 
}