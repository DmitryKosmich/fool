(function (FOOL) {
    'use strict';

    /**
     *
     * @constructor
     */
    function UIHelper() {}

    /**
     *
     * A handler for the {@link FOOL.events.uiTypes.UI_SHOW_MESSAGE} event.
     * @param {GameEvent} event game event
     */
    function showMessage(event) {
        var messageElem,
            timeout,
            messageKey = event.getData(),
            id = FOOL.randomizer.generateId(),
            tempElem = document.createElement('div'),
            container = document.querySelector(FOOL.styles.MESSAGE_CONTAINER_SELECTOR);

        tempElem.innerHTML = '<div class="message" id="' + id + '">' + FOOL.messages[messageKey] + '</div>';
        messageElem = tempElem.firstChild;

        timeout = setTimeout(function () {
            messageElem = document.getElementById(id);
            messageElem ? messageElem.parentNode.removeChild(messageElem) : 0;
        }, FOOL.defaults.timeOfShowingMessages);

        FOOL.document.addEventListener(messageElem, 'click', function (event) {
            clearTimeout(timeout);
            showModal(messageKey);
            messageElem.parentNode.removeChild(messageElem);
        });

        container.appendChild(messageElem);

    }

    function showModal(key) {
        FOOL.events.tunnel.sendEvent(new FOOL.events.GameEvent(FOOL.events.uiTypes.UI_SHOW_MODAL, {
            headerMessage: FOOL.messages[key],
            textMessage: FOOL.messagesFull[key],
            buttonMessage: FOOL.messages.OK,
            type: FOOL.modalType.INFO
        }));
    }

    UIHelper.prototype.initialize  = function() {
        var showMessageEventListener = new FOOL.events.EventListener(showMessage);
        FOOL.events.tunnel.addListener(FOOL.events.uiTypes.UI_SHOW_MESSAGE, showMessageEventListener);
    };

    var helper = new UIHelper();
    helper.initialize();

})(FOOL);