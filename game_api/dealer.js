module.exports = (context) => {
  let randomConstructor = context('random');
  let random = randomConstructor(context);

  return {
    shuffle: (deck) => {
      for (let i = 0; i < deck.length - 1; i++) {
        const j = random.randomInt(i, deck.length);
        const card = deck[j];
        const old = deck[i];
        deck[i] = card;
        deck[j] = old;
      }
    },
    draw: (deck) => {
      const card = deck.pop();
      return card;
    },
  };
};
