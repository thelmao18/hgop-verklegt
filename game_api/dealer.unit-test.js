const context = require('./context.js').newContext();
const dealerConstructor = require('./dealer.js');
const deckConstructor = require("./deck.js");

function newRandom(randomReturnValues) {
  let i = 0;
  return {
    randomInt: (min, max) => {
      return randomReturnValues[i++];
    },
  };
}


test('dealer should shuffle cards', () => {
  // Arrange
  const dependencies = {
    'random': () => newRandom([2, 1]),
  };
  const newDealer = require('./dealer.js');
  const dealer = newDealer((name) => {
    return dependencies[name];
  });
  const deck = ['a', 'b', 'c'];

  // Act
  dealer.shuffle(deck);
  // Assert
  expect(deck).toEqual(['c', 'b', 'a']);
});

test('shuffle should return a deck of equal length to the original deck', () => {
  //Arrange
  const dealer = dealerConstructor(context);
  const deck = ['a', 'b', 'c', 'd', 'e', 'f'];

  // Act
  dealer.shuffle(deck);

  // assert
  expect(deck.length).toEqual(6);
});

test('shuffle should include all cards originally in the deck', () => {
  //Arrange
  const dealer = dealerConstructor(context);
  let deck = ['a', 'b', 'c', 'd', 'e', 'f'];
  const deck_copy = ['a', 'b', 'c', 'd', 'e', 'f'];

  // Act
  dealer.shuffle(deck);

  //Assert
  expect(deck).toEqual(expect.arrayContaining(deck_copy));

});

test('draw should remove a card from deck', () => {
  //Arrange
  const dealer = dealerConstructor(context);
  let deck = deckConstructor(context);

  //Act

  let my_card = dealer.draw(deck);

  //Assert
  expect(deck).toEqual(expect.not.arrayContaining([my_card]));

});

test('draw should always reduce deck length by one', () => {
  //Arrange
  const dealer = dealerConstructor(context);
  let deck = deckConstructor(context);

  //Act
  let old_length = deck.length;
  let my_card = dealer.draw(deck);
  let new_length = deck.length;

  //Assert
  expect(new_length).toEqual(old_length-1);


});
