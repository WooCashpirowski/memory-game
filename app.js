const cards = document.querySelectorAll(".memo-card");
const congrats = document.querySelector(".congrats");
const playAgain = document.querySelector(".play-again");
const counterEl = document.querySelector(".counter");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let counter = 0;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.toggle("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.number === secondCard.dataset.number;
  isMatch ? disableCards() : unFlipCards();
  const flippedCards = document.querySelectorAll(".flip");
  if (flippedCards.length === 48) {
    congrats.classList.add("show");
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
  counter++;
  counterEl.innerHTML = counter;
}

function unFlipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 2000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 48);
    card.style.order = randomPos;
  });
}

// Event listeners

document.addEventListener("DOMContentLoaded", shuffle);

cards.forEach((card) => card.addEventListener("click", flipCard));

playAgain.addEventListener("click", () => {
  congrats.classList.remove("show");
  setTimeout(() => {
    location.reload();
  }, 1000);
});
