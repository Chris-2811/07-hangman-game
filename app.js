const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const popupContainer = document.getElementById('popup-container');
const finalMessage = document.getElementById('final-message');
const notificationEl = document.getElementById('notification-container');
const playBtn = document.getElementById('play-button');

const figureParts = document.querySelectorAll('.figure-part');
const words = ['application', 'programming', 'interface', 'wizard'];

const selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

// Display the word
function displayWord() {
  wordEl.innerHTML = `
  ${selectedWord
    .split('')
    .map(
      (letter) => `
        <span class="letter">
          ${correctLetters.includes(letter) ? letter : ''}
        </span>
      `
    )
    .join('')}
`;
  const innerWord = wordEl.innerText.replace(/\n/g, '');

  if (innerWord === selectedWord) {
    finalMessage.innerText = 'Congrats you won! 😃';
    popupContainer.style.display = 'flex';
  }
}

// Update wrong letters and figure parts
function updateWrongLettersEl() {
  wrongLettersEl.innerHTML = `
  ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
  ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;

  const errors = wrongLetters.length;
  figureParts.forEach((part, index) => {
    if (index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });

  if (errors === figureParts.length) {
    finalMessage.innerText = 'Unfortunately you lost. 😕';
    popupContainer.style.display = 'flex';
  }
}

// Show Notification
function showNotification() {
  notificationEl.classList.add('show');

  setTimeout(() => {
    notificationEl.classList.remove('show');
  }, 2000);
}

// Add Eventlistener
window.addEventListener('keydown', (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

playBtn.addEventListener('click', (e) => {
  window.location.reload();
  popupContainer.style.display = 'none';
});

displayWord();
