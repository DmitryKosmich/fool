(function (FOOL) {
    'use strict';

    /**
     *
     * @constructor
     */
    function UICardCarrier() {}

    /**
     * @param {Object} params
     * @param {Card} params.card
     * @param {HTMLElement} params.container - parent element of cards
     * @param {boolean} params.isOpen
     * @param {boolean} params.hasAnimation
     * @param {number} [params.direction] - direction of animation
     * @param {Function} [params.callback]
     */
    UICardCarrier.prototype.addCard = function (params) {
        var elem,
            card = params.card,
            container = params.container,
            hasAnimation = params.hasAnimation,
            direction = params.direction,
            isOpen = params.isOpen,
            tempParentElem = document.createElement('div'),
            callback = params.callback;

        // add card
        tempParentElem.innerHTML = getCardHtml(card, hasAnimation, direction, isOpen);
        elem = tempParentElem.childNodes[0];

        // add listener
        FOOL.document.addEventListener(elem, 'click', function () {
            FOOL.events.tunnel.sendEvent(new FOOL.events.GameEvent(getEventTypeByContainer(container), {
                card: card,
                player: FOOL.currentGame.getPlayer()
            }));
        });

        container.appendChild(elem);

        // remove animation class
        setTimeout(function () {
            FOOL.document.removeClass(elem, params.direction === FOOL.direction.UP
                ? FOOL.styles.ADD_CARD_UP_ANIMATION
                : FOOL.styles.ADD_CARD_DOWN_ANIMATION);
            callback ? callback() : 0;
        }, 500);
    };

    /**
     * @param {Object} params
     * @param {Card} params.card
     * @param {boolean} params.hasAnimation
     * @param {number} params.direction
     * @param {Function} [params.callback]
     */
    UICardCarrier.prototype.removeCard = function (params) {
        var card = params.card,
            hasAnimation = params.hasAnimation,
            direction = params.direction,
            callback = params.callback,
            elem = document.getElementById(getCardId(card));

        // remove listener
        FOOL.document.removeEventListener(elem, 'click');

        if (hasAnimation) {

            //add animation class
            FOOL.document.addClass(elem, direction === FOOL.direction.UP
                ? FOOL.styles.REMOVE_CARD_UP_ANIMATION
                : FOOL.styles.REMOVE_CARD_DOWN_ANIMATION
            );

            //remove card
            setTimeout(function () {
                elem.parentNode.removeChild(elem);
                callback ? callback() : 0;
            }, 500);
        } else {

            //remove card
            elem.parentNode.removeChild(elem);
            callback ? callback() : 0;
        }
    };

    /**
     *
     * @param {Card} card
     * @param {boolean} hasAnimation
     * @param {string} animationDirection
     * @param {boolean} isOpen
     * @returns {string}
     */
    function getCardHtml(card, hasAnimation, animationDirection, isOpen) {
        var id = getCardId(card),
            animation = hasAnimation
                ? (animationDirection
                    ? (animationDirection === FOOL.direction.UP
                        ? FOOL.styles.ADD_CARD_UP_ANIMATION
                        : FOOL.styles.ADD_CARD_DOWN_ANIMATION)
                    : ' ')
                : ' ';

        return '' +
            '<li class="card ' + animation + (isOpen ? ' open' : ' close') + '" id="' + id + '">' +
            '<img src="images/cards/' + id + '.png">' +
            '<img src="images/cards/back.png">' +
            '</li>';
    }

    /**
     *
     * @param {string} container - css class name of container
     * @returns {*}
     */
    function getEventTypeByContainer(container) {
        if (FOOL.document.hasClass(container, FOOL.styles.PLAYER_CARDS_CONTAINER_CLASS_NAME)) {
            return FOOL.events.uiTypes.UI_ON_PLAYER_CARD_CLICK;
        } else if (FOOL.document.hasClass(container, FOOL.styles.RIVAL_CONTAINER_CLASS_NAME)) {
            return FOOL.events.uiTypes.UI_ON_RIVAL_CARD_CLICK;
        } else if (FOOL.document.hasClass(container, FOOL.styles.RETREAT_CARDS_CONTAINER_CLASS_NAME)) {
            return FOOL.events.uiTypes.UI_ON_RETREAT_CLICK;
        } else if (FOOL.document.hasClass(container, FOOL.styles.TALON_CARDS_CONTAINER_CLASS_NAME)) {
            return FOOL.events.uiTypes.UI_ON_TALON_CLICK
        } else if (FOOL.document.hasClass(container, FOOL.styles.BOUT_CARDS_CONTAINER_CLASS_NAME)) {
            return FOOL.events.uiTypes.UI_ON_BOUT_CLICK
        } else {
            console.error('Event type can not be found!');
            return '';
        }
    }

    /**
     *
     * @param {Card} card
     * @returns {string}
     */
    function getCardId(card) {
        console.log('=> getCardId(card) card:', card);
        return card.getValue() + '-' + card.getColor();
    }

    FOOL.uiCardCarrier = new UICardCarrier();

})(FOOL);