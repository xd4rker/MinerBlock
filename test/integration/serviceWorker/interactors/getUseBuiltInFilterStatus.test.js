import { strict as assert } from 'assert';
import {FakeLocalStorage} from "../../../serviceWorker/repositories/adapters/FakeLocalStorage.js";
import {Logger} from "../../../../src/serviceWorker/adapters/Logger.js";
import {SettingsRepository} from "../../../../src/serviceWorker/repositories/SettingsRepository.js";
import {GetUseBuiltInFiltersStatus} from "../../../../src/serviceWorker/interactors/GetUseBuiltInFiltersStatus.js";

describe('serviceWorker.interactors.getUseBuiltInFilterStatus', () => {
    it('gets status of use built in filters', async () => {
        const logger = new Logger();

        const useBuiltInFilters = Math.random() < 0.5;

        const storage = new FakeLocalStorage({
            'mbSettings': {
                'useBuiltInFilters': useBuiltInFilters
            }
        });

        const settingsRepository = new SettingsRepository(storage, logger);

        const getUseBuiltInFiltersStatus = new GetUseBuiltInFiltersStatus(
            settingsRepository,
            logger
        );

        const useBuiltInFiltersResult = await getUseBuiltInFiltersStatus.run();

        assert.equal(useBuiltInFilters, useBuiltInFiltersResult);
    });
});