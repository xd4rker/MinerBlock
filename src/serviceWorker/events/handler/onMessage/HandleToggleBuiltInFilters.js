export class HandleToggleBuiltInFilters {
    static EVENT_NAME = 'toggleBuiltInFilters';

    /** @type {import("./../../../interactors/ToggleBuiltInFilters.js").ToggleBuiltInFilters} */
    #toggleBuiltInFilters;
    /** @type {Logger} */
    #logger;

    constructor(toggleBuiltInFilters, logger) {
        this.#toggleBuiltInFilters = toggleBuiltInFilters;
        this.#logger = logger;
    }

    async run(message, sender, sendResponse) {
        if (message.action === HandleToggleBuiltInFilters.EVENT_NAME && message.use !== undefined) {
            this.#logger.debug(
                'Got message toggleBuiltInFilters',
                'serviceWorker.handleToggleBuiltInFilters',
                message
            );

            const toggledBuiltInFilters = await this.#toggleBuiltInFilters.run(message.use);

            sendResponse(toggledBuiltInFilters);

            return true;
        }
    }
}