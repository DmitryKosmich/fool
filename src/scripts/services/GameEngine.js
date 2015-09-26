(function (FOOL) {
    'use strict';

    /**
     *
     * @constructor
     */
    function GameEngine() {}

    /**
     *
     * @param {Object|undefined} options
     */
    GameEngine.prototype.start = function (options) {

        console.log('=> GameEngine.prototype.start(' + options + ')');

        var gameOptions = options ? options : FOOL.defaults,
            pack = getNewPack(gameOptions),
            players = initPlayers(gameOptions, pack);

        initUserPlayer(gameOptions, players);
        FOOL.currentGame = new FOOL.classes.Game(pack, pack[0], players);
        FOOL.randomizer.shufflePack(FOOL.currentGame);
        FOOL.events.tunnel.sendEvent(new FOOL.events.GameEvent(FOOL.events.types.BOUT_STARTED, FOOL.currentGame));
        FOOL.uiBuilder.show(FOOL.currentGame);
    };

    /**
     * This function should return the new pack.
     * @param options
     * @returns {Array}
     */
    function getNewPack(options) {
        console.log('=> getNewPack()');
        var i, defaultPack = FOOL.pack,
            length = defaultPack.length,
            pack = [];
        for (i = 0; i < length; i += 1) {
            pack.push(new FOOL.classes.Card(defaultPack[i].value, defaultPack[i].color, defaultPack[i].name));
        }
        return pack;
    }

    /**
     * This function should create the instances of players and give them by 6 cards.
     * @param options
     * @param {Array} pack
     * @returns {Array}
     */
    function initPlayers(options, pack) {
        console.log('=> initPlayers()');
        var i,
            player,
            players = [],
            length = (options.playersNumber || FOOL.defaults.playersNumber),
            startCardsNumber = -1 * (options.startCardsNumber || FOOL.defaults.startCardsNumber);

        for (i = 0; i < length; i += 1) {
            player = new FOOL.classes.Player();
            player.setName((options.robotName || FOOL.defaults.robotName) + ' ' + i);
            player.setCards(pack.splice(startCardsNumber));
            players.push(player);
        }
        return players;
    }

    /**
     * This function should initialize the player for the user and set necessary parameters.
     * @param options
     * @param {Array} players
     */
    function initUserPlayer(options, players) {
        var userPlayer = players[0];
        if (userPlayer) {
            userPlayer.setName(options.playerName || FOOL.defaults.playerName);
            userPlayer.setIsRobot(false);
            userPlayer.setIsActive(true);
        }
    }

    /**
     * This method should control the game process.
     * @param {FOOL.events.GameEvent} event
     */
    GameEngine.prototype.process = function(event) {
        //todo: this method should control the game process.
    };

    FOOL.engine = new GameEngine();

})(FOOL);