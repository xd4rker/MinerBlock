import { strict as assert } from 'assert';
import {FakeLocalStorage} from "../../../serviceWorker/repositories/adapters/FakeLocalStorage.js";
import {Logger} from "../../../../src/serviceWorker/adapters/Logger.js";
import {SettingsRepository} from "../../../../src/serviceWorker/repositories/SettingsRepository.js";
import {SetIcon} from "../../../../src/serviceWorker/interactors/SetIcon.js";
import {Visuals} from "../../../../src/serviceWorker/entities/Visuals.js";
import {FakeBrowser} from "../../../serviceWorker/adapters/browser/FakeBrowser.js";

describe('serviceWorker.interactors.setIcon', () => {
    it('sets icon', async () => {
        const logger = new Logger();
        const storage = new FakeLocalStorage({
            'mbSettings': {
                "runStatus": Math.random() < 0.5
            }
        });
        const browser = new FakeBrowser();
        const settingsRepository = new SettingsRepository(storage, logger);

        const setIcon = new SetIcon(
            settingsRepository,
            browser,
            new Visuals()
        );

        const setIconResult = await setIcon.run();

        assert.equal(setIconResult, undefined);
    });
});