export class HandleMbPause {
    static EVENT_NAME = 'mbPause';

    /** @type {import("./../../interactors/MbPause.js").MbPause} */
    #mbPause;
    /** @type {Logger} */
    #logger;

    constructor(mbPause, logger) {
        this.#mbPause = mbPause;
        this.#logger = logger;
    }

    async run(message, sender, sendResponse) {
        if (message.action === HandleMbPause.EVENT_NAME) {
            this.#logger.debug(
                'Received action mbPause',
                'serviceWorker.handleMbPause',
                message
            );

            const mbPaused = await this.#mbPause.run();

            sendResponse(mbPaused);

            return true;
        }
    }
}