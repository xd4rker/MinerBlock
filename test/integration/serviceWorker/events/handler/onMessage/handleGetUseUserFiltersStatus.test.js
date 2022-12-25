import { strict as assert } from 'assert';
import {FakeLocalStorage} from "../../../../../serviceWorker/repositories/adapters/FakeLocalStorage.js";
import {SettingsRepository} from "../../../../../../src/serviceWorker/repositories/SettingsRepository.js";
import {Logger} from "../../../../../../src/serviceWorker/adapters/Logger.js";
import {
    HandleGetUseUserFilterStatus
} from "../../../../../../src/serviceWorker/events/handler/onMessage/HandleGetUseUserFilterStatus.js";
import {GetUseUserFilterStatus} from "../../../../../../src/serviceWorker/interactors/GetUseUserFilterStatus.js";

describe('serviceWorker.events.handler.onMessage.handleGetUseUserFilterStatus', () => {
    it('gets UseUserFilterStatus', async () => {
        const useUserFilters = Math.random() < 0.5;

        const logger = new Logger();
        const storage = new FakeLocalStorage({
            'mbSettings': {
                'useUserFilters': useUserFilters
            }
        });
        const settingsRepository = new SettingsRepository(storage, logger);

        const handleGetUseUserFilterStatus = new HandleGetUseUserFilterStatus(
            new GetUseUserFilterStatus(settingsRepository, logger),
            logger
        );

        let receivedResponse = null;

        const handledGetUseUserFilterStatus = await handleGetUseUserFilterStatus.run(
            {action: HandleGetUseUserFilterStatus.EVENT_NAME},
            'theSender',
            (response) => {
                receivedResponse = response;
            }
        );

        assert.equal(handledGetUseUserFilterStatus, true);
        assert.equal(receivedResponse, useUserFilters);
    });
});