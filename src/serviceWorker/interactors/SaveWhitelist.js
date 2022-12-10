/**
 * Save MinerBlock whitelist.
 */
export class SaveWhitelist {
    /** @type{SettingsRepository} */
    #settingsRepo;
    /** @type{Logger} */
    #logger;

    constructor(settingsRepo, logger) {
        this.#settingsRepo = settingsRepo;
        this.#logger = logger;
    }

    /**
     * @param {string[]} domains
     * @returns {Promise<boolean>}
     */
    async run(domains) {
        const settings = await this.#settingsRepo.findOrCreate();

        this.#logger.debug('Got settings', 'SaveWhitelist.run', settings);

        //TODO: calc diff and only reload specific tabs

        settings.whiteList = domains;

        return this.#settingsRepo.save(settings);
    }
}