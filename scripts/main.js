const FRONT = 'card_front';
const BACK = 'card_back';
const CARD = 'card';
const ICON = 'icon';
startGame();

function startGame() {
  initializeCards(game.createCardsFromTeams(game.teams));
}

function initializeCards(cards) {
  const gameBoard = document.querySelector('.gameBoard');
  gameBoard.innerHTML = '';

  game.cards.forEach((card) => {
    let cardElement = document.createElement('div');
    cardElement.id = card.id;
    cardElement.classList.add(CARD);
    cardElement.dataset.icon = card.icon;

    createCardContent(card, cardElement);

    cardElement.addEventListener('click', flipCard);
    gameBoard.appendChild(cardElement);
  });
}

function createCardContent(card, cardElement) {
  createCardFace(FRONT, card, cardElement);
  createCardFace(BACK, card, cardElement);
}

function createCardFace(face, card, cardElement) {
  let cardElementFace = document.createElement('div');
  cardElementFace.classList.add(face);
  if (face === FRONT) {
    const iconElement = document.createElement('img');
    iconElement.classList.add(ICON);
    iconElement.src = './assets/' + card.icon + '.png';
    cardElementFace.appendChild(iconElement);
  } else {
    cardElementFace.style.backgroundImage = 'url(./assets/nba.png)';
  }
  cardElement.appendChild(cardElementFace);
}

function flipCard() {
  if (game.setCard(this.id)) {
    this.classList.add('flip');
    if (game.secondCard) {
      if (game.checkMatch()) {
        game.clearCards();
        if (game.checkGameOver()) {
          const gameOverLayer = document.getElementById('gameOver');
          gameOverLayer.style.display = 'flex';
        }
      } else {
        setTimeout(() => {
          let firstCardView = document.getElementById(game.firstCard.id);
          let secondCardView = document.getElementById(game.secondCard.id);

          firstCardView.classList.remove('flip');
          secondCardView.classList.remove('flip');
          game.unflipCards();
        }, 1000);
      }
    }
  }
}

function restart() {
  startGame();
  const gameOverLayer = document.getElementById('gameOver');
          gameOverLayer.style.display = 'none';

}