(function (FOOL) {
    'use strict';

    /**
     *
     * @constructor
     * @namespace Game
     */
    function Game() {
        this.talon = [];
        this.player = null;
        this.rivals = [];
        this.retreat = [];
        this.boutCards = [];

        this.lock = false;
        this.trump = null;
        this.boutIsActive = false;
        this.activePlayer = null;
        this.attacker = null;
        this.defender = null;
    }

    /**
     *
     * @returns {Player[]}
     */
    Game.prototype.getPlayers = function () {
        var result = [];
        result.push(this.player);
        [].push.apply(result, this.rivals.slice(0));
        return result;
    };

    /**
     *
     * @returns {boolean}
     */
    Game.prototype.getLock = function () {
        return this.lock;
    };

    /**
     *
     * @param {boolean} lock
     */
    Game.prototype.setLock = function (lock) {
        this.lock = lock;
    };



    /**
     *
     * @returns {boolean}
     */
    Game.prototype.isActiveBout = function () {
        return this.boutIsActive;
    };

    /**
     *
     * @param {boolean} boutIsActive
     */
    Game.prototype.setBoutActive = function (boutIsActive) {
        this.boutIsActive = boutIsActive;
    };

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
     * @returns {Card|null|*}
     */
    Game.prototype.getTrump = function () {
        return this.trump;
    };

    /**
     *
     * @param {Card} trump
     */
    Game.prototype.setTrump = function (trump) {
        this.trump = trump;
    };

    /**
     *
     * @returns {Player|null|*}
     */
    Game.prototype.getPlayer = function () {
        return this.player;
    };

    /**
     *
     * @param {Player} player
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
     * @returns {Player|null|*}
     */
    Game.prototype.getAttacker = function () {
        return this.attacker;
    };

    /**
     *
     * @param {Player} attacker
     */
    Game.prototype.setAttacker = function (attacker) {
        this.attacker = attacker;
    };

    /**
     *
     * @returns {Player|null|*}
     */
    Game.prototype.getDefender = function () {
        return this.defender;
    };

    /**
     *
     * @param {Player} defender
     */
    Game.prototype.setDefender = function (defender) {
        this.defender = defender;
    };

    /**
     *
     * @returns {Player|null|*}
     */
    Game.prototype.getActivePlayer = function () {
        return this.activePlayer;
    };

    /**
     *
     * @param {Player} activePlayer
     */
    Game.prototype.setActivePlayer = function (activePlayer) {
        this.activePlayer ? this.activePlayer.setActiveIs(false) : 0;
        activePlayer ? activePlayer.setActiveIs(true) : 0;
        this.activePlayer = activePlayer;
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