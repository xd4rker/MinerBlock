export class HandleRemoveWhitelistItem {
    static EVENT_NAME = 'removeWhitelistItem';
    static MESSAGE_EVENT_WHITE_LIST_UPDATED = 'whiteListUpdated';

    /** @type {import("./../../interactors/RemoveWhitelistItem.js").RemoveWhitelistItem} */
    #removeWhitelistItem;
    /** @type {Browser} */
    #browser;
    /** @type {Logger} */
    #logger;

    constructor(removeWhitelistItem, browser, logger) {
        this.#removeWhitelistItem = removeWhitelistItem;
        this.#browser = browser;
        this.#logger = logger;
    }

    async run(message, sender, sendResponse) {
        if (message.action === HandleRemoveWhitelistItem.EVENT_NAME && message.domain !== undefined) {
            this.#logger.debug(
                'Got message removeWhitelistItem',
                'serviceWorker.handleRemoveWhitelistItem',
                message
            );

            const removedWhitelistItem = await this.#removeWhitelistItem.run(message.domain);

            sendResponse(removedWhitelistItem);

            this.#browser.sendMessage({event: HandleRemoveWhitelistItem.MESSAGE_EVENT_WHITE_LIST_UPDATED})
                .then()
                .catch((err) => {
                    this.#logger.debug(
                        err.message,
                        'serviceWorker.onMessage.handleRemoveWhitelistItem'
                    );
                });

            return true;
        }
    }
}