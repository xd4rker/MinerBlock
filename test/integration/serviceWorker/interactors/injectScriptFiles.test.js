import { strict as assert } from 'assert';
import {Logger} from "../../../../src/serviceWorker/adapters/Logger.js";
import {InjectScriptFiles} from "../../../../src/serviceWorker/interactors/InjectScriptFiles.js";
import {FakeBrowser} from "../../../serviceWorker/adapters/browser/FakeBrowser.js";
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

    const browser = new FakeBrowser({
        'executeScript': {
        'return': executeReturnValue
    }});

    const logger = new Logger();

    const injectMinerBlocker = new InjectScriptFiles(
        browser,
        logger
    );
    const injectedResult = await injectMinerBlocker.run(
        tab.id,
        filePaths,
        'MAIN',
    );

    assert.equal(injectedResult, executeReturnValue);
});