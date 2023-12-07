/*----- scoreboard -----*/
/*----- constants -----*/
const symbols = {
    "0":"-",
    "10": "X",
    "null": "",
    "spare":"/"
}

  /*----- state variables -----*/
let count; // track how many throw it is.
let frame; 
let whichtry; // is it second or first throw for each frame
let sum;
let scoreboard;


  /*----- cached elements  -----*/
  const total = document.getElementById('total');
 
   /*----- event Listeners  -----*/
  /*----- functions -----*/
function initScoreBoard() {
    count = 0;
    frame = null;
    whichtry = null;
    sum = 0;
    scoreboard = [
        [null,null,null], //frame 1, sum of frame 1
        [null,null,null], //frame 2, sum of frame 2
        [null,null,null], //frame 3, sum of frame 3
        [null,null,null], //frame 4, sum of frame 4
        [null,null,null], //frame 5, sum of frame 5
        [null,null,null], //frame 6, sum of frame 6
        [null,null,null], //frame 7, sum of frame 7
        [null,null,null], //frame 8, sum of frame 8
        [null,null,null], //frame 9, sum of frame 9
        [null,null,null] //frame 10, sum of frame 10
    ]
    total.innerHTML = '';
    renderBoard();
}

initScoreBoard();

// define the index of the each throw in the frame 
function what_index(count) {
    if (count % 2 === 0) {
       return 1; // second throw
    } else {
       return 0; // first throw
    }
   }


// main logic 
function CountScoreAsThrowingBall (knockedPin) {
    count = count +1; 
    frame = Math.floor((count-1)/2);
    whichtry = what_index(count);
    if (count <= 20){
    scoreboard[frame][whichtry] = knockedPin;
    // find the sum of the score and update it on the html
    // sum = sum + scoreboard[round][whichtry];
    sum = getSum(knockedPin)}
    //show the data if the last frame is a strike;
    if (count === 21) {
        frame =9;
        sum = sum + knockedPin;
        scoreboard[frame][1] = knockedPin;
    }

    if (count === 22) {
        frame =9;
        sum = sum + knockedPin;
        scoreboard[frame][1] = `${scoreboard[frame][1]}/${knockedPin}`;
    }
    scoreboard[frame][2] = sum;
    total.innerHTML = sum;
    renderBoard();
}   


// getSum function 
function getSum(knockedPin) {
    // if there is a strike
    if (knockedPin === 10 && whichtry === 0) {
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

function renderBoard() {
	scoreboard.forEach(function(colArr,colIdx) {
		colArr.forEach(function(rowVal,rowIdx){
			const eachThrowCellID = `c${colIdx}idx${rowIdx}`
			const cellEl = document.getElementById(eachThrowCellID);
            if (rowIdx === 0 && rowVal === 10){ cellEl.innerHTML = symbols[10];
            }  else if (rowVal === null){
                cellEl.innerHTML = symbols[null];
            } else if (rowVal === 0){
                cellEl.innerHTML = symbols[0];
            }else if (rowIdx == 1 && colArr[0]+rowVal === 10){
                cellEl.innerHTML = symbols["spare"];
            } else {
                cellEl.innerHTML = rowVal;
            }
            }
           )    
	}) 
}

/*----- click the exit button to show the pop up page  -----*/

const closeButton = document.getElementById('close_button_background')
const blurBackground = document.getElementById('blur_background')

closeButton.addEventListener('click', function () {
    document.getElementById('exit_game_container').style.visibility = "visible";
    blurBackground.style.display = "block";
    blurBackground.classList.add("blur_background");
})

/*----- click the user guide button to show the pop up page  -----*/
const userGuideBtn = document.getElementById('user-guide-btn')
const userGuide = document.getElementById('user_guide')
userGuideBtn.addEventListener('click', function () {
    userGuide.style.visibility = "visible";
    blurBackground.style.display = "block";
    blurBackground.classList.add("blur_background");
})

userGuide.addEventListener('click', function () {
    userGuide.style.visibility = "hidden";
    blurBackground.style.display = "none";
    blurBackground.classList.remove("blur_background");
})

/*----- game result congrats Page.   -----*/
const gameResult = document.getElementById("game_result");
const score = document.getElementById("score");

//the function will be called if the game is over ;
function showGameResult() {
    gameResult.style.visibility = "visible";
    blurBackground.style.display = "block";
    blurBackground.classList.add("blur_background");
    score.innerHTML = `${sum}`  
}
gameResult.addEventListener('click', function () {
    gameResult.style.visibility = "hidden";
    blurBackground.style.display = "none";
    blurBackground.classList.remove("blur_background");
    initCanvas();
})
/*----- move the slider bar to adjust the music volume  -----*/
// set music sound 
  const musicTrack = document.getElementById('music-track')
  const musicRange = document.getElementById('music-range')
  const volume = document.getElementById('volume')
  const musicPlayBtn = document.getElementById('music-playbt')

  volume.innerHTML = musicRange.value
    // Event listener to set volume when slider is changed
  musicRange.addEventListener('change', setVolume)

  // Function to change values on volume slider
  musicRange.oninput = function () {
    volume.innerHTML = this.value
  }

  // Function to set volume for music based on slider value
  function setVolume() {
    musicTrack.volume = musicRange.value / 100
  }

  musicPlayBtn.addEventListener('click', ()=>{
    if (musicTrack.paused) {
      musicTrack.play()
      musicPlayBtn.innerHTML = 'Mute'
    } else {musicTrack.pause()
        musicPlayBtn.innerHTML = 'Play'
    }
  })


