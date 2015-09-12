(function (FOOL) {
    'use strict';

    function EventListener(eventHandler) {
        this.eventHandler = eventHandler;
    }

    EventListener.prototype.onEvent = function (event) {
        this.eventHandler(event);
    };

    FOOL.events.EventListener = EventListener;

})(FOOL);