import { strict as assert } from 'assert';
import {FakeLocalStorage} from "../../../../../serviceWorker/repositories/adapters/FakeLocalStorage.js";
import {SettingsRepository} from "../../../../../../src/serviceWorker/repositories/SettingsRepository.js";
import {Logger} from "../../../../../../src/serviceWorker/adapters/Logger.js";
import {
    HandleGetDomainWhitelistStatus
} from "../../../../../../src/serviceWorker/events/handler/onMessage/HandleGetDomainWhitelistStatus.js";
import {GetWhitelistStatus} from "../../../../../../src/serviceWorker/interactors/GetWhitelistStatus.js";
import {GetWhitelist} from "../../../../../../src/serviceWorker/interactors/GetWhitelist.js";
import {faker} from "@faker-js/faker";

describe('serviceWorker.interactors.HandleGetDomainWhitelistStatus', () => {
    it('get state if domain is whitelisted', async () => {
        const logger = new Logger();
        const url = faker.internet.url();

        const storage = new FakeLocalStorage({
            'mbSettings': {
                'whiteList': [url]
            }
        });

        const settingsRepository = new SettingsRepository(storage, logger);

        const handleGetDomainWhitelistStatus = new HandleGetDomainWhitelistStatus(
            new GetWhitelistStatus(
                new GetWhitelist(settingsRepository, logger),
                logger
            ),
            logger
        );

        let receivedResponse = null;

        const handledToggleUserFilters = await handleGetDomainWhitelistStatus.run(
            {action: HandleGetDomainWhitelistStatus.EVENT_NAME, domain: url},
            'theSender',
            (response) => {
                receivedResponse = response;
            }
        );

        assert.equal(handledToggleUserFilters, true);
        assert.equal(receivedResponse, true);
    });
});