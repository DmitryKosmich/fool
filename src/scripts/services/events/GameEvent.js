(function (FOOL) {
    'use strict';

    /**
     * @param {Number} eventType event type
     * @param {FOOL.classes.Game} data event data
     * @constructor
     */
    function GameEvent(eventType, data) {
        this.eventType= eventType;
        this.data = data;
    }

    /**
     * @returns {FOOL.classes.Game}
     */
    GameEvent.prototype.getData = function() {
        return this.data;
    };

    /**
     * @returns {Number}
     */
    GameEvent.prototype.getEventType = function() {
        return this.eventType;
    };

    FOOL.events.GameEvent = GameEvent;

})(FOOL);