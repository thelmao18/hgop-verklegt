const context = require('./context.js').newContext();
const dealerConstructor = require('./dealer.js');

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
  const dealer = dealerConstructor(context);
  const deck = ['a', 'b', 'c', 'd', 'e', 'f'];

  // Act
  dealer.shuffle(deck);

  // assert
  expect(deck.length).toEqual(6);
});

test('shuffle', () => {

});

test('draw', () => {

});

test('draw', () => {

});
