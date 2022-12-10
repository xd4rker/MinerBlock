/**
 * Get the filter list created by the user.
 */
export class GetUserFilterList {
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

        this.#logger.debug('Got user filter list', 'GetUserFilterList.run', settings.userFilters);

        return settings.userFilters;
    }
}