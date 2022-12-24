import { strict as assert } from 'assert';
import {FakeLocalStorage} from "../../../../../serviceWorker/repositories/adapters/FakeLocalStorage.js";
import {SettingsRepository} from "../../../../../../src/serviceWorker/repositories/SettingsRepository.js";
import {Logger} from "../../../../../../src/serviceWorker/adapters/Logger.js";
import {
    HandleGetUseBuiltInFilterStatus
} from "../../../../../../src/serviceWorker/events/handler/onMessage/HandleGetUseBuiltInFilterStatus.js";
import {
    GetUseBuiltInFiltersStatus
} from "../../../../../../src/serviceWorker/interactors/GetUseBuiltInFiltersStatus.js";

describe('serviceWorker.events.handler.onMessage.handleGetUseBuiltInFilterStatus', () => {
    it('gets UseBuiltInFilterStatus', async () => {
        const useBuiltInFilters = Math.random() < 0.5;

        const logger = new Logger();
        const storage = new FakeLocalStorage({
            'mbSettings': {
                'useBuiltInFilters': useBuiltInFilters
            }
        });
        const settingsRepository = new SettingsRepository(storage, logger);

        const handleGetUseBuiltInFilterStatus = new HandleGetUseBuiltInFilterStatus(
            new GetUseBuiltInFiltersStatus(settingsRepository, logger),
            logger
        );

        let receivedResponse = null;

        const handledGetUseBuiltInFilterStatus = await handleGetUseBuiltInFilterStatus.run(
            {action: HandleGetUseBuiltInFilterStatus.EVENT_NAME},
            'theSender',
            (response) => {
                receivedResponse = response;
            }
        );

        assert.equal(handledGetUseBuiltInFilterStatus, true);
        assert.equal(receivedResponse, useBuiltInFilters);
    });
});