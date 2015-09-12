(function (FOOL) {
    'use strict';

    function EventFactory() {}

    EventFactory.prototype.create = function (eventType, data) {
        return new FOOL.events.GameEvent(eventType, data);
    };

    FOOL.events.factory = new EventFactory();

})(FOOL);