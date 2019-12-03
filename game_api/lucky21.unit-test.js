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

test('isGameOver', () => {
  //TODO

  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);

  //Assert
  expect()
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

test('getTotal should be lower than 22 if you have an ace and roll over 21', () => {
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
  
  // act
  game.guess21OrUnder(game);

  
  // Assert
  expect(game.getTotal(game)).to.be.below(22)
});

test('getCards should return the last 2 cards in the deck after the shuffle', () => {
  // Arrange
  let deck = deckConstructor();
  let dealer = dealerConstructor();
  dealer.shuffle(deck);

  //save the last 2 cards in an array
  card0 = deck[49];
  card1 = deck[48];
  my_cards = [card0, card1];
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};

  
  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);

  // Assert
  expect(game.getCards).toEqual(my_cards);
});

test('', () => {
  //TODO
});