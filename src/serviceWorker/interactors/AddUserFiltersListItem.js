/**
 * Add user filter item to list.
 */
export class AddUserFiltersListItem {
    /** @type {SettingsRepository} */
    #settingsRepo;
    /** @type{string} */
    #uriPattern;
    /** @type{UserFilters} */
    #userFilter;
    /** @type{Logger} */
    #logger;
    /** @type{Browser} */
    #browser;

    constructor(settingsRepo, uriPattern, userFilter, logger, browser) {
        this.#settingsRepo = settingsRepo;
        this.#uriPattern = uriPattern;
        this.#userFilter = userFilter;
        this.#logger = logger;
        this.#browser = browser;
    }

    async run() {
        const settings = await this.#settingsRepo.findOrCreate();

        await this.#userFilter.set(settings.userFilters);
        const ruleIdsToBeRemoved = await this.#userFilter.getRuleIds();

        const addedElement = settings.addUserFilterElement(this.#uriPattern);

        this.#settingsRepo.save(settings).then();

        if (settings.useUserFilters === false || addedElement === false) {
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