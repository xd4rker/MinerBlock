export class MbStart {
    /** @type{SettingsRepository} */
    #settingsRepo;
    /** @type{InitBrowser} */
    #initBrowser;

    constructor(settingsRepo, initBrowser) {
        this.#settingsRepo = settingsRepo;
        this.#initBrowser = initBrowser;
    }

    async run() {
        const settings = await this.#settingsRepo.findOrCreate();

        settings.setRunStatus(true);

        await this.#settingsRepo.save(settings);

        this.#initBrowser.run().then();
    }
}