/**
 * Inspiratie: 
 * - https://www.youtube.com/watch?v=ec8vSKJuZTk
 * - https://codewithcurious.com/projects/drum-kit-with-html-css-and-js/
 * - https://medium.com/@iminked/build-a-drum-machine-with-javascript-html-and-css-33a53eeb1f73
 */

/**
 * Blad, steen, schaar 
 */

// Cache elements 
let userChoice, computerChoice;
const choices = ['blad', 'steen', 'schaar'];
const elUserChoice = document.getElementById('user-choice');
const elComputerChoice = document.getElementById('computer-choice');
const elGameResult = document.getElementById('game-result');
const gameButtons = document.querySelectorAll('.game-button');
const resetGameButton = document.getElementById('reset-game-button');

const elDrumsTitle = document.getElementById('drums-title');
const drumButtons = document.querySelectorAll('.drum-button');
const azertyMapping = {
  'a': 'q',
};

// Get computer's choice
function getComputerChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}

// Play game
// Blad wint van steen. | Steen wint van schaar. | Schaar wint van blad. 
function playGame(userChoice, computerChoice) {
  if (userChoice === computerChoice) {
    elGameResult.textContent = 'Gelijkspel';
  } else if (userChoice === 'blad' && computerChoice === 'steen'
    || userChoice === 'steen' && computerChoice === 'schaar'
    || userChoice === 'schaar' && computerChoice === 'blad') {
    elGameResult.innerHTML = '<span class="win">Je wint!</span>';
    unlockDrums()
  } else {
    elGameResult.innerHTML = '<span class="lose">Je verliest!</span>';
  }
}

// Reset game
function resetGame() {
  elUserChoice.textContent = '';
  elComputerChoice.textContent = '';
  elGameResult.textContent = '';
  elDrumsTitle.classList.add('hidden');
  lockDrums();
}

// Listen for click on game buttons
for (const gameButton of gameButtons) {
  gameButton.addEventListener('click', () => {
    resetGame();
    // Set userChoice
    userChoice = gameButton.dataset.choice;
    elUserChoice.textContent = `Jij: ${userChoice}`;
    // Set computerChoice after 300ms
    setTimeout(() => {
      computerChoice = getComputerChoice();
      elComputerChoice.textContent = `Computer: ${computerChoice}`;
    }, 300);
    // Play game after 300ms
    setTimeout(() => {
      playGame(userChoice, computerChoice);
    }, 300);
  });
}

/**
 * Drums
 */

// Unlock the drums 
function unlockDrums() {
  // Enable the drum buttons
  elDrumsTitle.classList.remove('hidden');
  for (const drumButton of drumButtons) {
    drumButton.disabled = false;
  }
  // Listen for key press
  document.addEventListener('keydown', listenForKeyPress);
  // Enable the reset button
  resetGameButton.disabled = false;
  resetGameButton.addEventListener('click', resetGame);
}

function lockDrums() {
  // Disable the drum buttons
  elDrumsTitle.classList.add('hidden');
  for (const drumButton of drumButtons) {
    drumButton.disabled = true;
  }
  // Remove the key press event listener
  document.removeEventListener('keydown', listenForKeyPress);
  // Disable the reset button
  resetGameButton.disabled = true;
  resetGameButton.removeEventListener('click', resetGame);
}

// Listen for key press
function listenForKeyPress(e) {
  const key = azertyMapping[e.key] || e.key;
  const drumButton = document.getElementById(`key-${key}`);
  if (!drumButton) return; // Exit if the button doesn't exist     
  drumButton.classList.add('active');
  const audio = document.getElementById(`audio-${key}`);
  if (!audio) return; // Exit if the audio element doesn't exist
  // if (!audio.paused) audio.pause();
  audio.currentTime = 0;
  audio.play();
  setTimeout(() => {
    drumButton.classList.remove('active');
  }, 100);
}


