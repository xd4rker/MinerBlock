/**
 * Set MinerBlock settings run attribute to pause.
 */
export class MbPause {
    /** @type{SettingsRepository} */
    #settingsRepo;

    /** @type{SetIcon} */
    #setIcon;

    /** @type{Logger} */
    #logger;

    constructor(settingsRepo, setIcon, logger) {
        this.#settingsRepo = settingsRepo;
        this.#setIcon = setIcon;
        this.#logger = logger;
    }

    /**
     * @returns {Promise<void>}
     */
    async run() {
        const settings = await this.#settingsRepo.findOrCreate();

        settings.setRunStatus(false);
        await this.#settingsRepo.save(settings);
        this.#logger.debug('Save settings', 'MbPause.run', settings);

        await this.#setIcon.run();
    }
}