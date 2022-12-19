export class GetRunStatus {
    static EVENT_NAME = 'getRunStatus';

    /** @var {import("./../../interactors/GetRunStatus.").GetRunStatus} */
    #getRunStatus;
    /** @var {Logger} */
    #logger;

    constructor(getRunStatus, logger) {
        this.#getRunStatus = getRunStatus;
        this.#logger = logger;
    }

    async handle(message, sender, sendResponse) {
        if (message.action === GetRunStatus.EVENT_NAME) {
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