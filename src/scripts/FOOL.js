var FOOL = {
    classes: {},
    currentGame: null,
    robot: {},
    uiBuilder: {},
    color: {
        CROSSES: 1,
        HEARTS: 2,
        SPADES: 3,
        DIAMONDS: 4
    },
    events: {
        types: {
            READY_TO_START: 0,
            GAME_STARTED: 1,
            TRUMP_SELECTED: 2,
            GAME_FINISHED: 3,
            BOUT_STARTED: 10,
            BOUT_ENDED_DEFENDER_SUCCEED: 11,
            BOUT_ENDED_ATTACKER_SUCCEED: 12,
            ATTACKER_FINISHED: 20,
            GET_CARD: 30,
            TOSS_CARD: 31,
            SEND_TO_RETREAT: 32,
            PULL: 33
        }
    }
};

FOOL.defaults = {
    playerName: 'User',
    playersNumber: 2
};

FOOL.pack = [
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