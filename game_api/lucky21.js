module.exports = (context) => {
  const deckConstructor = context('deck');
  const deck = deckConstructor(context);

  const dealerConstructor = context('dealer');
  const dealer = dealerConstructor(context);

  dealer.shuffle(deck);
  const card0 = dealer.draw(deck);
  const card1 = dealer.draw(deck);
  const state = {
    deck: deck,
    dealer: dealer,
    cards: [
      card0,
      card1,
    ],
    over: false,
    won: false,
    // The card that the player thinks will exceed 21.
    card: undefined,
  };
  return {
    state: state,
    // Is the game over (true or false).
    isGameOver: (game) => {
      return state.over;
    },
    // Has the player won (true or false).
    playerWon: (game) => {
      return state.won;
    },
    // The highest score the cards can yield without going over 21 (integer).
    getCardsValue: (game) => {
      const length = state.cards.length;
      let noOfAces = 0;
      let score = 0;
      for (i=0; length>i; i++) {
        const card = state.cards[i];
        const value = card.slice(0, 2);
        let cardScore = parseInt(value);
        if (14 > cardScore && cardScore > 10) {
          cardScore = 10;
        }
        if (cardScore == 1) {
          noOfAces += 1;
          cardScore = 11;
        }
        score += cardScore;
      }

      while (score > 21 && noOfAces> 0) {
        score -= 10;
        noOfAces -= 1;
      }

      return score;
    },
    // The value of the card that should exceed 21 if it exists (integer or undefined).
    getCardValue: (game) => {
      if (typeof state.card === 'undefined') {
        return state.card;
      }
      const value = state.card.slice(0, 2);
      let cardScore = parseInt(value);
      if (14 > cardScore && cardScore > 10) {
        cardScore = 10;
      }
      if (cardScore == 1) {
        cardScore = 11;
      }
      return cardScore;
    },
    // The cards value + the card value if it exits (integer).
    getTotal: (game) => {
      if (typeof game.getCardValue(game) === 'undefined') {
        return game.getCardsValue(game);
      }


      let score = game.getCardsValue(game);
      score += game.getCardValue(game);
      return score;
    },
    // The player's cards (array of strings).
    getCards: (game) => {
      return state.cards;
    },
    // The player's card (string or undefined).
    getCard: (game) => {
      return state.card;
    },
    // Player action (void).
    guess21OrUnder: (game) => {
      const card = dealer.draw(deck);
      state.cards.push(card);
      const score = game.getCardsValue(game);
      if (score>=21) {
        state.over = true;
        if (score == 21) {
          state.won = true;
        }
      }
    },
    // Player action (void).
    guessOver21: (game) => {
      state.card = dealer.draw(deck);
      state.over = true;
      if (game.getTotal(game) > 21) {
        state.won = true;
      }
    },
    getState: (game) => {
      return {
        cards: game.state.cards,
        cardsValue: game.getCardsValue(game),
        card: game.state.card,
        cardValue: game.getCardValue(game),
        total: game.getTotal(game),
        gameOver: game.isGameOver(game),
        playerWon: game.playerWon(game),
      };
    },
  };
};
