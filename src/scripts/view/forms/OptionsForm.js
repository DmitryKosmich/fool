(function (FOOL, document) {
    'use strict';

    /**
     *
     * @constructor
     */
    function OptionsForm() {
        this.data = null;
    }

    /**
     *
     * @returns {boolean}
     */
    OptionsForm.prototype.save = function () {
        var data = this.getData();
        if (!isValidPlayersNumber(data.playersNumber)) {
            alert('Введено некорректное значение колличества игроков. Оно должно быть больше 1 и меньше 7');
            return false;
        }

        if (!isValidCardsNumber(data.startCardsNumber, data.playersNumber)) {
            alert('Введено некорректное значение начального колличества карт. Оно должно быть больше 0 и меньше ' +  (52 / data.playersNumber).toFixed(0) + '!');
            return false;
        }

        FOOL.defaults = data;

        return true;
    };

    function isValidPlayersNumber(playersNumber) {
        var value = +playersNumber;
        return !isNaN(value) && value > 1 && value < 7;
    }

    function isValidCardsNumber(startCardsNumber, playersNumber) {
        var value = +startCardsNumber;
        return !isNaN(value) && value > 0 && (value < 52 / playersNumber);
    }

    /**
     *
     * @returns {{}}
     */
    OptionsForm.prototype.getData = function () {
        var i, result = {}, form = document.getElementById('options_form'),
            length = form ? form.length - 1 : 0;
        for (i = 0; i < length; i += 1) {
            result[form[i].name] = form[i].value;
        }
        return result;
    };

    OptionsForm.prototype.fill = function (data) {
        var key, form = document.getElementById('options_form');
        for (key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key) && form.elements[key]) {
                form.elements[key].value = data[key];
            }
        }
    };

    FOOL.forms.OptionsForm = new OptionsForm();

})(FOOL, document);