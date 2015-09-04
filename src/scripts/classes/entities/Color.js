(function (FOOL) {
    'use strict';

    /**
     *
     * @constructor
     */
    function Color(value) {
        this.value = value || null;
    }

    /**
     *
     * @returns {null|Number}
     */
    Color.prototype.valueOf = function () {
        return this.value;
    };

    /**
     *
     * @param {Number} value
     */
    Color.prototype.setValue = function (value) {
        this.value = value;
    };

    FOOL.classes.Color = Color;

})(FOOL);