(function (FOOL) {
    'use strict';

    /**
     *
     * @param {Function} eventHandler
     * @constructor
     */
    function EventListener(eventHandler) {
        this.eventHandler = eventHandler;
    }

    /**
     *
     * @param {FOOL.events.GameEvent} event
     */
    EventListener.prototype.onEvent = function (event) {
        this.eventHandler(event);
    };

    FOOL.events.EventListener = EventListener;

})(FOOL);