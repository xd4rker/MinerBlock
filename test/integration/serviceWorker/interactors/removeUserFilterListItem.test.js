import { strict as assert } from 'assert';
import {FakeLocalStorage} from "../../../serviceWorker/repositories/adapters/FakeLocalStorage.js";
import {Logger} from "../../../../src/serviceWorker/adapters/Logger.js";
import {SettingsRepository} from "../../../../src/serviceWorker/repositories/SettingsRepository.js";
import { faker } from '@faker-js/faker';
import {RemoveUserFiltersListItem} from "../../../../src/serviceWorker/interactors/RemoveUserFiltersListItem.js";
import {FakeBrowser} from "../../../serviceWorker/adapters/browser/FakeBrowser.js";
import {UserFilters} from "../../../../src/serviceWorker/entities/filters/UserFilters.js";
import {BuiltInFilters} from "../../../../src/serviceWorker/entities/filters/BuiltInFilters.js";

describe('serviceWorker.interactors.RemoveUserFiltersListItem', () => {
    it('removes user filter item', async () => {
        const logger = new Logger();

        const userFilterList = [
            faker.internet.url(),
            faker.internet.url(),
        ];

        const storage = new FakeLocalStorage({
            'mbSettings': {
                'userFilters': userFilterList,
                'useUserFilters': true
            }
        });
        const browser = new FakeBrowser();
        const settingsRepository = new SettingsRepository(storage, logger);
        const userFilters = new UserFilters(
            undefined,
            logger,
            new BuiltInFilters(
                {'filtersPath': 'assets/fakeFilters.txt'},
                logger,
                browser
            )
        )

        const removeUserFiltersListItem = new RemoveUserFiltersListItem(
            settingsRepository,
            logger,
            browser,
            userFilters
        );

        const removedUserFiltersListItem = await removeUserFiltersListItem.run(userFilterList[0]);

        assert.equal(removedUserFiltersListItem, undefined);

        const savedSettings = await settingsRepository.findOrCreate();

        assert.equal(savedSettings.userFilters.toString(), [userFilterList[0]].toString());
    });

    it('tries to remove user filter list item, but list empty', async () => {
        const logger = new Logger();

        const storage = new FakeLocalStorage({
            'mbSettings': {
                "userFilters": [],
                'useUserFilters': true
            }
        });
        const browser = new FakeBrowser();
        const settingsRepository = new SettingsRepository(storage, logger);
        const userFilters = new UserFilters(
            undefined,
            logger,
            new BuiltInFilters(
                {'filtersPath': 'assets/fakeFilters.txt'},
                logger,
                browser
            )
        )

        const removeUserFiltersListItem = new RemoveUserFiltersListItem(
            settingsRepository,
            logger,
            browser,
            userFilters
        );

        const removedUserFiltersListItem = await removeUserFiltersListItem.run(faker.internet.url());

        assert.equal(removedUserFiltersListItem, undefined);

        const savedSettings = await settingsRepository.findOrCreate();

        assert.equal(savedSettings.userFilters.toString(), [].toString());
    });

    it('tries to remove user filter list item, but not in list', async () => {
        const logger = new Logger();

        const userFiltersList = [
            faker.internet.url(),
            faker.internet.url(),
        ];
        const browser = new FakeBrowser();

        const storage = new FakeLocalStorage({
            'mbSettings': {
                "userFilters": userFiltersList,
                'useUserFilters': true
            }
        });
        const settingsRepository = new SettingsRepository(storage, logger);
        const userFilters = new UserFilters(
            undefined,
            logger,
            new BuiltInFilters(
                {'filtersPath': 'assets/fakeFilters.txt'},
                logger,
                browser
            )
        )

        const removeUserFiltersListItem = new RemoveUserFiltersListItem(
            settingsRepository,
            logger,
            browser,
            userFilters
        );

        const removedUserFiltersListItem = await removeUserFiltersListItem.run(faker.internet.url());

        assert.equal(removedUserFiltersListItem, undefined);

        const savedSettings = await settingsRepository.findOrCreate();

        assert.equal(savedSettings.userFilters.toString(), userFiltersList.toString());
    });

    it('removes user filter list item, user filter not activated', async () => {
        const logger = new Logger();

        const userFiltersList = [
            faker.internet.url(),
            faker.internet.url(),
        ];
        const browser = new FakeBrowser();

        const storage = new FakeLocalStorage({
            'mbSettings': {
                "userFilters": userFiltersList,
                'useUserFilters': false
            }
        });
        const settingsRepository = new SettingsRepository(storage, logger);
        const userFilters = new UserFilters(
            undefined,
            logger,
            new BuiltInFilters(
                {'filtersPath': 'assets/fakeFilters.txt'},
                logger,
                browser
            )
        )

        const removeUserFiltersListItem = new RemoveUserFiltersListItem(
            settingsRepository,
            logger,
            browser,
            userFilters
        );

        const removedUserFiltersListItem = await removeUserFiltersListItem.run(faker.internet.url());

        assert.equal(removedUserFiltersListItem, undefined);

        const savedSettings = await settingsRepository.findOrCreate();

        assert.equal(savedSettings.userFilters.toString(), userFiltersList.toString());
    });
});