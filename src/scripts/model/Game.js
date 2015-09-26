(function (FOOL) {
    'use strict';

    /**
     *
     * @param {Array} pack
     * @param {FOOL.classes.Card} trump
     * @param {Array} players
     * @constructor
     */
    function Game(pack, trump, players) {
        this.pack = pack || [];
        this.trump = trump || null;
        this.players = players || [];
        this.retreat = [];
        this.table = [];
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

    /**
     *
     * @returns {Array}
     */
    Game.prototype.getTable = function () {
        return this.table;
    };

    /**
     *
     * @param {Array} table
     */
    Game.prototype.setTable = function (table) {
        this.table = table;
    };

    Game.prototype.getUserPlayer = function () {
        var i, length = this.players ? this.players.length : 0;
        for (i = 0; i < length; i += 1) {
            if (!this.players[i].getIsRobot()) {
                return this.players[i];
            }
        }
        return null;
    };

    FOOL.classes.Game = Game;

})(FOOL);