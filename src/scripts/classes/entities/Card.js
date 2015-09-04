(function (FOOL) {
    'use strict';

    /**
     *
     * @constructor
     */
    function Card(color, value) {
        this.color = color || null;
        this.value = value || null;
    }

    /**
     *
     * @returns {null|Color}
     */
    Card.prototype.getColor = function () {
        return this.color;
    };

    /**
     *
     * @param {Color} color
     */
    Card.prototype.setColor = function (color) {
        this.color = color;
    };

    /**
     *
     * @returns {null|Value}
     */
    Card.prototype.getValue = function () {
        return this.value;
    };

    /**
     *
     * @param {Value} value
     */
    Card.prototype.setValue = function (value) {
        this.value = value;
    };

    FOOL.classes.Card = Card;

})(FOOL);