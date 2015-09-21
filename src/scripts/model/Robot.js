(function (FOOL) {
    'use strict';

    /**
     *
     * @constructor
     */
    function Robot() {}

    /**
     *
     * @returns {FOOL.classes.Player|null|*}
     */
    Robot.prototype.getActivePlayer = function () {
        var i,
            allPlayers = FOOL.currentGame.getPlayers(),
            length = allPlayers ? allPlayers.length : 0;
        for (i = 0; i < length; i += 1) {
            if (allPlayers[i].isActive()) {
                return allPlayers[i];
            }
        }
        new Error('Active player can not be found!');
    };

    /**
     * The robot analyzes the state of the game and makes an action.
     */
    Robot.prototype.makeAction = function () {
        var currentPlayer = this.getActivePlayer();
    };

    FOOL.robot = new Robot();

})(FOOL);