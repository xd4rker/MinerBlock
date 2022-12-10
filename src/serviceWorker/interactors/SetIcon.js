/**
 * Set the extensions icon.
 */
export class SetIcon {
    /** @type{SettingsRepository} */
    #settingsRepository;
    /** @type{Browser} */
    #browser;
    /** @type{Visuals} */
    #visuals;

    constructor(settingsRepository, browser, visuals) {
        this.#settingsRepository = settingsRepository;
        this.#browser = browser;
        this.#visuals = visuals;
    }

    /**
     * @returns {Promise<void>}
     */
    async run() {
        const runStatus = await this.#settingsRepository.getRunStatus();

        const iconPath = runStatus ? this.#visuals.constructor.startIconPath : this.#visuals.constructor.pauseIconPath;

        await this.#browser.setIcon(iconPath);
    }
}