(function (FOOL) {
    'use strict';

    /**
     *
     * @constructor
     */
    function Player(name, cards, game) {
        this.name = name || null;
        this.cards = cards || [];
        this.isRobot = true;
        this.isActive = false;

        this.game = game || null;
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

    /**
     *
     * @param {boolean} isRobot
     */
    Player.prototype.setIsRobot = function (isRobot) {
        this.isRobot = isRobot;
    };

    /**
     *
     * @returns {boolean|*}
     */
    Player.prototype.getIsRobot = function () {
        return this.isRobot;
    };

    /**
     *
     * @param {boolean} isActive
     */
    Player.prototype.setIsActive = function (isActive) {
        this.isActive = isActive;
    };

    /**
     *
     * @returns {boolean|*}
     */
    Player.prototype.getIsActive = function () {
        return this.isActive;
    };

    /**
     *
     * @param {Game} game
     */
    Player.prototype.setGame = function (game) {
        this.game = game;
    };

    /**
     *
     * @returns {Game|null}
     */
    Player.prototype.getGame = function () {
        return this.game;
    };

    /**
     * Get cards from the pack.
     */
    Player.prototype.getCard = function () {
        //todo...
    };

    /**
     * Toss the card on the table.
     * @param {number} index - Index of the card, which player is going to toss.
     */
    Player.prototype.tossCard = function (index) {
        //todo...
    };

    /**
     * Throw the cards from the table to retreat
     */
    Player.prototype.sendToRetreat = function () {
        //todo...
    };

    /**
     * Pick up cards from the table.
     */
    Player.prototype.pull = function () {
        //todo...
    };

    /**
     * Human player provides an opportunity to go to the robot.
     */
    Player.prototype.goRobot = function () {
        //todo...
    };

    FOOL.classes.Player = Player;

})(FOOL);