
/*----- constants -----*/
// const symbols = {
//     "0":"-",
//     "10": "X",
//     "null": ""
// }

  /*----- state variables -----*/
let count; // track how many throw it is.
let frame; 
let whichtry; // is it second or first throw for each frame
let sum;
let scoreboard;


  /*----- cached elements  -----*/

const total = document.getElementById('total');
const closeButton = document.getElementById('close_button_background')
const blurBackground = document.getElementById('blur_background')


  /*----- event Listeners  -----*/
closeButton.addEventListener('click', function () {
    document.getElementById('exit_game_container').style.visibility = "visible";
    blurBackground.style.display = "block";
    blurBackground.classList.add("blur_background");
})

  /*----- functions -----*/
function init() {
    count = 0;
    frame = null;
    whichtry = null;
    sum = 0;
    // knockedPin = null;
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

function CountScoreAsThrowingBall (knockedPin) {
    // console.log(knockedPin);
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
   
        // add the knocked pins to the sum again;
        sum = sum + scoreboard[frame][whichtry];
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

// CountScoreAsThrowingBall (10);
// CountScoreAsThrowingBall (5);
// CountScoreAsThrowingBall (5);
// CountScoreAsThrowingBall (1);
// CountScoreAsThrowingBall (5);
// CountScoreAsThrowingBall (4);
// CountScoreAsThrowingBall (3);


function renderBoard() {
	scoreboard.forEach(function(colArr,colIdx) {
		colArr.forEach(function(rowVal,rowIdx){
			const eachThrowCellID = `r2c${colIdx}throw${rowIdx}`
			const cellEl = document.getElementById(eachThrowCellID);
            if (rowIdx === 0 && rowVal ===10){ cellEl.innerHTML = ' X ';
            }  else if (rowVal === null){
                cellEl.innerHTML = '';
            } else if (rowVal === 0){
                cellEl.innerHTML = '-';
            }else if (rowIdx == 1 && colArr[0]+rowVal === 10){
                cellEl.innerHTML = '/';
            } else {
                cellEl.innerHTML = rowVal;
            }
            }
           )    
	}) 
}


