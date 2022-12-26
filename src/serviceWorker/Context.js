import {Browser} from "./adapters/browser/Browser.js";
import {Logger} from "./adapters/Logger.js";
import {SettingsRepository} from "./repositories/SettingsRepository.js";
import {LocalStorage} from "./repositories/adapters/LocalStorage.js";
import {StatisticsRepository} from "./repositories/StatisticsRepository.js";
import {Chrome} from "./adapters/browser/Chrome.js";

export class Context {
    /** @type {Browser} */
    #browser;
    /** @type {LocalStorage} */
    #storage;
    /** @type {Logger} */
    #logger;
    /** @type {SettingsRepository} */
    #settingsRepository;
    /** @type {StatisticsRepository} */
    #statisticsRepository;

    constructor() {
        this.#browser = new Browser(new Chrome());
        this.#storage = new LocalStorage(this.#browser);
        this.#logger = new Logger(Logger.LEVEL_DEBUG);
        this.#settingsRepository = new SettingsRepository(this.#storage, this.#logger);
        this.#statisticsRepository = new StatisticsRepository(this.#storage, this.#logger);
    }

    get browser() {
        return this.#browser;
    }

    get storage() {
        return this.#storage;
    }

    get logger() {
        return this.#logger;
    }

    get settingsRepository() {
        return this.#settingsRepository;
    }

    get statisticsRepository() {
        return this.#statisticsRepository;
    }
}