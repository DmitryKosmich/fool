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
     * This method should draw all game.
     * @param {FOOL.classes.Game} game
     */
    function drawView(game) {
        drawOpponents(game.getRivals());
        drawTable(game.getBoutCards());
        drawTalon(game.getTalon());
        drawRetreat(game.getRetreat());
        drawUserPack(game.getPlayer());
    }

    /**
     * This method should draw the rivals.
     * @param {Array} players
     */
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

    /**
     *
     * @param {FOOL.classes.Player} opponent
     * @returns {string} Returns html for a rival
     */
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

    /**
     * This method should draw the bout cards.
     * @param {Array} tableCards - array of {@link FOOL.classes.Card} objects
     */
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

    /**
     * This method should draw the talon.
     * @param {Array} talonCards - array of {@link FOOL.classes.Card} objects
     */
    function drawTalon(talonCards) {
        console.log('=> drawPack()');
        var i, tableContainer = document.getElementsByClassName('pack-cards')[0],
            length = talonCards ? talonCards.length : 0,
            packCardsHTML = '';
        for (i = 0; i < length; i += 1) {
            packCardsHTML += getCardHtml(talonCards[i], (i === 0));
        }
        tableContainer.innerHTML = packCardsHTML;
    }

    /**
     * This method should draw the retreat.
     * @param {Array} retreatCards - array of {@link FOOL.classes.Card} objects
     */
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

    /**
     * This method should draw the retreat.
     * @param {FOOL.classes.Player} userPlayer
     */
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

    /**
     *
     * @param {FOOL.classes.Card} card
     * @param {HTMLLIElement} container
     * @param {number} direction
     * @param {boolean} isOpen
     * @param {Function} callback
     */
    function addCard(card, container, direction, isOpen, callback) {
        var elem, tempElem = document.createElement('div');
        tempElem.innerHTML = getCardHtml(card, isOpen);
        container.appendChild(tempElem.childNodes[0]);
        elem = document.getElementById(getCardId(card));
        setTimeout(function () {
            FOOL.document.removeClass(elem, direction === FOOL.direction.UP ? 'add-card-up' : 'add-card-down');
            callback ? callback() : 0;
        }, 500);
    }

    /**
     *
     * @param {FOOL.classes.Card} card
     * @param {number} direction
     * @param {Function} callback
     */
    function removeCard(card, direction, callback) {
        var elem = document.getElementById(getCardId(card));
        FOOL.document.addClass(elem, direction === FOOL.direction.UP ? 'remove-card-up' : 'remove-card-down');
        setTimeout(function () {
            elem.parentNode.removeChild(elem);
            callback ? callback() : 0;
        }, 500);
    }

    FOOL.uiBuilder = new UIBuilder();

})(FOOL, document);