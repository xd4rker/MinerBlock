import { strict as assert } from 'assert';
import {FakeLocalStorage} from "../../../serviceWorker/repositories/adapters/FakeLocalStorage.js";
import {Logger} from "../../../../src/serviceWorker/adapters/Logger.js";
import {SaveWhitelist} from "../../../../src/serviceWorker/interactors/SaveWhitelist.js";
import {SettingsRepository} from "../../../../src/serviceWorker/repositories/SettingsRepository.js";


it('saves whitelist', async () => {
    const logger = new Logger();
    const settingsRepository = new SettingsRepository(new FakeLocalStorage(), logger);

    const domains = ['lala', 'lulu'];

    const saveWhitelist = new SaveWhitelist(
        settingsRepository,
        logger
    );

    const whitelistSaved = await saveWhitelist.run(domains);

    assert.equal(whitelistSaved, true);

    const savedSettings = await settingsRepository.findOrCreate();

    assert.equal(savedSettings.whiteList, domains);
});