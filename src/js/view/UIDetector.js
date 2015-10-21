(function (FOOL) {
    'use strict';

    /**
     *
     * @constructor
     */
    function UIDetector() {}

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
                return FOOL.search.findPlayerById(element.id);
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
            result = FOOL.search.findCardByColorAndValue(+cardColor, +cardValue);
        console.log('getCard() => ', result);
        return result;
    };

    FOOL.uiDetector = new UIDetector();

})(FOOL);