(function (FOOL) {
    'use strict';

    /**
     *
     * @constructor
     */
    function UIBuilder() {}

    /**
     * Displays the game on the screen.
     * @param {Game} game
     */
    UIBuilder.prototype.show = function (game) {
        //todo...

        var renderFinishedEvent = FOOL.events.factory.create(FOOL.events.types.READY_TO_START, game);
        FOOL.events.tunnel.sendEvent(renderFinishedEvent);
    };

    FOOL.classes.UIBuilder = UIBuilder;

})(FOOL);