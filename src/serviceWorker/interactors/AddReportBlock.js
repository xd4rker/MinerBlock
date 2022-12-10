/**
 * Add a miner block report to statistics object.
 */
export class AddReportBlock {
    /** @type{StatisticsRepository} */
    #statisticsRepo;
    /** @type{Logger} */
    #logger;

    constructor(statisticsRepo, logger) {
        this.#statisticsRepo = statisticsRepo;
        this.#logger = logger;
    }

    /**
     * @param {Object} report
     * @returns {Promise<boolean>}
     */
    async run(report) {
        const statistics = await this.#statisticsRepo.findOrCreate();

        statistics.addBlockReport(report);

        this.#logger.debug('Add new report', 'AddReportBlock.run', report);

        return await this.#statisticsRepo.save(statistics);
    }
}