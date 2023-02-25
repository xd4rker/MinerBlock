export class GetRecentBlockReport {
    static EVENT_NAME = 'getRecentBlockReport';

    /** @type{StatisticsRepository} */
    #statisticsRepo;
    /** @type{Logger} */
    #logger;
    /** @type{int} Deduct this value from now, to now what is still regarded as "recent". */
    #recent = 7776000;

    constructor(statisticsRepo, logger) {
        this.#statisticsRepo = statisticsRepo;
        this.#logger = logger;
    }

    async run(message, sender, sendResponse) {
        if (message.action === this.constructor.EVENT_NAME) {
            this.#logger.debug(
                'Got message GetRecentBlockReport',
                'GetRecentBlockReport.run',
                message
            );

            const statistics = await this.#statisticsRepo.findOrCreate();

            const recentReports = statistics.blockReports.filter(report => report.time >= Date.now() - this.#recent);

            if (recentReports.length === 0) {
                sendResponse([]);
            }

            sendResponse(recentReports);

            return true;
        }
    }
}
