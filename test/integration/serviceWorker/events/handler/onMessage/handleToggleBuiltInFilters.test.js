import { strict as assert } from 'assert';
import {FakeLocalStorage} from "../../../../../serviceWorker/repositories/adapters/FakeLocalStorage.js";
import {SettingsRepository} from "../../../../../../src/serviceWorker/repositories/SettingsRepository.js";
import {Logger} from "../../../../../../src/serviceWorker/adapters/Logger.js";
import {ToggleBuiltInFilters} from "../../../../../../src/serviceWorker/interactors/ToggleBuiltInFilters.js";
import {BuiltInFilters} from "../../../../../../src/serviceWorker/entities/filters/BuiltInFilters.js";
import {FakeBrowser} from "../../../../../serviceWorker/adapters/browser/FakeBrowser.js";
import {
    HandleToggleBuiltInFilters
} from "../../../../../../src/serviceWorker/events/handler/onMessage/HandleToggleBuiltInFilters.js";

describe('serviceWorker.interactors.handleToggleBuiltInFilters', () => {
    it('toggles built in filters', async () => {
        const logger = new Logger();
        const useBuiltInFiltersPreset = Math.random() < 0.5;
        const browser = new FakeBrowser();

        const storage = new FakeLocalStorage({
            'mbSettings': {
                'useBuiltInFilters': useBuiltInFiltersPreset
            }
        });

        const useBuiltInFilters = !useBuiltInFiltersPreset;

        const settingsRepository = new SettingsRepository(storage, logger);

        const handleToggleBuiltInFilters = new HandleToggleBuiltInFilters(
            new ToggleBuiltInFilters(
                settingsRepository,
                browser,
                logger,
                new BuiltInFilters(undefined, logger, browser)
            ),
            logger
        );

        let receivedResponse = null;

        const handledToggleBuiltInFilters = await handleToggleBuiltInFilters.run(
            {action: HandleToggleBuiltInFilters.EVENT_NAME, use: useBuiltInFilters},
            'theSender',
            (response) => {
                receivedResponse = response;
            }
        );

        assert.equal(handledToggleBuiltInFilters, true);
        assert.equal(receivedResponse, undefined);

        const savedSettings = await settingsRepository.findOrCreate();

        assert.equal(savedSettings.useBuiltInFilters, useBuiltInFilters);
    });
});