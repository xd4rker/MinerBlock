'use strict';

const logger = new Logger(Logger.LEVEL_DEBUG);
const _browser = new Browser(new Chrome());

document.addEventListener('DOMContentLoaded', function () {
    logger.debug('Initiate', 'popUp.Dispatcher.js');

    const popup = new PopUp(_browser);

    popup.init().then();
});