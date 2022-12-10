import { strict as assert } from 'assert';
import {FakeLocalStorage} from "../../../serviceWorker/repositories/adapters/FakeLocalStorage.js";
import {Logger} from "../../../../src/serviceWorker/adapters/Logger.js";
import {SaveWhitelist} from "../../../../src/serviceWorker/interactors/SaveWhitelist.js";
import {SettingsRepository} from "../../../../src/serviceWorker/repositories/SettingsRepository.js";
import {InjectMinerBlocker} from "../../../../src/serviceWorker/interactors/InjectMinerBlocker.js";
import {_browser, logger, settingsRepository} from "../../../../src/serviceWorker/config.js";
import {GetRunStatus} from "../../../../src/serviceWorker/interactors/GetRunStatus.js";
import {GetWhitelistStatus} from "../../../../src/serviceWorker/interactors/GetWhitelistStatus.js";
import {Domain} from "../../../../src/serviceWorker/entities/Domain.js";
import {GetWhitelist} from "../../../../src/serviceWorker/interactors/GetWhitelist.js";


it('saves whitelist', async () => {
    const logger = new Logger();
    const settingsRepository = new SettingsRepository(new FakeLocalStorage(), logger);

    const domains = ['lala', 'lulu'];

    const saveWhitelist = new SaveWhitelist(
        settingsRepository,
        logger
    );

    const whitelistSaved = await saveWhitelist.run(domains);

    assert.equal(whitelistSaved, true);

    const savedSettings = await settingsRepository.findOrCreate();

    assert.equal(savedSettings.whiteList, domains);

    const filePaths = [
        '/common/adapters/Logger.js',
        '/common/entities/browser/Chrome.js',
        '/common/entities/browser/Browser.js',
        '/common/config.js',
        '/contentScripts/pageInjection/entities/killers/Killer.js',
        '/contentScripts/pageInjection/entities/killers/CoinHive.js',
        '/contentScripts/pageInjection/entities/killers/Mineralt.js',
        '/contentScripts/pageInjection/entities/killers/Webminerpool.js',
        '/contentScripts/pageInjection/entities/Minerkill.js',
        '/contentScripts/pageInjection/main.js',
    ];

    const injectMinerBlocker = new InjectMinerBlocker(
        _browser,
        new GetRunStatus(settingsRepository, logger),
        logger,
        new GetWhitelistStatus(
            Domain.getDomain(tab.url),
            new GetWhitelist(settingsRepository, logger),
            logger
        )
    );
    injectMinerBlocker.run(
        tabId,
        filePaths,
        'MAIN',
    ).then();
});