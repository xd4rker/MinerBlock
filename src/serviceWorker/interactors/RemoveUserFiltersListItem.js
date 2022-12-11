/**
 * Remove one item from the user filter list. This url pattern will be removed from internal browser filter list too.
 */
export class RemoveUserFiltersListItem {
    /** @type{SettingsRepository} */
    #settingsRepo;
    /** @type{string} */
    #uriPattern;
    /** @type{Logger} */
    #logger;
    /** @type{Browser} */
    #browser;
    /** @type{UserFilters} */
    #userFilter;

    constructor(settingsRepo, uriPattern, logger, browser, userFilter) {
        this.#settingsRepo = settingsRepo;
        this.#uriPattern = uriPattern;
        this.#logger = logger;
        this.#browser = browser;
        this.#userFilter = userFilter;
    }

    async run() {
        const settings = await this.#settingsRepo.findOrCreate();

        await this.#userFilter.set(settings.userFilters);
        const ruleIdsToBeRemoved = await this.#userFilter.getRuleIds();

        settings.removeUserFilterElement(this.#uriPattern);

        this.#settingsRepo.save(settings).then();

        if (settings.useUserFilters === false) {
            return;
        }

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