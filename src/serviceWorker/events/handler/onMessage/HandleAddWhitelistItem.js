export class HandleAddWhitelistItem {
    static EVENT_NAME = 'addWhitelistItem';
    static MESSAGE_EVENT_WHITE_LIST_UPDATED = 'whiteListUpdated';

    /** @type {import("./../../interactors/AddWhitelistItem.js").AddWhitelistItem} */
    #addWhitelistItem;
    /** @type {Browser} */
    #browser;
    /** @type {Logger} */
    #logger;

    constructor(addWhitelistItem, browser, logger) {
        this.#addWhitelistItem = addWhitelistItem;
        this.#browser = browser;
        this.#logger = logger;
    }

    async run(message, sender, sendResponse) {
        if (message.action === HandleAddWhitelistItem.EVENT_NAME && message.domain !== undefined) {
            this.#logger.debug(
                'Received action addWhitelistItem',
                'serviceWorker.handleAddWhitelistItem',
                message
            );

            const addedWhitelistItem = await this.#addWhitelistItem.run(message.domain);

            sendResponse(addedWhitelistItem);

            this.#browser.sendMessage({event: HandleAddWhitelistItem.MESSAGE_EVENT_WHITE_LIST_UPDATED})
                .then()
                .catch((err) => {
                    this.#logger.debug(
                        err.message,
                        'serviceWorker.onMessage.handleAddWhitelistItem'
                    );
                });

            return true;
        }
    }
}