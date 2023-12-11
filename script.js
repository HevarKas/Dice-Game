"use strict";

const player0Container = document.querySelector(".player--0");
const player1Container = document.querySelector(".player--1");

const score0Element = document.querySelector("#score--0");
const score1Element = document.querySelector("#score--1");

const current0Element = document.querySelector("#current--0");
const current1Element = document.querySelector("#current--1");

const diceImg = document.querySelector(".dice");

const newBtn = document.querySelector(".btn--new");
const rollBtn = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, isPlaying, previousDice;

const initialize = () => {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  isPlaying = true;

  diceImg.classList.add("hidden");
  player0Container.classList.remove("player--winner");
  player1Container.classList.remove("player--winner");
  player0Container.classList.add("player--active");
  player1Container.classList.remove("player--active");

  score0Element.textContent = scores[0];
  score1Element.textContent = scores[1];

  current0Element.textContent = currentScore;
  current1Element.textContent = currentScore;
};
initialize();

const switchPlayer = () => {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  player0Container.classList.toggle("player--active");
  player1Container.classList.toggle("player--active");
  activePlayer = activePlayer === 0 ? 1 : 0;
};

const rollDice = () => {
  if (isPlaying) {
    let dice;

    do {
      dice = Math.trunc(Math.random() * 6) + 1;
    } while (dice === previousDice);

    previousDice = dice;

    diceImg.classList.remove("hidden");
    diceImg.src = `./images/dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
};

const holdScore = () => {
  if (isPlaying) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 50) {
      isPlaying = false;
      diceImg.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
    } else {
      switchPlayer();
    }
  }
};

rollBtn.addEventListener("click", rollDice);
holdBtn.addEventListener("click", holdScore);
newBtn.addEventListener("click", initialize);
