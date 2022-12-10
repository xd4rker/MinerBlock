/**
 * Add domain for which MinerBlock should not be activated.
 */
export class AddWhitelistItem {
    /** @type {SettingsRepository} */
    #settingsRepo;
    /** @type {string} */
    #domain;
    /** @type{Logger} */
    #logger;

    constructor(settingsRepo, domain, logger) {
        this.#settingsRepo = settingsRepo;
        this.#domain = domain;
        this.#logger = logger;
    }

    async run() {
        const settings = await this.#settingsRepo.findOrCreate();

        this.#logger.debug('Got settings', 'AddWhitelistItem.run', settings);

        const addedElement = settings.addWhiteListElement(this.#domain);

        if (addedElement === false) {
            return false;
        }

        await this.#settingsRepo.save(settings);
    }
}