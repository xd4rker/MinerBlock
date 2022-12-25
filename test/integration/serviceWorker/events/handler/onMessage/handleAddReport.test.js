import { strict as assert } from 'assert';
import {FakeLocalStorage} from "../../../../../serviceWorker/repositories/adapters/FakeLocalStorage.js";
import {Logger} from "../../../../../../src/serviceWorker/adapters/Logger.js";
import {FakeBrowser} from "../../../../../serviceWorker/adapters/browser/FakeBrowser.js";
import {HandleAddReport} from "../../../../../../src/serviceWorker/events/handler/onMessage/HandleAddReport.js";
import {AddReportBlock} from "../../../../../../src/serviceWorker/interactors/AddReportBlock.js";
import {HighlightBadge} from "../../../../../../src/serviceWorker/interactors/HighlightBadge.js";
import {StatisticsRepository} from "../../../../../../src/serviceWorker/repositories/StatisticsRepository.js";

describe('serviceWorker.events.handler.onMessage.handleAddReport', () => {
    it('adds report', async () => {
        const logger = new Logger();
        const browser = new FakeBrowser();

        const storage = new FakeLocalStorage({
            'mbStatistics': {
                'blockReports': []
            }
        });

        const report = {'asdf': 'Asdf'};

        const statisticsRepository = new StatisticsRepository(storage, logger);

        const handleAddReport = new HandleAddReport(
            new AddReportBlock(
                statisticsRepository,
                logger
            ),
            new HighlightBadge(
                browser,
                500,
                [200, 0, 0, 100],
                '+1',
                logger
            ),
            logger
        );

        let receivedResponse = null;

        const handledAddReport = await handleAddReport.run(
            {action: HandleAddReport.EVENT_NAME, report: report},
            'theSender',
            (response) => {
                receivedResponse = response;
            }
        );

        assert.equal(handledAddReport, true);
        assert.equal(receivedResponse, true);

        const savedStatistics = await statisticsRepository.findOrCreate();

        assert.equal(savedStatistics.blockReports.toString(), [report].toString());
    });
});