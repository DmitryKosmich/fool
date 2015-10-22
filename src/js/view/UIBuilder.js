(function (FOOL, document) {
    'use strict';

    /**
     *
     * @constructor
     */
    function UIBuilder() {}

    /**
     * @param {Object} params
     * @param {Object} params.data
     * @param {HTMLElement} params.container - parent element of cards
     * @param {boolean} params.isOpen - card is open or close
     * @param {boolean} [params.hasAnimation]
     * @param {number} [params.interval]
     * @param {number[]} [params.showExceptionArr]
     * @param {Function} [params.callback]
     */
    UIBuilder.prototype.render = function (params) {
//        console.log('=> render(params) params:', params);
        var data = params.data,
            isOpen = params.isOpen,
            container = params.container,
            hasAnimation = params.hasAnimation,
            showExceptionArr = params.showExceptionArr,
            animationInterval = hasAnimation ? (params.interval || FOOL.defaults.animationInterval) : 0,
            callback = params.callback,

            i,
            timeOffsetLength = 0,
            pickedUpCardsLength = data.cardsPickedUp ? data.cardsPickedUp.length : 0,
            thrownOutCardsLength = data.cardsThrownOut ? data.cardsThrownOut.length : 0,
            operationNumber = pickedUpCardsLength + thrownOutCardsLength;

        // pick up for container
        for (i = 0; i < pickedUpCardsLength; i += 1) {
            (function (i, timeOffsetLength) {
                setTimeout(function () {
                    var isShown = isOpen;
                    if (showExceptionArr && showExceptionArr.indexOf(i) !== -1) {
                        isShown = !isOpen;
                    }

                    var cardParams = {
                        card: data.cardsPickedUp[i],
                        container: container,
                        hasAnimation: hasAnimation,
                        direction: FOOL.direction.DOWN,
                        isOpen : isShown,
                        callback : (timeOffsetLength === operationNumber - 1) ? callback : null
                    };

                    FOOL.uiCardCarrier.addCard(cardParams);

                }, timeOffsetLength * animationInterval);
            })(i, timeOffsetLength);
            timeOffsetLength +=1;
        }

        // throw out for container
        for (i = 0; i < thrownOutCardsLength; i += 1) {
            (function (i, timeOffsetLength) {
                setTimeout(function () {
                    var cardParams = {
                        card: data.cardsThrownOut[i],
                        hasAnimation: hasAnimation,
                        direction: FOOL.direction.UP,
                        callback : (timeOffsetLength === operationNumber - 1) ? callback : null
                    };
                    FOOL.uiCardCarrier.removeCard(cardParams);
                }, timeOffsetLength * animationInterval);
            })(i, timeOffsetLength);
            timeOffsetLength +=1;
        }

        if (operationNumber === 0) {
            callback ? callback() : 0;
        }
    };

    /**
     *
     */
    UIBuilder.prototype.clear = function () {
        var containers = [
            document.getElementsByClassName(FOOL.styles.PLAYER_CARDS_CONTAINER_CLASS_NAME)[0],
            document.getElementsByClassName(FOOL.styles.TALON_CARDS_CONTAINER_CLASS_NAME)[0],
            document.getElementsByClassName(FOOL.styles.RETREAT_CARDS_CONTAINER_CLASS_NAME)[0],
            document.getElementsByClassName(FOOL.styles.BOUT_CARDS_CONTAINER_CLASS_NAME)[0],
            document.getElementsByClassName(FOOL.styles.RIVALS_CONTAINER_CLASS_NAME)[0]
        ];

        containers.forEach(function (container) {
            container.innerHTML = '';
        });
    };

    /**
     *
     * @param {Object} data
     * @param {boolean} [hasAnimation]
     * @param {Function} [callback]
     */
    UIBuilder.prototype.renderTalon = function (data, hasAnimation, callback) {
//        console.log('=> renderTalon(data) data:', data);
        var params = {
            data: data,
            container: document.getElementsByClassName(FOOL.styles.TALON_CARDS_CONTAINER_CLASS_NAME)[0],
            isOpen: false,
            showExceptionArr: [0],
            hasAnimation: hasAnimation,
            callback: callback
        };
        UIBuilder.prototype.render(params);
    };

    /**
     *
     * @param {Object} data
     * @param {boolean} [hasAnimation]
     * @param {Function} [callback]
     */
    UIBuilder.prototype.renderPlayer = function (data, hasAnimation, callback) {
//        console.log('=> renderPlayer(data) data:', data);
        var params = {
            data: data,
            container: document.getElementsByClassName(FOOL.styles.PLAYER_CARDS_CONTAINER_CLASS_NAME)[0],
            isOpen: true,
            hasAnimation: hasAnimation,
            callback: callback
        };
        UIBuilder.prototype.render(params);
    };

    /**
     *
     * @param {Object} data
     * @param {boolean} [hasAnimation]
     * @param {Function} [callback]
     */
    UIBuilder.prototype.renderRival = function (data, hasAnimation, callback) {
//        console.log('=> renderRival(data) data:', data);
        var params = {
            data: data,
            container: document.getElementById('' + data.player.getId()).childNodes[0],
            isOpen: false,
            hasAnimation: hasAnimation,
            callback: callback
        };
        UIBuilder.prototype.render(params);
    };

    /**
     *
     * @param {Object} data
     * @param {boolean} [hasAnimation]
     * @param {Function} [callback]
     */
    UIBuilder.prototype.renderRivals = function (data, hasAnimation, callback) {
//        console.log('=> renderRivals(data) data:', data);
        var rivals = data.rivals,
            rivalData = {};
        initRivalContainers(rivals);
        rivals.forEach(function (rival) {
            rivalData = {
                player: rival,
                cardsPickedUp: rival.getCards()
            };
            UIBuilder.prototype.renderRival(rivalData, hasAnimation, callback);
        });
    };

    /**
     *
     * @param {Object} data
     * @param {boolean} [hasAnimation]
     * @param {Function} [callback]
     */
    UIBuilder.prototype.renderRetreat = function (data, hasAnimation, callback) {
//        console.log('=> renderRetreat(data) data:', data);
        var params = {
            data: data,
            container: document.getElementsByClassName(FOOL.styles.RETREAT_CARDS_CONTAINER_CLASS_NAME)[0],
            isOpen: false,
            hasAnimation: hasAnimation,
            callback: callback
        };
        UIBuilder.prototype.render(params);
    };

    /**
     *
     * @param {Object} data
     * @param {boolean} [hasAnimation]
     * @param {Function} [callback]
     */
    UIBuilder.prototype.renderBout = function (data, hasAnimation, callback) {
//        console.log('=> renderBout(data) data:', data);
        var params = {
            data: data,
            container: document.getElementsByClassName(FOOL.styles.BOUT_CARDS_CONTAINER_CLASS_NAME)[0],
            isOpen: true,
            hasAnimation: hasAnimation,
            callback: callback
        };
        UIBuilder.prototype.render(params);
    };

    /**
     * Displays the game on the screen.
     * @param {Object} data
     * @param {Function} [callback]
     */
    UIBuilder.prototype.renderGame = function (data, callback) {
//        console.log('=> renderGame(data) data:', data);
        var currentGame = data || FOOL.currentGame,
            talonCards = currentGame.getTalon(),
            retreatCards = currentGame.getRetreat(),
            boutCards = currentGame.getBoutCards(),
            rivals = currentGame.getRivals(),
            player = currentGame.getPlayer();

        UIBuilder.prototype.clear();

        UIBuilder.prototype.renderRivals({
            rivals: rivals
        });

        UIBuilder.prototype.renderPlayer({
            player: player,
            cardsPickedUp: player.getCards()
        });

        UIBuilder.prototype.renderTalon({
            cardsPickedUp: talonCards
        });

        UIBuilder.prototype.renderRetreat({
            cardsPickedUp: retreatCards
        });

        UIBuilder.prototype.renderBout({
            cardsPickedUp: boutCards
        });
    };

    /**
     *
     * @param {Player[]} rivals
     */
    function initRivalContainers(rivals) {
        var i,
            opponentsContainer = document.getElementsByClassName(FOOL.styles.RIVALS_CONTAINER_CLASS_NAME)[0],
            length = rivals ? rivals.length : 0,
            opponents = '';
        for (i = 0; i < length; i += 1) {
            if (rivals[i].getIsRobot()) {
//                opponents += '<li class="player ' + (rivals[i].getIsActive() ? 'active' : '') + ' opponent-player" id="' + rivals[i].getId() + '"><ul class="cards opponent-cards"></ul></li>';
                opponents += '<li class="player ' + 'active' + ' opponent-player" id="' + rivals[i].getId() + '"><ul class="cards opponent-cards"></ul></li>';
            }
        }
        opponentsContainer.innerHTML = opponents;
    }

    FOOL.uiBuilder = new UIBuilder();

})(FOOL, document);