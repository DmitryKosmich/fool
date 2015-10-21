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
     * @param {GameEvent} event
     */
    EventListener.prototype.onEvent = function (event) {
        this.eventHandler(event);
        return this;
    };

    FOOL.events.EventListener = EventListener;

})(FOOL);