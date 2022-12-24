import { strict as assert } from 'assert';
import {FakeLocalStorage} from "../../../../../serviceWorker/repositories/adapters/FakeLocalStorage.js";
import {SettingsRepository} from "../../../../../../src/serviceWorker/repositories/SettingsRepository.js";
import {Logger} from "../../../../../../src/serviceWorker/adapters/Logger.js";
import {BuiltInFilters} from "../../../../../../src/serviceWorker/entities/filters/BuiltInFilters.js";
import {FakeBrowser} from "../../../../../serviceWorker/adapters/browser/FakeBrowser.js";
import {
    HandleToggleUserFilters
} from "../../../../../../src/serviceWorker/events/handler/onMessage/HandleToggleUserFilters.js";
import {ToggleUserFilters} from "../../../../../../src/serviceWorker/interactors/ToggleUserFilters.js";
import {UserFilters} from "../../../../../../src/serviceWorker/entities/filters/UserFilters.js";

describe('serviceWorker.interactors.handleToggleUserFilters', () => {
    it('toggles use user filters', async () => {
        const logger = new Logger();
        const useUserFiltersPreset = Math.random() < 0.5;
        const browser = new FakeBrowser();

        const storage = new FakeLocalStorage({
            'mbSettings': {
                'useUserFilters': useUserFiltersPreset
            }
        });

        const useUserFilters = !useUserFiltersPreset;

        const settingsRepository = new SettingsRepository(storage, logger);

        const handleToggleUserFilters = new HandleToggleUserFilters(
            new ToggleUserFilters(
                settingsRepository,
                browser,
                logger,
                new UserFilters(undefined, logger, new BuiltInFilters(undefined, logger, browser))
            ),
            logger
        );

        let receivedResponse = null;

        const handledToggleUserFilters = await handleToggleUserFilters.run(
            {action: HandleToggleUserFilters.EVENT_NAME, use: useUserFilters},
            'theSender',
            (response) => {
                receivedResponse = response;
            }
        );

        assert.equal(handledToggleUserFilters, true);
        assert.equal(receivedResponse, undefined);

        const savedSettings = await settingsRepository.findOrCreate();

        assert.equal(savedSettings.useUserFilters, useUserFilters);
    });
});