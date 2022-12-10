/**
 * Get status of if user filter is in use or not.
 */
export class GetUseUserFilterStatus {
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
            'Got useUserBuiltInFiltersStatus',
            'GetUseUserFilterStatus',
            settings.useUserFilters
        );

        return settings.useUserFilters;
    }
}