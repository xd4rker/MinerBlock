import { strict as assert } from 'assert';
import {FakeLocalStorage} from "../../../serviceWorker/repositories/adapters/FakeLocalStorage.js";
import {Logger} from "../../../../src/serviceWorker/adapters/Logger.js";
import {SettingsRepository} from "../../../../src/serviceWorker/repositories/SettingsRepository.js";
import {GetUseUserFilterStatus} from "../../../../src/serviceWorker/interactors/GetUseUserFilterStatus.js";

describe('serviceWorker.interactors.getUseUserFilterStatus', () => {
    it('get info if show count activate or deactivated', async () => {
        const logger = new Logger();

        const useUserFilters = Math.random() < 0.5;

        const storage = new FakeLocalStorage({
            'mbSettings': {
                'useUserFilters': useUserFilters
            }
        });

        const settingsRepository = new SettingsRepository(storage, logger);

        const getUseUserFilterStatus = new GetUseUserFilterStatus(
            settingsRepository,
            logger
        );

        const useUserFilterResult = await getUseUserFilterStatus.run();

        assert.equal(useUserFilters, useUserFilterResult);
    });
});