import {Settings} from "../../entities/Settings.js";

export class InitSettings {
    /** @type {SettingsRepository} */
    #repository;

    constructor(repository) {
        this.#repository = repository;
    }

    async run() {
        await this.#repository.clear();

        const settings = await this.#repository.findOrCreate();

        if (settings !== undefined) {
            return;
        }

        await this.#repository.save(new Settings());
    }
}