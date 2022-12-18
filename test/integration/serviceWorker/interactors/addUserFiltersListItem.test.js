import { strict as assert } from 'assert';
import {FakeLocalStorage} from "../../../serviceWorker/repositories/adapters/FakeLocalStorage.js";
import {Logger} from "../../../../src/serviceWorker/adapters/Logger.js";
import {SettingsRepository} from "../../../../src/serviceWorker/repositories/SettingsRepository.js";
import { faker } from '@faker-js/faker';
import {AddUserFiltersListItem} from "../../../../src/serviceWorker/interactors/AddUserFiltersListItem.js";
import {UserFilters} from "../../../../src/serviceWorker/entities/filters/UserFilters.js";
import {Browser} from "../../../serviceWorker/adapters/browser/Browser.js";
import {BuiltInFilters} from "../../../../src/serviceWorker/entities/filters/BuiltInFilters.js";

it('adds user filter uri pattern to empty user filter list', async () => {
    const logger = new Logger();
    const storage = new FakeLocalStorage({
        'mbSettings': {
            "userFilters": [],
            "useUserFilters": true
        }
    });
    const settingsRepository = new SettingsRepository(storage, logger);
    const browser = new Browser();

    const url = faker.internet.url();

    const userFilters = new UserFilters(
        undefined,
        logger,
        new BuiltInFilters(
            {'filtersPath': 'assets/fakeFilters.txt'},
            logger,
            browser
        )
    )

    const addUserFiltersListItem = new AddUserFiltersListItem(
        settingsRepository,
        userFilters,
        logger,
        new Browser()
    );

    const userFiltersListItemAdded = await addUserFiltersListItem.run(url);

    assert.equal(userFiltersListItemAdded, undefined);

    const savedSettings = await settingsRepository.findOrCreate();

    assert.equal(savedSettings.userFilters.toString(), [url].toString());
});

it('adds user filter uri pattern to not empty user filter list', async () => {
    let userFiltersList = [
        faker.internet.url()
    ];

    const logger = new Logger();
    const storage = new FakeLocalStorage({
        'mbSettings': {
            "userFilters": userFiltersList,
            "useUserFilters": true
        }
    });
    const settingsRepository = new SettingsRepository(storage, logger);
    const browser = new Browser();

    const url = faker.internet.url();

    const userFilters = new UserFilters(
        undefined,
        logger,
        new BuiltInFilters(
            {'filtersPath': 'assets/fakeFilters.txt'},
            logger,
            browser
        )
    )

    const addUserFiltersListItem = new AddUserFiltersListItem(
        settingsRepository,
        userFilters,
        logger,
        new Browser()
    );

    const userFiltersListItemAdded = await addUserFiltersListItem.run(url);

    assert.equal(userFiltersListItemAdded, undefined);

    const savedSettings = await settingsRepository.findOrCreate();

    userFiltersList.push(url);

    assert.equal(savedSettings.userFilters.toString(), userFiltersList.toString());
});