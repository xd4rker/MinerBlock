export class HandleGetWhitelist {
    static EVENT_NAME = 'getWhitelist';

    /** @type {import("./../../interactors/GetWhitelist.js").GetWhitelist} */
    #getWhitelist;
    /** @type {Logger} */
    #logger;

    constructor(getWhitelist, logger) {
        this.#getWhitelist = getWhitelist;
        this.#logger = logger;
    }

    async run(message, sender, sendResponse) {
        if (message.action === HandleGetWhitelist.EVENT_NAME) {
            this.#logger.debug(
                'Received action getWhitelist',
                'serviceWorker.handleGetWhitelist',
                message
            );

            const whitelist = await this.#getWhitelist.run();

            sendResponse(whitelist);

            return true;
        }
    }
}