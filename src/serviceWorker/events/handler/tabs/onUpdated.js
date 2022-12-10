import {GetRunStatus} from "../../../interactors/GetRunStatus.js";
import {InjectMinerBlocker} from "../../../interactors/InjectMinerBlocker.js";
import {_browser, logger, settingsRepository} from "../../../config.js";
import {GetWhitelistStatus} from "../../../interactors/GetWhitelistStatus.js";
import {GetWhitelist} from "../../../interactors/GetWhitelist.js";
import {Domain} from "../../../entities/Domain.js";

/**
 * @param {number} tabId
 * @param {object} changeInfo
 * @param {Tab} tab
 * @returns {Promise<void>}
 */
export async function injectMinerBlocker(tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete' && !_browser.constructor.isSpecialTab(tab)) {
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
    }
}