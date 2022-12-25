export class HandleSetShowCount {
    static EVENT_NAME = 'setShowCount';

    /** @type {import("./../../../interactors/SetShowCount.js").SetShowCount} */
    #setShowCount;
    /** @type {Logger} */
    #logger;

    constructor(setShowCount, logger) {
        this.#setShowCount = setShowCount;
        this.#logger = logger;
    }

    async run(message, sender, sendResponse) {
        if (message.action === HandleSetShowCount.EVENT_NAME && message.showCount !== undefined) {
            this.#logger.debug(
                'Got message setShowCount',
                'serviceWorker.handleSetShowCount',
                message
            );

            const showCountSaved = await this.#setShowCount.run(message.showCount);

            sendResponse(showCountSaved);

            return true;
        }
    }
}