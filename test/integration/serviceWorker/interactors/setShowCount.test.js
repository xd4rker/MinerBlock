import { strict as assert } from 'assert';
import {FakeLocalStorage} from "../../../serviceWorker/repositories/adapters/FakeLocalStorage.js";
import {Logger} from "../../../../src/serviceWorker/adapters/Logger.js";
import {SettingsRepository} from "../../../../src/serviceWorker/repositories/SettingsRepository.js";
import {SetShowCount} from "../../../../src/serviceWorker/interactors/SetShowCount.js";


it('sets show count', async () => {
    const logger = new Logger();
    const storage = new FakeLocalStorage({
        'mbSettings': {
            "showCount": true
        }
    });
    const settingsRepository = new SettingsRepository(storage, logger);

    const showCount = Math.random() < 0.5;

    const setShowCount = new SetShowCount(
        settingsRepository,
        logger
    );

    const showCountSet = await setShowCount.run(showCount);

    assert.equal(showCountSet, true);

    const savedSettings = await settingsRepository.findOrCreate();

    assert.equal(savedSettings.showCount, showCount);
});