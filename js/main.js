	/*----- constants -----*/


	/*----- state variables -----*/


	/*----- cached elements  -----*/


	/*----- event listeners -----*/


	/*----- functions -----*/
 let count = 12;
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

let eachThrowCellID = `r2c${round}throw${whichtry}`;
console.log(eachThrowCellID);
const cellEl = document.getElementById(eachThrowCellID);
cellEl.innerHTML = "88";

let eachroundSum = `r3c${round}`;
const eachroundSumEl = document.getElementById(eachroundSum);
eachroundSumEl.innerHTML = "0";
console.log(eachroundSum);




    // pseudocode 
