(function (FOOL) {
    'use strict';

    /**
     *
     * @constructor
     */
    function SearchEngine() {}

    /**
     *
     * @param {FOOL.classes.Game} [game]
     */
    SearchEngine.prototype.findAllCards = function (game) {
        var currentGame = game || FOOL.currentGame,
            player =  currentGame.getPlayer(),
            rivals = currentGame.getRivals(),
            bout = currentGame.getBoutCards(),
            retreat = currentGame.getRetreat(),
            talon = currentGame.getTalon(),
            result = [];
        [].push.apply(result, player.getCards().slice(0));
        [].push.apply(result, bout.slice(0));
        [].push.apply(result, retreat.slice(0));
        [].push.apply(result, talon.slice(0));
        rivals.forEach(function (rival) {
            [].push.apply(result, rival.getCards().slice(0));
        });
        return result;
    };

    /**
     *
     * @param {string} id
     * @param {FOOL.classes.Game} [game]
     */
    SearchEngine.prototype.findPlayerById = function (id, game) {
        var currentGame = game || FOOL.currentGame,
            i,
            rivals = currentGame.getRivals(),
            length = rivals ? rivals.length : 0;
        for (i = 0; i < length; i += 1) {
            if (rivals[i].name === id) {
                return rivals[i];
            }
        }
        return FOOL.currentGame.getPlayer();
    };

    /**
     *
     * @param {number} color
     * @param {number} value
     * @param {FOOL.classes.Game} [game]
     * @returns {FOOL.classes.Card}
     */
    SearchEngine.prototype.findCardByColorAndValue = function (color, value, game) {
        var currentGame = game || FOOL.currentGame,
            allCards = SearchEngine.prototype.findAllCards(currentGame),
            length = allCards ? allCards.length : 0,
            i;
        for(i = 0; i < length; i += 1) {
            if (allCards[i].getColor() === color && allCards[i].getValue() === value) {
                return allCards[i];
            }
        }
        return null;
    };

    /**
     *
     * @param {FOOL.classes.Card} card
     * @param {Game} [game]
     * @returns {*}
     */
    SearchEngine.prototype.findPlayerByCard = function (card, game) {
        var i,
            currentGame = game || FOOL.currentGame,
            rivals = currentGame.getRivals(),
            length = rivals ? rivals.length : 0;
        for(i = 0; i < length; i += 1) {
            if (rivals[i].getCards().indexOf(card) !== -1) {
                return rivals[i];
            }
        }
        return currentGame.getPlayer();
    };

    FOOL.search = new SearchEngine();

})(FOOL);