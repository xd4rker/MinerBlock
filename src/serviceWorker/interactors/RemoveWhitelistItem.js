/**
 * Remove item from MinerBlock whitelist.
 */
export class RemoveWhitelistItem {
    /** @type{SettingsRepository} */
    #settingsRepo;
    /** @type{Logger} */
    #logger;

    constructor(settingsRepo, logger) {
        this.#settingsRepo = settingsRepo;
        this.#logger = logger;
    }

    /**
     * @param {string} domain
     * @returns {Promise<boolean|null>}
     */
    async run(domain) {
        const settings = await this.#settingsRepo.findOrCreate();

        this.#logger.debug('Got settings', 'RemoveWhitelistItem.run', settings);

        if (settings.whiteList.length === 0) {
            return null;
        }

        const deletedWhiteListElement = settings.deleteWhiteListElement(domain)

        if (deletedWhiteListElement === false || deletedWhiteListElement === null) {
            return deletedWhiteListElement;
        }

        return await this.#settingsRepo.save(settings);
    }
}