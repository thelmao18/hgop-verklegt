let context = require("./context.js").newContext();
let lucky21Constructor = require('./lucky21.js');
let deckConstructor = require("./deck.js");
let dealerConstructor = require("./dealer.js");

function voidRandom() {
  //randomInt returns input
  return {
    randomInt: (min, max) => {
      return min;
    }
  }
}


test('1. a new game should have 50 cards left in the deck', () => {
  // Arrange
  let game = lucky21Constructor(context);


  // Assert
  expect(game.state.deck.length).toEqual(50);
});

test('2. a new game should have 2 drawn cards', () => {
  // Arrange
  const game = lucky21Constructor(context);

  // Assert
  expect(game.state.cards.length).toEqual(2);
});

test('3. guess21OrUnder should draw the next card', () => {
  // Arrange
  let dependencies = {
    'random': () => voidRandom(),
    "deck": () => ['05C', '01D', '09S', '10H'],
    "dealer": () => dealerConstructor((name) => {
      return dependencies[name];
  }),
  };

  // Inject our dependencies
  let newGameConstructor = require("./lucky21.js");
  let game = newGameConstructor((name) => {
    return dependencies[name];
  });

  // Act
  game.guess21OrUnder(game);

  // Assert
  expect(game.state.cards.length).toEqual(3);
  expect(game.state.cards[2]).toEqual('01D');
});

test('4. guess21OrUnder, is 21 - the player wins', () => {
  // Arrange
  let dependencies = {
    'random': () => voidRandom(),
    "deck": () => ['10H', '02C', '09S', '12D'],
    "dealer": () => dealerConstructor((name) => {
      return dependencies[name];
  }),
  };

  // Inject our dependencies
  let newGameConstructor = require("./lucky21.js");
  let game = newGameConstructor((name) => {
    return dependencies[name];
  });

  // Act
  game.guess21OrUnder(game);

  // Assert
  expect(game.isGameOver(game)).toEqual(true);
  expect(game.playerWon(game)).toEqual(true);
});

test('5. guess21OrUnder, is over 21 - the player loses', () => {
  // Arrange
  let dependencies = {
    'random': () => voidRandom(),
    "deck": () => ['05D', '11H', '09S', '04D'],
    "dealer": () => dealerConstructor((name) => {
      return dependencies[name];
  }),
  };

  // Inject our dependencies
  let newGameConstructor = require("./lucky21.js");
  let game = newGameConstructor((name) => {
    return dependencies[name];
  });

  // Act
  game.guess21OrUnder(game);

  // Assert
  expect(game.isGameOver(game)).toEqual(true);
  expect(game.playerWon(game)).toEqual(false);
});

test('6. guess21OrUnder, is under 21 - the game continues', () => {
  // Arrange
  let dependencies = {
    'random': () => voidRandom(),
    "deck": () => ['05D', '05H', '09S', '03D'],
    "dealer": () => dealerConstructor((name) => {
      return dependencies[name];
  }),
  };

  // Inject our dependencies
  let newGameConstructor = require("./lucky21.js");
  let game = newGameConstructor((name) => {
    return dependencies[name];
  });

  // Act
  game.guess21OrUnder(game);

  // Assert
  expect(game.isGameOver(game)).toEqual(false);
});

test('7. isGameOver should return true if you exceed 21', () => {
  //Arrange
  let dependencies = {
    'random': () => voidRandom(),
    "deck": () => ['05C', '10D', '09S', '10H'],
    "dealer": () => dealerConstructor((name) => {
      return dependencies[name];
  }),
  };

  // Inject our dependencies
  let newGameConstructor = require("./lucky21.js");
  let game = newGameConstructor((name) => {
    return dependencies[name];
  });


  // Act
  game.guess21OrUnder(game);

  // Assert
  expect(game.isGameOver(game)).toEqual(true);
});

test('8. guessOver21, is under 21 - the player loses', () => {
  // Arrange
  let dependencies = {
    'random': () => voidRandom(),
    "deck": () => ['05C', '02D', '08S', '10H'],
    "dealer": () => dealerConstructor((name) => {
      return dependencies[name];
  }),
  };

  // Inject our dependencies
  let newGameConstructor = require("./lucky21.js");
  let game = newGameConstructor((name) => {
    return dependencies[name];
  });

  // Act
  game.guessOver21(game);

  // Assert
  expect(game.isGameOver(game)).toEqual(true);
  expect(game.playerWon(game)).toEqual(false);
});

test('9. guessOver21, is over 21 - the player wins', () => {
  // Arrange
  let dependencies = {
    'random': () => voidRandom(),
    "deck": () => ['05C', '12D', '09S', '10H'],
    "dealer": () => dealerConstructor((name) => {
      return dependencies[name];
  }),
  };

  // Inject our dependencies
  let newGameConstructor = require("./lucky21.js");
  let game = newGameConstructor((name) => {
    return dependencies[name];
  });

  // Act
  game.guessOver21(game);


  // Assert
  expect(game.isGameOver(game)).toEqual(true);
  expect(game.playerWon(game)).toEqual(true);
});

test('10. guessOver21, is 21 - the player loses', () => {
  // Arrange
  let dependencies = {
    'random': () => voidRandom(),
    "deck": () => ['05C', '02D', '09S', '10H'],
    "dealer": () => dealerConstructor((name) => {
      return dependencies[name];
  }),
  };

  // Inject our dependencies
  let newGameConstructor = require("./lucky21.js");
  let game = newGameConstructor((name) => {
    return dependencies[name];
  });

  // Act
  game.guessOver21(game);

  // Assert
  expect(game.isGameOver(game)).toEqual(true);
  expect(game.playerWon(game)).toEqual(false);
});

test('11. playerWon, 21 or under', () => {
  // Arrange
  let dependencies = {
    'random': () => voidRandom(),
    "deck": () => ['05C', '02D', '09S', '10H'],
    "dealer": () => dealerConstructor((name) => {
      return dependencies[name];
  }),
  };

  // Inject our dependencies
  let newGameConstructor = require("./lucky21.js");
  let game = newGameConstructor((name) => {
    return dependencies[name];
  });

  // Act
  game.guess21OrUnder(game);

  // Assert
  expect(game.playerWon(game)).toEqual(true);
});

test('12. PlayerWon, over 21', () => {
  // Arrange
  let dependencies = {
    'random': () => voidRandom(),
    "deck": () => ['05C', '03D', '09S', '10H'],
    "dealer": () => dealerConstructor((name) => {
      return dependencies[name];
  }),
  };

  // Inject our dependencies
  let newGameConstructor = require("./lucky21.js");
  let game = newGameConstructor((name) => {
    return dependencies[name];
  });

  // Act
  game.guessOver21(game);

  // Assert
  expect(game.playerWon(game)).toEqual(true);
});

test('13. getCardsValue should return 12 if you are dealt two aces', () => {
  // Arrange
  let dependencies = {
    'random': () => voidRandom(),
    "deck": () => ['05C', '01D', '01S', '01H'],
    "dealer": () => dealerConstructor((name) => {
      return dependencies[name];
  }),
  };

  // Inject our dependencies
  let newGameConstructor = require("./lucky21.js");
  let game = newGameConstructor((name) => {
    return dependencies[name];
  });

  // Assert
  expect(game.getCardsValue(game)).toEqual(12);
});

test('14. getCardValue should return undefined if player chooses guess21OrUnder', () => {
  // Arrange
  let game = lucky21Constructor(context);

  // Act
  game.guess21OrUnder(game);

  // Assert
  expect(game.getCardValue(game)).toEqual(undefined);
});

test('15. getCardValue should return undefined if player chooses guess21OrUnder', () => {
  // Arrange
  let game = lucky21Constructor(context);

  // Act
  game.guess21OrUnder(game);

  // Assert
  expect(game.getCardValue(game)).toEqual(undefined);
});

test('16. getCardValue should return int after choosing guessOver21', () => {
  // Arrange
  let game = lucky21Constructor(context);


  // Act
  game.guessOver21(game);

  // Assert
  expect(typeof game.getCardValue(game)).toEqual('number');
});

test('17. getCard should return undefined after choosing guess21OrUnder', () => {
  // Arrange
  let game = lucky21Constructor(context);

  // Act
  game.guess21OrUnder(game);

  // Assert
  expect(game.getCard(game)).toEqual(undefined);
});

test('18. getCard should return a string after choosing guessOver21', () => {
  // Arrange
  let game = lucky21Constructor(context);

  // Act
  game.guessOver21(game);

  // Assert
  expect(typeof game.getCard(game)).toEqual('string');
});

test('19. getTotal should return the highest possible compination after calling GuessOver21', () => {
  // Arrange
  let dependencies = {
    'random': () => voidRandom(),
    "deck": () => ['05C', '09D', '01S', '10H'],
    "dealer": () => dealerConstructor((name) => {
      return dependencies[name];
  }),
  };

  // Inject our dependencies
  let newGameConstructor = require("./lucky21.js");
  let game = newGameConstructor((name) => {
    return dependencies[name];
  });

  game.guessOver21(game);

  // Assert
  expect(game.getTotal(game)).toEqual(30);
});

test('20. getCards should return the last 2 cards in the deck after the shuffle', () => {
  // Arrange
  const deck = deckConstructor();
  const dealer = dealerConstructor();
  dealer.shuffle(deck);

  // save the last 2 cards in an array
  const card0 = deck[51];
  const card1 = deck[50];
  const myCards = [card0, card1];
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};

  // Inject our dependencies
  const game = lucky21Constructor(deck, dealer);

  // Assert
  expect(game.getCards(game)).toEqual(myCards);
});

test('21. The game should not end if the player draws all 4 aces while choosing Guess21OrUnder', () => {
  // Arrange
  let dependencies = {
    'random': () => voidRandom(),
    "deck": () => ['01C', '01D', '01S', '01H'],
    "dealer": () => dealerConstructor((name) => {
      return dependencies[name];
  }),
  };

  // Inject our dependencies
  let newGameConstructor = require("./lucky21.js");
  let game = newGameConstructor((name) => {
    return dependencies[name];
  });

  // Act
  game.guess21OrUnder(game);
  game.guess21OrUnder(game);


  // Assert
  expect(game.isGameOver(game)).toEqual(false);
});

test('22. guessOver21, is over 21 because of an ace- the player wins', () => {
  // Arrange
  let dependencies = {
    'random': () => voidRandom(),
    "deck": () => ['05C', '01D', '09S', '05H'],
    "dealer": () => dealerConstructor((name) => {
      return dependencies[name];
  }),
  };

  // Inject our dependencies
  let newGameConstructor = require("./lucky21.js");
  let game = newGameConstructor((name) => {
    return dependencies[name];
  });

  // Act
  game.guessOver21(game);


  // Assert
  expect(game.isGameOver(game)).toEqual(true);
  expect(game.playerWon(game)).toEqual(true);
});
