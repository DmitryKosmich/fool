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
        var gameOptions = options ? options : FOOL.defaults;
        var pack = initPack(gameOptions);
        FOOL.currentGame = new FOOL.classes.Game(pack, pack[0], initPlayers(gameOptions, pack));
        FOOL.randomizer.shufflePack(FOOL.currentGame);
        FOOL.events.tunnel.sendEvent(new FOOL.events.GameEvent(FOOL.events.types.GAME_STARTED, FOOL.currentGame));
    };

    function initPack(options) {
        return JSON.parse(JSON.stringify(FOOL.pack));
    }

    function initPlayers(options, pack) {
        var i, player, players = [], length = (options.playersNumber || FOOL.defaults.playersNumber) - 1;
        for (i = 0; i < length; i += 1) {
            player = new FOOL.classes.Player();
            player.setName('Robot ' + i);
            if (i === 0) {
                player.setName(options.playerName || FOOL.defaults.playerName);
                player.setIsRobot(false);
                player.setIsActive(true);
            }
            player.setCards(pack.splice(-6));
            players.push(player);
        }
        return players;
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