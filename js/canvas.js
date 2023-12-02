/*----- constants -----*/

const canvas = document.getElementById("bowling");
const context = canvas.getContext("2d");
canvas.width =240;
canvas.height = 600;
const lane = drawRect(30,0,180,600,"#8B4513");
 const channelLeft = drawRect(0,0,30,600,"grey");
 const channelRight = drawRect(210,0,30,600,"grey")

 const ball = {
  x: canvas.width/2,
  y: 570,
  r:15,
  velocityX: 0,
  velocityY: 1,
  color:"red",
 }

 const pin = {
  x: canvas.width/2 - 15,
  y: 20,
  r: 10,
  color: "white"
 }

 // draw bowling lane and ball
function drawRect(x,y,w,h,color){
  context.fillStyle = color;
  context.fillRect(x,y,w,h);
}

function drawCircle (x,y,r,color){
  context.fillStyle =color;
  context.beginPath();
context.arc(x,y,r,0,Math.PI*2,false)
context.closePath();
context.fill();
}
let ball_start_x = ball.x;
let ball_start_y = ball.y;
let ball_end_x = null;
let ball_end_y = null;
let distanceX;
let distanceY;

// function game(){
//   update(); // movements, collision detection,scoreupdate
//   render();
// }
// const framePerSecond = 50;
// setInterval(game, 1000/framePerSecond);
 
 /*----- state variables -----*/
 let BALL_DRAG = false;
 drawCircle(ball.x, ball.y, ball.r, ball.color);
 let pin1,pin2,pin3,pin4,pin5,piin6,pin7,pin8,pin9,pin10;
 let is_draggingBall = false;
 

  /*----- cached elements  -----*/
  function initBall() {
     
    pin1 = drawCircle(pin.x -30,pin.y,pin.r,pin.color);
    pin2 = drawCircle(pin.x,pin.y,pin.r,pin.color);
    pin3 = drawCircle(pin.x +30,pin.y,pin.r,pin.color);
    pin4 = drawCircle(pin.x +60,pin.y,pin.r,pin.color);
    pin5 = drawCircle(pin.x-15 ,pin.y +20,pin.r,pin.color);
    pin6 = drawCircle(pin.x+15 ,pin.y +20,pin.r,pin.color);
    pin7 = drawCircle(pin.x+45 ,pin.y +20,pin.r,pin.color);
    pin8 = drawCircle(pin.x,pin.y +40,pin.r,pin.color);
    pin9 = drawCircle(pin.x +30,pin.y+40,pin.r,pin.color);
    pin10 = drawCircle(pin.x+15 ,pin.y +60,pin.r,pin.color); 
  }

  initBall();
  
  /*----- event listeners -----*/



// document.addEventListener("pointermove",handleDragBall)
canvas.addEventListener("mousedown", grabBall);
// canvas.addEventListener("mouseup", function(evt){
//   if(!is_draggingBall){
//     return;
//   }
//   evt.preventDefault();
//   is_draggingBall = false;
// })
// canvas.addEventListener("mouseout", function(evt){
//   if(!is_draggingBall){
//     return;
//   }
//   evt.preventDefault();
//   is_draggingBall = false;
// })
canvas.addEventListener("mousemove", dragBall)
// drag the ball and caculate the angel and make the ball move in that direction
function dragBall(evt) {
  if(!is_draggingBall) {
    return;
  } else {
  evt.preventDefault();
  let rect = canvas.getBoundingClientRect();
  let mouseX = evt.clientX - rect.left;
  let mouseY = evt.clientY - rect.top;
  let distanceX = mouseX - ball_start_x;
  let distanceY = mouseY - ball_start_y;
  console.log(distanceX, distanceY);
  ball.y  += distanceY;
  ball.x += distanceX;
  drawCircle(ball.x, ball.y, ball.r, ball.color);
  ball_start_x = mouseX;
  ball_start_y = mouseY;
  }
  
  function throwBall (){

  }

}
// grab the ball
function grabBall(evt){
  let rect = canvas.getBoundingClientRect();
  let mouseY = evt.clientY - rect.top;
  let mouseX =  evt.clientX - rect.left;
  evt.preventDefault();

  //check whether the mouse is inside the ball radius 
  if(if_mouse_on_ball(mouseX,mouseY)){
    console.log("yes");
    is_draggingBall = true;
    return;
  } else {
    console.log("no");
    is_draggingBall = false;
  }

  
}
// let mouse_down = function(event) {
//   event.preventDefault();
//   console.log(event);
//   let mouseX = event.pageX -parseInt(canvas.style.left.replace(' px',''));
//   let mouseY  = event.pageY-parseInt(canvas.style.top.replace(' px',''));
//   console.log(mouseX,mouseY);

//   console.log(ball.x,ball.y)
//   if_mouse_on_ball();

// }

// canvas.onmousedown = mouse_down;


function if_mouse_on_ball(mouseX, mouseY){
  const distance = Math.sqrt(
    ((mouseX-ball_start_x)*(mouseX-ball_start_x))+((mouseY-ball_start_y)*(mouseY-ball_start_y))
  )
  console.log(distance);
  if(distance <= ball.r){
    return true;
  }
  return false;
}

