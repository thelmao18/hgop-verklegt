const context = require('./context.js').newContext();
const lucky21Constructor = require('./lucky21.js');
const dealerConstructor = require('./dealer.js');

function voidRandom() {
  // randomInt returns input
  return {
    randomInt: (min, max) => {
      return min;
    },
  };
}


test('1. a new game should have 50 cards left in the deck', () => {
  // Arrange
  const game = lucky21Constructor(context);


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
  const dependencies = {
    'random': () => voidRandom(),
    'deck': () => ['05C', '01D', '09S', '10H'],
    'dealer': () => dealerConstructor((name) => {
      return dependencies[name];
    }),
  };

  // Inject our dependencies
  const newGameConstructor = require('./lucky21.js');
  const game = newGameConstructor((name) => {
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
  const dependencies = {
    'random': () => voidRandom(),
    'deck': () => ['10H', '02C', '09S', '12D'],
    'dealer': () => dealerConstructor((name) => {
      return dependencies[name];
    }),
  };

  // Inject our dependencies
  const newGameConstructor = require('./lucky21.js');
  const game = newGameConstructor((name) => {
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
  const dependencies = {
    'random': () => voidRandom(),
    'deck': () => ['05D', '11H', '09S', '04D'],
    'dealer': () => dealerConstructor((name) => {
      return dependencies[name];
    }),
  };

  // Inject our dependencies
  const newGameConstructor = require('./lucky21.js');
  const game = newGameConstructor((name) => {
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
  const dependencies = {
    'random': () => voidRandom(),
    'deck': () => ['05D', '05H', '09S', '03D'],
    'dealer': () => dealerConstructor((name) => {
      return dependencies[name];
    }),
  };

  // Inject our dependencies
  const newGameConstructor = require('./lucky21.js');
  const game = newGameConstructor((name) => {
    return dependencies[name];
  });

  // Act
  game.guess21OrUnder(game);

  // Assert
  expect(game.isGameOver(game)).toEqual(false);
});

test('7. isGameOver should return true if you exceed 21', () => {
  // Arrange
  const dependencies = {
    'random': () => voidRandom(),
    'deck': () => ['05C', '10D', '09S', '10H'],
    'dealer': () => dealerConstructor((name) => {
      return dependencies[name];
    }),
  };

  // Inject our dependencies
  const newGameConstructor = require('./lucky21.js');
  const game = newGameConstructor((name) => {
    return dependencies[name];
  });


  // Act
  game.guess21OrUnder(game);

  // Assert
  expect(game.isGameOver(game)).toEqual(true);
});

test('8. guessOver21, is under 21 - the player loses', () => {
  // Arrange
  const dependencies = {
    'random': () => voidRandom(),
    'deck': () => ['05C', '02D', '08S', '10H'],
    'dealer': () => dealerConstructor((name) => {
      return dependencies[name];
    }),
  };

  // Inject our dependencies
  const newGameConstructor = require('./lucky21.js');
  const game = newGameConstructor((name) => {
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
  const dependencies = {
    'random': () => voidRandom(),
    'deck': () => ['05C', '12D', '09S', '10H'],
    'dealer': () => dealerConstructor((name) => {
      return dependencies[name];
    }),
  };

  // Inject our dependencies
  const newGameConstructor = require('./lucky21.js');
  const game = newGameConstructor((name) => {
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
  const dependencies = {
    'random': () => voidRandom(),
    'deck': () => ['05C', '02D', '09S', '10H'],
    'dealer': () => dealerConstructor((name) => {
      return dependencies[name];
    }),
  };

  // Inject our dependencies
  const newGameConstructor = require('./lucky21.js');
  const game = newGameConstructor((name) => {
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
  const dependencies = {
    'random': () => voidRandom(),
    'deck': () => ['05C', '02D', '09S', '10H'],
    'dealer': () => dealerConstructor((name) => {
      return dependencies[name];
    }),
  };

  // Inject our dependencies
  const newGameConstructor = require('./lucky21.js');
  const game = newGameConstructor((name) => {
    return dependencies[name];
  });

  // Act
  game.guess21OrUnder(game);

  // Assert
  expect(game.playerWon(game)).toEqual(true);
});

test('12. PlayerWon, over 21', () => {
  // Arrange
  const dependencies = {
    'random': () => voidRandom(),
    'deck': () => ['05C', '03D', '09S', '10H'],
    'dealer': () => dealerConstructor((name) => {
      return dependencies[name];
    }),
  };

  // Inject our dependencies
  const newGameConstructor = require('./lucky21.js');
  const game = newGameConstructor((name) => {
    return dependencies[name];
  });

  // Act
  game.guessOver21(game);

  // Assert
  expect(game.playerWon(game)).toEqual(true);
});

test('13. getCardsValue should return 12 if you are dealt two aces', () => {
  // Arrange
  const dependencies = {
    'random': () => voidRandom(),
    'deck': () => ['05C', '01D', '01S', '01H'],
    'dealer': () => dealerConstructor((name) => {
      return dependencies[name];
    }),
  };

  // Inject our dependencies
  const newGameConstructor = require('./lucky21.js');
  const game = newGameConstructor((name) => {
    return dependencies[name];
  });

  // Assert
  expect(game.getCardsValue(game)).toEqual(12);
});

test('14. getCardValue should return undefined if player chooses guess21OrUnder', () => {
  // Arrange
  const game = lucky21Constructor(context);

  // Act
  game.guess21OrUnder(game);

  // Assert
  expect(game.getCardValue(game)).toEqual(undefined);
});

test('15. getCardValue should return undefined if player chooses guess21OrUnder', () => {
  // Arrange
  const game = lucky21Constructor(context);

  // Act
  game.guess21OrUnder(game);

  // Assert
  expect(game.getCardValue(game)).toEqual(undefined);
});

test('16. getCardValue should return int after choosing guessOver21', () => {
  // Arrange
  const game = lucky21Constructor(context);


  // Act
  game.guessOver21(game);

  // Assert
  expect(typeof game.getCardValue(game)).toEqual('number');
});

test('17. getCard should return undefined after choosing guess21OrUnder', () => {
  // Arrange
  const game = lucky21Constructor(context);

  // Act
  game.guess21OrUnder(game);

  // Assert
  expect(game.getCard(game)).toEqual(undefined);
});

test('18. getCard should return a string after choosing guessOver21', () => {
  // Arrange
  const game = lucky21Constructor(context);

  // Act
  game.guessOver21(game);

  // Assert
  expect(typeof game.getCard(game)).toEqual('string');
});

test('19. getTotal should return the highest possible compination after calling GuessOver21', () => {
  // Arrange
  const dependencies = {
    'random': () => voidRandom(),
    'deck': () => ['05C', '09D', '01S', '10H'],
    'dealer': () => dealerConstructor((name) => {
      return dependencies[name];
    }),
  };

  // Inject our dependencies
  const newGameConstructor = require('./lucky21.js');
  const game = newGameConstructor((name) => {
    return dependencies[name];
  });

  game.guessOver21(game);

  // Assert
  expect(game.getTotal(game)).toEqual(30);
});

test('20. getCards should return the last 3  items after you have been dealt a card', () => {
  // Arrange
  const game = lucky21Constructor(context);

  // Act
  game.guess21OrUnder(game);

  // Assert
  expect(game.getCards(game).length).toEqual(3);
});

test('21. The game should not end if the player draws all 4 aces while choosing Guess21OrUnder', () => {
  // Arrange
  const dependencies = {
    'random': () => voidRandom(),
    'deck': () => ['01C', '01D', '01S', '01H'],
    'dealer': () => dealerConstructor((name) => {
      return dependencies[name];
    }),
  };

  // Inject our dependencies
  const newGameConstructor = require('./lucky21.js');
  const game = newGameConstructor((name) => {
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
  const dependencies = {
    'random': () => voidRandom(),
    'deck': () => ['05C', '01D', '09S', '05H'],
    'dealer': () => dealerConstructor((name) => {
      return dependencies[name];
    }),
  };

  // Inject our dependencies
  const newGameConstructor = require('./lucky21.js');
  const game = newGameConstructor((name) => {
    return dependencies[name];
  });

  // Act
  game.guessOver21(game);


  // Assert
  expect(game.isGameOver(game)).toEqual(true);
  expect(game.playerWon(game)).toEqual(true);
});


const deckConstructor = require('./deck.js');
const randomConstructor = require('./random.js');

const newGame = (deck) => {
  const random = randomConstructor();
  const dealerDependencies = {
    'random': (context) => random,
  };
  const dealer = dealerConstructor((name) => dealerDependencies[name]);
  dealer.shuffle = (deck) => { };

  const dependencies = {
    'deck': () => deck || deckConstructor(),
    'dealer': () => dealer,
  };
  return lucky21Constructor((name) => dependencies[name]);
};

describe('game - context construction', () => {
  test('should construct a new game', () => {
    const context = require('./context.js').newContext();

    const gameConstructor = context('lucky21');

    const game = gameConstructor(context);

    expect(game).not.toEqual(50);
  });
});

describe('game - constructor', () => {
  test('should have 50 cards left in the deck', () => {
    const game = newGame(undefined);

    expect(game.state.deck.length).toEqual(50);
  });

  test('should have 2 cards drawn', () => {
    const game = newGame();

    expect(game.state.cards.length).toEqual(2);
  });
});

describe('game - isGameOver', () => {
  test('should be true when the player guesses 21 or under wrong', () => {
    const game = newGame(['03H', '01H', '12H', '09H']);

    game.guess21OrUnder(game);
    game.guess21OrUnder(game);

    expect(game.isGameOver(game)).toEqual(true);
  });

  test('should be true when the player guesses over 21 right', () => {
    const game = newGame(['10H', '12H', '09H']);

    game.guessOver21(game);

    expect(game.isGameOver(game)).toEqual(true);
  });

  test('should be true if the player has lucky 21', () => {
    const game = newGame(['01H', '13H']);

    expect(game.isGameOver(game)).toEqual(true);
  });

  test('should be false if the player is under 21', () => {
    const game = newGame(['12H', '13H']);

    expect(game.isGameOver(game)).toEqual(false);
  });
});

describe('game - playerWon', () => {
  test('should be true if the player guessed over 21 correctly', () => {
    const game = newGame(['10H', '12H', '09H']);

    game.guessOver21(game);

    expect(game.playerWon(game)).toEqual(true);
  });

  test('should be false if the player guesses 21 or under correctly', () => {
    const game = newGame(['03H', '04H', '06H']);

    game.guess21OrUnder(game);

    expect(game.playerWon(game)).toEqual(false);
  });
});

describe('game - getCardsValue', () => {
  test('should be 14 for [ 3, 6, 5 ]', () => {
    const game = newGame(['03H', '06C', '05D']);

    game.guess21OrUnder(game);

    expect(game.getCardsValue(game)).toEqual(14);
  });

  test('should return 14 for [ Q, 9, A ]', () => {
    const game = newGame(['12H', '09H', '01H']);

    game.guess21OrUnder(game);

    expect(game.getCardsValue(game)).toEqual(20);
  });

  test('should return 14 for [ A, A, A, A ]', () => {
    const game = newGame(['01H', '01C', '01D', '01S']);

    game.guess21OrUnder(game);
    game.guess21OrUnder(game);

    expect(game.getCardsValue(game)).toEqual(14);
  });

  test('should return 20 for [ A, Q, 9 ]', () => {
    const game = newGame(['01H', '12H', '9H']);

    game.guess21OrUnder(game);

    expect(game.getCardsValue(game)).toEqual(20);
  });

  test('should return 12 for [ 10, A, A ]', () => {
    const game = newGame(['10H', '01S', '01H']);

    game.guess21OrUnder(game);

    expect(game.getCardsValue(game)).toEqual(12);
  });
});

describe('game - getCardValue', () => {
  test('should return undefined if the player has not made a over 21 guess yet', () => {
    const game = newGame();
    expect(game.getCardValue(game)).toEqual(undefined);
  });

  test('should returns 10 if card is a Jack', () => {
    const game = newGame(['11H', '12H', '13H']);

    game.guessOver21(game);

    expect(game.getCardValue(game)).toEqual(10);
  });
});

describe('game - getTotal', () => {
  test('should return 14 for 5 + [ 3, 6 ]', () => {
    const game = newGame(['05H', '03H', '06C']);

    game.guessOver21(game);

    expect(game.getTotal(game)).toEqual(14);
  });

  test('should return 9 for undefined + [ 3, 6 ]', () => {
    const game = newGame(['03H', '06C']);

    expect(game.getTotal(game)).toEqual(9);
  });
});

describe('game - getCards', () => {
  test('should return the cards', () => {
    const game = newGame();
    expect(game.getCards(game)).toBe(game.state.cards);
  });
});

describe('game - getCard', () => {
  test('should return the card', () => {
    const game = newGame();

    game.guessOver21(game);

    expect(game.getCard(game)).toBe(game.state.card);
  });
});

describe('game - guess21OrUnder', () => {
  test('should draw the next card', () => {
    const game = newGame(['01C', '01H', '12H', '09H']);

    game.guess21OrUnder(game);

    expect(game.state.deck.length).toEqual(1);
  });

  test('should add next card value to cards', () => {
    const game = newGame(['01C', '01H', '12H', '09H']);

    game.guess21OrUnder(game);

    expect(game.getCards(game)).toEqual(['09H', '12H', '01H']);
  });
});

describe('game - guessOver21', () => {
  test('should draw the next card', () => {
    const game = newGame(['01C', '01H', '12H', '09H']);

    game.guessOver21(game);

    expect(game.state.deck.length).toEqual(1);
  });

  test('should set the card value', () => {
    const game = newGame(['01C', '01H', '12H', '09H']);

    game.guessOver21(game);

    expect(game.getCard(game)).toEqual('01H');
  });
});