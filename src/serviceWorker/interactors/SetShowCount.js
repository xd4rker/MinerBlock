/**
 * Set if count of blocked miners shall be shown.
 *
 * Used for Pop-up.
 */
export class SetShowCount {
    /** @type{SettingsRepository} */
    #settingsRepo;
    /** @type{Logger} */
    #logger;

    constructor(settingsRepo, logger) {
        this.#settingsRepo = settingsRepo;
        this.#logger = logger;
    }

    /**
     * @param {boolean} showCount
     * @returns {Promise<boolean>}
     */
    async run(showCount) {
        const settings = await this.#settingsRepo.findOrCreate();

        settings.setShowCount(showCount);

        this.#logger.debug('Set showCount', 'SetShowCount.run', showCount);

        return await this.#settingsRepo.save(settings);
    }
}