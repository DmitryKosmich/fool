(function (FOOL) {
    'use strict';

    /**
     *
     * @constructor
     */
    function GameEngine() {
        this.controls = [];
    }

    /**
     *
     * @param {Object|undefined} controller
     */
    GameEngine.prototype.registerController = function (controller) {
        console.log('=> registerController(controller) :controller = ', controller);
        this.controls.push(controller);
        controller.initialize();
    };

    /**
     *
     */
    GameEngine.prototype.start = function () {
        console.log('=> start()');
        var gameOptions = FOOL.defaults;
        FOOL.currentGame = new FOOL.classes.Game();
        this.controls.talonController.createTalon(FOOL.currentGame);
        gameOptions.game = FOOL.currentGame;
        FOOL.events.tunnel.sendEvent(new FOOL.events.GameEvent(FOOL.events.gameTypes.PLAYERS_INIT, gameOptions,
            function(data) {
                FOOL.events.tunnel.sendEvent(new FOOL.events.GameEvent(FOOL.events.gameTypes.BOUT_STARTED, {
                    game: data.game
                }, function() {}));
                // TODO review whether this needed
                FOOL.uiBuilder.show(FOOL.currentGame);
                FOOL.uiBuilder.initUIListeners();
        }));
    };

    /**
     *
     * @param {GameEvent} event game event
     */
    function playerThrewCardHandler(event) {
        var data = event.getData(),
            player = data.player,
            card = data.card,
            game = player.getGame(),
            isPlayer = game.getPlayer() == player,
        // TODO add some validation here
            validated = true,
            cardIndex = player.getCards().indexOf(card);
        if (validated) {
            game.getBoutCards().push(card);
            player.getCards().splice(cardIndex, 1);
            FOOL.events.tunnel.sendEvent(new FOOL.events.GameEvent(isPlayer
                ? FOOL.events.uiTypes.UI_PLAYER_RENDER
                : FOOL.events.uiTypes.UI_RIVAL_RENDER, {
                player: player,
                cardsThrownOut: [ card ]
            }, function() {}));
            FOOL.events.tunnel.sendEvent(new FOOL.events.GameEvent(isPlayer
                ? FOOL.events.uiTypes.UI_CG_PL_RENDER
                : FOOL.events.uiTypes.UI_CG_RV_RENDER, {
                player: player,
                cardsAdded: [ card ]
            }, function() {}));
        } else {
            // bad try, the card can't be thrown, because doesn't match the rules
            FOOL.events.tunnel.sendEvent(new FOOL.events.GameEvent(FOOL.events.gameTypes.ATTACK_STARTED, {
                player: player,
                retry: true,
                card: card
            }, function() {}));
        }
    }

    /**
     * Initializes the game engine.
     */
    function initialize() {
        var playerThrewCardListener = new FOOL.events.EventListener(playerThrewCardHandler);
        FOOL.events.tunnel
            .addListener(FOOL.events.gameTypes.THROW_CARD, playerThrewCardListener);
    }

    FOOL.engine = new GameEngine();
    initialize();

})(FOOL);