export class HandleGetUserFilterList {
    static EVENT_NAME = 'getUserFilterList';

    /** @type {import("./../../../interactors/GetUserFilterList.js").GetUserFilterList} */
    #getUserFilterList;
    /** @type {Logger} */
    #logger;

    constructor(getUserFilterList, logger) {
        this.#getUserFilterList = getUserFilterList;
        this.#logger = logger;
    }

    async run(message, sender, sendResponse) {
        if (message.action === HandleGetUserFilterList.EVENT_NAME) {
            this.#logger.debug(
                'Got message getUserFilterList',
                'serviceWorker.handleGetUserFilterList',
                message
            );

            const userFilterList = await this.#getUserFilterList.run();

            sendResponse(userFilterList);

            return true;
        }
    }
}