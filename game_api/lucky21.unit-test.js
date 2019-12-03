const deckConstructor = require('./deck.js');
const dealerConstructor = require('./dealer.js');
const lucky21Constructor = require('./lucky21.js');

test('a new game should have 50 cards left in the deck', () => {
  //Arrange
  let deck = deckConstructor();
  let dealer = dealerConstructor();

  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);
  
  //Assert
  expect(game.state.deck.length).toEqual(50);
});

test('a new game should have 2 drawn cards', () => {
  //Arrange
  let deck = deckConstructor();
  let dealer = dealerConstructor();
  
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
    '10H', '09C', '09S', '03D', 
  ];
  let dealer = dealerConstructor();

  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};

  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);

  // Act
  game.guess21OrUnder(game);

  //Assert
  expect(game.isGameOver(game)).toEqual(true)
  expect(game.playerWon(game)).toEqual(true);
});

test('guess21OrUnder, is over 21 - the player loses', () => {
  //Arrange
  let deck = deckConstructor();
  deck = [
   '05D' , '11H', '09S', '04D', 
  ];
  let dealer = dealerConstructor();

  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};

  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);

  //Act
  game.guess21OrUnder(game);

  //Assert
  expect(game.isGameOver(game)).toEqual(true)
  expect(game.playerWon(game)).toEqual(false);
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
  game.guess21OrUnder(game);

  //Assert
  expect(game.isGameOver(game)).toEqual(false);
});

test('isGameOver should return true if you exceed 21', () => {
  let deck = deckConstructor();
  deck = [
      '05C', '10D', '09S', '10H', 
  ];
  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};
  
  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);
  
  // Act
  game.guess21OrUnder(game);

  //Assert
  expect(game.isGameOver(game)).toEqual(true);
});

test('guessOver21, is under 21 - the player loses', () => {
  // Arrange
  let deck = deckConstructor();
  deck = [
      '05C', '02D', '08S', '10H', 
  ];
  let dealer = dealerConstructor();
  
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};

  // Act
  game.guessOver21(game);

  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);

  //Assert
  expect(game.isGameOver(game)).toEqual(true)
  expect(game.playerWon(game)).toEqual(false);
});

test('guessOver21, is over 21 - the player wins', () => {
  //Arrange
  let deck = deckConstructor();
  deck = [
    '05C', 'QD', '09S', '10H', 
  ];
  let dealer = dealerConstructor();

  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};

  // Act
  game.guessOver21(game);

  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);

  //Assert
  expect(game.isGameOver(game)).toEqual(true)
  expect(game.playerWon(game)).toEqual(true);
});

test('guessOver21, is 21 - the player loses', () => {
  //Arrange
  let deck = deckConstructor();
  deck = [
    '05C', '02D', '09S', '10H', 
  ];
  let dealer = dealerConstructor();

  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};

  // Act
  game.guessOver21(game);

  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);

  //Assert
  expect(game.isGameOver(game)).toEqual(true)
  expect(game.playerWon(game)).toEqual(false);
});

test('playerWon, 21 or under', () => {
  //Arrange
  let deck = deckConstructor();
  deck = [
    '05C', '02D', '09S', '10H', 
  ];
  let dealer = dealerConstructor();

  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};

  // Act
  game.guess21OrUnder(game);

  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);

  //Assert
  expect(game.playerWon(game)).toEqual(true);
});

test('PlayerWon, over 21', () => {
  //Arrange
  let deck = deckConstructor();
  deck = [
    '05C', '03D', '09S', '10H', 
  ];
  let dealer = dealerConstructor();

  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};

  // Act
  game.guessOver21(game);

  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);

  //Assert
  expect(game.playerWon(game)).toEqual(true);
});

test('getCardsValue', () => {
  //TODO

  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);
});

test('getCardValue', () => {
  //TODO

  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);
});

test('getCard', () => {
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

test('getTotal should be lower than 22 if you have an ace with the value 10 and have not yet lost', () => {
  // Arrange
  let deck = deckConstructor();
  deck = [
      '05C', '09D', '01S', '10H', 
  ];
  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};
  
  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);
  // Assert
  expect(game.getTotal(game)).to.be.below(22);
});

test('getCards should return the last 2 cards in the deck after the shuffle', () => {
  // Arrange
  let deck = deckConstructor();
  let dealer = dealerConstructor();
  dealer.shuffle(deck);

  //save the last 2 cards in an array
  let card0 = deck[49];
  let card1 = deck[48];
  let my_cards = [card0, card1];
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};

  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);

  // Assert
  expect(game.getCards(game)).toEqual(my_cards);
});

test('guessOver21 should draw the next card', () => {
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
  game.guessOver21(game);
  
  // Assert
  expect(game.state.cards.length).toEqual(3);
  expect(game.state.cards[2]).toEqual('01D');
});