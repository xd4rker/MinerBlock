export class HandleMbStart {
    static EVENT_NAME = 'mbStart';

    /** @type {import("./../../interactors/MbStart.js").MbStart} */
    #mbStart;
    /** @type {Logger} */
    #logger;
    /** @type {ResetMinerBlockerRegistration} */
    #resetMinerBlockerRegistration;

    constructor(mbStart, resetMinerBlockerRegistration, logger) {
        this.#mbStart = mbStart;
        this.#logger = logger;
        this.#resetMinerBlockerRegistration = resetMinerBlockerRegistration;
    }

    async run(message, sender, sendResponse) {
        if (message.action === HandleMbStart.EVENT_NAME) {
            const mbStartResult = await this.#mbStart.run();

            if (mbStartResult === false) {
                return false;
            }

            await this.#resetMinerBlockerRegistration.run();

            sendResponse(mbStartResult);

            return true;
        }
    }
}