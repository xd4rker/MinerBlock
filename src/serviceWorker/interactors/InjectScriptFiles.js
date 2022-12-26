/**
 * Inject provided files to page.
 */
export class InjectScriptFiles {
    /** @type{Browser} */
    #browser;
    /** @type{Logger}  */
    #logger;

    constructor(browser, logger) {
        this.#browser = browser;
        this.#logger = logger;
    }

    /**
     * @param {number} tabId
     * @param {string[]} files
     * @param {string} world
     * @returns {Promise<InjectionResult[]|void>}
     */
    async run(tabId, files, world) {
        this.#logger.debug('Attempt script execution', 'InjectMinerBlocker.run');

        //TODO: inject minerblocker to all frames?
        //TODO: how to identify ERR_BLOCKED_BY_CLIENT page and not to try injecting
        try {
            const injectionResult = await this.#browser.executeScript(tabId, files, world);

            this.#logger.debug('Attempted script execution', 'InjectMinerBlocker.run', injectionResult);

            return injectionResult;
        }
        catch (e) {
            this.#logger.error('Error occurred while attempting to inject script', 'InjectMinerBlocker.run', e.toString());
        }
    }
}