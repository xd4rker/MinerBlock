import { strict as assert } from 'assert';
import {FakeLocalStorage} from "../../../serviceWorker/repositories/adapters/FakeLocalStorage.js";
import {Logger} from "../../../../src/serviceWorker/adapters/Logger.js";
import {SettingsRepository} from "../../../../src/serviceWorker/repositories/SettingsRepository.js";
import {SetIcon} from "../../../../src/serviceWorker/interactors/SetIcon.js";
import {Visuals} from "../../../../src/serviceWorker/entities/Visuals.js";
import {FakeBrowser} from "../../../serviceWorker/adapters/browser/FakeBrowser.js";
import {InitBrowser} from "../../../../src/serviceWorker/interactors/init/InitBrowser.js";
import {RemoveFiltersInBrowser} from "../../../../src/serviceWorker/interactors/RemoveFiltersInBrowser.js";

describe('serviceWorker.interactors.init.InitBrowser', () => {
    it('initiates the browser', async () => {
        const logger = new Logger();
        const storage = new FakeLocalStorage();
        const browser = new FakeBrowser();
        const settingsRepository = new SettingsRepository(storage, logger);

        const initBrowser = new InitBrowser(
            new SetIcon(
                settingsRepository,
                browser,
                new Visuals()
            ),
            new RemoveFiltersInBrowser(browser)
        );

        const initResult = await initBrowser.run();

        assert.equal(initResult, undefined);
    });
});