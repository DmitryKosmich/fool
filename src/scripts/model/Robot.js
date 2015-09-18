(function (FOOL) {
    'use strict';

    /**
     *
     * @param {FOOL.classes.Player} player
     * @constructor
     */
    function Robot(player) {
        this.player = player || null;
    }

    /**
     *
     * @param {FOOL.classes.Player} player
     */
    Robot.prototype.setPlayer = function (player) {
        this.player = player;
    };

    /**
     *
     * @returns {FOOL.classes.Player|null|*}
     */
    Robot.prototype.getPlayer = function () {
        return this.player;
    };

    /**
     * The robot analyzes the state of the game and makes a move.
     * @param {FOOL.classes.Game} game
     */
    Robot.prototype.makeMove = function (game) {
        //todo...
    };

    FOOL.classes.Robot = Robot;

})(FOOL);