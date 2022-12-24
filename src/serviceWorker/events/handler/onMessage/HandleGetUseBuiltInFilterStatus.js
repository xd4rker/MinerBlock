export class HandleGetUseBuiltInFilterStatus {
    static EVENT_NAME = 'getUseBuiltInFiltersStatus';

    /** @type {import("./../../interactors/GetUseBuiltInFiltersStatus.js").GetUseBuiltInFiltersStatus} */
    #getUseBuiltInFiltersStatus;
    /** @type {Logger} */
    #logger;

    constructor(getUseBuiltInFiltersStatus, logger) {
        this.#getUseBuiltInFiltersStatus = getUseBuiltInFiltersStatus;
        this.#logger = logger;
    }

    async run(message, sender, sendResponse) {
        if (message.action === HandleGetUseBuiltInFilterStatus.EVENT_NAME) {
            this.#logger.debug(
                'Got message getUseBuiltInFiltersStatus',
                'serviceWorker.handleGetUseBuiltInFiltersStatus',
                message
            );

            const useBuiltInFiltersStatus = await this.#getUseBuiltInFiltersStatus.run();

            sendResponse(useBuiltInFiltersStatus);

            return true;
        }
    }
}