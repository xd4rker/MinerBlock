/**
 * Add domain for which MinerBlock should not be activated.
 */
export class AddWhitelistItem {
    /** @type {SettingsRepository} */
    #settingsRepo;
    /** @type{Logger} */
    #logger;

    constructor(settingsRepo, logger) {
        this.#settingsRepo = settingsRepo;
        this.#logger = logger;
    }

    /**
     * @param {string} domain
     * @returns {Promise<boolean>}
     */
    async run(domain) {
        const settings = await this.#settingsRepo.findOrCreate();

        this.#logger.debug('Got settings', 'AddWhitelistItem.run', settings);

        const addedElement = settings.addWhiteListElement(domain);

        if (addedElement === false) {
            return false;
        }

        return await this.#settingsRepo.save(settings);
    }
}