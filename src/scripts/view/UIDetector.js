(function (FOOL) {
    'use strict';

    /**
     *
     * @constructor
     */
    function UIDetector() {}

    /**
     *
     * @param {FOOL.classes.Game} currentGame
     */
    UIDetector.prototype.getAllCards = function (currentGame) {
        var player =  currentGame.getPlayer(),
            rivals = currentGame.getRivals(),
            bout = currentGame.getBoutCards(),
            retreat = currentGame.getRetreat(),
            talon = currentGame.getTalon(),
            result = [];
        [].push.apply(result, player.getCards().slice(0));
        [].push.apply(result, bout.slice(0));
        [].push.apply(result, retreat.slice(0));
        [].push.apply(result, talon.slice(0));
        rivals.forEach(function (rival) {
            [].push.apply(result, rival.getCards().slice(0));
        });
        return result;
    };

    /**
     *
     * @param {string} id
     */
    UIDetector.prototype.getPlayerById = function (id) {
        var i,
            rivals = FOOL.currentGame.getRivals(),
            length = rivals ? rivals.length : 0;
        for (i = 0; i < length; i += 1) {
            if (rivals[i].name === id) {
                return rivals[i];
            }
        }
        return FOOL.currentGame.getPlayer();
    };

    /**
     *
     * @param {MouseEvent} event
     */
    UIDetector.prototype.getPlayer = function (event) {
        console.log('=> getPlayer(event) :event = ', event);
        var element = FOOL.document.getTargetOfEvent(event);
        for(;; element = element.parentNode){
            if (element.tagName === 'BODY') {
                return FOOL.currentGame.getPlayer();
            } else if (FOOL.document.hasClass(element, FOOL.styles.PLAYER_CLASS_NAME)) {
                return UIDetector.prototype.getPlayerById(element.id);
            }
        }
    };

    /**
     *
     * @param {MouseEvent} event
     */
    UIDetector.prototype.getCard = function (event) {
        console.log('=> getCard(event) :event = ', event);
        var element = FOOL.document.getTargetOfEvent(event),
            id = element.parentNode.id,
            cardValue = id.split('-')[0],
            cardColor = id.split('-')[1],
            result = findCardByColorAndValue(+cardColor, +cardValue);
        console.log('getCard() => ', result);
        return result;
    };

    /**
     *
     * @param {number} color
     * @param {number} value
     * @returns {FOOL.classes.Card}
     */
    function findCardByColorAndValue(color, value) {
        var allCards = UIDetector.prototype.getAllCards(FOOL.currentGame),
            length = allCards ? allCards.length : 0,
            i;
        for(i = 0; i < length; i += 1) {
            if (allCards[i].getColor() === color && allCards[i].getValue() === value) {
                return allCards[i];
            }
        }
        return null;
    }

    FOOL.uiDetector = new UIDetector();

})(FOOL);