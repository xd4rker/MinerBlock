'use strict';

const logger = new Logger(Logger.LEVEL_DEBUG);
const _browser = new Browser(new Chrome());

document.addEventListener('DOMContentLoaded', function () {
    const options = new Options(_browser);

    options.init().then();
});