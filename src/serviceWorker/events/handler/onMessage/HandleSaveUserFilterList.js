export class HandleSaveUserFilterList {
    static EVENT_NAME = 'saveUserFilterList';

    /** @type {import("./../../interactors/SaveUserFilterList.js").SaveUserFilterList} */
    #saveUserFilterList;
    /** @type {Logger} */
    #logger;

    constructor(saveUserFilterList, logger) {
        this.#saveUserFilterList = saveUserFilterList;
        this.#logger = logger;
    }

    async run(message, sender, sendResponse) {
        if (message.action === HandleSaveUserFilterList.EVENT_NAME && message.uriPattern !== undefined) {
            this.#logger.debug(
                'Got message saveUserFilterList',
                'serviceWorker.handleSaveUserFilterList',
                message
            );

            const userFilterListSaved = await this.#saveUserFilterList.run(message.uriPattern);

            sendResponse(userFilterListSaved);

            return true;
        }
    }
}