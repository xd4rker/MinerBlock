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

        const frame = await context.browser.getFrame( tabId, 0);

        if (
            (
                frame.documentId !== undefined &&
                frame.documentId !== null
            ) &&
            context.documentsWithInjection.isInjectionExisting(frame.documentId))
        {
            context.logger.debug(
                'Already injected into documentId',
                'injectMinerBlocker',
                frame.documentId
            );

            return;
        }

        context.logger.debug(
            'Added documentId',
            'injectMinerBlocker',
            frame.documentId
        );

        const injectMinerBlocker = new InjectScriptFiles(
            _browser,
            logger,
        );

        const injectionResults = await injectMinerBlocker.run(
            tabId,
            filePaths,
            'MAIN',
        );

        injectionResults.forEach((injectionResult) => {
            /** @var {InjectionResult} injectionResult */
            context.documentsWithInjection.addDocumentId(injectionResult.documentId)
        })

        context.logger.debug(
            'Documents with injection (last id not yet, but in a few)',
            'injectMinerBlocker',
            context.documentsWithInjection
        );
    }
}