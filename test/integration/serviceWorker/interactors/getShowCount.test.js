import { strict as assert } from 'assert';
import {FakeLocalStorage} from "../../../serviceWorker/repositories/adapters/FakeLocalStorage.js";
import {Logger} from "../../../../src/serviceWorker/adapters/Logger.js";
import {SettingsRepository} from "../../../../src/serviceWorker/repositories/SettingsRepository.js";
import {GetShowCount} from "../../../../src/serviceWorker/interactors/GetShowCount.js";

describe('serviceWorker.interactors.getShowCount', () => {
    it('get info if show count activate or deactivated', async () => {
        const logger = new Logger();

        const showCount = Math.random() < 0.5;

        const storage = new FakeLocalStorage({
            'mbSettings': {
                'showCount': showCount
            }
        });

        const settingsRepository = new SettingsRepository(storage, logger);

        const getShowCount = new GetShowCount(
            settingsRepository,
            logger
        );

        const showCountResult = await getShowCount.run();

        assert.equal(showCount, showCountResult);
    });
});