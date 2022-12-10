/**
 * Get run status from settings.
 */
export class GetRunStatus {
    /** @type{SettingsRepository} */
    #settingsRepo;
    /** @type{Logger} */
    #logger;

    constructor(settingsRepo, logger) {
        this.#settingsRepo = settingsRepo;
        this.#logger = logger;
    }

    async run() {
        const status = await this.#settingsRepo.getRunStatus();

        this.#logger.debug('Got run status', 'interactors.GetRunStatus', status);

        return status;
    }
}