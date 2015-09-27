(function (FOOL) {
    'use strict';

    /**
     *
     * @constructor
     */
    function Randomizer() {}

    /**
     * This method should mix cards
     * @param {Array} cards
     */
    Randomizer.prototype.shuffleTalon = function (cards) {
        var i, mixedCards = mix(cards),
            length = mixedCards ? mixedCards.length : 0;
        for (i = 0; i < length; i += 1) {
            cards.push(mixedCards[i]);
        }
    };

    function mix(cards) {
        var randomNum, length = cards ? cards.length : 0, result = [];
        while (length) {
            randomNum = Math.random() * length;
            result.push(cards.splice(randomNum, 1)[0]);
            length -= 1;
        }
        return result;
    }

    FOOL.randomizer = new Randomizer();

})(FOOL);