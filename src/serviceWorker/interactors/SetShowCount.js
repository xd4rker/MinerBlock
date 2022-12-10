/**
 * Set if count of blocked miners shall be shown.
 *
 * Used for Pop-up.
 */
export class SetShowCount {
    /** @type{SettingsRepository} */
    #settingsRepo;
    /** @type{boolean} */
    #showCount;
    /** @type{Logger} */
    #logger;

    constructor(settingsRepo, showCount, logger) {
        this.#settingsRepo = settingsRepo;
        this.#showCount = showCount;
        this.#logger = logger;
    }

    async run() {
        const settings = await this.#settingsRepo.findOrCreate();

        settings.setShowCount(this.#showCount);

        this.#logger.debug('Set showCount', 'SetShowCount.run', this.#showCount);

        await this.#settingsRepo.save(settings);
    }
}