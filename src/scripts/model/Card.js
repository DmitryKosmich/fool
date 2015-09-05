(function (FOOL) {
    'use strict';

    /**
     *
     * @constructor
     */
    function Card(value, color, name) {
        this.value = value || null;
        this.color = color || null;
        this.color = name || null;
    }

    /**
     *
     * @returns {null|Number}
     */
    Card.prototype.getColor = function () {
        return this.color;
    };

    /**
     *
     * @param {Number} color
     */
    Card.prototype.setColor = function (color) {
        this.color = color;
    };

    /**
     *
     * @returns {null|Number}
     */
    Card.prototype.getValue = function () {
        return this.value;
    };

    /**
     *
     * @param {Number} value
     */
    Card.prototype.setValue = function (value) {
        this.value = value;
    };

    /**
     *
     * @returns {String}
     */
    Card.prototype.getName = function () {
        return this.name;
    };

    /**
     *
     * @param {String} name
     */
    Card.prototype.setName = function (name) {
        this.name = name;
    };

    FOOL.classes.Card = Card;

})(FOOL);