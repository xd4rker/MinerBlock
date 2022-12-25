import { strict as assert } from 'assert';
import {FakeLocalStorage} from "../../../serviceWorker/repositories/adapters/FakeLocalStorage.js";
import {Logger} from "../../../../src/serviceWorker/adapters/Logger.js";
import {SettingsRepository} from "../../../../src/serviceWorker/repositories/SettingsRepository.js";
import {GetWhitelistStatus} from "../../../../src/serviceWorker/interactors/GetWhitelistStatus.js";
import {GetWhitelist} from "../../../../src/serviceWorker/interactors/GetWhitelist.js";


it('checks if domain whitelisted', async () => {
    const logger = new Logger();

    const domain = 'lala';
    const storage = new FakeLocalStorage({
        'mbSettings': {
            "whiteList": [domain]
        }
    });

    const settingsRepository = new SettingsRepository(storage, logger);

    const getWhitelistStatus = new GetWhitelistStatus(
        new GetWhitelist(settingsRepository, logger),
        logger
    );

    const isWhitelisted = await getWhitelistStatus.run(domain);

    assert.equal(isWhitelisted, true);
});