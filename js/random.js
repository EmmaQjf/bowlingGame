
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


