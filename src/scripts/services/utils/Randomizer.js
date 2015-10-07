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
        [].push.apply(cards, mix(cards).slice(0));
    };

    /**
     *
     * @param {Array} cards
     * @returns {Array}
     */
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