'use strict';

document.addEventListener('DOMContentLoaded', function () {
    logger.debug('Initiate', 'popUp.main.js');

    const popup = new PopUp(_browser);

    popup.init().then();
});