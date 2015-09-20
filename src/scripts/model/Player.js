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
     * Get cards from the pack.
     */
    Player.prototype.getCard = function () {
        if (this.cards.length < 6) {
            var pack = FOOL.currentGame.getPack();
            this.cards.push(pack.pop());
            FOOL.events.tunnel.sendEvent(new FOOL.events.GameEvent(FOOL.events.types.GET_CARD, FOOL.currentGame));
        } else {
            alert('I can\'t get card');
        }
    };

    /**
     * Toss the card on the table.
     * @param {number} index - Index of the card, which player is going to toss.
     */
    Player.prototype.tossCard = function (index) {
        if (this.cards.length > 0) {
            var table = FOOL.currentGame.getTable();
            table.push(this.cards.splice(index, 1)[0]);
            FOOL.events.tunnel.sendEvent(new FOOL.events.GameEvent(FOOL.events.types.TOSS_CARD, FOOL.currentGame));
        } else {
            alert('I don\'t have cards');
        }
    };

    /**
     * Throw the cards from the table to retreat
     */
    Player.prototype.sendToRetreat = function () {
        var table = FOOL.currentGame.getTable();
        var retreat = FOOL.currentGame.getRetreat();
        FOOL.currentGame.setRetreat(retreat.concat(table));
        FOOL.currentGame.setTable([]);
        FOOL.events.tunnel.sendEvent(new FOOL.events.GameEvent(FOOL.events.types.SEND_TO_RETREAT, FOOL.currentGame));
    };

    /**
     * Pick up cards from the table.
     */
    Player.prototype.pull = function () {
        var table = FOOL.currentGame.getTable();
        var playerCard = this.getCards();
        this.setCards(playerCard.concat(table));
        FOOL.currentGame.setTable([]);
        FOOL.events.tunnel.sendEvent(new FOOL.events.GameEvent(FOOL.events.types.PULL, FOOL.currentGame));
    };

    FOOL.classes.Player = Player;

})(FOOL);