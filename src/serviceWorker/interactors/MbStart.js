export class MbStart {
    /** @type{SettingsRepository} */
    #settingsRepo;
    /** @type{InitBrowser} */
    #initBrowser;
    /** @type{RegisterMinerBlocker} */
    #registerMinerBlocker;

    constructor(settingsRepo, registerMinerBlocker, initBrowser) {
        this.#settingsRepo = settingsRepo;
        this.#initBrowser = initBrowser;
        this.#registerMinerBlocker = registerMinerBlocker;
    }

    /**
     * @returns {Promise<void|boolean>}
     */
    async run() {
        const settings = await this.#settingsRepo.findOrCreate();

        settings.setRunStatus(true);

        const settingsSaved = await this.#settingsRepo.save(settings);

        if (settingsSaved === false) {
            return false;
        }

        await this.#registerMinerBlocker.run();

        return await this.#initBrowser.run();
    }
}