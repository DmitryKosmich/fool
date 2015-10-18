(function (FOOL) {
    'use strict';

    /**
     * @param {string} eventType event type
     * @param {Object} [data] event data
     * @param {Function|undefined} [callback]
     * @constructor
     */
    function GameEvent(eventType, data, callback) {
        this.eventType= eventType;
        this.data = data;
        this.callback = callback || function() {};
    }

    /**
     * @returns {Object}
     */
    GameEvent.prototype.getData = function() {
        return this.data;
    };

    /**
     * @returns {string}
     */
    GameEvent.prototype.getEventType = function() {
        return this.eventType;
    };

    /**
     * @returns {Function}
     */
    GameEvent.prototype.getCallback = function() {
        return this.callback;
    };

    FOOL.events.GameEvent = GameEvent;

})(FOOL);