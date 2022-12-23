import { strict as assert } from 'assert';
import {FakeLocalStorage} from "../../../../../serviceWorker/repositories/adapters/FakeLocalStorage.js";
import {SettingsRepository} from "../../../../../../src/serviceWorker/repositories/SettingsRepository.js";
import {GetRunStatus} from "../../../../../../src/serviceWorker/interactors/GetRunStatus.js";
import {HandleGetRunStatus} from "../../../../../../src/serviceWorker/events/handler/onMessage/HandleGetRunStatus.js";
import {Logger} from "../../../../../../src/serviceWorker/adapters/Logger.js";

describe('serviceWorker.events.handler.onMessage.handleGetRunStatus', () => {
    it('get run status', async () => {
        const runStatus = Math.random() < 0.5;

        const logger = new Logger();
        const storage = new FakeLocalStorage({
            'mbSettings': {
                "runStatus": runStatus
            }
        });
        const settingsRepository = new SettingsRepository(storage, logger);

        const handleGetRunStatus = new HandleGetRunStatus(
            new GetRunStatus(settingsRepository, logger),
            logger
        );

        let receivedResponse = null;

        const handledGetRunStatus = await handleGetRunStatus.run(
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