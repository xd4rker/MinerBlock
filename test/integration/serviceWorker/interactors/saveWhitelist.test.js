import { strict as assert } from 'assert';
import {FakeLocalStorage} from "../../../serviceWorker/repositories/adapters/FakeLocalStorage.js";
import {Logger} from "../../../../src/serviceWorker/adapters/Logger.js";
import {SettingsRepository} from "../../../../src/serviceWorker/repositories/SettingsRepository.js";
import {faker} from "@faker-js/faker";
import {SaveWhitelist} from "../../../../src/serviceWorker/interactors/SaveWhitelist.js";

describe('serviceWorker.interactors.saveWhitelist', () => {
    it('saves whitelist', async () => {
        const length = Math.floor(Math.random() * 10) + 1;

        const domains = Array.from({length: length}, () => faker.internet.url());

        const logger = new Logger();
        const settingsRepository = new SettingsRepository(new FakeLocalStorage(), logger);

        const saveWhitelist = new SaveWhitelist(settingsRepository, logger);
        await saveWhitelist.run(domains);

        const whitelistSaved = await saveWhitelist.run(domains);

        assert.equal(whitelistSaved, true);

        const savedSettings = await settingsRepository.findOrCreate();

        assert.equal(savedSettings.whiteList.toString(), domains.toString());
    })
});