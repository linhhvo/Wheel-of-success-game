const overlay = document.getElementById('overlay');
const resultMessage = document.querySelector('.title');
const startButton = document.querySelector('.btn__start');

const phrase = document.getElementById('phrase');
const phraseUl = phrase.firstElementChild;
const showedLetters = document.getElementsByClassName('show');
const allLetters = document.getElementsByClassName('letter');

const qwerty = document.getElementById('qwerty');
const qwertyKey = document.querySelectorAll('#qwerty button');

const hearts = document.querySelector('#scoreboard ol');

const resetButton = document.querySelector('.btn__reset');

let missed = 0;

const phrases = [`Right Off the Bat`, `Drive Me Nuts`, `Rain on Your Parade`, `What Goes Up Must Come Down`, `My Cup of Tea`, `Dog Days of Summer`, `Apple of My Eye`];

// click Start game button to start
startButton.addEventListener('click', () => {
	overlay.style.display = `none`;
});

// return a random phrase from an array
const getRandomPhraseAsArray = (arr) => {
	let randomIndex = Math.floor(Math.random() * arr.length);
	let letterArray = arr[randomIndex].split('');
	return letterArray;
};

// adds the letters of a string to the display
const addPhraseToDisplay = (arr) => {
	for (let i = 0; i < arr.length; i++) {
		let li = document.createElement('li');
		li.textContent = arr[i].toUpperCase();
		phraseUl.appendChild(li);
		if (arr[i] != ` `) {
			li.classList.add('letter');
		} else {
			li.classList.add('space');
		}
	}
};

let phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

// check if a letter is in the phrase
const checkLetter = (button) => {
	let letters = document.querySelectorAll('.letter');
	let guessedLetter = button.textContent.toUpperCase();
	let match = ``;
	for (let i = 0; i < letters.length; i++) {
		let phraseLetter = letters[i].textContent;
		if (guessedLetter === phraseLetter) {
			letters[i].classList.add('show');
			match = guessedLetter;
		}
	}
	return match;
};

// listen for guess input

qwerty.addEventListener('click', (e) => {
	e.preventDefault();
	if (e.target.tagName === 'BUTTON') {
		let guessedLetter = e.target;
		guessedLetter.classList.add('chosen');
		guessedLetter.disabled = true;
		let letterFound = checkLetter(guessedLetter);
		if (!letterFound) {
			missed++;
			hearts.removeChild(hearts.firstElementChild);

			const lostHeart = document.createElement('li');
			lostHeart.classList.add('lost-tries');
			lostHeart.innerHTML = `<img src="images/lostHeart.png" height="35px" width="35px" style="margin: 0 2px;"/>`;
			hearts.appendChild(lostHeart);
		}
		checkWin();
	}
});

// check if the game has been won or lost
const checkWin = () => {
	const displayResult = {
		win: () => {
			overlay.style.display = 'flex';
			overlay.className = `win`;
			resultMessage.textContent = `Congratulations! You have won the game.`;
			startButton.textContent = 'Play Again';
			resetGame();
		},
		lose: () => {
			overlay.style.display = 'flex';
			overlay.className = `lose`;
			resultMessage.textContent = `Uh Oh! You have lost the game.`;
			startButton.textContent = 'Play Again';
			resetGame();
		},
	};

	if (allLetters.length === showedLetters.length) {
		displayResult.win();
	} else if (missed > 4) {
		displayResult.lose();
	}
};

function resetGame() {
	// reset keyboard buttons
	for (let i = 0; i < qwertyKey.length; i++) {
		qwertyKey[i].classList.remove('chosen');
		qwertyKey[i].disabled = false;
	}

	phraseUl.innerHTML = ''; // reset phrase
	missed = 0; // reset missed guess

	// reset heart icons
	const triesIcons = document.querySelectorAll('ol li');
	for (let i = 0; i < triesIcons.length; i++) {
		if ((triesIcons[i].className = 'lost-tries')) {
			triesIcons[i].innerHTML = `<img src="images/liveHeart.png" height="35px" width="35px" />`;
			triesIcons[i].classList.replace('lost-tries', 'tries');
		}
	}

	phraseArray = getRandomPhraseAsArray(phrases);
	addPhraseToDisplay(phraseArray);
}
