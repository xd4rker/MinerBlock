/**
 * Inject provided files to page.
 */
export class InjectScriptFiles {
    /** @type{Browser} */
    #browser;
    /** @type{GetRunStatus} */
    #getRunStatus;
    /** @type{Logger}  */
    #logger;
    /** @type{GetWhitelistStatus} */
    #getWhitelistStatus;

    constructor(browser, getRunStatus, logger, getWhitelistStatus) {
        this.#browser = browser;
        this.#getRunStatus = getRunStatus;
        this.#logger = logger;
        this.#getWhitelistStatus = getWhitelistStatus;
    }

    /**
     * @param {number} tabId
     * @param {string[]} files
     * @param {string} world
     * @returns {Promise<InjectionResult[]|void>}
     */
    async run(tabId, files, world) {
        const status = await this.#getRunStatus.run()
        const whitelisted = await this.#getWhitelistStatus.run();

        if (status === false || whitelisted === true) {
            return;
        }

        this.#logger.debug('Attempt script execution', 'InjectMinerBlocker.run');

        //TODO: inject minerblocker to all frames?
        const injectionResult = await this.#browser.executeScript(tabId, files, world);

        this.#logger.debug('Attempted script execution', 'InjectMinerBlocker.run', injectionResult);

        return injectionResult;
    }
}