import { strict as assert } from 'assert';
import {FakeLocalStorage} from "../../../../../serviceWorker/repositories/adapters/FakeLocalStorage.js";
import {SettingsRepository} from "../../../../../../src/serviceWorker/repositories/SettingsRepository.js";
import {Logger} from "../../../../../../src/serviceWorker/adapters/Logger.js";
import {HandleGetWhitelist} from "../../../../../../src/serviceWorker/events/handler/onMessage/HandleGetWhitelist.js";
import {GetWhitelist} from "../../../../../../src/serviceWorker/interactors/GetWhitelist.js";
import {faker} from "@faker-js/faker";

describe('serviceWorker.events.handler.onMessage.HandleGetWhitelist', () => {
    it('get whitelist', async () => {
        const length = Math.floor(Math.random() * 10) + 1;

        const whitelist = Array.from({length: length}, () => faker.internet.url());

        const logger = new Logger();
        const storage = new FakeLocalStorage({
            'mbSettings': {
                "whiteList": whitelist
            }
        });
        const settingsRepository = new SettingsRepository(storage, logger);

        const handleGetWhitelist = new HandleGetWhitelist(
            new GetWhitelist(settingsRepository, logger),
            logger
        );

        let receivedResponse = null;

        const handledGetWhitelist = await handleGetWhitelist.run(
            {action: HandleGetWhitelist.EVENT_NAME},
            'theSender',
            (response) => {
                receivedResponse = response;
            }
        );

        assert.equal(handledGetWhitelist, true);
        assert.equal(receivedResponse.toString(), whitelist.toString());
    });
});