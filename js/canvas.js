/*----- constants -----*/

const canvas = document.getElementById('bowling');
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
  r:15,
  speed: null,
  velocityX: null,
  velocityY: null,
  color:"red",
 }

 const pin = {
  x: canvas.width/2 - 15,
  y: 20,
  r: 10,
  color: 'white'
 }

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

//  pins.push({x:105 -30 , y:20 , r:10 , color:'white' })
//  pins.push({x:105 , y:20 , r:10 , color:'white' })
//  pins.push({x:105 + 30 , y:20 , r:10 , color:'white' })
//  pins.push({x:105 + 60 , y:20 , r:10 , color:'white' })
//  pins.push({x:105 - 15 , y:20 + 20 , r:10 , color:'white' })
//  pins.push({x:105 + 15 , y:20 + 20 , r:10 , color:'white' })
//  pins.push({x:105 + 45 , y:20 + 20 , r:10 , color:'white' })
//  pins.push({x:105 , y:20 + 40 , r:10 , color:'white' })
//  pins.push({x:105 + 30 , y:20 + 40 , r:10 , color:'white' })
//  pins.push({x:105 + 15 , y:20 + 60 , r:10 , color:'white' })

 // draw bowling lane and ball
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




// function game(){
//   update(); // movements, collision detection,scoreupdate
//   render();
// }

 
 /*----- state variables -----*/

 let ball_start_x = ball.x;
 let ball_start_y = ball.y;
 let ball_end_x = null;
 let ball_end_y = null;
 let distanceX;
 let distanceY;
 let is_draggingBall = false;
 let is_ballroling = false;
 let mouseX, mouseY;
 let angleRadian;
 let knockedPin = 0;
 let hittingPins;
//  let tan; // the angle the ball is thrown

  /*----- cached elements  -----*/
  function initBall() {
    drawCircle(ball.x, ball.y, ball.r, ball.color);
    // pin1 = drawCircle(pin.x -30,pin.y,pin.r,pin.color);
    // pin2 = drawCircle(pin.x,pin.y,pin.r,pin.color);
    // pin3 = drawCircle(pin.x +30,pin.y,pin.r,pin.color);
    // pin4 = drawCircle(pin.x +60,pin.y,pin.r,pin.color);
    // pin5 = drawCircle(pin.x-15 ,pin.y +20,pin.r,pin.color);
    // pin6 = drawCircle(pin.x+15 ,pin.y +20,pin.r,pin.color);
    // pin7 = drawCircle(pin.x+45 ,pin.y +20,pin.r,pin.color);
    // pin8 = drawCircle(pin.x,pin.y +40,pin.r,pin.color);
    // pin9 = drawCircle(pin.x +30,pin.y+40,pin.r,pin.color);
    // pin10 = drawCircle(pin.x+15 ,pin.y +60,pin.r,pin.color); 
    draw_pins();
  }

  initBall();
  
  /*----- event listeners -----*/

// document.addEventListener("pointermove",handleDragBall)
canvas.addEventListener('mousedown', grabBall);
canvas.addEventListener('mouseup', mouse_up);
canvas.addEventListener('mouseout', function(evt) {
  if (!is_draggingBall) {
    return;
  }
  evt.preventDefault();
  is_draggingBall = false;
})
canvas.addEventListener('mousemove', dragBall)


/*----- functions -----*/
// grab the ball
function grabBall(evt) {
  let rect = canvas.getBoundingClientRect();
  let mouseY = evt.clientY - rect.top;
  let mouseX =  evt.clientX - rect.left;
  evt.preventDefault();

  //check whether the mouse is inside the ball radius 
  if (if_mouse_on_ball(mouseX, mouseY)) {
    is_draggingBall = true;
    canvas.style.cursor = 'grab';
    // return;
  } else {
    is_draggingBall = false;
  } 
}

function mouse_up(evt) {
  if (!is_draggingBall) {
    return;
  }
  evt.preventDefault();
  is_draggingBall = false;
  ball.x = mouseX;
  ball.y = mouseY;
  // redraw everything;
  // may have a problem later when layer throws the ball the second chance.
  drawRect(30,0,180,600,'#8B4513');
  drawRect(0,0,30,600,'grey');
  drawRect(210,0,30,600,'grey')
  initBall();
  ball_end_x = mouseX;
  ball_end_y = mouseY;
  canvas.style.cursor = 'crosshair';
  is_ballroling = 'true';
  // define the angels the ball will go 
   let adj = distanceY;
    let opp = distanceX;
    //represents the tangent value.
    tan = (opp/adj);
    //compute the arc tangent.π/2 <= θ <= π/2 (radians)
    angleRadian = Math.atan(tan);
  throwBall();
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

  function throwBall (){
    if_hit_the_pins(angleRadian);
    let ballRolling = setInterval(()=>{
      drawRect(30,0,180,600,"#8B4513");
      drawRect(0,0,30,600,"grey");
      drawRect(210,0,30,600,"grey")
      initBall();
      ball.y = ball.y - Math.cos(angleRadian)*20;
      ball.x = ball.x - Math.sin(angleRadian)*20;
      if (!hittingPins) {
        collision();
      } else {
        knockingPinsDown();
        // update the scoreboard
      };
      
      if (ball.y <= -50 ){
       clearInterval(ballRolling);
       ball.x = canvas.width/2;
       ball.y = 500;
       drawCircle(ball.x, ball.y, ball.r, ball.color);
       knockedPin = 0;
      }
      }
    ,100)
  }

//define the range of whether the pins will be knocked
  // check the angle of the ball being thrown is within the range of hititng the pins.
  const left_Collision_PointX = pin.x -30 -ball.r;
  //  const right_Collision_PointX = pin.x +60 + ball.r;
  const  max_pin_hitting_tan = (left_Collision_PointX  - canvas.width/2)/(ball.y-pin.y);
   const max_pin_hitting_angleRadian = Math.atan(max_pin_hitting_tan);
  

  function if_hit_the_pins(angleRadian) {
    if (Math.abs(angleRadian) > Math.abs(max_pin_hitting_angleRadian)) {
      knockedPin = 0;
      hittingPins = false;
    } else {
      hittingPins = true;
    }
  }

// have the pins disappear 
  function knockingPinsDown(){
    let index = 0;
  // find the shape range of the pins
    for (let pin of pins) {
    if (Math.sqrt((ball.x - pin.x) * (ball.x - pin.x) + (ball.y - pin.y) * (ball.y - pin.y)) <= (ball.r + pin.r)){
       knockedPin ++;
       pins.splice(index,1);
       console.log(knockedPin);
    }
    index ++;
  }
  }
  
  

//   function ballMoving(){
//       drawRect(30,0,180,600,"#8B4513");
//       drawRect(0,0,30,600,"grey");
//       drawRect(210,0,30,600,"grey")
//       initBall();
//       ball.y = ball.y - Math.cos(angelRadian)*20;
//       ball.x = ball.x - Math.sin(angelRadian)*20;
//       collision();
//   }
// let ballRolling
//   function start(){ 
//      ballRollingonLane = setInterval(ballMoving,100)
//   }

//   function stop(){
//     clearInterval(ballRollingonLane);
//   }


function collision() {
  if (ball.x >= canvas.width -25 || ball.x <= 27) {
    angleRadian = 0;
    // if (ball.x < 120) {
    //   ball.x -= 15;
    // } else {
    //   ball.x += 15;
    // } 
  }
}


  
