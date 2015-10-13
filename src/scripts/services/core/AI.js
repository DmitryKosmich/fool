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
        if (game.isActiveBout()) {
            if (player === game.getAttacker()) {
                if (getAttackCard(player, game)) {
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
        var boutCards = game.getBoutCards(),
            playerCards = player.getCards(),
            result = null;
        //TODO: improve algorithm
        if (boutCards.length === 0) {
            playerCards.forEach(function (playerCard) {
                if (!result || result.getValue() > playerCard.getValue()) {
                    result = playerCard;
                }
            });
        } else {
            boutCards.forEach(function (card) {
                playerCards.forEach(function (playerCard) {
                    if (playerCard.getValue() === card.getValue()) {
                        if (!result || result.getValue() > playerCard.getValue()) {
                            result = playerCard;
                        }
                    }
                });
            });
        }


        return result;
    }

    function getDefendCard(player, game) {
        var lastBoutCard = game.getBoutCards()[game.getBoutCards().length - 1],
            result = null;
        //TODO: improve algorithm
        player.getCards().forEach(function (playerCard) {
            if (playerCard.getValue() > lastBoutCard.getValue()
                && playerCard.getColor() === lastBoutCard.getColor()) {
                if (!result || result.getValue() > playerCard.getValue()) {
                    result = playerCard;
                }
            } else if (playerCard.getColor() === game.getTrump().getColor()
                && lastBoutCard.getColor() !== game.getTrump().getColor()) {
                if (!result || result.getValue() > playerCard.getValue()) {
                    result = playerCard;
                }
            }
        });

        return result;
    }

    FOOL.ai = new AI();

})(FOOL);