function newRandom(randomReturnValues) {
  let i = 0;
  return {
      randomInt: (min, max) => {
          return randomReturnValues[i++];
      }
  };
}


test('dealer should shuffle cards', () => {
  // Arrange
  let dependencies = {
      'random': () => newRandom([2, 1]),
  };
  let newDealer = require('./dealer.js');
  let dealer = newDealer((name) => {
      return dependencies[name];
  });
  let deck = ['a', 'b', 'c'];

  // Act
  dealer.shuffle(deck)
  // Assert
  expect(deck).toEqual(['c', 'b', 'a']);
});

test('shuffle should return a deck of equal length to the original deck', () => 
{
  let newDealer = require('./dealer.js');
  let dealer = newDealer();
  let deck = ['a', 'b', 'c', 'd', 'e', 'f']

  //Act
  dealer.shuffle(deck);

  //assert
  expect(deck.length).toEqual(6);
});

test('shuffle', () => 
{
  
});

test('draw', () => 
{
  
});

test('draw', () => 
{
  
});