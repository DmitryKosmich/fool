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
            UI_TALON_RENDER: 'UI_TALON_RENDER',
            UI_PLAYER_RENDER: 'UI_PLAYER_RENDER',
            UI_RIVAL_RENDER: 'UI_RIVAL_RENDER',
            UI_CG_PL_RENDER: 'UI_CURRENT_GAME_RENDER_UPD_BY_PLAYER',
            UI_CG_RV_RENDER: 'UI_CURRENT_GAME_RENDER_UPD_BY_RIVAL',

            UI_ON_PLAYER_CARD_CLICK: 'UI_ON_PLAYER_CARD_CLICK',
            UI_ON_BOUT_CLICK: 'UI_ON_BOUT_CLICK',
            UI_ON_TALON_CLICK: 'UI_ON_TALON_CLICK',
            UI_ON_RETREAT_CLICK: 'UI_ON_RETREAT_CLICK',
            UI_ON_RIVAL_CARD_CLICK: 'UI_ON_RIVAL_CARD_CLICK',
            UI_ON_HELP_BUTTON_CLICK: 'UI_ON_HELP_BUTTON_CLICK'
        }
    },
    styles: {
        PLAYER_CARD_SELECTOR: '.player-cards > .card',
        RIVAL_CARD_SELECTOR: '.opponent-player .card',
        BOUT_CARD_SELECTOR: '.table-cards > .card',
        RETREAT_CARD_SELECTOR: '.retreat-cards > .card',
        TALON_CARD_SELECTOR: '.pack-cards > .card',
        HELPER_BUTTON_SELECTOR: '.helper > .button',

        RIVALS_CONTAINER_CLASS_NAME: 'opponents',
        PLAYER_CARDS_CONTAINER_CLASS_NAME: 'player-cards',
        BOUT_CARDS_CONTAINER_CLASS_NAME: 'table-cards',
        TALON_CARDS_CONTAINER_CLASS_NAME: 'pack-cards',
        RETREAT_CARDS_CONTAINER_CLASS_NAME: 'retreat-cards',

        ADD_CARD_UP_ANIMATION: '',
        ADD_CARD_DOWN_ANIMATION: '',
        REMOVE_CARD_UP_ANIMATION: '',
        REMOVE_CARD_DOWN_ANIMATION: ''
    }
};

FOOL.defaults = {
    playerName: 'User',
    robotName: 'Robot',
    playersNumber: 2,
    startCardsNumber: 6
};

FOOL.talon = [
    {
        color: FOOL.color.CROSSES,
        value: 2,
        name: '2'
    },
    {
        color: FOOL.color.CROSSES,
        value: 3,
        name: '3'
    },
    {
        color: FOOL.color.CROSSES,
        value: 3,
        name: '3'
    },
    {
        color: FOOL.color.CROSSES,
        value: 4,
        name: '4'
    },
    {
        color: FOOL.color.CROSSES,
        value: 5,
        name: '5'
    },
    {
        color: FOOL.color.CROSSES,
        value: 6,
        name: '6'
    },
    {
        color: FOOL.color.CROSSES,
        value: 7,
        name: '7'
    },
    {
        color: FOOL.color.CROSSES,
        value: 8,
        name: '8'
    },
    {
        color: FOOL.color.CROSSES,
        value: 9,
        name: '9'
    },
    {
        color: FOOL.color.CROSSES,
        value: 10,
        name: '10'
    },
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
    {
        color: FOOL.color.DIAMONDS,
        value: 2,
        name: '2'
    },
    {
        color: FOOL.color.DIAMONDS,
        value: 3,
        name: '3'
    },
    {
        color: FOOL.color.DIAMONDS,
        value: 3,
        name: '3'
    },
    {
        color: FOOL.color.DIAMONDS,
        value: 4,
        name: '4'
    },
    {
        color: FOOL.color.DIAMONDS,
        value: 5,
        name: '5'
    },
    {
        color: FOOL.color.DIAMONDS,
        value: 6,
        name: '6'
    },
    {
        color: FOOL.color.DIAMONDS,
        value: 7,
        name: '7'
    },
    {
        color: FOOL.color.DIAMONDS,
        value: 8,
        name: '8'
    },
    {
        color: FOOL.color.DIAMONDS,
        value: 9,
        name: '9'
    },
    {
        color: FOOL.color.DIAMONDS,
        value: 10,
        name: '10'
    },
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
    {
        color: FOOL.color.HEARTS,
        value: 2,
        name: '2'
    },
    {
        color: FOOL.color.HEARTS,
        value: 3,
        name: '3'
    },
    {
        color: FOOL.color.HEARTS,
        value: 3,
        name: '3'
    },
    {
        color: FOOL.color.HEARTS,
        value: 4,
        name: '4'
    },
    {
        color: FOOL.color.HEARTS,
        value: 5,
        name: '5'
    },
    {
        color: FOOL.color.HEARTS,
        value: 6,
        name: '6'
    },
    {
        color: FOOL.color.HEARTS,
        value: 7,
        name: '7'
    },
    {
        color: FOOL.color.HEARTS,
        value: 8,
        name: '8'
    },
    {
        color: FOOL.color.HEARTS,
        value: 9,
        name: '9'
    },
    {
        color: FOOL.color.HEARTS,
        value: 10,
        name: '10'
    },
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
    {
        color: FOOL.color.SPADES,
        value: 2,
        name: '2'
    },
    {
        color: FOOL.color.SPADES,
        value: 3,
        name: '3'
    },
    {
        color: FOOL.color.SPADES,
        value: 3,
        name: '3'
    },
    {
        color: FOOL.color.SPADES,
        value: 4,
        name: '4'
    },
    {
        color: FOOL.color.SPADES,
        value: 5,
        name: '5'
    },
    {
        color: FOOL.color.SPADES,
        value: 6,
        name: '6'
    },
    {
        color: FOOL.color.SPADES,
        value: 7,
        name: '7'
    },
    {
        color: FOOL.color.SPADES,
        value: 8,
        name: '8'
    },
    {
        color: FOOL.color.SPADES,
        value: 9,
        name: '9'
    },
    {
        color: FOOL.color.SPADES,
        value: 10,
        name: '10'
    },
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