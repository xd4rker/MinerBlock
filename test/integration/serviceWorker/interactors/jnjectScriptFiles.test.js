import { strict as assert } from 'assert';
import {FakeLocalStorage} from "../../../serviceWorker/repositories/adapters/FakeLocalStorage.js";
import {Logger} from "../../../../src/serviceWorker/adapters/Logger.js";
import {SettingsRepository} from "../../../../src/serviceWorker/repositories/SettingsRepository.js";
import {InjectMinerBlocker} from "../../../../src/serviceWorker/interactors/InjectMinerBlocker.js";
import {GetRunStatus} from "../../../../src/serviceWorker/interactors/GetRunStatus.js";
import {GetWhitelistStatus} from "../../../../src/serviceWorker/interactors/GetWhitelistStatus.js";
import {Domain} from "../../../../src/serviceWorker/entities/Domain.js";
import {GetWhitelist} from "../../../../src/serviceWorker/interactors/GetWhitelist.js";
import {Browser} from "../../../serviceWorker/entities/browser/Browser.js";
import { faker } from '@faker-js/faker';


it('Inject script files', async () => {
    const tab = {
        id:  Number(faker.random.numeric(1)),
        url: faker.internet.url()
    };

    const filePaths = [
        '/test/testing.js',
    ];

    const executeReturnValue = [{
        'documentId': faker.random.alphaNumeric(32, {casing: 'upper'}),
        'frameId': 0,
        'result': null
    }];

    const browser = new Browser({
        'executeScript': {
        'return': executeReturnValue
    }});

    const fakeLocalStorage = new FakeLocalStorage({
        'mbSettings': {
            "runStatus": true,
            "whiteList": []
        }
    });

    const logger = new Logger();

    const settingsRepository = new SettingsRepository(
        fakeLocalStorage,
        logger
    );

    const injectMinerBlocker = new InjectMinerBlocker(
        browser,
        new GetRunStatus(settingsRepository, logger),
        logger,
        new GetWhitelistStatus(
            Domain.getDomain(tab.url),
            new GetWhitelist(settingsRepository, logger),
            logger
        )
    );
    const injectedResult = await injectMinerBlocker.run(
        tab.id,
        filePaths,
        'MAIN',
    );

    assert.equal(injectedResult, executeReturnValue);
});