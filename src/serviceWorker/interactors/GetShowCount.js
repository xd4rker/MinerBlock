/**
 * Get the count of miners being blocked
 */
export class GetShowCount {
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

        const showCount = settings.showCount ?? null;

        this.#logger.debug('Got showCount', 'GetShowCount', showCount);

        return showCount;
    }
}