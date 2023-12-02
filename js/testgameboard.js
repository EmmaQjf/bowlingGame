/*----- constants -----*/
const symbols = {
    "0":"-",
    "10": "X",
    "null": ""
}

  /*----- state variables -----*/
let count; // track how many throw it is.
let frame; 
let whichtry; // is it second or first throw for each round
let sum;
let knockedPin;
let scoreboard;


  /*----- cached elements  -----*/

const total = document.getElementById("total");
const button = document.getElementById("button");

  /*----- functions -----*/
function init() {
    count = 0;
    frame = null;
    whichtry = null;
    sum = 0;
    knockedPin = null;
    scoreboard = [
        [null,null,null],
        [null,null,null],
        [null,null,null],
        [null,null,null],
        [null,null,null],
        [null,null,null],
        [null,null,null],
        [null,null,null],
        [null,null,null],
        [null,null,null]
    ]
}


init();
// define the index of the each throw in the frame 
function firstOrSecondTry(count) {
    if (count % 2 === 0) {
       return 1; // second throw
    } else {
       return 0; // first throw
    }
   }

function throwBall (knockedPin) {
    count = count +1; 
frame = Math.floor((count-1)/2);
whichtry = firstOrSecondTry(count);
scoreboard[frame][whichtry] = knockedPin;
// find the sum of the score and update it on the html
// sum = sum + scoreboard[round][whichtry];
sum = getSum(knockedPin);
scoreboard[frame][2] = sum;
total.innerHTML = sum;
renderBoard();
}

function updateBoard(frame,whichtry) {
    scoreboard[frame-offsetCol][2] =  scoreboard[frame-1][2] + scoreboard[frame][whichtry];
}

// getSum function 
function getSum(knockedPin) {
    // if there is a strike
    if(knockedPin === 10 && whichtry === 0){
        sum = sum + scoreboard[frame][whichtry];
        count ++;
        scoreboard[frame][1] = null;
        checkStrike();
        checkSpare();
    } else {
        // update the sum
        sum = sum + scoreboard[frame][whichtry];
        checkStrike();
        checkSpare();
    }
 return sum;
}
function checkStrike() {
    if(frame >= 1 && scoreboard[frame-1][0] === 10){
        // change the previous sum
        scoreboard[frame-1][2] += scoreboard[frame][whichtry];
        console.log(scoreboard[frame-1][2]);
        // add the knocked pins to the sum again;
        sum = sum + scoreboard[frame][whichtry];
        console.log(sum);
      }
}
function checkSpare() {
    if(frame >= 1 && whichtry === 0 && scoreboard[frame-1][0] !== 10 && (scoreboard[frame-1][0]+scoreboard[frame-1][1] === 10)) {
          // update the previous sum;
            scoreboard[frame-1][2] += scoreboard[frame][whichtry];
            // add the knockedpin to the sum again;
            sum = sum + scoreboard[frame][whichtry];
          } 
}

throwBall(10);
console.log(count);
console.log(scoreboard);
throwBall(5);
throwBall(5);
throwBall(1);
throwBall(5);
throwBall(4);
throwBall(3);
throwBall(10);
throwBall(5);


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


function renderBoard() {
	scoreboard.forEach(function(colArr,colIdx) {
		colArr.forEach(function(rowVal,rowIdx){
			const eachThrowCellID = `r2c${colIdx}throw${rowIdx}`
			const cellEl = document.getElementById(eachThrowCellID);
			cellEl.innerHTML = rowVal;
            // if (rowVal = 0||10||null) {cellEl.innerHTML = symbols[rowVal]} else {
            //     cellEl.innerHTML = rowVal;
            // }
            }
           )    
	}) 
}


