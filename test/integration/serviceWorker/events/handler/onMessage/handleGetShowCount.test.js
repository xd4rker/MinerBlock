import { strict as assert } from 'assert';
import {FakeLocalStorage} from "../../../../../serviceWorker/repositories/adapters/FakeLocalStorage.js";
import {SettingsRepository} from "../../../../../../src/serviceWorker/repositories/SettingsRepository.js";
import {Logger} from "../../../../../../src/serviceWorker/adapters/Logger.js";
import {HandleGetShowCount} from "../../../../../../src/serviceWorker/events/handler/onMessage/HandleGetShowCount.js";
import {GetShowCount} from "../../../../../../src/serviceWorker/interactors/GetShowCount.js";

describe('serviceWorker.events.handler.onMessage.handleGetShowCount', () => {
    it('get show count status', async () => {
        const showCount = Math.random() < 0.5;

        const logger = new Logger();
        const storage = new FakeLocalStorage({
            'mbSettings': {
                'showCount': showCount
            }
        });
        const settingsRepository = new SettingsRepository(storage, logger);

        const handleGetShowCount = new HandleGetShowCount(
            new GetShowCount(settingsRepository, logger),
            logger
        );

        let receivedResponse = null;

        const handledGetShowCount = await handleGetShowCount.run(
            {action: HandleGetShowCount.EVENT_NAME},
            'theSender',
            (response) => {
                receivedResponse = response;
            }
        );

        assert.equal(handledGetShowCount, true);
        assert.equal(receivedResponse, showCount);
    });
});