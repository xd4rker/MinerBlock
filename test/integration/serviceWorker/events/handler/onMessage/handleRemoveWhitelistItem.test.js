import { strict as assert } from 'assert';
import {FakeLocalStorage} from "../../../../../serviceWorker/repositories/adapters/FakeLocalStorage.js";
import {SettingsRepository} from "../../../../../../src/serviceWorker/repositories/SettingsRepository.js";
import {Logger} from "../../../../../../src/serviceWorker/adapters/Logger.js";
import {faker} from "@faker-js/faker";
import {FakeBrowser} from "../../../../../serviceWorker/adapters/browser/FakeBrowser.js";
import {RemoveWhitelistItem} from "../../../../../../src/serviceWorker/interactors/RemoveWhitelistItem.js";
import {
    HandleRemoveWhitelistItem
} from "../../../../../../src/serviceWorker/events/handler/onMessage/HandleRemoveWhitelistItem.js";

describe('serviceWorker.events.handler.onMessage.HandleRemoveWhitelistItem', () => {
    it('removes white list item', async () => {
        const domain = faker.internet.url();

        const logger = new Logger();
        const storage = new FakeLocalStorage({
            'mbSettings': {
                "whiteList": [domain]
            }
        });
        const settingsRepository = new SettingsRepository(storage, logger);
        const browser = new FakeBrowser({
            'sendMessage': {
                'return': undefined
        }});

        const handleRemoveWhitelistItem = new HandleRemoveWhitelistItem(
            new RemoveWhitelistItem(settingsRepository, logger),
            browser,
            logger
        );

        let receivedResponse = null;

        const handledRemoveWhitelistItem = await handleRemoveWhitelistItem.run(
            {action: HandleRemoveWhitelistItem.EVENT_NAME, domain: domain},
            'theSender',
            (response) => {
                receivedResponse = response;
            }
        );

        const savedSettings = await settingsRepository.findOrCreate();

        assert.equal(savedSettings.whiteList.toString(), [].toString());

        assert.equal(handledRemoveWhitelistItem, true);
        assert.equal(receivedResponse, true);
    });
});