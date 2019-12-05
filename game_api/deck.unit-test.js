const context = require('./context.js').newContext();
const deckConstructor = require('./deck.js');

test('deck should contain all hearts', () => {
  // Arrange
  let result = ['01H', '02H', '03H', '04H', '05H', '06H', '07H', '08H', '09H', '10H', '11H', '12H', '13H'];

  //Act
  let deck = deckConstructor(context);

  // Assert
  expect(deck).toEqual(expect.arrayContaining(result));
});
