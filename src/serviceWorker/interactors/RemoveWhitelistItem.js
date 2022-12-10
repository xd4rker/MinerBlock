/**
 * Remove item from MinerBlock whitelist.
 */
export class RemoveWhitelistItem {
    /** @type{SettingsRepository} */
    #settingsRepo;
    /** @type{string} */
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

        this.#logger.debug('Got settings', 'RemoveWhitelistItem.run', settings);

        if (settings === undefined) {
            return false;
        }

        settings.deleteWhiteListElement(this.#domain);

        this.#settingsRepo.save(settings).then();
    }
}