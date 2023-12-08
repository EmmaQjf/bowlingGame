
	/*----- functions -----*/
	let knockedPin = 88;
 let count = 9;
 let round = Math.floor((count-1)/2);
 console.log(round);
 function firstOrSecondTry() {
 if (count % 2 === 0) {
	return 1;
 } else {
	return 0;
 }
}

let whichtry = firstOrSecondTry();
// let throw = whichtry();
console.log(whichtry);


// let eachThrowCellID = `r2c${round}throw${whichtry}`;
// console.log(eachThrowCellID);
// const cellEl = document.getElementById(eachThrowCellID);
// cellEl.innerHTML = "88";
// let eachCellValue = cellEl.innerHTML; 

// let eachroundSum = `r3c${round}`;
// console.log(eachroundSum);
// const eachroundSumEl = document.getElementById(eachroundSum);
// eachroundSumEl.innerHTML = "0";
// let eachroundSumValue = eachroundSumEl.innerHTML; 
// console.log(eachroundSumValue);



// define the board 
let scoreboard = [
	[1,2,3],
	[4,5,6],
	[0,0,0],
	[0,0,0],
	[0,0,0],
	[0,0,0],
	[0,0,0],
	[0,0,0],
	[0,0,0],
	[0,0,0]
]

let colArr = scoreboard[round];
console.log(colArr);
scoreboard[round][whichtry] = knockedPin;
console.log(scoreboard);

function render() {
	scoreboard.forEach(function(colArr,colIdx) {
		colArr.forEach(function(rowVal,rowIdx){
			const eachThrowCellID = `r2c${colIdx}throw${rowIdx}`
			const cellEl = document.getElementById(eachThrowCellID);
			cellEl.innerHTML = rowVal;
		})
	})
}
render();



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
const Ball_start_x = ball.x;
const Ball_start_y = ball.y;
const Ball_end_x = null;
const Ball_end_y = null;

// function game(){
//   update(); // movements, collision detection,scoreupdate
//   render();
// }
// const framePerSecond = 50;
// setInterval(game, 1000/framePerSecond);
 
 /*----- state variables -----*/
 let BALL_DRAG = false;
const bowlingBall = drawCircle(ball.x, ball.y, ball.r, ball.color);
 let pin1,pin2,pin3,pin4,pin5,piin6,pin7,pin8,pin9,pin10;
 

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
// position canvas method
const positionCanvas = function(){
  canvas.style.position = 'absolute';
  canvas.style.top = "180px";
  canvas.style.left = window.innerWidth / 2 - canvas.width / 2 +"px";
};

// attach position canvas method to window resize event
window.addEventListener('resize', positionCanvas);
positionCanvas();
//   const handleGrab = (event) => {
//     let mouseX = event.pageX -parseInt(canvas.style.left.replace(' px',''));
//     let mouseY  = event.pageY-parseInt(canvas.style.top.replace(' px',''));
//     if_mouse_on_ball();
  
// }

// const handleDragBall = (event)=> {
//   if (!BALL_DRAG) return;
//   let mouseX = event.pageX -parseInt(canvas.style.left.replace(' px',''));
//   let mouseY  = event.pageY-parseInt(canvas.style.top.replace(' px',''));
//   //  bowl.style.xposition = mouseY + "px";
//   //  bowl.style.yposition = mouseX + "px";

//  console.log(mouseX ,  mouseY);
// }  

// document.addEventListener("pointermove",handleDragBall)

let mouse_down = function(event) {
  event.preventDefault();
  console.log(event);
  let mouseX = event.pageX -parseInt(canvas.style.left.replace(' px',''));
  let mouseY  = event.pageY-parseInt(canvas.style.top.replace(' px',''));
  console.log(mouseX,mouseY);

  console.log(ball.x,ball.y)
  if_mouse_on_ball();

}

canvas.onmousedown = mouse_down;


function if_mouse_on_ball(mouseX, mouseY){
  const distance = Math.sqrt(
    ((mouseX-ball.x)*(mouseX-ball.x))+((mouseY-ball.y)*(mouseY-ball.y))
  )
  console.log(distance);
  return distance;
}

// let shapes = [];
// shapes.push({x:0,y:0,width:200,height:200,color:"red"});
// shapes.push({x:0,y:0,width:100,height:100,color:"blue"});

// let draw_shapes =function() {
//   for(let shape of shapes){
//     context.fillStyle =shape.color;
//     context.fillRect(shape.x,shape.y,shape.width,shape.height)
//   }
// }
// draw_shapes();

// add ball movement 

  
  /*----- functions -----*/


/*----- pseuodocode -----*/

 // add keyboard reaction to the arrows
// let rightPressed = false;
// let leftPressed = false;
// document.addEventListener("keydown", keyDownHandler, false);
// document.addEventListener("keyup", keyUpHandler, false);

// function keyDownHandler(e) {
//     if (e.key === "Right" || e.key === "ArrowRight") {
//       rightPressed = true;
//     } else if (e.key === "Left" || e.key === "ArrowLeft") {
//       leftPressed = true;
//     }
//     if (rightPressed) {
//         ball.x = Math.min(ball.x+7,canvas.width-30);
//       } else if (leftPressed) {
//         ball.x = Math.max(ball.x-7,30);
//       }
      
      
//       console.log(ball_start_x, ball_start_y);
//      drawRect(30,0,180,600,'#8B4513'); //lane
//      drawRect(0,0,30,600,'grey'); //leftgutter
//      drawRect(210,0,30,600,'grey');//rightgutter
//       drawCircle(ball.x, ball.y, ball.r, ball.color); //bowling ball
//       ball_start_x = ball.x;
//       ball_start_y = ball.y;
//       context.drawImage(leftArrow,30,480,30,30);
//       context.drawImage(rightArrow,180,480,30,30);

//   }
  
// function keyUpHandler(e) {
//     if (e.key === "Right" || e.key === "ArrowRight") {
//       rightPressed = false;
//     } else if (e.key === "Left" || e.key === "ArrowLeft") {
//       leftPressed = false;
//     }
//   }
//  const ball_start_x = ball.x;
//  const ball_start_y = ball.y;