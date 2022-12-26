import { strict as assert } from 'assert';
import {FakeLocalStorage} from "../../../../../serviceWorker/repositories/adapters/FakeLocalStorage.js";
import {SettingsRepository} from "../../../../../../src/serviceWorker/repositories/SettingsRepository.js";
import {Logger} from "../../../../../../src/serviceWorker/adapters/Logger.js";
import {faker} from "@faker-js/faker";
import {
    HandleSaveUserFilterList
} from "../../../../../../src/serviceWorker/events/handler/onMessage/HandleSaveUserFilterList.js";
import {SaveUserFilterList} from "../../../../../../src/serviceWorker/interactors/SaveUserFilterList.js";
import {UserFilters} from "../../../../../../src/serviceWorker/entities/filters/UserFilters.js";
import {BuiltInFilters} from "../../../../../../src/serviceWorker/entities/filters/BuiltInFilters.js";
import {FakeBrowser} from "../../../../../serviceWorker/adapters/browser/FakeBrowser.js";

describe('serviceWorker.events.handler.onMessage.handleSaveUserFilterList', () => {
    it('save user filter list', async () => {
        const length = Math.floor(Math.random() * 10) + 1;

        const userFilterList = Array.from({length: length}, () => faker.internet.url());

        const logger = new Logger();
        const storage = new FakeLocalStorage({
            'mbSettings': {
                "userFilters": []
            }
        });
        const settingsRepository = new SettingsRepository(storage, logger);
        const browser = new FakeBrowser();

        const handleSaveUserFilterList = new HandleSaveUserFilterList(
            new SaveUserFilterList(
                settingsRepository,
                new UserFilters(undefined, logger, new BuiltInFilters(undefined, logger, browser)),
                logger,
                browser
            ),
            logger
        );

        let receivedResponse = null;

        const handledSaveUserFilterList = await handleSaveUserFilterList.run(
            {action: HandleSaveUserFilterList.EVENT_NAME, uriPattern: userFilterList},
            'theSender',
            (response) => {
                receivedResponse = response;
            }
        );

        const savedSettings = await settingsRepository.findOrCreate();

        assert.equal(savedSettings.userFilters.toString(), userFilterList.toString());

        assert.equal(handledSaveUserFilterList, true);
        assert.equal(receivedResponse, undefined);
    });
});