export class HandleGetRunStatus {
    static EVENT_NAME = 'getRunStatus';

    /** @type {import("./../../interactors/GetRunStatus").GetRunStatus} */
    #getRunStatus;
    /** @type {Logger} */
    #logger;

    constructor(getRunStatus, logger) {
        this.#getRunStatus = getRunStatus;
        this.#logger = logger;
    }

    async run(message, sender, sendResponse) {
        if (message.action === HandleGetRunStatus.EVENT_NAME) {
            this.#logger.debug(
                'Got message getRunStatus',
                'serviceWorker.handleGetRunStatus',
                message
            );

            const getRunStatus = this.#getRunStatus;
            const status = await getRunStatus.run();

            sendResponse(status);

            return true;
        }
    }
}