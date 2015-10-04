(function (FOOL) {
    'use strict';

    /**
     *
     * @constructor
     */
    function Document() {
    }

    /**
     *
     * @param {HTMLElement} o
     * @param {String} c
     */
    Document.prototype.addClass = function (o, c) {
        var re = new RegExp('(^|\\s)' + c + '(\\s|$)', 'g');
        if (re.test(o.className)) return;
        o.className = (o.className + ' ' + c).replace(/\s+/g, ' ').replace(/(^ | $)/g, '');
    };

    /**
     *
     * @param {HTMLElement} o
     * @param {String} c
     */
    Document.prototype.removeClass = function (o, c) {
        var re = new RegExp('(^|\\s)' + c + '(\\s|$)', 'g');
        o.className = o.className.replace(re, '$1').replace(/\s+/g, ' ').replace(/(^ | $)/g, '');
    };

    /**
     *
     * @param {HTMLElement} o
     * @param {String} type
     * @param {Function} handler
     * @param {boolean} useCapture
     * @returns {*}
     */
    Document.prototype.addEventListener = function (o, type, handler, useCapture) {
        var key,
            boundedHandler;
        if (document.addEventListener) {
            o.addEventListener(type, handler, !!useCapture);
            return handler;
        } else if (document.attachEvent) {
            type = "on" + type;
            boundedHandler = function () {
                return handler.apply(o, arguments);
            };
            o.attachEvent(type, boundedHandler);
            return boundedHandler;
        } else {
            type = "on" + type;
            o.memoize = o.memoize || {};
            if (!o.memoize[type]) {
                o.memoize[type] = { counter: 1 };
                o[type] = function () {
                    for (key in nameSpace) {
                        if ({}.prototype.hasOwnProperty.call(nameSpace, key)) {
                            if (typeof nameSpace[key] == "function") {
                                nameSpace[key].apply(this, arguments);
                            }
                        }
                    }
                };
            }
            var nameSpace = o.memoize[type], id = nameSpace.counter++;
            nameSpace[id] = handler;
            return id;
        }
    };

    /**
     *
     * @param {HTMLLIElement} o
     * @param {String} type
     * @param {Function} handler
     * @returns {boolean}
     */
    Document.prototype.removeEventListener = function (o, type, handler) {
        if (document.addEventListener) {
            o.removeEventListener(type, handler, !!useCapture);
            return true;
        } else if (document.attachEvent) {
            type = "on" + type;
            o.detachEvent(type, handler);
            return true;
        } else {
            type = "on" + type;
            if (o.memoize && o.memoize[type] && o.memoize[type][handler]) o.memoize[type][handler] = undefined;
            return true;
        }
    };

    FOOL.document = new Document();

})(FOOL);