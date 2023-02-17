import { strict as assert } from 'assert';
import {FakeLocalStorage} from "../../../../../serviceWorker/repositories/adapters/FakeLocalStorage.js";
import {SettingsRepository} from "../../../../../../src/serviceWorker/repositories/SettingsRepository.js";
import {Logger} from "../../../../../../src/serviceWorker/adapters/Logger.js";
import {SetIcon} from "../../../../../../src/serviceWorker/interactors/SetIcon.js";
import {Visuals} from "../../../../../../src/serviceWorker/entities/Visuals.js";
import {MbStart} from "../../../../../../src/serviceWorker/interactors/MbStart.js";
import {InitBrowser} from "../../../../../../src/serviceWorker/interactors/init/InitBrowser.js";
import {RemoveFiltersInBrowser} from "../../../../../../src/serviceWorker/interactors/RemoveFiltersInBrowser.js";
import {FakeBrowser} from "../../../../../serviceWorker/adapters/browser/FakeBrowser.js";
import {HandleMbStart} from "../../../../../../src/serviceWorker/events/handler/onMessage/HandleMbStart.js";
import {
    ResetMinerBlockerRegistration
} from "../../../../../../src/serviceWorker/interactors/ResetMinerBlockerRegistration.js";
import {RegisterMinerBlocker} from "../../../../../../src/serviceWorker/interactors/RegisterMinerBlocker.js";
import {GetRunStatus} from "../../../../../../src/serviceWorker/interactors/GetRunStatus.js";
import {GetWhitelist} from "../../../../../../src/serviceWorker/interactors/GetWhitelist.js";
import {UnregisterMinerBlocker} from "../../../../../../src/serviceWorker/interactors/UnregisterMinerBlocker.js";

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

        const mbStart = new MbStart(
            settingsRepository,
            new InitBrowser(
                setIcon,
                new RemoveFiltersInBrowser(browser)
            )
        );

        const resetMinerBlockerRegistration = new ResetMinerBlockerRegistration(
            new RegisterMinerBlocker(
                new GetRunStatus(
                    settingsRepository,
                    logger
                ),
                new GetWhitelist(
                    settingsRepository,
                    logger
                ),
                browser,
                logger
            ),
            new UnregisterMinerBlocker(
                browser,
                logger
            ),
            browser,
            logger
        );

        const handleMbStart = new HandleMbStart(
            mbStart,
            resetMinerBlockerRegistration,
            logger,
        );

        let receivedResponse = null;

        const handledMbStart = await handleMbStart.run(
            {action: HandleMbStart.EVENT_NAME},
            'theSender',
            (response) => {
                receivedResponse = response;
            }
        );

        assert.equal(handledMbStart, true);
        assert.equal(receivedResponse, undefined);
    });
});