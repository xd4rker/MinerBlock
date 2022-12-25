import {AddWhitelistItem} from "../../interactors/AddWhitelistItem.js";
import {BuiltInFilters} from "../../entities/filters/BuiltInFilters.js";
import {InitBrowser} from "../../interactors/init/InitBrowser.js";
import {InitSettings} from "../../interactors/init/InitSettings.js";
import {MbPause} from "../../interactors/MbPause.js";
import {MbStart} from "../../interactors/MbStart.js";
import {RemoveFiltersInBrowser} from "../../interactors/RemoveFiltersInBrowser.js";
import {SaveWhitelist} from "../../interactors/SaveWhitelist.js";
import {SetIcon} from "../../interactors/SetIcon.js";
import {UserFilters} from "../../entities/filters/UserFilters.js";
import {Visuals} from "../../entities/Visuals.js";
import {_browser, logger, settingsRepository} from "../../config.js";
import {RemoveWhitelistItem} from "../../interactors/RemoveWhitelistItem.js";
import {SaveUserFilterList} from "../../interactors/SaveUserFilterList.js";

const MESSAGE_EVENT_WHITE_LIST_UPDATED = 'whiteListUpdated';

export async function handleResetSettings(message, sender, sendResponse) {
    if (message.action === 'resetSettings') {
        logger.debug(
            'Got message resetSettings',
            'serviceWorker.handleResetSettings',
            message
        );

        const initSettings = new InitSettings(settingsRepository);
        await initSettings.run();

        sendResponse(true);

        return true;
    }
}

export async function handleMbPause(message, sender, sendResponse) {
    if (message.action === 'mbPause') {
        logger.debug(
            'Received action mbPause',
            'serviceWorker.handleMbPause',
            message
        );

        const setIcon = new SetIcon(
            settingsRepository,
            _browser,
            new Visuals()
        );

        const mbPause = new MbPause(
            settingsRepository,
            setIcon,
            logger
        );

        await mbPause.run();

        sendResponse(true);

        return true;
    }
}

export async function handleMbStart(message, sender, sendResponse) {
    if (message.action === 'mbStart') {
        const setIcon = new SetIcon(
            settingsRepository,
            _browser,
            new Visuals()
        );

        const mbStart = new MbStart(
            settingsRepository,
            new InitBrowser(setIcon, new RemoveFiltersInBrowser(_browser))
        );
        await mbStart.run();

        sendResponse(true);

        return true;
    }
}

export async function handleAddWhitelistItem(message, sender, sendResponse) {
    if (message.action === 'addWhitelistItem' && message.domain !== undefined) {
        logger.debug(
            'Received action addWhitelistItem',
            'serviceWorker.handleAddWhitelistItem',
            message
        );

        const addWhitelistItem = new AddWhitelistItem(settingsRepository, logger);
        await addWhitelistItem.run(message.domain);

        sendResponse(true);

        _browser.sendMessage({event: MESSAGE_EVENT_WHITE_LIST_UPDATED})
            .then()
            .catch((err) => {
                logger.debug(
                    err.message,
                    'serviceWorker.onMessage.handleAddWhitelistItem'
                );
            });

        return true;
    }
}

export async function handleRemoveWhitelistItem(message, sender, sendResponse) {
    if (message.action === 'removeWhitelistItem' && message.domain !== undefined) {
        logger.debug(
            'Got message removeWhitelistItem',
            'serviceWorker.handleRemoveWhitelistItem',
            message
        );

        const removeWhitelistItem = new RemoveWhitelistItem(settingsRepository, logger);
        const removedWhitelistItem = await removeWhitelistItem.run(message.domain);

        sendResponse(removedWhitelistItem);

        _browser.sendMessage({event: MESSAGE_EVENT_WHITE_LIST_UPDATED})
            .then()
            .catch((err) => {
                logger.debug(
                    err.message,
                    'serviceWorker.onMessage.handleAddWhitelistItem'
                );
            });

        return true;
    }
}

export async function handleSaveWhitelist(message, sender, sendResponse) {
    if (message.action === 'saveWhitelist' && message.domains !== undefined) {
        logger.debug(
            'Got message saveWhitelist',
            'serviceWorker.handleSaveWhitelist',
            message
        );

        const saveWhitelist = new SaveWhitelist(settingsRepository, logger);
        await saveWhitelist.run(message.domains);

        sendResponse('finished');

        _browser.sendMessage({event: MESSAGE_EVENT_WHITE_LIST_UPDATED})
            .then()
            .catch((err) => {
                logger.debug(
                    err.message,
                    'serviceWorker.onMessage.handleSaveWhitelist'
                );
            });

        return true;
    }
}

export async function handleSaveUserFilterList(message, sender, sendResponse) {
    if (message.action === 'saveUserFilterList' && message.uriPattern !== undefined) {
        logger.debug(
            'Got message saveUserFilterList',
            'serviceWorker.handleSaveUserFilterList',
            message
        );

        const saveUserFilterList = new SaveUserFilterList(
            settingsRepository,
            new UserFilters(undefined, logger, new BuiltInFilters(undefined, logger, _browser)),
            logger,
            _browser
        );
        await saveUserFilterList.run(message.uriPattern);

        sendResponse('finished');

        return true;
    }
}