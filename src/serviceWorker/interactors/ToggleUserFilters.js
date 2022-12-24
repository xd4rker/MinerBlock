/**
 * Activated/Deactivate user filters.
 */
export class ToggleUserFilters {
    /** @type{SettingsRepository} */
    #settingsRepository;
    /** @type{Browser} */
    #browser;
    /** @type{Logger} */
    #logger;
    /** @type{UserFilters} */
    #userFilters;

    constructor(settingsRepository, browser, logger, userFilters) {
        this.#settingsRepository = settingsRepository;
        this.#browser = browser;
        this.#logger = logger;
        this.#userFilters = userFilters;
    }

    /**
     * @param {boolean} toggle
     * @returns {Promise<void>}
     */
    async run(toggle) {
        const settings = await this.#settingsRepository.findOrCreate();

        this.#logger.debug(
            'Have userFilters from settings',
            `${this.constructor.name}.run`,
            settings.userFilters
        );

        await this.#userFilters.set(settings.userFilters);

        this.#logger.debug(
            'Have toggle',
            `${this.constructor.name}.run`,
            toggle
        );

        this.#logger.debug(
            'Have loaded filters',
            `${this.constructor.name}.run`,
            this.#userFilters.filters
        );

        settings.setUseUserFilters(toggle);

        const savedSettings = await this.#settingsRepository.save(settings);

        if (savedSettings === false) {
            return;
        }

        const ruleIdsToBeRemoved = await this.#userFilters.getRuleIds();

        if (toggle === true && this.#userFilters.filters.length > 0) {
            const rulesToBeAdded = await this.#userFilters.getRules();

            this.#logger.debug(
                'I remove dynamic rules',
                `${this.constructor.name}.run`,
                ruleIdsToBeRemoved
            );

            this.#logger.debug(
                'I update dynamic rules',
                `${this.constructor.name}.run`,
                rulesToBeAdded
            );

            return this.#browser.removeAndAddDynamicRule(ruleIdsToBeRemoved, rulesToBeAdded);
        }

        if (toggle === false && this.#userFilters.filters.length > 0) {
            this.#logger.debug(
                'I remove dynamic rules',
                `${this.constructor.name}.run`,
                ruleIdsToBeRemoved
            );

            return this.#browser.removeDynamicRules(ruleIdsToBeRemoved);
        }
    }
}