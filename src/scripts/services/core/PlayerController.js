(function (FOOL) {
    'use strict';

    /**
     *
     * @constructor
     */
    function PlayerController() {}

    /**
     * Initializes states of the player and its rivals.
     * @param options
     * @returns {Array}
     */
    function initPlayers(options) {
        var player = createPlayer(options),
            rivals = createRivals(options);
        preRenderPlayers(player, rivals);
        selectAttacker(options.game);
        prePopulatePlayerCards(options);
    }

    /**
     * Creates the player.
     * @param {Object} options game options
     * @returns {*|Player}
     */
    function createPlayer(options) {
        var player = new FOOL.classes.Player();
        player.setName(options.playerName || FOOL.defaults.playerName);
        player.setIsRobot(false);
        player.setIsActive(true);
        player.setGame(options.game);
        options.game.setPlayer(player);
        return player;
    }

    /**
     * Creates the rivals.
     * @param {Object} options game options
     * @returns {Array}
     */
    function createRivals(options) {
        var i,
            rival,
            rivals = [],
            rivalsCount = (options.playersNumber || FOOL.defaults.playersNumber) - 1;

        for (i = 0; i < rivalsCount; i += 1) {
            rival = new FOOL.classes.Player();
            rival.setName((options.robotName || FOOL.defaults.robotName) + ' ' + i);
            rival.setGame(options.game);
            rivals.push(rival);
        }
        options.game.setRivals(rivals);
        return rivals;
    }

    /**
     * Invokes {@link sendPlayerRenderEvent} passing each newly created player.
     */
    function preRenderPlayers(player, rivals) {
        var i;
        sendPlayerRenderEvent(player);
        for (i = 0; i < rivals.length; i += 1) {
            sendPlayerRenderEvent(rivals[i]);
        }
    }

    /**
     * Selects attacker and defender players.
     * @param {Game} game
     */
    function selectAttacker(game) {
        var rivals = game.getRivals(),
            player = game.getPlayer(),
            attacker,
            defender,
            allPlayers = rivals.slice(),
            i;
        allPlayers.push(player);
        // TODO mix allPlayers here
        attacker = allPlayers[0];
        if (player == attacker) {
            defender = rivals[0];
        } else if (rivals[rivals.length] == attacker) {
            defender = player;
        } else {
            for (i = 0; i < rivals.length - 1; i += 1) {
                if (rivals[i] == attacker) {
                    defender = rivals[i + 1];
                    break;
                }
            }
        }
        game.setAttacker(attacker);
        game.setDefender(defender);
    }

    /**
     * Sends a new {@link FOOL.events.uiTypes.UI_CLEAR} event.
     * @param {FOOL.classes.Player} player
     */
    function sendPlayerRenderEvent(player) {
        FOOL.events.tunnel.sendEvent(new FOOL.events.GameEvent(FOOL.events.uiTypes.UI_PLAYER_RENDER, {
            player: player
        }, function() {}));
    }

    /**
     * Pre-populates cards of all the players by sending a new {@link FOOL.events.gameTypes.TAKE_CARD} event to pick up a card.
     * @param {Object} options game options
     */
    function prePopulatePlayerCards(options) {
        var i, j,
            startCardsNumber = options.startCardsNumber ? options.startCardsNumber : FOOL.defaults.startCardsNumber,
            players = getPlayersSortedByAttacker(options.game);
        for (i = 0; i < startCardsNumber; i += 1) {
            for (j = 0; j < players.length; j += 1) {
                FOOL.events.tunnel.sendEvent(new FOOL.events.GameEvent(FOOL.events.gameTypes.TAKE_CARD, {
                    player: players[j]
                }, function() {}));
            }
        }
    }

    /**
     * Returns a new array of players ordered by attack priority: from attacker to defender.
     * @param {Game} game current game object
     * @returns {Array}
     */
    function getPlayersSortedByAttacker(game) {
        var sortedPlayers = [],
            i,
            rivals = game.getRivals(),
            rivalsCount = rivals.length,
            attackerPos = rivalsCount;
        for (i = 0; i < rivalsCount; i += 1) {
            if (rivals[i] == game.getAttacker()) {
                attackerPos = i;
                break;
            }
        }
        sortedPlayers.push.apply(sortedPlayers, rivals.slice(attackerPos, rivalsCount));
        sortedPlayers.push(game.getPlayer());
        sortedPlayers.push.apply(sortedPlayers, rivals.slice(0, attackerPos));
        return sortedPlayers;
    }

    /**
     * A handler for the {@link FOOL.events.gameTypes.PLAYERS_INIT} event.
     * @param {GameEvent} event game event
     */
    function initPlayersHandler(event) {
        var data = event.getData();
        initPlayers(data);
        event.callBack(data);
    }

    /**
     * A handler for the {@link FOOL.events.gameTypes.PLAYER_UPDATE} event.
     * @param {GameEvent} event game event
     */
    function updatePlayerHandler(event) {
        var data = event.getData();

        event.callBack();
    }

    /**
     * A handler for the {@link FOOL.events.gameTypes.RIVAL_UPDATE} event.
     * @param {GameEvent} event game event
     */
    function updateRivalHandler(event) {
        var data = event.getData();

        event.callBack();
    }

    /**
     * Initializes the controller.
     */
    PlayerController.prototype.initialize = function() {
        var playersInitListener = new FOOL.events.EventListener(initPlayersHandler);
        FOOL.events.tunnel.addListener(FOOL.events.gameTypes.PLAYERS_INIT, playersInitListener);
        var playerUpdateListener = new FOOL.events.EventListener(updatePlayerHandler);
        FOOL.events.tunnel.addListener(FOOL.events.gameTypes.PLAYER_UPDATE, playerUpdateListener);
        var rivalUpdateListener = new FOOL.events.EventListener(updateRivalHandler);
        FOOL.events.tunnel.addListener(FOOL.events.gameTypes.RIVAL_UPDATE, rivalUpdateListener);
    };

    FOOL.engine.registerController(new PlayerController());

})(FOOL);