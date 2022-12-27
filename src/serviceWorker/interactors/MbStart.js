export class MbStart {
    /** @type{SettingsRepository} */
    #settingsRepo;
    /** @type{InitBrowser} */
    #initBrowser;

    constructor(settingsRepo, initBrowser) {
        this.#settingsRepo = settingsRepo;
        this.#initBrowser = initBrowser;
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

        return await this.#initBrowser.run();
    }
}