const context = require('./context.js').newContext();
const randomConstructor = require('./random.js');

test('random should return a number', () => {
  // Arrange
  const game = randomConstructor(context);

  // Act
  const randomNumber = game.randomInt(game);

  // Assert
  expect(typeof randomNumber).toEqual('number');
});

test('random should return a random number between 5 & 10', () => {
  // Arrange
  const game = randomConstructor(context);

  // Act
  const randomNumber = game.randomInt(5, 10);

  // Assert
  expect(randomNumber).toBeGreaterThanOrEqual(5);
  expect(randomNumber).toBeLessThanOrEqual(10);
});

test('random should return a number less than 5', () => {
  // Arrange
  const game = randomConstructor(context);

  // Act
  const randomNumber = game.randomInt(0, 5);

  // Assert
  expect(randomNumber).toBeLessThan(5);
});
