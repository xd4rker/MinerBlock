import { strict as assert } from 'assert';
import {FakeLocalStorage} from "../../../serviceWorker/repositories/adapters/FakeLocalStorage.js";
import {Logger} from "../../../../src/serviceWorker/adapters/Logger.js";
import {SettingsRepository} from "../../../../src/serviceWorker/repositories/SettingsRepository.js";
import {SaveUserFilterList} from "../../../../src/serviceWorker/interactors/SaveUserFilterList.js";
import {UserFilters} from "../../../../src/serviceWorker/entities/filters/UserFilters.js";
import {BuiltInFilters} from "../../../../src/serviceWorker/entities/filters/BuiltInFilters.js";
import {FakeBrowser} from "../../../serviceWorker/adapters/browser/FakeBrowser.js";
import {faker} from "@faker-js/faker";

describe('serviceWorker.interactors.saveUserFilterList', () => {
    it('saves user filter list', async () => {
        const length = Math.floor(Math.random() * 10) + 1;

        const domains = Array.from({length: length}, () => faker.internet.url());

        const logger = new Logger();
        const settingsRepository = new SettingsRepository(new FakeLocalStorage(), logger);
        const browser = new FakeBrowser();

        const saveUserFilterList = new SaveUserFilterList(
            settingsRepository,
            new UserFilters(undefined, logger, new BuiltInFilters(undefined, logger, browser)),
            logger,
            browser
        );
        const userFilterListSaved = await saveUserFilterList.run(domains);

        assert.equal(userFilterListSaved, undefined);

        const savedSettings = await settingsRepository.findOrCreate();

        assert.equal(savedSettings.userFilters.toString(), domains.toString());
    })
});