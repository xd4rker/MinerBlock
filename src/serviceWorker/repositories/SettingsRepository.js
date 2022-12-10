import { Settings } from "../entities/Settings.js";

export class SettingsRepository {
    /** @type{LocalStorage} */
    #storage;
    /** @type{Logger} */
    #logger;

    constructor(localStorage, logger) {
        this.#storage = localStorage;
        this.#logger = logger;
    }

    /**
     * @returns {Promise<Settings>}
     */
    async findOrCreate() {
        const settings = await this.#storage.get(['mbSettings']);

        if (settings === undefined || settings['mbSettings'] === undefined) {
            this.#logger.debug(
                'Have no settings, create new one.',
                'SettingsLocalRepository.find',
                settings
            );

            return new Settings();
        }

        this.#logger.debug(
            'Have settings',
            'SettingsLocalRepository.find',
            settings
        );

        return new Settings(settings['mbSettings']);
    }

    /**
     * @param {Settings} settings
     * @returns {Promise<boolean>}
     */
    async save(settings) {
        return await this.#storage.set({
            'mbSettings': settings.toDict
        });
    }

    /**
     * @returns {Promise<boolean>}
     */
    async getRunStatus() {
        const settings = await this.findOrCreate();

        return settings.runStatus;
    }

    /**
     * @returns {Promise<void>}
     */
    async clear() {
        await this.#storage.clear();
    }
}