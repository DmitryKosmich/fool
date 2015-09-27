(function (FOOL, document) {
    'use strict';

    /**
     *
     * @constructor
     */
    function UIBuilder() {}

    /**
     * Displays the game on the screen.
     * @param {FOOL.classes.Game} game
     */
    UIBuilder.prototype.show = function (game) {
        drawView(game);
    };

    /**
     *
     * @param game
     */
    function drawView(game) {
        drawOpponents(game.getPlayers());
        drawTable(game.getBoutCards());
        drawPack(game.getTalon());
        drawRetreat(game.getRetreat());
        drawUserPack(game.getPlayer());
    }

    function drawOpponents(players) {
        console.log('=> drawOpponents()');
        var i, opponentsContainer = document.getElementsByClassName('opponents')[0],
            length = players ? players.length : 0,
            opponents = '<ul class="opponents">';
        for (i = 0; i < length; i += 1) {
            if (players[i].getIsRobot()) {
                opponents += getOpponentHTML(players[i]);
            }
        }
        opponents += '</ul>';
        opponentsContainer.innerHTML = opponents;
    }

    function getOpponentHTML(opponent) {
        console.log('=> getOpponentHTML()');
        var i, cards = opponent ? opponent.getCards() : null,
            length = cards ? cards.length : 0,
            result = '<li class="player ' + (opponent.getIsActive() ? 'active' : '') + ' opponent-player"><ul class="cards">';
        for (i = 0; i < length; i += 1) {
            result += getCardHtml(cards[i], false);
        }
        result += '</ul></li>';
        return result;
    }

    function drawTable(tableCards) {
        console.log('=> drawTable()');
        var i, tableContainer = document.getElementsByClassName('table-cards')[0],
            length = tableCards ? tableCards.length : 0,
            tableCardsHTML = '';
        for (i = 0; i < length; i += 1) {
            tableCardsHTML += getCardHtml(tableCards[i], true);
        }
        tableContainer.innerHTML = tableCardsHTML;
    }

    function drawPack(packCards) {
        console.log('=> drawPack()');
        var i, tableContainer = document.getElementsByClassName('pack-cards')[0],
            length = packCards ? packCards.length : 0,
            packCardsHTML = '';
        for (i = 0; i < length; i += 1) {
            packCardsHTML += getCardHtml(packCards[i], (i === 0));
        }
        tableContainer.innerHTML = packCardsHTML;
    }

    function drawRetreat(retreatCards) {
        console.log('=> drawRetreat()');
        var i, tableContainer = document.getElementsByClassName('retreat-cards')[0],
            length = retreatCards ? retreatCards.length : 0,
            packCardsHTML = '';
        for (i = 0; i < length; i += 1) {
            packCardsHTML += getCardHtml(retreatCards[i], false);
        }
        tableContainer.innerHTML = packCardsHTML;
    }

    function drawUserPack(userPlayer) {
        console.log('=> drawUserPack()');
        var i, userCards = userPlayer ? userPlayer.getCards() : null,
            tableContainer = document.getElementsByClassName('player-cards')[0],
            length = userCards ? userCards.length : 0,
            userCardsHTML = '';
        for (i = 0; i < length; i += 1) {
            userCardsHTML += getCardHtml(userCards[i], true);
        }
        tableContainer.innerHTML = userCardsHTML;
    }

    /**
     *
     * @param {FOOL.classes.Card} card
     * @returns {string}
     */
    function getCardId(card) {
        return card.getValue() + '-' + card.getColor();
    }

    /**
     *
     * @param {FOOL.classes.Card} card
     * @param {boolean} isOpen
     * @returns {string}
     */
    function getCardHtml(card, isOpen) {
        var id = getCardId(card);
        return '' +
            '<li class="card ' + (isOpen ? 'open' : 'close') + '" id="' + id + '">' +
            '<img src="images/cards/' + id + '.png">' +
            '<img src="images/cards/back.png">' +
            '</li>';
    }

    FOOL.uiBuilder = new UIBuilder();

})(FOOL, document);