(function (FOOL) {
    'use strict';

    /**
     *
     * @constructor
     */
    function UIStartGameModal() {}

    /**
     *
     * @param {GameEvent} event
     */
    function showModal(event) {
        var modal = document.querySelector('.modal'),
            text = modal.querySelector('.modal__body__text'),
            button = modal.querySelector('.modal__body__button'),
            data = event.getData();
//            callback = event.getCallback();

        text.innerHTML =  data.textMessage;
        button.innerHTML = data.buttonMessage;

        FOOL.document.removeEventListener(button, 'click');
        FOOL.document.addEventListener(button, 'click', function (e) {
//            callback ? callback() : 0;
            FOOL.document.removeClass(modal, 'modal_show');
            FOOL.document.addClass(modal, 'modal_hide');
        });

        FOOL.document.removeClass(modal, 'modal_hide');
        FOOL.document.addClass(modal, 'modal_show');
    }

    UIStartGameModal.prototype.initialize = function () {
        var showModalEventListener = new FOOL.events.EventListener(showModal);
        FOOL.events.tunnel.addListener(FOOL.events.uiTypes.UI_SHOW_MODAL, showModalEventListener);
    };

    var uiStartGameModal = new UIStartGameModal();
    uiStartGameModal.initialize();

})(FOOL);