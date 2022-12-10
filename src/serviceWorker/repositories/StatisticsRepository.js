import {Statistics} from "../entities/Statistics.js";

export class StatisticsRepository {
    /** @type{LocalStorage} */
    #storage;
    /** @type{Logger} */
    #logger;

    constructor(localStorage, logger) {
        this.#storage = localStorage;
        this.#logger = logger;
    }

    /**
     * @returns {Promise<Statistics>}
     */
    async findOrCreate() {
        const statistics = await this.#storage.get(['mbStatistics']);

        this.#logger.debug('Read statistics', 'StatisticsRepository.findOrCreate', statistics);

        if (statistics === undefined || statistics['mbStatistics'] === undefined) {
            return new Statistics();
        }

        return new Statistics(statistics['mbStatistics']);
    }

    /**
     * @param {Statistics} statistics
     * @returns {Promise<boolean>}
     */
    async save(statistics) {
        return await this.#storage.set({
            'mbStatistics': statistics.toDict
        });
    }

    /**
     * @returns {Promise<number>}
     */
    async getMinerBlockCount() {
        const statistics = await this.findOrCreate();

        return statistics.minerBlockCount;
    }
}