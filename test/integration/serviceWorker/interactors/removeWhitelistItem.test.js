import { strict as assert } from 'assert';
import {FakeLocalStorage} from "../../../serviceWorker/repositories/adapters/FakeLocalStorage.js";
import {Logger} from "../../../../src/serviceWorker/adapters/Logger.js";
import {SettingsRepository} from "../../../../src/serviceWorker/repositories/SettingsRepository.js";
import { faker } from '@faker-js/faker';
import {RemoveWhitelistItem} from "../../../../src/serviceWorker/interactors/RemoveWhitelistItem.js";

it('removes whitelist item', async () => {
    const logger = new Logger();

    const whitelist = [
        faker.internet.url(),
        faker.internet.url(),
    ];

    const storage = new FakeLocalStorage({
        'mbSettings': {
            "whiteList": whitelist
        }
    });
    const settingsRepository = new SettingsRepository(storage, logger);

    const removeWhitelistItem = new RemoveWhitelistItem(
        settingsRepository,
        logger
    );

    const removedWhitelistItem = await removeWhitelistItem.run(whitelist[0]);

    assert.equal(removedWhitelistItem, true);

    const savedSettings = await settingsRepository.findOrCreate();

    assert.equal(savedSettings.whiteList.toString(), [whitelist[0]].toString());
});

it('tries to remove whitelist item, but list empty', async () => {
    const logger = new Logger();

    const storage = new FakeLocalStorage({
        'mbSettings': {
            "whiteList": []
        }
    });
    const settingsRepository = new SettingsRepository(storage, logger);

    const removeWhitelistItem = new RemoveWhitelistItem(
        settingsRepository,
        logger
    );

    const removedWhitelistItem = await removeWhitelistItem.run(faker.internet.url());

    assert.equal(removedWhitelistItem, null);
});

it('trie to remove whitelist item, but not in list', async () => {
    const logger = new Logger();

    const whitelist = [
        faker.internet.url(),
        faker.internet.url(),
    ];

    const storage = new FakeLocalStorage({
        'mbSettings': {
            "whiteList": whitelist
        }
    });
    const settingsRepository = new SettingsRepository(storage, logger);

    const removeWhitelistItem = new RemoveWhitelistItem(
        settingsRepository,
        logger
    );

    const removedWhitelistItem = await removeWhitelistItem.run(faker.internet.url());

    assert.equal(removedWhitelistItem, null);

    const savedSettings = await settingsRepository.findOrCreate();

    assert.equal(savedSettings.whiteList.toString(), whitelist.toString());
});