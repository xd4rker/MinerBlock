export class HandleMbPause {
    static EVENT_NAME = 'mbPause';

    /** @type {import("./../../interactors/MbPause.js").MbPause} */
    #mbPause;
    /** @type {Logger} */
    #logger;
    /** @type {ResetMinerBlockerRegistration} */
    #resetMinerBlockerRegistration;

    constructor(mbPause, resetMinerBlockerRegistration, logger) {
        this.#mbPause = mbPause;
        this.#logger = logger;
        this.#resetMinerBlockerRegistration = resetMinerBlockerRegistration;
    }

    async run(message, sender, sendResponse) {
        if (message.action === HandleMbPause.EVENT_NAME) {
            this.#logger.debug(
                'Received action mbPause',
                'serviceWorker.handleMbPause',
                message
            );

            const mbPaused = await this.#mbPause.run();

            if (mbPaused === false) {
                return false;
            }

            await this.#resetMinerBlockerRegistration.run();

            sendResponse(mbPaused);

            return true;
        }
    }
}