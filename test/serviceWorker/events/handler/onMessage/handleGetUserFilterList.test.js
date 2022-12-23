import { strict as assert } from 'assert';
import {FakeLocalStorage} from "../../../repositories/adapters/FakeLocalStorage.js";
import {SettingsRepository} from "../../../../../src/serviceWorker/repositories/SettingsRepository.js";
import {Logger} from "../../../../../src/serviceWorker/adapters/Logger.js";
import {
    HandleGetUserFilterList
} from "../../../../../src/serviceWorker/events/handler/onMessage/HandleGetUserFilterList.js";
import {faker} from "@faker-js/faker";
import {GetUserFilterList} from "../../../../../src/serviceWorker/interactors/GetUserFilterList.js";

describe('serviceWorker.events.handler.onMessage.handleGetUserFilterList', () => {
    it('get user filter list', async () => {
        const userFilterList = Array.from({length: 2}, () => faker.internet.url());

        const logger = new Logger();
        const storage = new FakeLocalStorage({
            'mbSettings': {
                "userFilters": userFilterList
            }
        });
        const settingsRepository = new SettingsRepository(storage, logger);

        const handleGetUserFilterList = new HandleGetUserFilterList(
            new GetUserFilterList(settingsRepository, logger),
            logger
        );

        let receivedResponse = null;

        const handledGetUserFilterList = await handleGetUserFilterList.run(
            {action: HandleGetUserFilterList.EVENT_NAME},
            'theSender',
            (response) => {
                receivedResponse = response;
            }
        );

        assert.equal(handledGetUserFilterList, true);
        assert.equal(receivedResponse.toString(), userFilterList.toString());
    });
});