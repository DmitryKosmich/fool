(function (FOOL) {
    'use strict';

    /**
     *
     * @constructor
     */
    function TalonController() {}

    /**
     * Creates a new talon.
     */
    TalonController.prototype.createTalon = function(game) {
        console.log('=> createTalon()');
        createAndMixTalon(game);
        sendTalonRenderEvent(game);
    };

    /**
     * Creates a new talon from the {@link FOOL.talon} and shuffles resulting talon.
     * @param {Game} game current game object
     */
    function createAndMixTalon(game) {
        var i, defaultPack = FOOL.talon,
            length = defaultPack.length,
            talon = [];
        for (i = 0; i < length; i += 1) {
            talon.push(new FOOL.classes.Card(defaultPack[i].value, defaultPack[i].color, defaultPack[i].name));
        }
        FOOL.randomizer.shuffleTalon(talon);
        game.setTalon(talon);
        game.setTrump(talon[0]);
    }

    /**
     * Sends a new {@link FOOL.events.uiTypes.UI_TALON_RENDER} event.
     * @param game
     */
    function sendTalonRenderEvent(game) {
        FOOL.events.tunnel.sendEvent(new FOOL.events.GameEvent(FOOL.events.uiTypes.UI_TALON_RENDER, {
            game: game
        }, function() {}));
    }

    /**
     * A handler for the {@link FOOL.events.gameTypes.TAKE_CARD} event.
     * @param {GameEvent} event game event
     */
    function takeCardEventHandler(event) {
        var data = event.getData(),
            player = data.player,
            playerCards = player.getCards(),
            talon, pickedCard;
        if (playerCards.length < FOOL.defaults.startCardsNumber) {
            talon = player.getGame().getTalon();
            pickedCard = talon.pop();
            playerCards.push(pickedCard);
            FOOL.events.tunnel.sendEvent(new FOOL.events.GameEvent(FOOL.events.uiTypes.UI_TOOK_CARD, {
                player: player,
                cardsPickedUp: [ pickedCard ]
            }, function() {}));
        } else {
            alert('I can\'t get card');
        }
        event.callBack();
    }

    /**
     * Initializes the controller.
     */
    TalonController.prototype.initialize = function() {
        var takeCardEventListener = new FOOL.events.EventListener(takeCardEventHandler);
        FOOL.events.tunnel.addListener(FOOL.events.gameTypes.TAKE_CARD, takeCardEventListener);
    };

    FOOL.engine.controls.talonController = new TalonController();
    FOOL.engine.controls.talonController.initialize();

})(FOOL);