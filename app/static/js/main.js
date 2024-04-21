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

const elDrumsTitle = document.getElementById('drums-title');
const drumButtons = document.querySelectorAll('.drum-button');

// Get computer's choice
function getComputerChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}

// Play game
//  * Blad wint van steen.  
//  * Steen wint van schaar. 
//  * Schaar wint van blad. 
function playGame(userChoice, computerChoice) {
  if (userChoice === computerChoice) {
    elGameResult.textContent = 'Gelijkspel';
  } else if (userChoice === 'blad' && computerChoice === 'steen'
    || userChoice === 'steen' && computerChoice === 'schaar'
    || userChoice === 'schaar' && computerChoice === 'blad') {
    elGameResult.textContent = 'Je wint!';
    unlockDrums()
  } else {
    elGameResult.textContent = 'Je verliest.';
  }
}

// Reset game
function resetGame() {
  elUserChoice.textContent = '';
  elComputerChoice.textContent = '';
  elGameResult.textContent = '';
}

// Add event listeners
for (const button of gameButtons) {
  button.addEventListener('click', () => {
    resetGame();
    // Set userChoice
    userChoice = button.dataset.choice;
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
function unlockDrums() {
  elDrumsTitle.classList.remove('hidden');
  for (const button of drumButtons) {
    button.disabled = false;
    window.addEventListener('keydown', (e) => {
      const key = e.key;
      const drumButton = document.getElementById(`key-${key}`);
      if (!drumButton) return; // Exit if the button doesn't exist     
      drumButton.classList.add('active');
      const audio = document.getElementById(`audio-${e.key}`);
      if (!audio) return; // Exit if the audio element doesn't exist
      // if (!audio.paused) audio.pause();
      audio.currentTime = 0;
      audio.play();
      setTimeout(() => {
        drumButton.classList.remove('active');
      }, 100);
    })
  }
}
