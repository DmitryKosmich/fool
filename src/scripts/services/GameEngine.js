(function (FOOL) {
    'use strict';

    function GameEngine() {

    }

    GameEngine.prototype.onStart = function(event) {
        var game = event.getData();
        // TODO do something once preparations completed
    };

    GameEngine.prototype.subscribe = function() {
        var readyToStartListener = new FOOL.events.EventListener(this.onStart);
        FOOL.events.tunnel.addListener(FOOL.events.types.READY_TO_START, readyToStartListener);
    };

    FOOL.engine = new GameEngine();
    FOOL.engine.subscribe();

})(FOOL);