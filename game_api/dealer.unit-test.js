const context = require('./context.js').newContext();
const dealerConstructor = require('./dealer.js');
const deckConstructor = require('./deck.js');

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
  // Arrange
  const dealer = dealerConstructor(context);
  const deck = ['a', 'b', 'c', 'd', 'e', 'f'];

  // Act
  dealer.shuffle(deck);

  // assert
  expect(deck.length).toEqual(6);
});

test('shuffle should include all cards originally in the deck', () => {
  // Arrange
  const dealer = dealerConstructor(context);
  const deck = ['a', 'b', 'c', 'd', 'e', 'f'];
  const deckCopy = ['a', 'b', 'c', 'd', 'e', 'f'];

  // Act
  dealer.shuffle(deck);

  // Assert
  expect(deck).toEqual(expect.arrayContaining(deckCopy));
});

test('draw should remove a card from deck', () => {
  // Arrange
  const dealer = dealerConstructor(context);
  const deck = deckConstructor(context);

  // Act

  const myCard = dealer.draw(deck);

  // Assert
  expect(deck).toEqual(expect.not.arrayContaining([myCard]));
});

test('draw should always reduce deck length by one', () => {
  // Arrange
  const dealer = dealerConstructor(context);
  const deck = deckConstructor(context);

  // Act
  const oldLength = deck.length;
  dealer.draw(deck);
  const newLength = deck.length;

  // Assert
  expect(newLength).toEqual(oldLength-1);
});
