(function (FOOL) {
    'use strict';

    var GameEvent = FOOL.events.GameEvent;

    /**
     *
     * @constructor
     */
    function GameEngine() {}

    /**
     *
     */
    GameEngine.prototype.start = function () {
        console.log('=> start()');
        var game = new FOOL.classes.Game();
        initTalon(game);
        game.setTrump(game.getTalon()[0]);
        initPlayer(game);
        initRivals(game);
        FOOL.currentGame = game;
        FOOL.events.tunnel.sendEvent(new GameEvent(FOOL.events.uiTypes.UI_GAME_RENDER, game));
        game.setActivePlayer(game.getPlayer());
        setNextGameStage(game);
    };

    function initTalon(game) {
        var talon = [];
        FOOL.talon.forEach(function (card) {
            talon.push(new FOOL.classes.Card(card.value, card.color, card.name));
        });
        FOOL.randomizer.shuffleTalon(talon);
        game.setTalon(talon);
    }

    function initPlayer(game) {
       var player = new FOOL.classes.Player(FOOL.defaults.playerName, [], game);
        player.setIsRobot(false);
        game.setPlayer(player);
    }

    function initRivals(game) {
        var i,
            length = FOOL.defaults.playersNumber - 1,
            rivals = [];
        for (i = 0; i < length; i += 1) {
            rivals.push(new FOOL.classes.Player(FOOL.defaults.robotName + '_' + i, [], game));
        }
        game.setRivals(rivals);
    }

    /**
     *
     * A handler for the {@link FOOL.events.uiTypes.UI_ON_TALON_CLICK} and {@link FOOL.events.uiTypes.AI_ON_TALON_CLICK}  event.
     * @param {GameEvent} event game event
     */
    function takeCard(event) {
        var card,
            data = event.getData(),
            player = data.player,
            game = player.getGame(),
            talon = game.getTalon(),
            eventType = player === game.getPlayer()
                ? FOOL.events.uiTypes.UI_PLAYER_RENDER
                : FOOL.events.uiTypes.UI_RIVAL_RENDER;

        if (!player.getIsActive() || game.isActiveBout()) {
            console.info('Вы не можете сейчас набирать карты!');
            return;
        }

        card = talon.pop();
        player.getCards().push(card);
        setNextGameStage(game, event);

        FOOL.events.tunnel.sendEvent(new GameEvent(FOOL.events.uiTypes.UI_TALON_RENDER, {
            cardsThrownOut: [card]
        }));

        FOOL.events.tunnel.sendEvent(new GameEvent(eventType, {
            cardsPickedUp: [card],
            player: player
        }));
    }

    /**
     *
     * @param {Game} game
     * @param {GameEvent} event
     */
    function setNextGameStage(game, event) {
        game.setLock(true);
        if (game.isActiveBout()) {
            if (game.getAttacker() === game.getActivePlayer()) {
                game.setActivePlayer(game.getDefender());
            } else {
                game.setActivePlayer(game.getAttacker());
            }
        } else {
            choosePlayerForTakingCard(game, event);
        }

        game.setLock(false);
    }

    /**
     *
     * @param {Game} game
     * @param {GameEvent} event
     */
    function choosePlayerForTakingCard(game, event) {
        var i,
            players = game.getPlayers(),
            playersLength = players.length,
            attacker = game.getAttacker(),
            defender = game.getDefender();

        if (attacker && attacker.getCards().length < FOOL.defaults.startCardsNumber && game.getTalon().length > 0) {
            game.setActivePlayer(attacker);
            return;
        }

        for (i = 0; i < playersLength; i += 1) {
            if (defender !== players[i] && players[i].getCards().length < FOOL.defaults.startCardsNumber && game.getTalon().length > 0) {
                game.setActivePlayer(players[i]);
                return;
            }
        }

        if (defender && defender.getCards().length < FOOL.defaults.startCardsNumber && game.getTalon().length > 0) {
            game.setActivePlayer(defender);
            return;
        }
        console.log(event.getEventType());
        chooseNextAttacker(game, event);
        chooseNextDefender(game, event);
        game.setActivePlayer(game.getAttacker());
        game.setBoutActive(true);
    }

    /**
     *
     * @param {Game} game
     * @param {GameEvent} event
     */
    function chooseNextAttacker(game, event) {
        var defender = game.getDefender();
        if (defender) {
            game.setAttacker(defender);
        } else {
            // TODO: implement algorithm
            game.setAttacker(game.getPlayer());
        }
    }

    /**
     *
     * @param {Game} game
     * @param {GameEvent} event
     */
    function chooseNextDefender (game, event) {
        var indexOfAttacker =  game.getPlayers().indexOf(game.getAttacker());
        if (indexOfAttacker < game.getPlayers().length - 1) {
            game.setDefender(game.getPlayers()[indexOfAttacker + 1])
        } else {
            game.setDefender(game.getPlayers()[0])
        }
    }

    function checkWinners(game) {

    }

    /**
     *
     * A handler for the {@link FOOL.events.uiTypes.UI_ON_PLAYER_CARD_CLICK} and {@link FOOL.events.uiTypes.AI_ON_PLAYER_CARD_CLICK} event.
     * @param {GameEvent} event game event
     */
    function tossCard (event) {
        var data = event.getData(),
            player = data.player,
            card = data.card,
            game = player.getGame(),
            eventType = player === game.getPlayer()
                ? FOOL.events.uiTypes.UI_PLAYER_RENDER
                : FOOL.events.uiTypes.UI_RIVAL_RENDER;

        if (!isPlayerValidForTossingOfCard(player, card)) {
            console.info('Вы не можете сейчас ходить!');
            return;
        }

        card = (player.getCards().splice(player.getCards().indexOf(card), 1))[0];
        game.getBoutCards().push(card);
        setNextGameStage(game, event);


        FOOL.events.tunnel.sendEvent(new GameEvent(eventType, {
            cardsThrownOut: [card],
            player: player
        }));

        FOOL.events.tunnel.sendEvent(new GameEvent(FOOL.events.uiTypes.UI_BOUT_RENDER, {
            cardsPickedUp: [card]
        }));
    }

    function isPlayerValidForTossingOfCard(player, card) {
        var game = player.getGame(),
            boutCards = game.getBoutCards(),
            trumpColor = game.getTrump().getColor(),
            lastBoutCard = boutCards.length ? boutCards[boutCards.length - 1] : null;
        if (!player.getIsActive()) {
            console.info('Не ваш ход!');
            return false;
        }
        if (player.getCards().length < FOOL.defaults.startCardsNumber && game.getTalon().length > 0 && !game.isActiveBout()) {
            console.info('Вам нужно набрать карту!');
            return false;
        }
        if (player === game.getAttacker() && boutCards.length > 0
            && !boutCards.some(function (boutCard) { return boutCard.getValue() === card.getValue(); })) {
            console.info('Не пытайтесь жульничать, таких карт нет на столе');
            return false;
        }
        if (player === game.getDefender() && boutCards.length > 0) {
            if (lastBoutCard.getColor() === trumpColor && card.getColor() === trumpColor) {
                if (lastBoutCard.getValue() > card.getValue()) {
                    console.info('Вы можете отбить только козырем больше');
                    return false;
                }
            } else if (lastBoutCard.getColor() === trumpColor && card.getColor() !== trumpColor) {
                console.info('Вы можете отбить только козырем');
                return false;
            } else if (lastBoutCard.getColor() !== card.getColor() && card.getColor() !== trumpColor){
                console.info('Вы можете положить карту только масти: ', lastBoutCard.getColor());
                return false;
            } else if (lastBoutCard.getValue() > card.getValue() && card.getColor() !== trumpColor) {
                console.info('Ваша карта меньше', card);
                return false;
            }
        }

        return true;
    }

    /**
     *
     * A handler for the {@link FOOL.events.uiTypes.UI_ON_BOUT_CLICK} and {@link FOOL.events.uiTypes.AI_ON_BOUT_CLICK} event.
     * @param {GameEvent} event game event
     */
    function onBoutClick (event) {
        var data = event.getData(),
            player = data.player,
            game = player.getGame(),
            cards,
            eventType = player === game.getPlayer()
                ? FOOL.events.uiTypes.UI_PLAYER_RENDER
                : FOOL.events.uiTypes.UI_RIVAL_RENDER;

        if (!player.getIsActive()) {
            console.info('Вы не можете сейчас забрать или бросить в отбой!');
            return;
        }

        cards = game.getBoutCards().splice(0);

        FOOL.events.tunnel.sendEvent(new GameEvent(FOOL.events.uiTypes.UI_BOUT_RENDER, {
            cardsThrownOut: cards,
            player: player
        }));

        if (player === game.getAttacker()) {
            [].push.apply(game.getRetreat(), cards);
            FOOL.events.tunnel.sendEvent(new GameEvent(FOOL.events.uiTypes.UI_RETREAT_RENDER, {
                cardsPickedUp: cards
            }));
        } else if (player === game.getDefender()) {
            [].push.apply(player.getCards(), cards);
            FOOL.events.tunnel.sendEvent(new GameEvent(eventType, {
                cardsPickedUp: cards,
                player: player
            }));
        }

        game.setBoutActive(false);
        setNextGameStage(game, event);

    }

    /**
     * Initializes the controller.
     */
    GameEngine.prototype.initialize = function() {
        var takeCardEventListener = new FOOL.events.EventListener(takeCard),
            tossCardEventListener = new FOOL.events.EventListener(tossCard),
            onBoutCardEventListener = new FOOL.events.EventListener(onBoutClick);

        FOOL.events.tunnel.addListener(FOOL.events.uiTypes.UI_ON_TALON_CLICK, takeCardEventListener)
            .addListener(FOOL.events.uiTypes.AI_ON_TALON_CLICK, takeCardEventListener)
            .addListener(FOOL.events.uiTypes.UI_ON_PLAYER_CARD_CLICK, tossCardEventListener)
            .addListener(FOOL.events.uiTypes.AI_ON_PLAYER_CARD_CLICK, tossCardEventListener)
            .addListener(FOOL.events.uiTypes.UI_ON_BOUT_CLICK, onBoutCardEventListener)
            .addListener(FOOL.events.uiTypes.AI_ON_BOUT_CLICK, onBoutCardEventListener);
    };

    FOOL.engine = new GameEngine();
    FOOL.engine.initialize();

})(FOOL);