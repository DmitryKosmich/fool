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
        renderRetreat(game.getRetreat());
        renderPlayer({
            cardsPickedUp: game.getPlayer().getCards(),
            cardsThrownOut: []
        });
    }

    /**
     * This method should draw the rivals.
     * @param {Array} players
     */
    function drawOpponents(players) {
        console.log('=> drawOpponents()');
        var i,
            opponentsContainer = document.getElementsByClassName(FOOL.styles.RIVALS_CONTAINER_CLASS_NAME)[0],
            length = players ? players.length : 0,
            opponents = '';
        for (i = 0; i < length; i += 1) {
            if (players[i].getIsRobot()) {
                opponents += getOpponentHTML(players[i]);
            }
        }
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
            result = '<li class="player ' + (opponent.getIsActive() ? 'active' : '') + ' opponent-player" id="' + opponent.getName() + '"><ul class="cards">';
        for (i = 0; i < length; i += 1) {
            result += getCardHtml(cards[i], null, false);
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
        var i, tableContainer = document.getElementsByClassName(FOOL.styles.BOUT_CARDS_CONTAINER_CLASS_NAME)[0],
            length = tableCards ? tableCards.length : 0,
            tableCardsHTML = '';
        for (i = 0; i < length; i += 1) {
            tableCardsHTML += getCardHtml(tableCards[i], null, true);
        }
        tableContainer.innerHTML = tableCardsHTML;
    }

    /**
     * This method should draw the talon.
     * @param {Array} talonCards - array of {@link FOOL.classes.Card} objects
     */
    function drawTalon(talonCards) {
        console.log('=> drawPack()');
        var i, tableContainer = document.getElementsByClassName(FOOL.styles.TALON_CARDS_CONTAINER_CLASS_NAME)[0],
            length = talonCards ? talonCards.length : 0,
            packCardsHTML = '';
        for (i = 0; i < length; i += 1) {
            packCardsHTML += getCardHtml(talonCards[i], null, (i === 0));
        }
        tableContainer.innerHTML = packCardsHTML;
    }

    /**
     * This method should draw the retreat.
     */
    function renderRetreat(data) {
        console.log('=> renderRetreat()');
        var i,
            retreatContainer = document.getElementsByClassName(FOOL.styles.RETREAT_CARDS_CONTAINER_CLASS_NAME)[0],
            timeOffsetLength = 0,
            pickedUpCardsLength = data.pickedUpCards ? data.pickedUpCards.length : 0,
            thrownOutCardsLength = data.thrownOutCards ? data.thrownOutCards.length : 0;
        for (i = 0; i < pickedUpCardsLength; i += 1) {
            (function (i) {
                setTimeout(function () {
                    addCard(data.pickedUpCards[i], retreatContainer, FOOL.direction.DOWN, true);
                }, timeOffsetLength * FOOL.innerDefaults.animationInterval);
            })(i);
            timeOffsetLength +=1;
        }
        for (i = 0; i < thrownOutCardsLength; i += 1) {
            (function (i) {
                setTimeout(function () {
                    removeCard(data.thrownOutCards[i], FOOL.direction.UP);
                }, timeOffsetLength * FOOL.innerDefaults.animationInterval);
            })(i);
            timeOffsetLength +=1;
        }
    }

    /**
     * This method should draw the retreat.
     */
    function renderPlayer(data) {
        console.log('=> renderPlayer()');
        var i,
            playerContainer = document.getElementsByClassName(FOOL.styles.PLAYER_CARDS_CONTAINER_CLASS_NAME)[0],
            timeOffsetLength = 0,
            pickedUpCardsLength = data.cardsPickedUp ? data.cardsPickedUp.length : 0,
            thrownOutCardsLength = data.cardsThrownOut ? data.cardsThrownOut.length : 0;
        for (i = 0; i < pickedUpCardsLength; i += 1) {
            (function (i) {
                setTimeout(function () {
                    addCard(data.cardsPickedUp[i], playerContainer, FOOL.direction.DOWN, true);
                }, timeOffsetLength * FOOL.innerDefaults.animationInterval);
            })(i);
            timeOffsetLength +=1;
        }
        for (i = 0; i < thrownOutCardsLength; i += 1) {
            (function (i) {
                setTimeout(function () {
                    removeCard(data.cardsThrownOut[i], FOOL.direction.UP);
                }, timeOffsetLength * FOOL.innerDefaults.animationInterval);
            })(i);
            timeOffsetLength +=1;
        }
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
     * @param animationDirection
     */
    function getCardHtml(card, animationDirection, isOpen) {
        var id = getCardId(card);
        return '' +
            '<li class="card '
                + (animationDirection ? (animationDirection === FOOL.direction.UP
                    ? FOOL.styles.ADD_CARD_UP_ANIMATION
                    : FOOL.styles.ADD_CARD_DOWN_ANIMATION) : '')
                + (isOpen ? ' open' : ' close') + '" id="' + id + '">' +
            '<img src="images/cards/' + id + '.png">' +
            '<img src="images/cards/back.png">' +
            '</li>';
    }

    /**
     *
     * @param {FOOL.classes.Card} card
     * @param {HTMLElement} container
     * @param {number} direction
     * @param {boolean} isOpen
     * @param {Function} callback
     */
    function addCard(card, container, direction, isOpen, callback) {
        var elem, tempElem = document.createElement('div');
        tempElem.innerHTML = getCardHtml(card, direction, isOpen);
        container.appendChild(tempElem.childNodes[0]);
        elem = document.getElementById(getCardId(card));
        setTimeout(function () {
            FOOL.document.removeClass(elem, direction === FOOL.direction.UP
                ? FOOL.styles.ADD_CARD_UP_ANIMATION
                : FOOL.styles.ADD_CARD_DOWN_ANIMATION);
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
        FOOL.document.addClass(elem, direction === FOOL.direction.UP
            ? FOOL.styles.REMOVE_CARD_UP_ANIMATION
            : FOOL.styles.REMOVE_CARD_DOWN_ANIMATION);
        setTimeout(function () {
            elem.parentNode.removeChild(elem);
            callback ? callback() : 0;
        }, 500);
    }

    /**
     *
     */
    UIBuilder.prototype.initUIListeners = function () {
        var playerCards = document.querySelectorAll(FOOL.styles.PLAYER_CARD_SELECTOR),
            rivalCards = document.querySelectorAll(FOOL.styles.RIVAL_CARD_SELECTOR),
            talonCards = document.querySelectorAll(FOOL.styles.TALON_CARD_SELECTOR),
            boutCards = document.querySelectorAll(FOOL.styles.BOUT_CARD_SELECTOR),
            retreatCards = document.querySelectorAll(FOOL.styles.RETREAT_CARD_SELECTOR),
            helper = document.querySelector(FOOL.styles.HELPER_BUTTON_SELECTOR);

        [].forEach.call(playerCards, function(playerCard) {
            FOOL.document.addEventListener(playerCard, 'click', function (event) {
                FOOL.events.tunnel.sendEvent(new FOOL.events.GameEvent(FOOL.events.uiTypes.UI_ON_PLAYER_CARD_CLICK, {
                    player: FOOL.currentGame.getPlayer(),
                    card: FOOL.uiDetector.getCard(event)
                }));
            });
        });

        [].forEach.call(rivalCards, function(rivalCard) {
            FOOL.document.addEventListener(rivalCard, 'click', function (event) {
                FOOL.events.tunnel.sendEvent(new FOOL.events.GameEvent(FOOL.events.uiTypes.UI_ON_RIVAL_CARD_CLICK, {
                    player: FOOL.uiDetector.getPlayer(event),
                    card: FOOL.uiDetector.getCard(event)
                }));
            });
        });

        [].forEach.call(talonCards, function(talonCard) {
            FOOL.document.addEventListener(talonCard, 'click', function () {
                FOOL.events.tunnel.sendEvent(new FOOL.events.GameEvent(FOOL.events.uiTypes.UI_ON_TALON_CLICK, {
                    player: FOOL.currentGame.getPlayer(),
                    talon: FOOL.currentGame.getTalon()
                }));
            });
        });

        [].forEach.call(boutCards, function(boutCard) {
            FOOL.document.addEventListener(boutCard, 'click', function (event) {
                FOOL.events.tunnel.sendEvent(new FOOL.events.GameEvent(FOOL.events.uiTypes.UI_ON_BOUT_CLICK, {
                    game: FOOL.currentGame
                }));
            });
        });

        [].forEach.call(retreatCards, function(retreatCard) {
            FOOL.document.addEventListener(retreatCard, 'click', function (event) {
                FOOL.events.tunnel.sendEvent(new FOOL.events.GameEvent(FOOL.events.uiTypes.UI_ON_RETREAT_CLICK, {
                    game: FOOL.currentGame
                }));
            });
        });

        FOOL.document.addEventListener(helper, 'click', function (event) {
            FOOL.events.tunnel.sendEvent(new FOOL.events.GameEvent(FOOL.events.uiTypes.UI_ON_HELP_BUTTON_CLICK, {
                game: FOOL.currentGame
            }));
        });
    };

    FOOL.uiBuilder = new UIBuilder();

})(FOOL, document);