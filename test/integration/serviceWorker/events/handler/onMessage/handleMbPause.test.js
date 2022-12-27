import { strict as assert } from 'assert';
import {FakeLocalStorage} from "../../../../../serviceWorker/repositories/adapters/FakeLocalStorage.js";
import {SettingsRepository} from "../../../../../../src/serviceWorker/repositories/SettingsRepository.js";
import {Logger} from "../../../../../../src/serviceWorker/adapters/Logger.js";
import {SetIcon} from "../../../../../../src/serviceWorker/interactors/SetIcon.js";
import {Visuals} from "../../../../../../src/serviceWorker/entities/Visuals.js";
import {FakeBrowser} from "../../../../../serviceWorker/adapters/browser/FakeBrowser.js";
import {HandleMbStart} from "../../../../../../src/serviceWorker/events/handler/onMessage/HandleMbStart.js";
import {MbPause} from "../../../../../../src/serviceWorker/interactors/MbPause.js";
import {HandleMbPause} from "../../../../../../src/serviceWorker/events/handler/onMessage/HandleMbPause.js";

describe('serviceWorker.events.handler.onMessage.HandleMbStart', () => {
    it('starts miner block', async () => {
        const logger = new Logger();
        const storage = new FakeLocalStorage();
        const settingsRepository = new SettingsRepository(storage, logger);
        const browser = new FakeBrowser();

        const setIcon = new SetIcon(
            settingsRepository,
            browser,
            new Visuals()
        );

        const mbPause = new MbPause(
            settingsRepository,
            setIcon,
            logger
        );

        const handleMbPause = new HandleMbPause(
            mbPause,
            logger
        );

        let receivedResponse = null;

        const handledMbPause = await handleMbPause.run(
            {action: HandleMbStart.EVENT_NAME},
            'theSender',
            (response) => {
                receivedResponse = response;
            }
        );

        assert.equal(handledMbPause, true);
        assert.equal(receivedResponse, undefined);
    });
});