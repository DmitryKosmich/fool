(function (FOOL) {
    'use strict';

    /**
     *
     * @constructor
     */
    function Value(value) {
        this.value = value || null;
    }

    /**
     *
     * @returns {null|Number}
     */
    Value.prototype.valueOf = function () {
        return this.value;
    };

    /**
     *
     * @param {Number} value
     */
    Value.prototype.setValue = function (value) {
        this.value = value;
    };

    FOOL.classes.Color = Color;

})(FOOL);