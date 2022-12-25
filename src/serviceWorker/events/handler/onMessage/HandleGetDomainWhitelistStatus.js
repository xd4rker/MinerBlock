export class HandleGetDomainWhitelistStatus {
    static EVENT_NAME = 'getDomainWhitelistStatus';

    /** @type {import("./../../../interactors/GetWhitelistStatus.js").GetWhitelistStatus} */
    #getWhitelistStatus;
    /** @type {Logger} */
    #logger;

    constructor(getWhitelistStatus, logger) {
        this.#getWhitelistStatus = getWhitelistStatus;
        this.#logger = logger;
    }

    async run(message, sender, sendResponse) {
        if (message.action === HandleGetDomainWhitelistStatus.EVENT_NAME && message.domain !== undefined) {
            this.#logger.debug(
                'Received action mb getWhitelistStatus',
                'serviceWorker.handleGetDomainWhitelistStatus',
                message
            );

            const status = await this.#getWhitelistStatus.run(message.domain);
            sendResponse(status);

            return true;
        }
    }
}