export class HandleAddReport {
    static EVENT_NAME = 'blockReport';

    /** @type {import("./../../../interactors/AddReportBlock.js").AddReportBlock} */
    #addBlockReport;
    /** @type {HighlightBadge} */
    #highlightBadge;
    /** @type {Logger} */
    #logger;

    constructor(addBlockReport, highlightBadge, logger) {
        this.#addBlockReport = addBlockReport;
        this.#highlightBadge = highlightBadge;
        this.#logger = logger;
    }

    async run(message, sender, sendResponse) {
        if (message.action === HandleAddReport.EVENT_NAME && message.report !== undefined) {
            this.#logger.debug(
                'Got message blockReport',
                'serviceWorker.onMessage.handleReportBlock',
                message
            );

            const savedBlockReport = await this.#addBlockReport.run(message.report);

            sendResponse(savedBlockReport);

            await this.#highlightBadge.run();

            return true;
        }
    }
}