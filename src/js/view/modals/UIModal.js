(function (FOOL) {
    'use strict';

    /**
     *
     * @constructor
     */
    function UIModal() {}

    /**
     *
     * @param {GameEvent} event
     */
    function showModal(event) {
        var modal = document.querySelector(FOOL.styles.MODAL_SELECTOR),
            header = modal.querySelector(FOOL.styles.MODAL_HEADER_SELECTOR),
            text = modal.querySelector(FOOL.styles.MODAL_TEXT_SELECTOR),
            image = modal.querySelector(FOOL.styles.MODAL_IMAGE_SELECTOR),
            button = modal.querySelector(FOOL.styles.MODAL_BUTTON_SELECTOR),
            data = event.getData();
//            callback = event.getCallback();

        header.innerHTML = data.headerMessage || '';
        text.innerHTML = data.textMessage || '';
        button.innerHTML = data.buttonMessage;
        if (data.image) {
            FOOL.document.removeClass(image, FOOL.styles.MODAL_IMAGE_HIDE);
        } else {
            FOOL.document.addClass(image, FOOL.styles.MODAL_IMAGE_HIDE);
        }

        FOOL.document.removeEventListener(button, 'click');
        FOOL.document.addEventListener(button, 'click', function (e) {
//            callback ? callback() : 0;
            FOOL.document.removeClass(modal, FOOL.styles.MODAL_SHOW_CLASS);
            FOOL.document.addClass(modal, FOOL.styles.MODAL_HIDE_CLASS);
        });

        FOOL.document.removeClass(modal, FOOL.styles.MODAL_HIDE_CLASS);
        FOOL.document.addClass(modal, FOOL.styles.MODAL_SHOW_CLASS);
    }

    UIModal.prototype.initialize = function () {
        var showModalEventListener = new FOOL.events.EventListener(showModal);
        FOOL.events.tunnel.addListener(FOOL.events.uiTypes.UI_SHOW_MODAL, showModalEventListener);
    };

    var uiStartGameModal = new UIModal();
    uiStartGameModal.initialize();

})(FOOL);