// Game values
let min = 1,
    max = 5,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;
console.log(winningNum);

// UI Element
const $game = document.getElementById('game'),
      $minNum = document.querySelector('.min-num'),
      $maxNum = document.querySelector('.max-num'),
      $guessBtn = document.getElementById('guess-btn'),
      $guessInput = document.getElementById('guess-input'),  
      $message = document.querySelector('.message');


// Assign UI min and max
$minNum.textContent = min;
$maxNum.textContent = max;

// Play again event listener
$game.addEventListener('mousedown', e => {
  if (e.target.className  === 'play-again') {
    window.location.reload();
  }
});

// Listen for guess
$guessBtn.addEventListener('click', () => {
  let guess = parseInt($guessInput.value);

  // Validate
  if (!guess || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'green');
    return;
  }

  if (guess === winningNum) {
    // Game over - win
    gameOver(true, `${winningNum} is correct, YOU WIN!!`)
  } else {
    // Wrong number
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      // Game over - lost
      gameOver(false, `Game over, you lost. The correct number is ${winningNum}`)
    } else {
      // Game continue - answer wrong
      // Change border color
      $guessInput.style.borderColor = 'red';
      // Tell user its the wrong number
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
      // Clear input
      $guessInput.value = '';

    }
  }
});

// Game over
function gameOver(won, msg) {
  let color;
  won === true ? color = 'green' : color = 'red';

  // Disable input
  $guessInput.disabled = true;
  // Change border color
  $guessInput.style.borderColor = color;
  // Set message
  setMessage(msg, color);

  // Play Again 
  $guessBtn.value = 'Play Again'
  $guessBtn.className += 'play-again'
}

// Get Winning number
function getRandomNum(min, max) {
  let randomNum = min + Math.floor(Math.random() * (max + 1 - min));
  return randomNum;
}

// Set message
function setMessage(message, color) {
  $message.style.color = color;
  $message.textContent = message;
}