/**
 * Activate/Deactivate built-in filter functionality.
 */
export class ToggleBuiltInFilters {
    /** @type{SettingsRepository} */
    #settingsRepository;
    /** @type{boolean} */
    #toggle;
    /** @type{Browser} */
    #browser;
    /** @type{Logger} */
    #logger;
    /** @type{BuiltInFilters} */
    #builtInFilters;

    constructor(settingsRepository, toggle, browser, logger, builtInFilters) {
        this.#settingsRepository = settingsRepository;
        this.#toggle = toggle;
        this.#browser = browser;
        this.#logger = logger;
        this.#builtInFilters = builtInFilters;
    }

    async run() {
        const settings = await this.#settingsRepository.findOrCreate();

        await this.#builtInFilters.set();

        this.#logger.debug(
            'Have toggle',
            'ToggleBuiltInFilters.run',
            this.#toggle
        );

        this.#logger.debug(
            'Have loaded filters',
            'ToggleBuiltInFilters.run',
            this.#builtInFilters.filters
        );

        settings.setUseBuiltInFilters(this.#toggle);

        //TODO: make fail safe
        this.#settingsRepository.save(settings).then();

        const ruleIdsToBeRemoved = this.#builtInFilters.getRuleIds();

        if (this.#toggle === true && this.#builtInFilters.filters.length > 0) {
            const rulesToBeAdded = this.#builtInFilters.getRules();

            this.#logger.debug(
                'I update dynamic rules',
                'ToggleBuiltInFilters.run',
                rulesToBeAdded
            );

            this.#logger.debug(
                'I remove dynamic rules',
                'ToggleBuiltInFilters.run',
                ruleIdsToBeRemoved
            );

            return this.#browser.removeAndAddDynamicRule(ruleIdsToBeRemoved, rulesToBeAdded);
        }

        if (this.#toggle === false && this.#builtInFilters.filters.length > 0) {
            this.#logger.debug(
                'I remove dynamic rules',
                'ToggleBuiltInFilters.run',
                ruleIdsToBeRemoved
            );

            return this.#browser.removeDynamicRules(ruleIdsToBeRemoved);
        }
    }
}