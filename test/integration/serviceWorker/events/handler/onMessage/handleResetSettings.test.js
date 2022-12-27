import { strict as assert } from 'assert';
import {FakeLocalStorage} from "../../../../../serviceWorker/repositories/adapters/FakeLocalStorage.js";
import {SettingsRepository} from "../../../../../../src/serviceWorker/repositories/SettingsRepository.js";
import {Logger} from "../../../../../../src/serviceWorker/adapters/Logger.js";
import {InitSettings} from "../../../../../../src/serviceWorker/interactors/init/InitSettings.js";
import {HandleResetSettings} from "../../../../../../src/serviceWorker/events/handler/onMessage/HandleResetSettings.js";

describe('serviceWorker.events.handler.onMessage.HandleResetSettings', () => {
    it('resets settings', async () => {
        const logger = new Logger();
        const storage = new FakeLocalStorage();
        const settingsRepository = new SettingsRepository(storage, logger);
        const initSettings = new InitSettings(settingsRepository);

        const handleResetSettings = new HandleResetSettings(
            initSettings,
            logger
        );

        let receivedResponse = null;

        const handledResetSettings = await handleResetSettings.run(
            {action: HandleResetSettings.EVENT_NAME},
            'theSender',
            (response) => {
                receivedResponse = response;
            }
        );

        assert.equal(handledResetSettings, true);
        assert.equal(receivedResponse, undefined);

        //TODO: check if settings equal default settings
    });
});