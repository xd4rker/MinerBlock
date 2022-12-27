import {GetRunStatus} from "../../../interactors/GetRunStatus.js";
import {InjectScriptFiles} from "../../../interactors/InjectScriptFiles.js";
import {GetWhitelistStatus} from "../../../interactors/GetWhitelistStatus.js";
import {GetWhitelist} from "../../../interactors/GetWhitelist.js";
import {Domain} from "../../../entities/Domain.js";
import {ContextLoader} from "../../../ContextLoader.js";

const context = ContextLoader.getInstance();
//TODO: remove tmp assignment
const settingsRepository = context.settingsRepository;
const logger = context.logger;
const _browser = context.browser;

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
            '/contentScripts/pageInjection/entities/killers/Killer.js',
            '/contentScripts/pageInjection/entities/killers/CoinHive.js',
            '/contentScripts/pageInjection/entities/killers/Mineralt.js',
            '/contentScripts/pageInjection/entities/killers/Webminerpool.js',
            '/contentScripts/pageInjection/entities/Minerkill.js',
            '/contentScripts/pageInjection/Context.js',
            '/contentScripts/pageInjection/ContextLoader.js',
            '/contentScripts/pageInjection/main.js',
        ];

        const getRunStatus = new GetRunStatus(settingsRepository, logger);
        const status = await getRunStatus.run();

        const getWhitelistStatus = new GetWhitelistStatus(
            new GetWhitelist(settingsRepository, logger),
            logger
        );
        const whitelisted = await getWhitelistStatus.run(Domain.getDomain(tab.url));

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