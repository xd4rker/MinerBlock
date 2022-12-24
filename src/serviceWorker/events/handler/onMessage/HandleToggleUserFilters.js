export class HandleToggleUserFilters {
    static EVENT_NAME = 'toggleUserFilters';

    /** @type {import("./../../../interactors/ToggleUserFilters.js").ToggleUserFilters} */
    #toggleUserFilters;
    /** @type {Logger} */
    #logger;

    constructor(toggleUserFilters, logger) {
        this.#toggleUserFilters = toggleUserFilters;
        this.#logger = logger;
    }

    async run(message, sender, sendResponse) {
        if (message.action === HandleToggleUserFilters.EVENT_NAME && message.use !== undefined) {
            this.#logger.debug(
                'Got message toggleUserFilters',
                'serviceWorker.handleToggleUserFilters',
                message
            );

            const toggledUserFilters = await this.#toggleUserFilters.run(message.use);

            sendResponse(toggledUserFilters);

            return true;
        }
    }
}