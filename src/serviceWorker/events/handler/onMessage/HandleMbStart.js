export class HandleMbStart {
    static EVENT_NAME = 'mbStart';

    /** @type {import("./../../interactors/MbStart.js").MbStart} */
    #mbStart;
    /** @type {Logger} */
    #logger;

    constructor(mbStart, logger) {
        this.#mbStart = mbStart;
        this.#logger = logger;
    }

    async run(message, sender, sendResponse) {
        if (message.action === HandleMbStart.EVENT_NAME) {
            const mbStartResult = await this.#mbStart.run();

            if (mbStartResult === false) {
                return false;
            }

            sendResponse(mbStartResult);

            return true;
        }
    }
}