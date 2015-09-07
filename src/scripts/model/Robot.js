(function (FOOL) {
    'use strict';

    /**
     *
     * @param {Player} player
     * @constructor
     */
    function Robot(player) {
        this.player = player || null;
    }

    /**
     *
     * @param {Player} player
     */
    Robot.prototype.setPlayer = function (player) {
        this.player = player;
    };

    /**
     *
     * @returns {Player|null|*}
     */
    Robot.prototype.getPlayer = function () {
        return this.player;
    };

    /**
     * The robot analyzes the state of the game and makes a move.
     * @param {Game} game
     */
    Robot.prototype.makeMove = function (game) {
        //todo...
    };

    FOOL.classes.Robot = Robot;

})(FOOL);