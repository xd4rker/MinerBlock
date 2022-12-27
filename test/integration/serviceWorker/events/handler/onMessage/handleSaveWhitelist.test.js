import { strict as assert } from 'assert';
import {FakeLocalStorage} from "../../../../../serviceWorker/repositories/adapters/FakeLocalStorage.js";
import {SettingsRepository} from "../../../../../../src/serviceWorker/repositories/SettingsRepository.js";
import {Logger} from "../../../../../../src/serviceWorker/adapters/Logger.js";
import {faker} from "@faker-js/faker";
import {FakeBrowser} from "../../../../../serviceWorker/adapters/browser/FakeBrowser.js";
import {HandleSaveWhitelist} from "../../../../../../src/serviceWorker/events/handler/onMessage/HandleSaveWhitelist.js";
import {SaveWhitelist} from "../../../../../../src/serviceWorker/interactors/SaveWhitelist.js";

describe('serviceWorker.events.handler.onMessage.HandleSaveWhitelist', () => {
    it('saves whitelist', async () => {
        const length = Math.floor(Math.random() * 10) + 1;

        const domains = Array.from({length: length}, () => faker.internet.url());

        const logger = new Logger();
        const storage = new FakeLocalStorage({
            'mbSettings': {
                "whiteList": []
            }
        });
        const settingsRepository = new SettingsRepository(storage, logger);
        const browser = new FakeBrowser({
            'sendMessage': {
                'return': undefined
        }});

        const handleSaveWhitelist = new HandleSaveWhitelist(
            new SaveWhitelist(settingsRepository, logger),
            browser,
            logger
        );

        let receivedResponse = null;

        const handledSaveWhitelist = await handleSaveWhitelist.run(
            {action: HandleSaveWhitelist.EVENT_NAME, domains: domains},
            'theSender',
            (response) => {
                receivedResponse = response;
            }
        );

        const savedSettings = await settingsRepository.findOrCreate();

        assert.equal(savedSettings.whiteList.toString(), domains.toString());

        assert.equal(handledSaveWhitelist, true);
        assert.equal(receivedResponse, true);
    });
});