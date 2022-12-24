import { strict as assert } from 'assert';
import {FakeLocalStorage} from "../../../serviceWorker/repositories/adapters/FakeLocalStorage.js";
import {Logger} from "../../../../src/serviceWorker/adapters/Logger.js";
import {SettingsRepository} from "../../../../src/serviceWorker/repositories/SettingsRepository.js";
import {FakeBrowser} from "../../../serviceWorker/adapters/browser/FakeBrowser.js";
import {BuiltInFilters} from "../../../../src/serviceWorker/entities/filters/BuiltInFilters.js";
import {ToggleBuiltInFilters} from "../../../../src/serviceWorker/interactors/ToggleBuiltInFilters.js";

describe('serviceWorker.interactors.toggleBuiltInFilters', () => {
    it('toggles built in user filters', async () => {
        const logger = new Logger();

        const useBuiltInFiltersPreset = Math.random() < 0.5;

        const storage = new FakeLocalStorage({
            'mbSettings': {
                'useBuiltInFilters': useBuiltInFiltersPreset
            }
        });

        const useBuiltInFilters = !useBuiltInFiltersPreset;

        const settingsRepository = new SettingsRepository(storage, logger);
        const browser = new FakeBrowser();

        const toggleBuiltInFilters = new ToggleBuiltInFilters(
            settingsRepository,
            browser,
            logger,
            new BuiltInFilters(undefined, logger, browser)
        );
        const toggledBuiltInFilters = await toggleBuiltInFilters.run(useBuiltInFilters);

        assert.equal(toggledBuiltInFilters, undefined);

        const savedSettings = await settingsRepository.findOrCreate();

        assert.equal(savedSettings.useBuiltInFilters, useBuiltInFilters);
    });
});