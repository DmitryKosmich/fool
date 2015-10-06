(function (FOOL) {
    'use strict';

    /**
     *
     * @constructor
     */
    function UIDetector() {}

    /**
     *
     * @param event
     */
    UIDetector.prototype.getPlayer = function (event) {
        console.log('=> getPlayer(event) :event = ', event);
        var element = FOOL.document.getTargetOfEvent(event);
        //TODO:
    };

    /**
     *
     * @param event
     */
    UIDetector.prototype.getCard = function (event) {
        console.log('=> getCard(event) :event = ', event);
        var element = FOOL.document.getTargetOfEvent(event);
        //TODO:
    };

    FOOL.uiDetector = new UIDetector();

})(FOOL);