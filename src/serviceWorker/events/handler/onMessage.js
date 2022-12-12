import {AddReportBlock} from "../../interactors/AddReportBlock.js";
import {AddUserFiltersListItem} from "../../interactors/AddUserFiltersListItem.js";
import {AddWhitelistItem} from "../../interactors/AddWhitelistItem.js";
import {BuiltInFilters} from "../../entities/filters/BuiltInFilters.js";
import {GetRunStatus} from "../../interactors/GetRunStatus.js";
import {GetShowCount} from "../../interactors/GetShowCount.js";
import {GetUseBuiltInFiltersStatus} from "../../interactors/GetUseBuiltInFiltersStatus.js";
import {GetUseUserFilterStatus} from "../../interactors/GetUseUserFilterStatus.js";
import {GetUserFilterList} from "../../interactors/GetUserFilterList.js";
import {GetWhitelistStatus} from "../../interactors/GetWhitelistStatus.js";
import {GetWhitelist} from "../../interactors/GetWhitelist.js";
import {HighlightBadge} from "../../interactors/HighlightBadge.js";
import {InitBrowser} from "../../interactors/init/InitBrowser.js";
import {InitSettings} from "../../interactors/init/InitSettings.js";
import {MbPause} from "../../interactors/MbPause.js";
import {MbStart} from "../../interactors/MbStart.js";
import {RemoveFiltersInBrowser} from "../../interactors/RemoveFiltersInBrowser.js";
import {RemoveUserFiltersListItem} from "../../interactors/RemoveUserFiltersListItem.js";
import {SaveWhitelist} from "../../interactors/SaveWhitelist.js";
import {SetIcon} from "../../interactors/SetIcon.js";
import {SetShowCount} from "../../interactors/SetShowCount.js";
import {ToggleBuiltInFilters} from "../../interactors/ToggleBuiltInFilters.js";
import {ToggleUserFilters} from "../../interactors/ToggleUserFilters.js";
import {UserFilters} from "../../entities/filters/UserFilters.js";
import {Visuals} from "../../entities/Visuals.js";
import {_browser, logger, settingsRepository, statisticsRepository} from "../../config.js";
import {RemoveWhitelistItem} from "../../interactors/RemoveWhitelistItem.js";
import {SaveUserFilterList} from "../../interactors/SaveUserFilterList.js";

const MESSAGE_EVENT_WHITE_LIST_UPDATED = 'whiteListUpdated';
const MESSAGE_EVENT_GET_RUN_STATUS = 'getRunStatus';
const MESSAGE_EVENT_GET_MINER_BLOCK_COUNT = 'getMinerBlockCount';
const MESSAGE_EVENT_GET_USER_FILTER_LIST = 'getUserFilterList';

const MESSAGE_ACTION_BLOCK_REPORT = 'blockReport';

export async function handleGetRunStatus(message, sender, sendResponse) {
    if (message.action === MESSAGE_EVENT_GET_RUN_STATUS) {
        logger.debug(
            'Got message getRunStatus',
            'serviceWorker.handleGetRunStatus',
            message
        );

        const getRunStatus = new GetRunStatus(settingsRepository, logger);
        const status = await getRunStatus.run();

        sendResponse(status);

        return true;
    }
}

export async function handleGetMinerBlockCount(message, sender, sendResponse) {
    if (message.action === MESSAGE_EVENT_GET_MINER_BLOCK_COUNT) {
        logger.debug(
            'Got message getMinerBlockCount',
            'serviceWorker.handleGetMinerBlockCount',
            message
        );

        const count = await statisticsRepository.getMinerBlockCount();

        logger.debug(
            'Returning count',
            'serviceWorker.handleGetMinerBlockCount',
            count
        );

        sendResponse(count);

        return true;
    }
}

export async function handleGetUserFilterList(message, sender, sendResponse) {
    if (message.action === MESSAGE_EVENT_GET_USER_FILTER_LIST) {
        logger.debug(
            'Got message getUserFilterList',
            'serviceWorker.handleGetUserFilterList',
            message
        );

        const getUserFilterList = new GetUserFilterList(settingsRepository, logger)
        const userFilterList = await getUserFilterList.run();

        sendResponse(userFilterList);

        return true;
    }
}

export async function handleRemoveUserFilterListItem(message, sender, sendResponse) {
    if (message.action === 'removeUserFilterListItem') {
        logger.debug(
            'Got message removeUserFilterListItem',
            'serviceWorker.handleRemoveUserFilterListItem',
            message
        );

        const removeUserFiltersListItem = new RemoveUserFiltersListItem(
            settingsRepository,
            message.uriPattern,
            logger,
            _browser,
            new UserFilters(undefined, logger, new BuiltInFilters(undefined, logger, _browser)),
        );
        await removeUserFiltersListItem.run();

        sendResponse(true);

        return true;
    }
}

export async function handleAddUserFilterListItem(message, sender, sendResponse) {
    if (message.action === 'addUserFilterListItem') {
        logger.debug(
            'Got message addUserFilterListItem',
            'serviceWorker.handleAddUserFilterListItem',
            message
        );

        const addUserFiltersListItem = new AddUserFiltersListItem(
            settingsRepository,
            message.uriPattern,
            new UserFilters(undefined, logger, new BuiltInFilters(undefined, logger, _browser)),
            logger,
            _browser
        );
        await addUserFiltersListItem.run();

        sendResponse(true);

        return true;
    }
}

export async function handleGetShowCount(message, sender, sendResponse) {
    if (message.action === 'getShowCount') {
        logger.debug(
            'Got message getShowCount',
            'serviceWorker.handleGetShowCount',
            message
        );

        const getShowCount = new GetShowCount(settingsRepository, logger);
        const showCount = await getShowCount.run();

        sendResponse(showCount);

        return true;
    }
}

export async function handleToggleBuiltInFilters(message, sender, sendResponse) {
    if (message.action === 'toggleBuiltInFilters') {
        logger.debug(
            'Got message toggleBuiltInFilters',
            'serviceWorker.handleToggleBuiltInFilters',
            message
        );

        const activateBuiltInFilters = new ToggleBuiltInFilters(
            settingsRepository,
            message.use,
            _browser,
            logger,
            new BuiltInFilters(undefined, logger, _browser)
        );
        await activateBuiltInFilters.run();

        sendResponse(null);

        return true;
    }
}

export async function handleToggleUserFilters(message, sender, sendResponse) {
    if (message.action === 'toggleUserFilters') {
        logger.debug(
            'Got message toggleUserFilters',
            'serviceWorker.handleToggleUserFilters',
            message
        );

        const activateUserFilters = new ToggleUserFilters(
            settingsRepository,
            message.use,
            _browser,
            logger,
            new UserFilters(undefined, logger, new BuiltInFilters(undefined, logger, _browser))
        );
        await activateUserFilters.run();

        sendResponse(null);

        return true;
    }
}

export async function handleGetUseBuiltInFiltersStatus(message, sender, sendResponse) {
    if (message.action === 'getUseBuiltInFiltersStatus') {
        logger.debug(
            'Got message getUseBuiltInFiltersStatus',
            'serviceWorker.handleGetUseBuiltInFiltersStatus',
            message
        );

        const getShowGetUseBuiltInFiltersStatus = new GetUseBuiltInFiltersStatus(settingsRepository, logger);
        const useBuiltInFiltersStatus = await getShowGetUseBuiltInFiltersStatus.run();

        sendResponse(useBuiltInFiltersStatus);

        return true;
    }
}

export async function handleGetUseUserFiltersStatus(message, sender, sendResponse) {
    if (message.action === 'getUseUserFiltersStatus') {
        logger.debug(
            'Got message getUseUserFiltersStatus',
            'serviceWorker.handleGetUseUserFiltersStatus',
            message
        );

        const getUseUserFilterStatus = new GetUseUserFilterStatus(settingsRepository, logger);
        const useUserFilterStatus = await getUseUserFilterStatus.run();

        sendResponse(useUserFilterStatus);

        return true;
    }
}


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

        const removeWhitelistItem = new RemoveWhitelistItem(settingsRepository, message.domain, logger);
        await removeWhitelistItem.run();

        sendResponse('finished');

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
    if (message.action === 'saveUserFilterList') {
        logger.debug(
            'Got message saveUserFilterList',
            'serviceWorker.handleSaveUserFilterList',
            message
        );

        const saveUserFilterList = new SaveUserFilterList(
            settingsRepository,
            message.uriPattern,
            new UserFilters(undefined, logger, new BuiltInFilters(undefined, logger, _browser)),
            logger,
            _browser
        );
        await saveUserFilterList.run();

        sendResponse('finished');

        return true;
    }
}

export async function handleGetWhitelist(message, sender, sendResponse) {
    if (message.action === 'getWhitelist') {
        logger.debug(
            'Received action getWhitelist',
            'serviceWorker.handleGetWhitelist',
            message
        );

        const getWhitelist = new GetWhitelist(settingsRepository, logger);

        const whitelist = await getWhitelist.run();

        sendResponse(whitelist);

        return true;
    }
}

export async function handleGetDomainWhitelistStatus(message, sender, sendResponse) {
    if (message.action === 'getDomainWhitelistStatus' && message.domain !== undefined) {
        logger.debug(
            'Received action mb getWhitelistStatus',
            'serviceWorker.handleGetDomainWhitelistStatus',
            message
        );

        const getDomainWhitelistStatus = new GetWhitelistStatus(
            message.domain,
            new GetWhitelist(settingsRepository, logger),
            logger
        );

        const status = await getDomainWhitelistStatus.run();
        sendResponse(status);

        return true;
    }
}

export async function handleSetShowCount(message, sender, sendResponse) {
    if (message.action === 'setShowCount' && message.showCount !== undefined) {
        logger.debug(
            'Got message setShowCount',
            'serviceWorker.handleSetShowCount',
            message
        );

        const setShowCount = new SetShowCount(
            settingsRepository,
            logger
        );
        await setShowCount.run(message.showCount);

        sendResponse(true);

        return true;
    }
}

export async function handleReportBlock(message, sender, sendResponse) {
    if (message.action === MESSAGE_ACTION_BLOCK_REPORT && message.report !== undefined) {
        logger.debug(
            'Got message blockReport',
            'serviceWorker.onMessage.handleReportBlock',
            message
        );

        sendResponse('received');

        const addBlockReport = new AddReportBlock(
            statisticsRepository,
            logger
        );
        await addBlockReport.run(message.report);

        const highlightBadge = new HighlightBadge(
            _browser,
            3000,
            [200, 0, 0, 100],
            '+1',
            logger
        );
        await highlightBadge.run();

        return true;
    }
}