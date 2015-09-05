(function (FOOL) {
    'use strict';

    /**
     *
     * @param {Array} pack
     * @param {Card} trump
     * @param {Array} players
     * @constructor
     */
    function Game(pack, trump, players) {
        this.pack = pack || [];
        this.trump = trump || null;
        this.players = players || [];
        this.retreat = [];
    }

    /**
     *
     * @returns {Array|*}
     */
    Game.prototype.getPack = function () {
        return this.pack;
    };

    /**
     *
     * @param {Array} pack
     */
    Game.prototype.setPack = function (pack) {
        this.pack = pack;
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
     * @returns {Array|*}
     */
    Game.prototype.getPlayers = function () {
        return this.players;
    };

    /**
     *
     * @param {Array} players
     */
    Game.prototype.setPlayers = function (players) {
        this.players = players;
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

    FOOL.classes.Game = Game;

})(FOOL);