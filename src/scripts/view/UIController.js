(function (FOOL) {
    'use strict';

    /**
     *
     * @constructor
     */
    function UIController() {}

    /**
     *
     */
    function uiClear() {
        FOOL.uiBuilder.clear();
    }

    /**
     *
     * A handler for the {@link FOOL.events.uiTypes.UI_TALON_RENDER} event.
     * @param {GameEvent} event game event
     */
    function talonRender(event) {
//        console.log('=> talonRender(event) event:', event);
        FOOL.uiBuilder.renderTalon(event.getData(), true, event.callback);
    }

    /**
     *
     * A handler for the {@link FOOL.events.uiTypes.UI_PLAYER_RENDER} event.
     * @param {GameEvent} event game event
     */
    function playerRender(event) {
//        console.log('=> playerRender(event) event:', event);
        FOOL.uiBuilder.renderPlayer(event.getData(), true, event.callback);
    }

    /**
     *
     * A handler for the {@link FOOL.events.uiTypes.UI_RIVAL_RENDER} event.
     * @param {GameEvent} event game event
     */
    function rivalRender(event) {
//        console.log('=> rivalRender(event) event:', event);
        FOOL.uiBuilder.renderRival(event.getData(), true, event.callback);
    }

    /**
     *
     * A handler for the {@link FOOL.events.uiTypes.UI_RETREAT_RENDER} event.
     * @param {GameEvent} event game event
     */
    function retreatRender(event) {
//        console.log('=> retreatRender(event) event:', event);
        FOOL.uiBuilder.renderRetreat(event.getData(), true, event.callback);
    }

    /**
     *
     * A handler for the {@link FOOL.events.uiTypes.UI_BOUT_RENDER} event.
     * @param {GameEvent} event game event
     */
    function boutRender(event) {
//        console.log('=> boutRender(event) event:', event);
        FOOL.uiBuilder.renderBout(event.getData(), true, event.callback);
    }

    /**
     *
     * A handler for the {@link FOOL.events.uiTypes.UI_RIVALS_RENDER} event.
     * @param {GameEvent} event game event
     */
    function rivalsRender(event) {
//        console.log('=> rivalsRender(event) event:', event);
        FOOL.uiBuilder.renderRivals(event.getData(), false, event.callback);
    }

    /**
     *
     * A handler for the {@link FOOL.events.uiTypes.UI_GAME_RENDER} event.
     * @param {GameEvent} event game event
     */
    function gameRender(event) {
//        console.log('=> gameRender(event) event:', event);
        FOOL.uiBuilder.renderGame(event.getData(), event.callback);
    }

    /**
     * Initializes the controller.
     */
    UIController.prototype.initialize = function() {
        var uiClearEventListener = new FOOL.events.EventListener(uiClear),
            talonRenderEventListener = new FOOL.events.EventListener(talonRender),
            playerRenderEventListener = new FOOL.events.EventListener(playerRender),
            rivalRenderEventListener = new FOOL.events.EventListener(rivalRender),
            retreatRenderEventListener = new FOOL.events.EventListener(retreatRender),
            boutRenderEventListener = new FOOL.events.EventListener(boutRender),
            gameRenderEventListener = new FOOL.events.EventListener(gameRender),
            rivalsRenderEventListener = new FOOL.events.EventListener(rivalsRender);

        FOOL.events.tunnel
            .addListener(FOOL.events.uiTypes.UI_CLEAR, uiClearEventListener)
            .addListener(FOOL.events.uiTypes.UI_TALON_RENDER, talonRenderEventListener)
            .addListener(FOOL.events.uiTypes.UI_PLAYER_RENDER, playerRenderEventListener)
            .addListener(FOOL.events.uiTypes.UI_RIVAL_RENDER, rivalRenderEventListener)
            .addListener(FOOL.events.uiTypes.UI_RETREAT_RENDER, retreatRenderEventListener)
            .addListener(FOOL.events.uiTypes.UI_BOUT_RENDER, boutRenderEventListener)
            .addListener(FOOL.events.uiTypes.UI_GAME_RENDER, gameRenderEventListener)
            .addListener(FOOL.events.uiTypes.UI_RIVALS_RENDER, rivalsRenderEventListener);
    };

    var controller =  new UIController();
    controller.initialize();

})(FOOL);