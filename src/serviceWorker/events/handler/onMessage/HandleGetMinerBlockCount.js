export class HandleGetMinerBlockCount {
    static EVENT_NAME = 'getMinerBlockCount';
    /** @var {Logger} */
    #logger;
    /** @var {StatisticsRepository} */
    #statisticsRepository;

    constructor(statisticsRepository, logger) {
        this.#logger = logger;
        this.#statisticsRepository = statisticsRepository
    }

    async run(message, sender, sendResponse) {
        if (message.action === HandleGetMinerBlockCount.EVENT_NAME) {
            this.#logger.debug(
                'Got message getMinerBlockCount',
                'serviceWorker.handleGetMinerBlockCount',
                message
            );

            const count = await this.#statisticsRepository.getMinerBlockCount();

            this.#logger.debug(
                'Returning count',
                'serviceWorker.handleGetMinerBlockCount',
                count
            );

            sendResponse(count);

            return true;
        }
    }
}