import {Settings} from "../../entities/Settings.js";

export class InitSettings {
    /** @type {SettingsRepository} */
    #repository;

    constructor(repository) {
        this.#repository = repository;
    }

    /**
     * @returns {Promise<void>}
     */
    async run() {
        await this.#repository.clear();
        await this.#repository.save(new Settings());

        //TODO: rename to reset, reset not only settings but everything associated with it, filters, icon, reload settings page if open
    }
}