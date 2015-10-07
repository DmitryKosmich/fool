(function (FOOL) {
    'use strict';

    /**
     *
     * @constructor
     */
    function Card(value, color, name) {
        this.value = value || null;
        this.color = color || null;
        this.name = name || null;
    }

    /**
     *
     * @returns {null|number}
     */
    Card.prototype.getColor = function () {
        return this.color;
    };

    /**
     *
     * @param {number} color
     */
    Card.prototype.setColor = function (color) {
        this.color = color;
    };

    /**
     *
     * @returns {null|number}
     */
    Card.prototype.getValue = function () {
        return this.value;
    };

    /**
     *
     * @param {number} value
     */
    Card.prototype.setValue = function (value) {
        this.value = value;
    };

    /**
     *
     * @returns {string}
     */
    Card.prototype.getName = function () {
        return this.name;
    };

    /**
     *
     * @param {string} name
     */
    Card.prototype.setName = function (name) {
        this.name = name;
    };

    FOOL.classes.Card = Card;

})(FOOL);