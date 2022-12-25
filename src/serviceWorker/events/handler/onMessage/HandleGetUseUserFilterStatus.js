export class HandleGetUseUserFilterStatus {
    static EVENT_NAME = 'getUseUserFiltersStatus';

    /** @type {import("./../../interactors/GetUseUserFilterStatus.js").GetUseUserFilterStatus} */
    #getUseUserFilterStatus;
    /** @type {Logger} */
    #logger;

    constructor(getUseUserFilterStatus, logger) {
        this.#getUseUserFilterStatus = getUseUserFilterStatus;
        this.#logger = logger;
    }

    async run(message, sender, sendResponse) {
        if (message.action === HandleGetUseUserFilterStatus.EVENT_NAME) {
            this.#logger.debug(
                'Got message getUseUserFiltersStatus',
                'serviceWorker.handleGetUseUserFiltersStatus',
                message
            );
            const useUserFilterStatus = await this.#getUseUserFilterStatus.run();

            sendResponse(useUserFilterStatus);

            return true;
        }
    }
}