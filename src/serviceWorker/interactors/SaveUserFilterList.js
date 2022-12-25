/**
 * Save MinerBlock user filter list.
 */
export class SaveUserFilterList {
    /** @type{SettingsRepository} */
    #settingsRepo;
    /** @type{UserFilters} */
    #userFilter;
    /** @type{Logger} */
    #logger;
    /** @type{Browser} */
    #browser;

    constructor(settingsRepo, userFilter, logger, browser) {
        this.#settingsRepo = settingsRepo;
        this.#userFilter = userFilter;
        this.#logger = logger;
        this.#browser = browser;
    }

    /**
     * @param {string[]} uriPattern
     * @returns {Promise<void|boolean>}
     */
    async run(uriPattern) {
        const settings = await this.#settingsRepo.findOrCreate();

        this.#logger.debug('Got settings', 'SaveUserFilterList.run', settings);

        await this.#userFilter.set(settings.userFilters);
        const ruleIdsToBeRemoved = await this.#userFilter.getRuleIds();

        //TODO: calc diff and only reload specific tabs

        settings.userFilters = uriPattern;

        const settingsSaved = this.#settingsRepo.save(settings).then();

        if (settingsSaved === false) {
           return false;
        }

        if (settings.useUserFilters === false) {
            return false;
        }

        await this.#userFilter.set(settings.userFilters);

        const rulesToBeAdded = await this.#userFilter.getRules();

        this.#logger.debug(
            'I remove dynamic rules',
            'ToggleUserFilters.run',
            ruleIdsToBeRemoved
        );

        this.#logger.debug(
            'I update dynamic rules',
            'ToggleUserFilters.run',
            rulesToBeAdded
        );

        return this.#browser.removeAndAddDynamicRule(ruleIdsToBeRemoved, rulesToBeAdded);
    }
}