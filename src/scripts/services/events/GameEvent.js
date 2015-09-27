(function (FOOL) {
    'use strict';

    /**
     * @param {Number} eventType event type
     * @param {FOOL.classes.Game} data event data
     * @param {Function | null} callback
     * @constructor
     */
    function GameEvent(eventType, data, callback) {
        this.eventType= eventType;
        this.data = data;
        this.callback = callback ? callback : function() {};
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

    /**
     * @returns {Function}
     */
    GameEvent.prototype.callBack = function(data) {
        return this.callback(data);
    };

    FOOL.events.GameEvent = GameEvent;

})(FOOL);