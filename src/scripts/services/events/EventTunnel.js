(function (FOOL) {
    'use strict';

    function EventTunnel() {
        this.listeners = [];
    }

    EventTunnel.prototype.addListener = function (eventType, listener) {
        var eventListeners = this.listeners[eventType];
        if (typeof eventListeners == "undefined") {
            this.listeners[eventType] = [];
        }
        this.listeners[eventType].push(listener);
    };

    EventTunnel.prototype.sendEvent = function (event) {
        var eventListeners = this.listeners[event.getEventType()];
        if (typeof eventListeners != "undefined") {
            for (var i = 0; i < eventListeners.length; i++) {
                var listener = eventListeners[i];
                listener.onEvent(event);
            }
        }
    };

    FOOL.events.tunnel = new EventTunnel();

})(FOOL);