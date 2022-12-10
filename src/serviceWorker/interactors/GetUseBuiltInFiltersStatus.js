/**
 * Get the info if the built-in filters shall be used.
 */
export class GetUseBuiltInFiltersStatus {
    /** @type{SettingsRepository} */
    #settingsRepo;
    /** @type{Logger} */
    #logger;

    constructor(settingsRepo, logger) {
        this.#settingsRepo = settingsRepo;
        this.#logger = logger;
    }

    async run() {
        const settings = await this.#settingsRepo.findOrCreate();

        this.#logger.debug(
            'Got useBuiltInFiltersStatus',
            'GetUseBuiltInFiltersStatus.run',
            settings.useBuiltInFilters
        );

        return settings.useBuiltInFilters;
    }
}