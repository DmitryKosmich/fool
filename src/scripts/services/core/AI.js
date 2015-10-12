(function (FOOL) {
    'use strict';

    /**
     *
     * @constructor
     */
    function AI() {}

    AI.prototype.action = function (player) {
        console.log(player.getName() + ' has made action!');
        var game = player.getGame();
        if (game.boutIsActive) {
            if (player === game.getAttacker()) {
                if (player.getCards().length > 0) {
                    attack(player, game);
                } else {
                    onBoutClick(player);
                }
            } else if (player === game.getDefender()) {
                if (getDefendCard(player, game)) {
                    defend(player, game)
                } else {
                    onBoutClick(player);
                }
            } else {
                console.log(player.getName() + ' does nothing...');
            }
        } else {
            if (player.getCards().length < FOOL.defaults.startCardsNumber) {
                FOOL.events.tunnel.sendEvent(new FOOL.events.GameEvent(FOOL.events.uiTypes.AI_ON_TALON_CLICK, {
                    player: player
                }));
            }
        }
    };

    function onBoutClick(player) {
        FOOL.events.tunnel.sendEvent(new FOOL.events.GameEvent(FOOL.events.uiTypes.AI_ON_BOUT_CLICK, {
            player: player
        }));
    }

    function attack(player, game) {
        FOOL.events.tunnel.sendEvent(new FOOL.events.GameEvent(FOOL.events.uiTypes.AI_ON_PLAYER_CARD_CLICK, {
            player: player,
            card: getAttackCard(player, game)
        }));
    }

    function defend(player, game) {
        FOOL.events.tunnel.sendEvent(new FOOL.events.GameEvent(FOOL.events.uiTypes.AI_ON_PLAYER_CARD_CLICK, {
            player: player,
            card: getDefendCard(player, game)
        }));
    }

    function getAttackCard(player, game) {
        var result = player.getCards()[0];
        console.log('getAttackCard() => ', result);
        return result;
    }

    function getDefendCard(player, game) {
        var result = player.getCards()[0];
        console.log('getDefendCard() => ', result);
        return result;
    }

    FOOL.ai = new AI();

})(FOOL);