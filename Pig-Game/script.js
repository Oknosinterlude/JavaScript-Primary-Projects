"use strict";

// Selecting elements
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const diceEl = document.querySelector(".dice");

const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

let currentScore, activePlayer, playing, scores;

// Starting conditions
function init() {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");

  currentScore = 0;
  activePlayer = 0;
  playing = true;
  scores = [0, 0];
}

init();

function switchPlayer() {
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
}

// Rolling the dice
btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. Generate a random number and display the image
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    // 2. Display and add the score;
    if (dice != 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // 3. Dice number is 1
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      currentScore = 0;
      switchPlayer();
    }
  }
});

// Holding score
btnHold.addEventListener("click", function () {
  if (playing) {
    // 1.Update the score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = 0;

    if (scores[activePlayer] < 100) {
      // 2. Score < 100, record the score
      switchPlayer();
    } else {
      // 3. Display the winner and end the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
    }
  }
});

// Resetting the game
btnNew.addEventListener("click", init);
