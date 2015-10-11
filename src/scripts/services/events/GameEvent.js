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
        this.callback = callback ? callback : function() {};
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
    GameEvent.prototype.callBack = function(data) {
        return this.callback(data);
    };

    FOOL.events.GameEvent = GameEvent;

})(FOOL);