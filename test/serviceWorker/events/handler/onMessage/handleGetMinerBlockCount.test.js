import { strict as assert } from 'assert';
import {FakeLocalStorage} from "../../../repositories/adapters/FakeLocalStorage.js";
import {Logger} from "../../../../../src/serviceWorker/adapters/Logger.js";
import {
    HandleGetMinerBlockCount
} from "../../../../../src/serviceWorker/events/handler/onMessage/HandleGetMinerBlockCount.js";
import {StatisticsRepository} from "../../../../../src/serviceWorker/repositories/StatisticsRepository.js";

describe('serviceWorker.events.handler.onMessage.handleGetMinerBlockCount', () => {
    it('get miner block count', async () => {
        const blockCount = Math.floor(Math.random() * 100) + 1;

        const logger = new Logger();
        const storage = new FakeLocalStorage({
            'mbStatistics': {
                "blockReports": Array(blockCount)
            }
        });
        const statisticsRepository = new StatisticsRepository(storage, logger);

        const handleGetMinerBlockCount = new HandleGetMinerBlockCount(
            statisticsRepository,
            logger
        );

        let receivedResponse = null;

        const handledGetMinerBlockCount = await handleGetMinerBlockCount.run(
            {action: HandleGetMinerBlockCount.EVENT_NAME},
            'theSender',
            (response) => {
                receivedResponse = response;
            }
        );

        assert.equal(handledGetMinerBlockCount, true);
        assert.equal(receivedResponse, blockCount);
    });
});