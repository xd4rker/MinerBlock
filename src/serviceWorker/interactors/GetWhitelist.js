/**
 * Get list of domains for which MinerBlock should not run.
 */
export class GetWhitelist {
    /** @type{SettingsRepository} */
    #settingsRepo;
    /** @type{Logger} */
    #logger;

    constructor(settingsRepo, logger) {
        this.#settingsRepo = settingsRepo;
        this.#logger = logger;
    }

    async run() {
        const settings = await this.#settingsRepo.findOrCreate();

        const whitelist = settings.whiteList ?? null;

        this.#logger.debug('Got whitelist', 'GetWhitelist', whitelist);

        return whitelist;
    }
}