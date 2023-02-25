'use strict';

const context = ContextLoader.getInstance();

const dispatcher = new Dispatcher(
    context.logger,
    context.browser,
    window,
    navigator
);
dispatcher.init();