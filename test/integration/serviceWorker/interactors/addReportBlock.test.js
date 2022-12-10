import { strict as assert } from 'assert';
import {AddReportBlock} from "../../../../src/serviceWorker/interactors/AddReportBlock.js";
import {StatisticsRepository} from "../../../../src/serviceWorker/repositories/StatisticsRepository.js";
import {FakeLocalStorage} from "../../../serviceWorker/repositories/adapters/FakeLocalStorage.js";
import {Logger} from "../../../../src/serviceWorker/adapters/Logger.js";


it('saves block report', async () => {
    const logger = new Logger();
    const statisticsRepo = new StatisticsRepository(new FakeLocalStorage(), logger);

    const report = {'asdf': 'Asdf'};

    const addBlockReport = new AddReportBlock(
        statisticsRepo,
        logger
    );
    const blockReportSaved = await addBlockReport.run(report);

    assert.equal(blockReportSaved, true);

    const savedStatistics = await statisticsRepo.findOrCreate();
    const blockReports = savedStatistics.blockReports;

    assert.equal(blockReports[1], report);
});