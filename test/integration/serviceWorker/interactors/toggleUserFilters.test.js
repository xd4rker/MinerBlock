import { strict as assert } from 'assert';
import {FakeLocalStorage} from "../../../serviceWorker/repositories/adapters/FakeLocalStorage.js";
import {Logger} from "../../../../src/serviceWorker/adapters/Logger.js";
import {SettingsRepository} from "../../../../src/serviceWorker/repositories/SettingsRepository.js";
import {FakeBrowser} from "../../../serviceWorker/adapters/browser/FakeBrowser.js";
import {BuiltInFilters} from "../../../../src/serviceWorker/entities/filters/BuiltInFilters.js";
import {ToggleUserFilters} from "../../../../src/serviceWorker/interactors/ToggleUserFilters.js";
import {UserFilters} from "../../../../src/serviceWorker/entities/filters/UserFilters.js";

describe('serviceWorker.interactors.toggleUserFilters', () => {
    it('toggles use user filters', async () => {
        const logger = new Logger();

        const useUserFiltersPreset = Math.random() < 0.5;

        const storage = new FakeLocalStorage({
            'mbSettings': {
                'useBuiltInFilters': useUserFiltersPreset
            }
        });

        const useUserFilters = !useUserFiltersPreset;

        const settingsRepository = new SettingsRepository(storage, logger);
        const browser = new FakeBrowser();

        const toggleUserFilters = new ToggleUserFilters(
            settingsRepository,
            browser,
            logger,
            new UserFilters(undefined, logger, new BuiltInFilters(undefined, logger, browser))
        );
        const toggledUserFilters = await toggleUserFilters.run(useUserFilters);

        assert.equal(toggledUserFilters, undefined);

        const savedSettings = await settingsRepository.findOrCreate();

        assert.equal(savedSettings.useUserFilters, useUserFilters);
    });
});