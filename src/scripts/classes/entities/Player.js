(function (FOOL) {
    'use strict';

    /**
     *
     * @constructor
     */
    function Player(name, cards) {
        this.name = name || null;
        this.cards = cards || [];
    }

    /**
     *
     * @returns {null|String}
     */
    Player.prototype.getName = function () {
        return this.name;
    };

    /**
     *
     * @param {String} name
     */
    Player.prototype.setName = function (name) {
        this.name = name;
    };

    /**
     *
     * @returns {Array}
     */
    Player.prototype.getCards = function () {
        return this.cards;
    };

    /**
     *
     * @param {Array} cards
     */
    Player.prototype.setCards = function (cards) {
        this.cards = cards;
    };

    FOOL.classes.Player = Player;

})(FOOL);