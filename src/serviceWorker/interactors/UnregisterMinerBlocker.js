export class UnregisterMinerBlocker {
    /** @type{string} */
    static id = 'wx5xgw6j4w4whe3r34tvw4xu4';
    /** @type{Logger} */
    #logger;
    /** @type{Browser} */
    #browser;

    constructor(browser, logger) {
        this.#logger = logger;
        this.#browser = browser;
    }

    async run() {
        this.#logger.debug(
            'About to unregister minerBlock',
            'UnregisterMinerBlocker.run',
            UnregisterMinerBlocker.id
        );

        try {
            await this.#browser.unregisterContentScripts([UnregisterMinerBlocker.id]);

            return true;
        } catch(e) {
            return false;
        }
    }
}