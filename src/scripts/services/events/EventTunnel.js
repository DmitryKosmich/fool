(function (FOOL) {
    'use strict';

    /**
     *
     * @constructor
     */
    function EventTunnel() {
        this.listeners = [];
    }

    /**
     *
     * @param {Number} eventType
     * @param {FOOL.events.EventListener} listener
     */
    EventTunnel.prototype.addListener = function (eventType, listener) {
        if (!this.listeners[eventType]) {
            this.listeners[eventType] = [];
        }
        this.listeners[eventType].push(listener);
    };

    /**
     *
     * @param {FOOL.events.GameEvent} event
     */
    EventTunnel.prototype.sendEvent = function (event) {
        FOOL.engine.process(event);
        var i, eventListeners = this.listeners[event.getEventType()],
            length = eventListeners ? eventListeners.length : 0;
        for (i = 0; i < length; i += 1) {
            eventListeners[i].onEvent(event);
        }
    };

    FOOL.events.tunnel = new EventTunnel();

})(FOOL);