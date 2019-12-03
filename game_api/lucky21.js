module.exports = (deck, dealer) => {
    dealer.shuffle(deck);
    let card0 = dealer.draw(deck);
    let card1 = dealer.draw(deck);
    let state = {
        deck: deck,
        dealer: dealer,
        cards: [
            card0,
            card1,
        ],
        over: false,
        won: false,
        // The card that the player thinks will exceed 21.
        card: undefined,
    };
    return {
        state: state,
        // Is the game over (true or false).
        isGameOver: (game) => {
            return state.over;
        },
        // Has the player won (true or false).
        playerWon: (game) => {
            return state.won;
        },
        // The highest score the cards can yield without going over 21 (integer).
        getCardsValue: (game) => {
            let length = state.deck.length;
            let no_of_aces = 0;
            let score = 0;
            for (i=0; length>i; i++)
            {
                let card = state.cards[i];
                let value = card.slice(0,1);
                let card_score = parseInt(value);
                if (14 > card_score > 10)
                {
                    card_score = 10;
                }
                if (card_score == 1)
                {
                    no_of_aces += 1;
                    card_score = 11;
                }
                score += card_score;
            }
            while (score > 21 && no_of_aces> 0)
            {
                score -= 10;
                no_of_aces -= 10;
            }

            return score;
        },
        // The value of the card that should exceed 21 if it exists (integer or undefined).
        getCardValue: (game) => {
            // TODO
        },
        // The cards value + the card value if it exits (integer).
        getTotal: (game) => {
            if (typeof game.getCardValue(game) == undefined)
            {
                return game.getCardsValue(game);
            }
            return game.getCardsValue(game) + game.getCardValue(game);
        },
        // The player's cards (array of strings).
        getCards: (game) => {
            return state.cards;
        },
        // The player's card (string or undefined).
        getCard: (game) => {
            return state.card;
        },
        // Player action (void).
        guess21OrUnder: (game) => {
            let card = dealer.draw(deck);
            state.cards.push(card);
            let score = game.getCardsValue(game);
            if (score>=21)
            {
                state.over = true;
                if (score == 21)
                {
                    state.won = true;
                }
            }

        },
        // Player action (void).
        guessOver21: (game) => {
            state.card = dealer.draw(deck);
            state.over = true;
            if (game.getTotal(game) > 21)
            {
                state.won = true;
            }
        },
    };
};
