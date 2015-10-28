var FOOL = {
    classes: {},
    currentGame: null,
    robot: {},
    forms: {},
    uiBuilder: {},
    color: {
        CROSSES: 1,
        HEARTS: 2,
        SPADES: 3,
        DIAMONDS: 4
    },
    direction: {
        UP: 0,
        DOWN: 1
    },
    events: {
        gameTypes: {
            READY_TO_START: 'READY_TO_START',
            GAME_STARTED: 'GAME_STARTED',
            TRUMP_SELECTED: 'TRUMP_SELECTED',
            GAME_FINISHED: 'GAME_FINISHED',
            PLAYERS_INIT: 'PLAYERS_INIT',
            PLAYER_UPDATE: 'PLAYER_UPDATE',
            RIVAL_UPDATE: 'RIVAL_UPDATE',
            BOUT_STARTED: 'BOUT_STARTED',
            BOUT_ENDED_DEFENDER_SUCCEED: 'BOUT_ENDED_DEFENDER_SUCCEED',
            BOUT_ENDED_ATTACKER_SUCCEED: 'BOUT_ENDED_ATTACKER_SUCCEED',
            ATTACKER_FINISHED: 'ATTACKER_FINISHED',
            ATTACK_STARTED: 'ATTACK_STARTED',
            TAKE_CARD: 'TAKE_CARD',
            THROW_CARD: 'THROW_CARD',
            SEND_TO_RETREAT: 'SEND_TO_RETREAT',
            PULL: 'PULL'
        },
        uiTypes: {
            UI_CLEAR: 'UI_CLEAR',
            UI_GAME_RENDER: 'UI_GAME_RENDER',
            UI_TALON_RENDER: 'UI_TALON_RENDER',
            UI_PLAYER_RENDER: 'UI_PLAYER_RENDER',
            UI_RIVAL_RENDER: 'UI_RIVAL_RENDER',
            UI_RETREAT_RENDER: 'UI_RETREAT_RENDER',
            UI_BOUT_RENDER: 'UI_BOUT_RENDER',
            UI_RIVALS_RENDER: 'UI_RIVALS_RENDER',

            UI_SHOW_MODAL: 'UI_SHOW_MODAL',

            UI_ON_PLAYER_CARD_CLICK: 'UI_ON_PLAYER_CARD_CLICK',
            UI_ON_BOUT_CLICK: 'UI_ON_BOUT_CLICK',
            UI_ON_TALON_CLICK: 'UI_ON_TALON_CLICK',
            UI_ON_RETREAT_CLICK: 'UI_ON_RETREAT_CLICK',
            UI_ON_RIVAL_CARD_CLICK: 'UI_ON_RIVAL_CARD_CLICK',
            UI_ON_HELP_BUTTON_CLICK: 'UI_ON_HELP_BUTTON_CLICK',

            AI_ON_PLAYER_CARD_CLICK: 'AI_ON_PLAYER_CARD_CLICK',
            AI_ON_BOUT_CLICK: 'AI_ON_BOUT_CLICK',
            AI_ON_TALON_CLICK: 'AI_ON_TALON_CLICK',

            UI_SHOW_MESSAGE: 'UI_SHOW_MESSAGE'
        }
    },
    messagesKeys: {
        OK: 'OK',
        MORE_INFO: 'MORE_INFO',
        START_GAME: 'START_GAME',
        WELCOME: 'WELCOME',
        YOU_SHOULD_TAKE_CARD: 'YOU_SHOULD_TAKE_CARD',
        YOU_CAN_NOT_TAKE_CARD: 'YOU_CAN_NOT_TAKE_CARD',
        YOU_SHOULD_MAKE_ACTION: 'YOU_SHOULD_MAKE_ACTION',
        RESTART_GAME: 'RESTART_GAME',
        YOU_WON: 'YOU_WON',
        YOU_LOSE: 'YOU_LOSE',
        ACTION_IS_NOT_YOUR: 'ACTION_IS_NOT_YOUR',
        YOU_CAN_NOT_TOSS_THIS_CARD: 'YOU_CAN_NOT_TOSS_THIS_CARD',
        YOU_CAN_RESPOND_BY_USING_MORE_TRUMP: 'YOU_CAN_RESPOND_BY_USING_MORE_TRUMP',
        YOU_CAN_RESPOND_ONLY_BY_USING_TRUMP: 'YOU_CAN_RESPOND_ONLY_BY_USING_TRUMP',
        YOU_SHOULD_RESPOND_ONLY_BY_USING_SAME_COLOR: 'YOU_SHOULD_RESPOND_ONLY_BY_USING_SAME_COLOR',
        YOUR_CARD_IS_LESS_THAN_ATTACKER_CARD: 'YOUR_CARD_IS_LESS_THAN_ATTACKER_CARD',
        YOU_CAN_NOT_PULL_OR_TOSS_TO_RETREAT_CARDS: 'YOU_CAN_NOT_PULL_OR_TOSS_TO_RETREAT_CARDS'
    },
    messages: {
        OK: 'Ок',
        MORE_INFO: 'Кликните сюда, чтобы узнать больше...',
        START_GAME: 'Начать игру',
        WELCOME: 'Добро пожаловать!',
        YOU_SHOULD_TAKE_CARD: 'Визьмите карты из колоды!',
        YOU_CAN_NOT_TAKE_CARD: 'Вы не можете сейчас набирать карты!',
        YOU_SHOULD_MAKE_ACTION: 'Ходите!',
        RESTART_GAME: 'Начать заново!',
        YOU_WON: 'Вы победили =)',
        YOU_LOSE: 'Вы проиграли =(',
        ACTION_IS_NOT_YOUR: 'Не ваш ход!',
        YOU_CAN_NOT_TOSS_THIS_CARD: 'Не жульничайте, таких карт нет на столе!',
        YOU_CAN_RESPOND_BY_USING_MORE_TRUMP: 'Вы можете отбиться только козырем больше!',
        YOU_CAN_RESPOND_ONLY_BY_USING_TRUMP: 'Вы можете отбиться только козырем!',
        YOU_SHOULD_RESPOND_ONLY_BY_USING_SAME_COLOR: 'Вы должны отбиваться картой такой же масти!',
        YOUR_CARD_IS_LESS_THAN_ATTACKER_CARD: 'Ваша карта меньше!',
        YOU_CAN_NOT_PULL_OR_TOSS_TO_RETREAT_CARDS: 'Вы не можете сейчас забрать или бросить в отбой!'
    },
    messagesFull: {
        YOU_SHOULD_TAKE_CARD: 'Для того чтобы взять карты из колоды, необходимо кликнуть мышью на карты, находящиеся в области под номером 3. (См. ниже...)',
        YOU_CAN_NOT_TAKE_CARD: 'На данном этапе игры Вы не можете набрать карты!',
        YOU_SHOULD_MAKE_ACTION: 'Для того чтобы сделать ход, необходимо кликнуть мышью на карты, находящиеся в области под номером 5. (См. ниже...)',
        ACTION_IS_NOT_YOUR: 'На данном этапе игры Вы не можете делать какие-либо действия. Ожидайте действия противника!',
        YOU_CAN_NOT_TOSS_THIS_CARD: 'Вы можете подбрасывать только те карты, которые уже есть на игровом столе (область 2, см. ниже...). Иначе, если у Вас нет таких карт, Вы должны бросить карты в отбой. Для этого необходимо кликнуть мышью на карты, находящиеся в области под номером 2. (См. ниже...)',
        YOU_CAN_RESPOND_BY_USING_MORE_TRUMP: 'Старшинство карт в колоде из 36 карт (от меньшего достоинства к большему): 6, 7, 8, 9, 10, В, Д, К, Т.',
        YOU_CAN_RESPOND_ONLY_BY_USING_TRUMP: 'Козырем является карта, лежащая лицевой стороной к игрокам (область 3). (См. ниже...)',
        YOU_SHOULD_RESPOND_ONLY_BY_USING_SAME_COLOR: 'Масть подкидной карты, последней выложенной на игровой стол (см. область под номером 2) должна совпадать с мастью карты, которой вы хотите отбиться. Или Ваша карта должна быть козырной.',
        YOUR_CARD_IS_LESS_THAN_ATTACKER_CARD: 'Старшинство карт в колоде из 36 карт (от меньшего достоинства к большему): 6, 7, 8, 9, 10, В, Д, К, Т. Вы можете отбиться только картой большего достоинства, путем клика мыши на карты, находящиеся в области под номером 5. (См. ниже...)',
        YOU_CAN_NOT_PULL_OR_TOSS_TO_RETREAT_CARDS: 'Вы не можете сейчас забрать или бросить в отбой!'
    },
    styles: {
        PLAYER_CARD_SELECTOR: '.player-cards > .card',
        RIVAL_CARD_SELECTOR: '.opponent-player .card',
        BOUT_CARD_SELECTOR: '.table-cards > .card',
        RETREAT_CARD_SELECTOR: '.retreat-cards > .card',
        TALON_CARD_SELECTOR: '.pack-cards > .card',
        MESSAGE_SELECTOR: '.message-container > .message',
        MESSAGE_CONTAINER_SELECTOR: '.message-container',
        MODAL_SELECTOR: '.modal',
        MODAL_TEXT_SELECTOR: '.modal__body__text',
        MODAL_IMAGE_SELECTOR: '.modal__body__img',
        MODAL_HEADER_SELECTOR: '.modal__body__header',
        MODAL_BUTTON_SELECTOR: '.modal__body__button',

        RIVALS_CONTAINER_CLASS_NAME: 'opponents',
        RIVAL_CONTAINER_CLASS_NAME: 'opponent-cards',
        PLAYER_CARDS_CONTAINER_CLASS_NAME: 'player-cards',
        BOUT_CARDS_CONTAINER_CLASS_NAME: 'table-cards',
        TALON_CARDS_CONTAINER_CLASS_NAME: 'pack-cards',
        RETREAT_CARDS_CONTAINER_CLASS_NAME: 'retreat-cards',
        CARDS_CLASS_NAME: 'cards',
        PLAYER_CLASS_NAME: 'player',
        MODAL_SHOW_CLASS: 'modal_show',
        MODAL_HIDE_CLASS: 'modal_hide',
        MODAL_IMAGE_HIDE: 'modal__body__img_hide',

        ADD_CARD_UP_ANIMATION: 'add-card-up',
        ADD_CARD_DOWN_ANIMATION: 'add-card-down',
        REMOVE_CARD_UP_ANIMATION: 'remove-card-up',
        REMOVE_CARD_DOWN_ANIMATION: 'remove-card-up'
    },
    modalType: {
        SUCCESS: 'SUCCESS',
        WARNING: 'WARNING',
        INFO: 'INFO'
    }
};

FOOL.defaults = {
    playerName: 'User',
    robotName: 'Robot',
    playersNumber: 2,
    startCardsNumber: 6,
    robotPing: 2000,
    timeOfShowingMessages: 60000,
    animationInterval: 250,
    cardsImagesDir: 'img/'
};

FOOL.talon = [
//    {
//        color: FOOL.color.CROSSES,
//        value: 2,
//        name: '2'
//    },
//    {
//        color: FOOL.color.CROSSES,
//        value: 3,
//        name: '3'
//    },
//    {
//        color: FOOL.color.CROSSES,
//        value: 4,
//        name: '4'
//    },
//    {
//        color: FOOL.color.CROSSES,
//        value: 5,
//        name: '5'
//    },
//    {
//        color: FOOL.color.CROSSES,
//        value: 6,
//        name: '6'
//    },
//    {
//        color: FOOL.color.CROSSES,
//        value: 7,
//        name: '7'
//    },
//    {
//        color: FOOL.color.CROSSES,
//        value: 8,
//        name: '8'
//    },
//    {
//        color: FOOL.color.CROSSES,
//        value: 9,
//        name: '9'
//    },
//    {
//        color: FOOL.color.CROSSES,
//        value: 10,
//        name: '10'
//    },
    {
        color: FOOL.color.CROSSES,
        value: 11,
        name: 'Jack'
    },
    {
        color: FOOL.color.CROSSES,
        value: 12,
        name: 'Queen'
    },
    {
        color: FOOL.color.CROSSES,
        value: 13,
        name: 'King'
    },
    {
        color: FOOL.color.CROSSES,
        value: 14,
        name: 'Ace'
    },
//    {
//        color: FOOL.color.DIAMONDS,
//        value: 2,
//        name: '2'
//    },
//    {
//        color: FOOL.color.DIAMONDS,
//        value: 3,
//        name: '3'
//    },
//    {
//        color: FOOL.color.DIAMONDS,
//        value: 4,
//        name: '4'
//    },
//    {
//        color: FOOL.color.DIAMONDS,
//        value: 5,
//        name: '5'
//    },
//    {
//        color: FOOL.color.DIAMONDS,
//        value: 6,
//        name: '6'
//    },
//    {
//        color: FOOL.color.DIAMONDS,
//        value: 7,
//        name: '7'
//    },
//    {
//        color: FOOL.color.DIAMONDS,
//        value: 8,
//        name: '8'
//    },
//    {
//        color: FOOL.color.DIAMONDS,
//        value: 9,
//        name: '9'
//    },
//    {
//        color: FOOL.color.DIAMONDS,
//        value: 10,
//        name: '10'
//    },
    {
        color: FOOL.color.DIAMONDS,
        value: 11,
        name: 'Jack'
    },
    {
        color: FOOL.color.DIAMONDS,
        value: 12,
        name: 'Queen'
    },
    {
        color: FOOL.color.DIAMONDS,
        value: 13,
        name: 'King'
    },
    {
        color: FOOL.color.DIAMONDS,
        value: 14,
        name: 'Ace'
    },
//    {
//        color: FOOL.color.HEARTS,
//        value: 2,
//        name: '2'
//    },
//    {
//        color: FOOL.color.HEARTS,
//        value: 3,
//        name: '3'
//    },
//    {
//        color: FOOL.color.HEARTS,
//        value: 4,
//        name: '4'
//    },
//    {
//        color: FOOL.color.HEARTS,
//        value: 5,
//        name: '5'
//    },
//    {
//        color: FOOL.color.HEARTS,
//        value: 6,
//        name: '6'
//    },
//    {
//        color: FOOL.color.HEARTS,
//        value: 7,
//        name: '7'
//    },
//    {
//        color: FOOL.color.HEARTS,
//        value: 8,
//        name: '8'
//    },
//    {
//        color: FOOL.color.HEARTS,
//        value: 9,
//        name: '9'
//    },
//    {
//        color: FOOL.color.HEARTS,
//        value: 10,
//        name: '10'
//    },
    {
        color: FOOL.color.HEARTS,
        value: 11,
        name: 'Jack'
    },
    {
        color: FOOL.color.HEARTS,
        value: 12,
        name: 'Queen'
    },
    {
        color: FOOL.color.HEARTS,
        value: 13,
        name: 'King'
    },
    {
        color: FOOL.color.HEARTS,
        value: 14,
        name: 'Ace'
    },
//    {
//        color: FOOL.color.SPADES,
//        value: 2,
//        name: '2'
//    },
//    {
//        color: FOOL.color.SPADES,
//        value: 3,
//        name: '3'
//    },
//    {
//        color: FOOL.color.SPADES,
//        value: 4,
//        name: '4'
//    },
//    {
//        color: FOOL.color.SPADES,
//        value: 5,
//        name: '5'
//    },
//    {
//        color: FOOL.color.SPADES,
//        value: 6,
//        name: '6'
//    },
//    {
//        color: FOOL.color.SPADES,
//        value: 7,
//        name: '7'
//    },
//    {
//        color: FOOL.color.SPADES,
//        value: 8,
//        name: '8'
//    },
//    {
//        color: FOOL.color.SPADES,
//        value: 9,
//        name: '9'
//    },
//    {
//        color: FOOL.color.SPADES,
//        value: 10,
//        name: '10'
//    },
    {
        color: FOOL.color.SPADES,
        value: 11,
        name: 'Jack'
    },
    {
        color: FOOL.color.SPADES,
        value: 12,
        name: 'Queen'
    },
    {
        color: FOOL.color.SPADES,
        value: 13,
        name: 'King'
    },
    {
        color: FOOL.color.SPADES,
        value: 14,
        name: 'Ace'
    }
];