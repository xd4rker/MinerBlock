export class HandleGetShowCount {
    static EVENT_NAME = 'getShowCount';

    /** @type {import("./../../interactors/GetShowCount.js").GetShowCount} */
    #getShowCount;
    /** @type {Logger} */
    #logger;

    constructor(getShowCount, logger) {
        this.#getShowCount = getShowCount;
        this.#logger = logger;
    }

    async run(message, sender, sendResponse) {
        if (message.action === HandleGetShowCount.EVENT_NAME) {
            this.#logger.debug(
                'Got message getShowCount',
                'serviceWorker.handleGetShowCount',
                message
            );

            const showCount = await this.#getShowCount.run();

            sendResponse(showCount);

            return true;
        }
    }
}