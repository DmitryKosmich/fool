(function (FOOL) {
    'use strict';

    /**
     *
     * @constructor
     * @namespace Player
     */
    function Player(name, cards, game) {
        this.name = name || null;
        this.cards = cards || [];
        this.isRobot = true;
        this.isActive = false;
        this.id = FOOL.randomizer.generateId();
        this.game = game || null;

        var self = this;
        setInterval(function () {
            if (!game.getLock() && self.isRobot && self.isActive) {
                FOOL.ai.action(self);
            }
        }, FOOL.defaults.robotPing);
    }

    /**
     *
     * @returns {number}
     */
    Player.prototype.getId = function () {
        return this.id;
    };

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
    Player.prototype.setActiveIs = function (isActive) {
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
     * @param {FOOL.classes.Game} game
     */
    Player.prototype.setGame = function (game) {
        this.game = game;
    };

    /**
     *
     * @returns {FOOL.classes.Game|null}
     */
    Player.prototype.getGame = function () {
        return this.game;
    };

    /**
     * Throw the cards from the table to retreat
     */
    Player.prototype.sendToRetreat = function () {
        var table = FOOL.currentGame.getBoutCards();
        var retreat = FOOL.currentGame.getRetreat();
        FOOL.currentGame.setRetreat(retreat.concat(table));
        FOOL.currentGame.setBoutCards([]);
        FOOL.events.tunnel.sendEvent(new FOOL.events.GameEvent(FOOL.events.gameTypes.SEND_TO_RETREAT, FOOL.currentGame));
    };

    /**
     * Pick up cards from the table.
     */
    Player.prototype.pull = function () {
        var table = FOOL.currentGame.getBoutCards();
        var playerCard = this.getCards();
        this.setCards(playerCard.concat(table));
        FOOL.currentGame.setBoutCards([]);
        FOOL.events.tunnel.sendEvent(new FOOL.events.GameEvent(FOOL.events.gameTypes.PULL, FOOL.currentGame));
    };

    FOOL.classes.Player = Player;

})(FOOL);