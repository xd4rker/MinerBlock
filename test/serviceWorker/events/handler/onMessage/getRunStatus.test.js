import { strict as assert } from 'assert';
import {FakeLocalStorage} from "../../../repositories/adapters/FakeLocalStorage.js";
import {SettingsRepository} from "../../../../../src/serviceWorker/repositories/SettingsRepository.js";
import {GetRunStatus} from "../../../../../src/serviceWorker/interactors/GetRunStatus.js";
import {GetRunStatus as HandleGetRunStatus} from "../../../../../src/serviceWorker/events/onMessage/GetRunStatus.js";
import {Logger} from "../../../../../src/serviceWorker/adapters/Logger.js";

describe('serviceWorker.events.handler.onMessage.getRunStatus', () => {
    it('get run status', async () => {
        const runStatus = Math.random() < 0.5;

        const logger = new Logger();
        const storage = new FakeLocalStorage({
            'mbSettings': {
                "runStatus": runStatus
            }
        });
        const settingsRepository = new SettingsRepository(storage, logger);

        const getRunStatus = new HandleGetRunStatus(
            new GetRunStatus(settingsRepository, logger),
            logger
        );

        let receivedResponse = null;

        const handledGetRunStatus = await getRunStatus.handle(
            {action: HandleGetRunStatus.EVENT_NAME},
            'theSender',
            (response) => {
                receivedResponse = response;
            }
        );

        assert.equal(handledGetRunStatus, true);
        assert.equal(receivedResponse, runStatus);
    });
});