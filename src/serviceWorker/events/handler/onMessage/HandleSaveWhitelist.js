export class HandleSaveWhitelist {
    static EVENT_NAME = 'saveWhitelist';
    static MESSAGE_EVENT_WHITE_LIST_UPDATED = 'whiteListUpdated';

    /** @type {import("./../../interactors/SaveWhitelist.js").SaveWhitelist} */
    #saveWhitelist;
    /** @type {Browser} */
    #browser;
    /** @type {Logger} */
    #logger;

    constructor(saveWhitelist, browser, logger) {
        this.#saveWhitelist = saveWhitelist;
        this.#browser = browser;
        this.#logger = logger;
    }

    async run(message, sender, sendResponse) {
        if (message.action === HandleSaveWhitelist.EVENT_NAME && message.domains !== undefined) {
            this.#logger.debug(
                'Got message saveWhitelist',
                'serviceWorker.handleSaveWhitelist',
                message
            );

            const whitelistSaved = await this.#saveWhitelist.run(message.domains);

            sendResponse(whitelistSaved);

            //if settings page open, it receives this event
            this.#browser.sendMessage({event: HandleSaveWhitelist.MESSAGE_EVENT_WHITE_LIST_UPDATED})
                .then()
                .catch((err) => {
                    this.#logger.debug(
                        err.message,
                        'serviceWorker.onMessage.handleSaveWhitelist'
                    );
                });

            return true;
        }
    }
}