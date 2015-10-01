(function (FOOL) {
    'use strict';

    /**
     *
     * @constructor
     */
    function Document() {}

    /**
     *
     * @param {HTMLLIElement} o
     * @param {String} c
     */
    Document.prototype.addClass = function (o, c){
        var re = new RegExp('(^|\\s)' + c + '(\\s|$)', 'g');
        if (re.test(o.className)) return;
        o.className = (o.className + ' ' + c).replace(/\s+/g, ' ').replace(/(^ | $)/g, '');
    };

    /**
     *
     * @param {HTMLLIElement} o
     * @param {String} c
     */
    Document.prototype.removeClass = function (o, c){
        var re = new RegExp('(^|\\s)' + c + '(\\s|$)', 'g');
        o.className = o.className.replace(re, '$1').replace(/\s+/g, ' ').replace(/(^ | $)/g, '');
    };

    FOOL.document = new Document();

})(FOOL);