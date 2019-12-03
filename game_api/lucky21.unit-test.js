const deckConstructor = require('./deck.js');
const dealerConstructor = require('./dealer.js');
const lucky21Constructor = require('./lucky21.js');

test('a new game should have 50 cards left in the deck', () => {
  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);
  
  //Assert
  expect(game.state.deck.length).toEqual(50);
});

test('a new game should have 2 drawn cards', () => {
  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);

  //Assert
  expect(game.state.cards.length).toEqual(2);
});

test('guess21OrUnder should draw the next card', () => {
  // Arrange
  let deck = deckConstructor();
  deck = [
      '05C', '01D', '09S', '10H', 
  ];
  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};
  
  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);
  
  // Act
  game.guess21OrUnder(game);
  
  // Assert
  expect(game.state.cards.length).toEqual(3);
  expect(game.state.cards[2]).toEqual('01D');
});

test('guess21OrUnder, is 21 - the player wins', () => {
  //Arrange
  let deck = deckConstructor();
  deck = [
    '10H', '08C', '09S', '03D', 
  ];
  let dealer = dealerConstructor();

  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};

  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);

  // Act
  game.guess21OrUnder(game);

  //Assert
  expect(game.playerWon).toEqual(true)
});

test('guess21OrUnder, is over 21 - the player loses', () => {
  //Arrange
  let deck = deckConstructor();
  deck = [
   '05D' , '11H', '09S', '03D', 
  ];
  let dealer = dealerConstructor();

  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};

  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);

  //Act
  game.guess21OrUnder(game)

  //Assert
  expect(game.playerWon).toEqual(false)
});

test('guess21OrUnder, is under 21 - the game continues', () => {
  //Arrange
  let deck = deckConstructor();
  deck = [
    '05D' , '05H', '09S', '03D', 
  ];
  let dealer = dealerConstructor();

  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};

  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);

  //Act
  game.guess21OrUnder(game)

  //Assert
  expect(game.isGameOver).toEqual(false)
});

test('isGameOver, 21 or under', () => {
  //Arrange
  let deck = deckConstructor();
  let dealer = dealerConstructor();

  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);

  game.isGameOver(game)

  //Assert
  expect(game.).toEqual(true)
});

test('guessOver21 is under 21', () => {
  // Arrange
  let deck = deckConstructor();
  deck = [
      '05C', '01D', '09S', '10H', 
  ];
  let dealer = dealerConstructor();
  
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};

  // Act
  game.guessOver21(game)

  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);

  //Assert
  expect(game.state).toEqual()
});

test('guessOver21 is over 21', () => {
  //Arrange
  let deck = deckConstructor();
  let dealer = dealerConstructor();

  //TODO

  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);
});

test('guessOver21 is 21', () => {
  //Arrange
  let deck = deckConstructor();
  let dealer = dealerConstructor();

  //TODO

  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);
});

test('', () => {
  //TODO

  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);
});

test('', () => {
  //TODO

  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);
});

test('', () => {
  //TODO

  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);
});

test('', () => {
  //TODO

  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);
});

test('', () => {
  //TODO

  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);
});

test('', () => {
  //TODO

  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);
});

test('', () => {
  //TODO

  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);
});

test('', () => {
  //TODO

  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);
});

test('', () => {
  //TODO

  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);
});

test('', () => {
  //TODO

  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);
});
