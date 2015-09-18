(function (FOOL) {
    'use strict';

    /**
     *
     * @constructor
     */
    function GameEngine() {}

    /**
     *
     * @param {Object|undefined} options
     */
    GameEngine.prototype.start = function (options) {
        var gameOptions = options ? options : FOOL.defaults;

    };

    /**
     * This method should control the game process.
     * @param {FOOL.events.GameEvent} event
     */
    GameEngine.prototype.process = function(event) {
        //todo: this method should control the game process.
    };

    FOOL.engine = new GameEngine();

})(FOOL);