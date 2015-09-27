(function (FOOL) {
    'use strict';

    /**
     *
     * @constructor
     */
    function Game() {
        this.retreat = [];
        this.boutCards = [];
    }

    /**
     *
     * @returns {Array|*}
     */
    Game.prototype.getTalon = function () {
        return this.talon;
    };

    /**
     *
     * @param {Array} talon
     */
    Game.prototype.setTalon = function (talon) {
        this.talon = talon;
    };

    /**
     *
     * @returns {FOOL.classes.Card|null|*}
     */
    Game.prototype.getTrump = function () {
        return this.trump;
    };

    /**
     *
     * @param {FOOL.classes.Card} trump
     */
    Game.prototype.setTrump = function (trump) {
        this.trump = trump;
    };

    /**
     *
     * @returns {FOOL.classes.Player|null|*}
     */
    Game.prototype.getPlayer = function () {
        return this.player;
    };

    /**
     *
     * @param {FOOL.classes.Player} player
     */
    Game.prototype.setPlayer = function (player) {
        this.player = player;
    };

    /**
     *
     * @returns {Array|*}
     */
    Game.prototype.getRivals = function () {
        return this.rivals;
    };

    /**
     *
     * @param {Array} rivals
     */
    Game.prototype.setRivals = function (rivals) {
        this.rivals = rivals;
    };

    /**
     *
     * @returns {FOOL.classes.Player|null|*}
     */
    Game.prototype.getAttacker = function () {
        return this.attacker;
    };

    /**
     *
     * @param {FOOL.classes.Player} attacker
     */
    Game.prototype.setAttacker = function (attacker) {
        this.attacker = attacker;
    };

    /**
     *
     * @returns {FOOL.classes.Player|null|*}
     */
    Game.prototype.getDefender = function () {
        return this.defender;
    };

    /**
     *
     * @param {FOOL.classes.Player} defender
     */
    Game.prototype.setDefender = function (defender) {
        this.defender = defender;
    };

    /**
     *
     * @returns {Array}
     */
    Game.prototype.getRetreat = function () {
        return this.retreat;
    };

    /**
     *
     * @param {Array} retreat
     */
    Game.prototype.setRetreat = function (retreat) {
        this.retreat = retreat;
    };

    /**
     *
     * @returns {Array}
     */
    Game.prototype.getBoutCards = function () {
        return this.boutCards;
    };

    /**
     *
     * @param {Array} boutCards
     */
    Game.prototype.setBoutCards = function (boutCards) {
        this.boutCards = boutCards;
    };

    FOOL.classes.Game = Game;

})(FOOL);