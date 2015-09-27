(function (FOOL) {
    'use strict';

    /**
     *
     * @constructor
     */
    function GameEngine() {
        this.controls = [];
    }

    /**
     *
     * @param {Object|undefined} controller
     */
    GameEngine.prototype.registerController = function (controller) {
        console.log('=> GameEngine.prototype.registerController(' + controller + ')');
        this.controls.push(controller);
        controller.initialize();
    };

    /**
     *
     * @param {Object|undefined} options
     */
    GameEngine.prototype.start = function (options) {
        console.log('=> GameEngine.prototype.start(' + options + ')');
        var gameOptions = options ? options : FOOL.defaults;
        FOOL.currentGame = new FOOL.classes.Game();
        this.controls.talonController.createTalon(FOOL.currentGame);
        gameOptions.game = FOOL.currentGame;
        FOOL.events.tunnel.sendEvent(new FOOL.events.GameEvent(FOOL.events.gameTypes.PLAYERS_INIT, gameOptions,
            function(data) {
                FOOL.events.tunnel.sendEvent(new FOOL.events.GameEvent(FOOL.events.gameTypes.BOUT_STARTED, {
                    game: data.game
                }, function() {}));
                // TODO review whether this needed
                //FOOL.uiBuilder.show(FOOL.currentGame);
        }));
    };

    FOOL.engine = new GameEngine();

})(FOOL);