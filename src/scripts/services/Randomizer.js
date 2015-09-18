(function (FOOL) {
    'use strict';

    /**
     *
     * @constructor
     */
    function Randomizer() {}

    /**
     * This method should mix the pack
     * @param {FOOL.classes.Game} game
     */
    Randomizer.prototype.shufflePack = function (game) {
        var pack = game.getPack();
        //todo: this method should mix the pack
    };

    FOOL.engine = new Randomizer();

})(FOOL);