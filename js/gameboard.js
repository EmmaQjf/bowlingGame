// define the board 
let scoreboard = [
	[0,0,0],
	[0,0,0],
	[0,0,0],
	[0,0,0],
	[0,0,0],
	[0,0,0],
	[0,0,0],
	[0,0,0],
	[0,0,0],
	[0,0,0]
]

// let knockedPin = 88;
//  let count = 9;
//  let round = Math.floor((count-1)/2);
//  console.log(round);
 function firstOrSecondTry(count) {
 if (count % 2 === 0) {
	return 1; // second throw
 } else {
	return 0; // first throw
 }
}
let count; // track how many throw it is.
let round; 
let whichtry; // is it second or first throw for each round
let sum = 0;

const total = document.getElementById("total");

function throwBall (knockedPin,count) {
round = Math.floor((count-1)/2);
whichtry = firstOrSecondTry(count);
scoreboard[round][whichtry] = knockedPin;
// find the sum of the score and update it on the html
sum = sum + scoreboard[round][whichtry];
scoreboard[round][2] = sum;
total.innerHTML = sum;
console.log(scoreboard);
}
// what wrong with index 0 

throwBall(1,1);
throwBall(2,2);
throwBall(3,3);
throwBall(4,4);
throwBall(5,5);
throwBall(6,6);

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





// let colArr = scoreboard[round];
// console.log(colArr);
// scoreboard[round][whichtry] = knockedPin;
// console.log(scoreboard);

function renderBoard() {
	scoreboard.forEach(function(colArr,colIdx) {
		colArr.forEach(function(rowVal,rowIdx){
			const eachThrowCellID = `r2c${colIdx}throw${rowIdx}`
			const cellEl = document.getElementById(eachThrowCellID);
			cellEl.innerHTML = rowVal;
		})

	})

    
}
renderBoard();

    // pseudocode 
