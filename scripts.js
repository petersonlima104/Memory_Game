const cards = document.querySelectorAll(".memory-card");
const matchesSpan = document.querySelector(".matches");
const movesSpan = document.querySelector(".moves");
const modal = document.getElementById("game-over-modal");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matches = 0;
let moves = 0;

// Função que é chamada ao virar uma carta.
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  // second click
  secondCard = this;
  moves++;
  movesSpan.textContent = `Moves: ${moves}`;

  checkForMatch();
}

// Função que verifica se as duas cartas viradas são um par correspondente.
function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  matches++;
  matchesSpan.textContent = `Matches: ${matches}`;

  if (matches === cards.length / 2) {
    showModal();
  }

  resetBoard();
}

// Função que vira as cartas novamente caso não sejam um par correspondente.
function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1500);
}

// Função que reinicia o jogo.
function restartGame() {
  // Reembaralhar as cartas
  cards.forEach((card) => {
    card.classList.remove("flip");
    card.addEventListener("click", flipCard);
    let randomPos = Math.floor(Math.random() * 18);
    card.style.order = randomPos;
  });

  matches = 0;
  moves = 0;
  matchesSpan.textContent = `Matches: ${matches}`;
  movesSpan.textContent = `Moves: ${moves}`;

  closeModal();
}

// Função que reseta as variáveis relacionadas ao tabuleiro de jogo.
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// Função que exibe o modal de fim de jogo.
function showModal() {
  modal.style.display = "block";
}

// Função que fecha o modal de fim de jogo.
function closeModal() {
  modal.style.display = "none";
  restartGame();
}

// Função imediata que embaralha as cartas ao carregar a página.
(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 18);
    card.style.order = randomPos;
  });
})();

cards.forEach((card) => card.addEventListener("click", flipCard));
