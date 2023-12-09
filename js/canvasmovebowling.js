/*----- constants -----*/

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.width = 240;
canvas.height = 600;
canvas.style.cursor = 'crosshair';
const lane = drawRect(30,0,180,600,'#8B4513');
const channelLeft = drawRect(0,0,30,600,'grey');
const channelRight = drawRect(210,0,30,600,'grey')

const ball = {
  x: canvas.width/2,
  y: 500,
  r: 20,
//   speed: null,
//   velocityX: null,
//   velocityY: null,
  color:"red"
}

const pin = {
    x: canvas.width/2 - 15,
    y: 20,
    r: 10,
    color: 'white'
  }
 // define the two arrows
const leftArrow = new Image();
leftArrow.src = "./img/left-arrow.png";
leftArrow.onload = function() {
    context.drawImage(leftArrow,30,480,35,35);
}

const rightArrow = new Image();
rightArrow.src = "./img/right-arrow.png";
rightArrow.onload = function() {
    context.drawImage(rightArrow,180,480,35,35);
}

 const pinKnockSound = new Audio("https://docs.google.com/uc?export=download&id=19CCo3gZzRhSBW43cVHFiQmJdiFJPuXE6")
 const gruntSound = new Audio("https://docs.google.com/uc?export=download&id=10MGDofCN3u6vJ_Z2UZTdM9MRI9jZv7cG")
 const congratsSound = new Audio("https://docs.google.com/uc?export=download&id=1fZunz4oqxt1sZN-VQW44pbbtca2DgLRd")

 
 // draw bowling lane, ball and pins
function drawRect(x,y,w,h,color) {
  context.fillStyle = color;
  context.fillRect(x,y,w,h);
}

function drawCircle (x,y,r,color) {
  context.fillStyle = color;
  context.beginPath();
  context.arc(x,y,r,0,Math.PI*2,false)
  context.closePath();
  context.fill();
}

function draw_pins() {
  for (let pin of pins){
    context.fillStyle = pin.color;
    context.beginPath();
    context.arc(pin.x,pin.y,pin.r,0,Math.PI*2,false)
    context.closePath();
    context.fill();
  }
}

 
 /*----- state variables -----*/
let pins = []; 

    pins.push({x:pin.x -30 , y:pin.y , r:pin.r , color:pin.color })
    pins.push({x:pin.x , y:pin.y , r:pin.r , color:pin.color })
    pins.push({x:pin.x + 30 , y:pin.y , r:pin.r , color:pin.color })
    pins.push({x:pin.x + 60 , y:pin.y , r:pin.r , color:pin.color })
    pins.push({x:pin.x - 15 , y:pin.y + 20 , r:pin.r , color:pin.color })
    pins.push({x:pin.x + 15 , y:pin.y + 20 , r:pin.r , color:pin.color })
    pins.push({x:pin.x + 45 , y:pin.y + 20 , r:pin.r , color:pin.color })
    pins.push({x:pin.x , y:pin.y + 40 , r:pin.r , color:pin.color })
    pins.push({x:pin.x + 30 , y:pin.y + 40 , r:pin.r , color:pin.color })
    pins.push({x:pin.x + 15 , y:pin.y + 60 , r:pin.r , color:pin.color })
 

let ball_start_x = null;
let ball_start_y = null;
let ball_end_x = null;
let ball_end_y = null;
let distanceX, distanceY;
let is_draggingBall = false;
let mouseX, mouseY;
let angleRadian;
let knockedPin = 0;
let hittingPins;
let Left_max_pin_hitting_tan,Right_max_pin_hitting_tan



  /*----- cached elements  -----*/
const playAgain = document.getElementById('play_again');
const redLight = document.getElementById('red-light');
const greenLight = document.getElementById('green-light');


function initBall() {
  drawCircle(ball.x, ball.y, ball.r, ball.color);
  draw_pins();
}
initBall();

function draw_lane_gutter_arrows() {
  drawRect(30,0,180,600,'#8B4513'); //lane
  drawRect(0,0,30,600,'grey'); //leftgutter
  drawRect(210,0,30,600,'grey');//rightgutter
  drawCircle(ball.x, ball.y, ball.r, ball.color);
  context.drawImage(leftArrow,30,480,30,30);
  context.drawImage(rightArrow,180,480,30,30);
}
  
function initCanvas() {
  pins = []; 
 pins.push({x:pin.x -30 , y:pin.y , r:pin.r , color:pin.color })
 pins.push({x:pin.x , y:pin.y , r:pin.r , color:pin.color })
 pins.push({x:pin.x + 30 , y:pin.y , r:pin.r , color:pin.color })
 pins.push({x:pin.x + 60 , y:pin.y , r:pin.r , color:pin.color })
 pins.push({x:pin.x - 15 , y:pin.y + 20 , r:pin.r , color:pin.color })
 pins.push({x:pin.x + 15 , y:pin.y + 20 , r:pin.r , color:pin.color })
 pins.push({x:pin.x + 45 , y:pin.y + 20 , r:pin.r , color:pin.color })
 pins.push({x:pin.x , y:pin.y + 40 , r:pin.r , color:pin.color })
 pins.push({x:pin.x + 30 , y:pin.y + 40 , r:pin.r , color:pin.color })
 pins.push({x:pin.x + 15 , y:pin.y + 60 , r:pin.r , color:pin.color })
  ball.x = canvas.width/2;
  ball.y = 500;
  knockedPin = 0;
  is_draggingBall = false;
//  initBall();
  draw_lane_gutter_arrows();
  draw_pins();
  initScoreBoard();
  }

  /*----- event listeners -----*/
canvas.addEventListener("click",ballMoveLeftOrRight);
canvas.addEventListener('mousedown', grabBall);
canvas.addEventListener('mousemove', dragBall)
canvas.addEventListener('mouseup', mouse_up);
playAgain.addEventListener("click", initCanvas);


/*----- functions -----*/
// move mouse to move the ball to left or right 
let Is_ball_move_left_or_right = false;
function ballMoveLeftOrRight (evt){
    Is_ball_move_left_or_right = true;
    let rectXY = canvas.getBoundingClientRect();
    let mouseXX =  evt.clientX - rectXY.left;
  //   if (mouseXX > ball.x) {
  //     ball.x = Math.min(ball.x+7,canvas.width-30);
  // } else if (mouseXX < ball.x) {
  //   ball.x = Math.max(ball.x-7,30);
  // }
    ball.x = mouseXX;
    ball_start_x = ball.x;
    ball_start_y = ball.y;
    draw_lane_gutter_arrows();
    draw_pins() //drawpins
  // define the hitting points of pins
  const left_Collision_PointX = pin.x -30 -pin.r;
  const right_Collision_PointX = pin.x +60 + pin.r;
   Left_max_pin_hitting_tan = (ball_start_x - left_Collision_PointX)/(ball_start_y-pin.y);
   Right_max_pin_hitting_tan = (ball_start_x - right_Collision_PointX)/(ball_start_y-pin.y);
}
    

// grab the ball
function grabBall(evt) {
    // check the condition
  Is_ball_move_left_or_right =true;
  let rect = canvas.getBoundingClientRect();
  let mouseY = evt.clientY - rect.top;
  let mouseX =  evt.clientX - rect.left;
  evt.preventDefault();

  //check whether the mouse is inside the ball radius 
  if (if_mouse_on_ball(mouseX, mouseY)) {
    is_draggingBall = true;
    canvas.style.cursor = 'grab';
  } else {
    is_draggingBall = false;
  } 
}

function if_mouse_on_ball(mouseX, mouseY) {
  const distance = Math.sqrt(
    ((mouseX-ball_start_x)*(mouseX-ball_start_x))+((mouseY-ball_start_y)*(mouseY-ball_start_y))
  )
  if (distance <= ball.r) {
    return true;
  }
  return false;
}

// drag the ball and caculate the angel and make the ball move in that direction
function dragBall(evt) {
  if (!is_draggingBall) {
    return;
  } else {
  evt.preventDefault();
  let rect = canvas.getBoundingClientRect();
   mouseX = evt.clientX - rect.left;
   mouseY = evt.clientY - rect.top;
  ball.x = mouseX;
  ball.y = mouseY;
  distanceX = mouseX - ball_start_x;
  distanceY = mouseY - ball_start_y;
  }
}


// mouse_up function
function mouse_up(evt) {
    // if (!is_draggingBall) {
    //   return;
    // }
    if (!is_draggingBall) return;
    evt.preventDefault();
    is_draggingBall = false;
    ball.x = mouseX;
    ball.y = mouseY;
    ball_end_x = mouseX;
    ball_end_y = mouseY;
    canvas.style.cursor = 'crosshair';
    is_ballroling = 'true';
    // define the angels the ball will go 
    let adj = distanceY;
    let opp = distanceX;
      //represents the tangent value.
    let tan = (opp/adj);
      //compute the arc tangent.π/2 <= θ <= π/2 (radians)
    angleRadian = Math.atan(tan);
    gruntSound.play();
    throwBall();
  }
  
  function throwBall (){
    redLight.style.backgroundColor = "#EE4B2B";
    greenLight.style.backgroundColor = "black";
    if_hit_the_pins(angleRadian);
    let ballRolling = setInterval(()=>{
    draw_lane_gutter_arrows();
    // initBall();
    draw_pins();
    ball.y = ball.y - Math.cos(angleRadian)*20;
    ball.x = ball.x - Math.sin(angleRadian)*20;
    // if (!hittingPins) {
    //   collision_on_gutter();
    // } else {
    //   knockingPinsDown();
    // };
    hittingPins? knockingPinsDown() : collision_on_gutter();
      // 
    if (ball.y <= -50 ){

      clearInterval(ballRolling);
      CountScoreAsThrowingBall(knockedPin);
      //reset the ball to the center,draw the ball, canvas and draw the arrows.
      ball.x = canvas.width/2;
      ball.y = 500;
      drawCircle(ball.x, ball.y, ball.r, ball.color);
      context.drawImage(leftArrow,30,480,30,30);
      context.drawImage(rightArrow,180,480,30,30);
      knockedPin = 0;
      redLight.style.backgroundColor = "black";
      greenLight.style.backgroundColor = "#66FF00";
       // reset the all the pins and draw the pins for new frame
       if(count % 2 === 0){
        pins = []; 
        pins.push({x:pin.x -30 , y:pin.y , r:pin.r , color:pin.color })
        pins.push({x:pin.x , y:pin.y , r:pin.r , color:pin.color })
        pins.push({x:pin.x + 30 , y:pin.y , r:pin.r , color:pin.color })
        pins.push({x:pin.x + 60 , y:pin.y , r:pin.r , color:pin.color })
        pins.push({x:pin.x - 15 , y:pin.y + 20 , r:pin.r , color:pin.color })
        pins.push({x:pin.x + 15 , y:pin.y + 20 , r:pin.r , color:pin.color })
        pins.push({x:pin.x + 45 , y:pin.y + 20 , r:pin.r , color:pin.color })
        pins.push({x:pin.x , y:pin.y + 40 , r:pin.r , color:pin.color })
        pins.push({x:pin.x + 30 , y:pin.y + 40 , r:pin.r , color:pin.color })
        pins.push({x:pin.x + 15 , y:pin.y + 60 , r:pin.r , color:pin.color })
        initBall();
   
       }
       // last frame there is no strike and redraw the board without pins and ball
       // after last frame is a strike, two throws done, redraw the board without pins and ball.
       if ((scoreboard[9][0] !== 10 && count === 20)|| count === 22) {
        drawRect(30,0,180,600,'#8B4513'); //lane
        drawRect(0,0,30,600,'grey'); //leftgutter
        drawRect(210,0,30,600,'grey');//rightgutter
        showGameResult();
        congratsSound.play();
       }
      }
    }
    ,100)
  }

function if_hit_the_pins(angleRadian) {
    if (angleRadian > Math.atan(Right_max_pin_hitting_tan) && angleRadian < Math.atan(Left_max_pin_hitting_tan)) {
    hittingPins = true; 
    } else {
    knockedPin = 0;
    hittingPins = false;
    }
}

// have the pins disappear 
function knockingPinsDown(){
  let index = 0;
  // find the shape range of the pins
  for (let pin of pins) {
    if (Math.sqrt((ball.x - pin.x) * (ball.x - pin.x) + (ball.y - pin.y) * (ball.y - pin.y)) <= (ball.r + pin.r)){
        // condition to hit all the pins(first throw+ hit the middle area)
        if (what_index(count+1) === 0 & ball.x>120 -6 && ball.x <120 +6 && ball.y>80 -6 && ball.y <80 + 6 ) {
            knockedPin = 10;
            // function delayPinsDown() {
            //     pins= []; 
            // }
            // setTimeout(delayPinsDown, 500);
            pins= [];
            pinKnockSound.play();
        } else {
            knockedPin ++;
            pinKnockSound.play();
            pins.splice(index,1);
        }
    }
    index ++;
  }
}

function collision_on_gutter() {
  if (ball.x >= canvas.width -25 || ball.x <= 27) {
    angleRadian = 0;
    knockedPin = 0;
  }
}




  
