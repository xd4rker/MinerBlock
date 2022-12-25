import { strict as assert } from 'assert';
import {FakeLocalStorage} from "../../../../../serviceWorker/repositories/adapters/FakeLocalStorage.js";
import {Logger} from "../../../../../../src/serviceWorker/adapters/Logger.js";
import {HandleSetShowCount} from "../../../../../../src/serviceWorker/events/handler/onMessage/HandleSetShowCount.js";
import {SetShowCount} from "../../../../../../src/serviceWorker/interactors/SetShowCount.js";
import {SettingsRepository} from "../../../../../../src/serviceWorker/repositories/SettingsRepository.js";

describe('serviceWorker.events.handler.onMessage.HandleSetShowCount', () => {
    it('adds report', async () => {
        const logger = new Logger();
        const showCount = Math.random() < 0.5;

        const storage = new FakeLocalStorage({
            'mbSettings': {
                'showCount': showCount
            }
        });

        const settingsRepository = new SettingsRepository(storage, logger);

        const handleSetShowCount = new HandleSetShowCount(
            new SetShowCount(
                settingsRepository,
                logger
            ),
            logger
        );

        let receivedResponse = null;

        const handledSetShowCount = await handleSetShowCount.run(
            {action: HandleSetShowCount.EVENT_NAME, showCount: showCount},
            'theSender',
            (response) => {
                receivedResponse = response;
            }
        );

        assert.equal(handledSetShowCount, true);
        assert.equal(receivedResponse, true);

        const savedSettings = await settingsRepository.findOrCreate();

        assert.equal(savedSettings.showCount, showCount);
    });
});