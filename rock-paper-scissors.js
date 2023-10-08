// gets object value for score
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

// displays score on webpage 
updateScoreElement();


//EVENT LISTENERS
// event listener that controls what happens when the rock button is clicked
document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  });

// event listener that controls what happens when the paper button is clicked
document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  });

// event listener that controls what happens when the scissors button is clicked
document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
  });

// event listener that plays the game when keys are typed
document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r')
    playGame('rock');
  else if (event.key === 'p')
    playGame('paper');
  else if (event.key === 's')
    playGame('scissors');
  else if (event.key === 'a')
    autoPlay();
  else if (event.key === 'Backspace')
    resetConfirmation();
});


// CODE FOR ACTUAL GAME
function playGame (playerMove) {
  // gets the computer's move
  const computerMove = pickComputerMove();

  let result = '';

  // finds result if the player chose rock
  if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else if (computerMove === 'scissors') {
      result = 'You win.';
    }
  }

  // finds result if the player chose paper
  else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lose.';
    }
  }

  // finds result if the player chose scissors
  else if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }
  }

  // updates score
  if (result === 'You win.')
    score.wins += 1;
  else if (result === 'You lose.')
    score.losses += 1;
  else
    score.ties += 1;

  // saves score in localStorage so it is accessible even if page refreshes
  localStorage.setItem('score', JSON.stringify(score));

  // updates score on webpage
  updateScoreElement();

  // displays result on webpage
  document.querySelector('.js-result')
    .innerHTML = result;

  // shows the player's move and the computer's move on the webpage
  document.querySelector('.js-moves')
    .innerHTML = `You
      <img class="move-icon" src="${playerMove}-emoji.png">
      <img class="move-icon" src="${computerMove}-emoji.png">
      Computer`;
}


function updateScoreElement () {
  //updates score element on the webpage
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove () {
  // picks random computer move
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1/3)
    computerMove = 'rock';
  
  else if (randomNumber >= 1/3 && randomNumber < 2/3)
    computerMove = 'paper';
  
  else if (randomNumber >= 2/3 && randomNumber < 1)
    computerMove = 'scissors';

  return computerMove;
}


// RESET SCORE
// event listener that controls what happens when the reset button is clicked
document.querySelector('.js-reset-score-button')
  .addEventListener('click', () => resetConfirmation());

// shows message that makes sure the user wants to reset their score
function resetConfirmation () {
  document.querySelector('.reset-confirmation')
    .innerHTML = `Are you sure you want to reset the score?
    <button class="yes-button js-yes-button">Yes</button>
    <button class="no-button js-no-button">No</button>`;

  // if user clicks yes to reset their score, reset the score and hide the confirmatiom
  document.querySelector('.js-yes-button')
  .addEventListener('click', () => {
    resetScore();
    hideResetConfirmation();
  });

  // if user clicks no to reset score, just hide the confirmation and don't change the score
  document.querySelector('.js-no-button')
  .addEventListener('click', () => {
    hideResetConfirmation();
  });
}

// hides the message that asks user to confirm the reset action
function hideResetConfirmation () {
  document.querySelector('.reset-confirmation')
    .innerHTML = '';
}

function resetScore () {
  // resets score, saves it in local storage, and displays updated score on screen
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
}


// AUTOPLAY
// event listener that controls what happens when the auto play button is clicked
document.querySelector('.js-auto-play-button')
  .addEventListener('click', () => autoPlay());

let isAutoPlaying = false;
let intervalID;

function autoPlay () {
  if (!isAutoPlaying) {
    intervalID = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    document.querySelector('.js-auto-play-button')
      .innerHTML = 'Stop Auto Play';
  }
  
  else {
    clearInterval(intervalID);
    isAutoPlaying = false;
    document.querySelector('.js-auto-play-button')
      .innerHTML = 'Auto Play';
  }
}