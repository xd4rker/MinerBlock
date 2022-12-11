import { strict as assert } from 'assert';
import {FakeLocalStorage} from "../../../serviceWorker/repositories/adapters/FakeLocalStorage.js";
import {Logger} from "../../../../src/serviceWorker/adapters/Logger.js";
import {SettingsRepository} from "../../../../src/serviceWorker/repositories/SettingsRepository.js";
import { faker } from '@faker-js/faker';
import {AddWhitelistItem} from "../../../../src/serviceWorker/interactors/AddWhitelistItem.js";

it('adds whitelist item to empty list', async () => {
    const logger = new Logger();
    const storage = new FakeLocalStorage({
        'mbSettings': {
            "whiteList": []
        }
    });
    const settingsRepository = new SettingsRepository(storage, logger);

    const url = faker.internet.url();

    const addWhitelistItem = new AddWhitelistItem(
        settingsRepository,
        logger
    );

    const whitelistItemAdded = await addWhitelistItem.run(url);

    assert.equal(whitelistItemAdded, true);

    const savedSettings = await settingsRepository.findOrCreate();

    assert.equal(savedSettings.whiteList.toString(), [url].toString());
});

it('adds whitelist item to not empty list', async () => {
    const logger = new Logger();

    let whitelist = [
        faker.internet.url()
    ];

    const storage = new FakeLocalStorage({
        'mbSettings': {
            "whiteList": whitelist
        }
    });
    const settingsRepository = new SettingsRepository(storage, logger);

    const url = faker.internet.url();

    const addWhitelistItem = new AddWhitelistItem(
        settingsRepository,
        logger
    );

    const whitelistItemAdded = await addWhitelistItem.run(url);

    assert.equal(whitelistItemAdded, true);

    const savedSettings = await settingsRepository.findOrCreate();

    whitelist.push(url);

    assert.equal(savedSettings.whiteList.toString(), whitelist.toString());
});