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
                FOOL.events.tunnel.sendEvent(new FOOL.events.GameEvent(FOOL.events.uiTypes.UI_GAME_RENDER, FOOL.currentGame));
                FOOL.events.tunnel.sendEvent(new FOOL.events.GameEvent(FOOL.events.gameTypes.BOUT_STARTED, {
                    game: data.game
                }, function() {}));
            })
        );
    };

    /**
     * Handles {@link FOOL.events.gameTypes.THROW_CARD} event
     * @param {GameEvent} event game event
     */
    function playerThrewCardHandler(event) {
        var data = event.getData(),
            player = data.player,
            card = data.card,
            game = player.getGame(),
            isPlayer = game.getPlayer() == player,
            cardIndex = player.getCards().indexOf(card);
        if (player != game.getActivePlayer()) {
            FOOL.events.tunnel.sendEvent(new FOOL.events.GameEvent(FOOL.events.uiTypes.UI_SHOW_MESSAGE, {
                message: FOOL.messages.NOT_YOUR_TURN
            }, function() {}));
            return;
        }
        if (canThrowCard(game, card, player)) {
            game.getBoutCards().push(card);
            player.getCards().splice(cardIndex, 1);
            FOOL.events.tunnel.sendEvent(new FOOL.events.GameEvent(isPlayer
                ? FOOL.events.uiTypes.UI_PLAYER_RENDER
                : FOOL.events.uiTypes.UI_RIVAL_RENDER, {
                player: player,
                cardsThrownOut: [ card ]
            }, function() {}));
            FOOL.events.tunnel.sendEvent(new FOOL.events.GameEvent(FOOL.events.uiTypes.UI_BOUT_RENDER, {
                player: player,
                cardsAdded: [ card ]
            }, function() {}));
        } else {
            // bad try, the card can't be thrown, because doesn't match the rules
            FOOL.events.tunnel.sendEvent(new FOOL.events.GameEvent(FOOL.events.uiTypes.UI_SHOW_MESSAGE, {
                message: FOOL.messages.CANNOT_THROW_CARD_AGAINST_RULES
            }, function() {}));
            FOOL.events.tunnel.sendEvent(new FOOL.events.GameEvent(FOOL.events.gameTypes.ATTACK_STARTED, {
                player: player,
                retry: true,
                card: card
            }, function() {}));
        }
    }

    /**
     * Validates if a player can throw a card given
     * @param {Game} game current game
     * @param {Card} card card to throw
     * @param {Player} player player who tries to throw the card
     */
    function canThrowCard(game, card, player) {
        var boutCards = game.getBoutCards(),
            trump = game.getTrump(),
            isCurrentBoutEmpty = boutCards.length == 0,
            isDefence = player == game.getDefender(), i;
        if (isDefence) {
            var lastCardInBout = boutCards[boutCards.length - 1];
            return (lastCardInBout.getValue() < card.getValue() && lastCardInBout.getColor() == card.getColor())
                || (trump.getColor() == card.getColor() && trump.getColor() != lastCardInBout.getColor());
        } else {
            var isValueInBout = false;
            if (isCurrentBoutEmpty) {
                return true;
            }
            for (i = 0; i < boutCards.length; i += 1) {
                if (boutCards[i].getValue() == card.getValue()) {
                    isValueInBout = true;
                    break;
                }
            }
            return isCurrentBoutEmpty
                || isValueInBout;
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