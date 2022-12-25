import {GetRunStatus} from "../../../interactors/GetRunStatus.js";
import {InjectScriptFiles} from "../../../interactors/InjectScriptFiles.js";
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
            '/common/adapters/browser/Chrome.js',
            '/common/adapters/browser/Browser.js',
            '/common/config.js',
            '/contentScripts/pageInjection/entities/killers/Killer.js',
            '/contentScripts/pageInjection/entities/killers/CoinHive.js',
            '/contentScripts/pageInjection/entities/killers/Mineralt.js',
            '/contentScripts/pageInjection/entities/killers/Webminerpool.js',
            '/contentScripts/pageInjection/entities/Minerkill.js',
            '/contentScripts/pageInjection/main.js',
        ];

        const getRunStatus = new GetRunStatus(settingsRepository, logger)
        const status = await getRunStatus.run();

        const getWhitelistStatus = new GetWhitelistStatus(
            new GetWhitelist(settingsRepository, logger),
            logger
        );
        const whitelisted = getWhitelistStatus.run(Domain.getDomain(tab.url));

        if (status === false || whitelisted === true) {
            return;
        }

        const injectMinerBlocker = new InjectScriptFiles(
            _browser,
            logger,
        );
        injectMinerBlocker.run(
            tabId,
            filePaths,
            'MAIN',
        ).then();
    }
}