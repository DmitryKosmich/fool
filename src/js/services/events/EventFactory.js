(function (FOOL) {
    'use strict';

    /**
     *
     * @constructor
     */
    function EventFactory() {}

    /**
     *
     * @param {string} eventType
     * @param {FOOL.classes.Game} data
     * @returns {FOOL.events.GameEvent}
     */
    EventFactory.prototype.create = function (eventType, data) {
        return new FOOL.events.GameEvent(eventType, data);
    };

    FOOL.events.factory = new EventFactory();

})(FOOL);