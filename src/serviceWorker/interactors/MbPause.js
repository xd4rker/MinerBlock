/**
 * Set MinerBlock settings run attribute to pause.
 */
export class MbPause {
    /** @type{SettingsRepository} */
    #settingsRepo;
    /** @type{UnregisterMinerBlocker} */
    #unregisterMinerBlocker;

    /** @type{SetIcon} */
    #setIcon;

    /** @type{Logger} */
    #logger;

    constructor(settingsRepo, unregisterMinerBlocker, setIcon, logger) {
        this.#settingsRepo = settingsRepo;
        this.#unregisterMinerBlocker = unregisterMinerBlocker;
        this.#setIcon = setIcon;
        this.#logger = logger;
    }

    /**
     * @returns {Promise<void|boolean>}
     */
    async run() {
        const settings = await this.#settingsRepo.findOrCreate();

        settings.setRunStatus(false);

        this.#logger.debug('Save settings', 'MbPause.run', settings);

        const settingsSaved = await this.#settingsRepo.save(settings);

        this.#logger.debug('Saved settings', 'MbPause.run', settingsSaved);

        if (settingsSaved === false) {
           return false;
        }

        await this.#unregisterMinerBlocker.run()

        return await this.#setIcon.run();
    }
}