(function (FOOL) {
    'use strict';

    /**
     * @param eventType event type
     * @param data event data
     * @constructor
     */
    function GameEvent(eventType, data) {
        this.eventType= eventType;
        this.data = data;
    }

    /**
     * @returns {Object}
     */
    GameEvent.prototype.getData = function() {
        return this.data;
    };

    /**
     * @returns {Object}
     */
    GameEvent.prototype.getEventType = function() {
        return this.eventType;
    };

    FOOL.events.GameEvent = GameEvent;

})(FOOL);