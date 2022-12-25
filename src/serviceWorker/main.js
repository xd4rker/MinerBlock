'use strict';

import {
	handleAddWhitelistItem, handleGetDomainWhitelistStatus,
	handleGetWhitelist,
	handleMbPause, handleMbStart,
	handleRemoveWhitelistItem, handleReportBlock,
	handleResetSettings, handleSetShowCount,
	handleSaveWhitelist, handleSaveUserFilterList
} from "./events/handler/onMessage.js";
import {setup} from "./events/handler/onInstalled.js";
import {injectMinerBlocker} from "./events/handler/tabs/onUpdated.js";
import {InitSettings} from "./interactors/init/InitSettings.js";
import {InitBrowser} from "./interactors/init/InitBrowser.js";
import {SetIcon} from "./interactors/SetIcon.js";
import {_browser, settingsRepository, logger, statisticsRepository} from "./config.js";
import {Visuals} from "./entities/Visuals.js";
import {RemoveFiltersInBrowser} from "./interactors/RemoveFiltersInBrowser.js";
import {HandleGetRunStatus} from "./events/handler/onMessage/HandleGetRunStatus.js";
import {GetRunStatus} from "./interactors/GetRunStatus.js";
import {HandleGetMinerBlockCount} from "./events/handler/onMessage/HandleGetMinerBlockCount.js";
import {HandleGetUserFilterList} from "./events/handler/onMessage/HandleGetUserFilterList.js";
import {GetUserFilterList} from "./interactors/GetUserFilterList.js";
import {HandleGetShowCount} from "./events/handler/onMessage/HandleGetShowCount.js";
import {GetShowCount} from "./interactors/GetShowCount.js";
import {ToggleBuiltInFilters} from "./interactors/ToggleBuiltInFilters.js";
import {BuiltInFilters} from "./entities/filters/BuiltInFilters.js";
import {HandleToggleBuiltInFilters} from "./events/handler/onMessage/HandleToggleBuiltInFilters.js";
import {HandleToggleUserFilters} from "./events/handler/onMessage/HandleToggleUserFilters.js";
import {ToggleUserFilters} from "./interactors/ToggleUserFilters.js";
import {UserFilters} from "./entities/filters/UserFilters.js";
import {HandleGetUseBuiltInFilterStatus} from "./events/handler/onMessage/HandleGetUseBuiltInFilterStatus.js";
import {GetUseBuiltInFiltersStatus} from "./interactors/GetUseBuiltInFiltersStatus.js";
import {HandleGetUseUserFilterStatus} from "./events/handler/onMessage/HandleGetUseUserFilterStatus.js";
import {GetUseUserFilterStatus} from "./interactors/GetUseUserFilterStatus.js";

const initSettings = new InitSettings(settingsRepository);
const initBrowser = new InitBrowser(new SetIcon(
	settingsRepository,
	_browser,
	new Visuals()
), new RemoveFiltersInBrowser(_browser));

_browser.onInstalledAddListener(() => setup(initSettings, initBrowser)).then();


// onMessage #1

const handleGetRunStatus = new HandleGetRunStatus(
	new GetRunStatus(settingsRepository, logger),
	logger
);

_browser.onMessageAddListener(handleGetRunStatus.run.bind(handleGetRunStatus)).then();


// onMessage #2

const handleGetMinerBlockCount = new HandleGetMinerBlockCount(
	statisticsRepository,
	logger
);

_browser.onMessageAddListener(handleGetMinerBlockCount.run.bind(handleGetMinerBlockCount)).then();


// onMessage #3

const handleGetUserFilterList = new HandleGetUserFilterList(
	new GetUserFilterList(settingsRepository, logger),
	logger
);

_browser.onMessageAddListener(handleGetUserFilterList.run.bind(handleGetUserFilterList)).then();


// onMessage #4

const handleGetShowCount = new HandleGetShowCount(
	new GetShowCount(settingsRepository, logger),
	logger
);

_browser.onMessageAddListener(handleGetShowCount.run.bind(handleGetShowCount)).then();


// onMessage #5

const handleToggleBuiltInFilters = new HandleToggleBuiltInFilters(
	new ToggleBuiltInFilters(
		settingsRepository,
		_browser,
		logger,
		new BuiltInFilters(undefined, logger, _browser)
	),
	logger
);

_browser.onMessageAddListener(handleToggleBuiltInFilters.run.bind(handleToggleBuiltInFilters)).then();

// onMessage #6

const handleToggleUserFilters = new HandleToggleUserFilters(
	new ToggleUserFilters(
		settingsRepository,
		_browser,
		logger,
		new UserFilters(undefined, logger, new BuiltInFilters(undefined, logger, _browser))
	),
	logger
);

_browser.onMessageAddListener(handleToggleUserFilters.run.bind(handleToggleUserFilters)).then();


// onMessage #7

const handleGetUseBuiltInFilterStatus = new HandleGetUseBuiltInFilterStatus(
	new GetUseBuiltInFiltersStatus(settingsRepository, logger),
	logger
);

_browser.onMessageAddListener(handleGetUseBuiltInFilterStatus.run.bind(handleGetUseBuiltInFilterStatus)).then();


// onMessage #8

const handleGetUseUserFilterStatus = new HandleGetUseUserFilterStatus(
	new GetUseUserFilterStatus(settingsRepository, logger),
	logger
);

_browser.onMessageAddListener(handleGetUseUserFilterStatus.run.bind(handleGetUseUserFilterStatus)).then();

_browser.onMessageAddListener(handleResetSettings).then();
_browser.onMessageAddListener(handleMbPause).then();
_browser.onMessageAddListener(handleMbStart).then();
_browser.onMessageAddListener(handleAddWhitelistItem).then();
_browser.onMessageAddListener(handleSaveWhitelist).then();
_browser.onMessageAddListener(handleRemoveWhitelistItem).then();
_browser.onMessageAddListener(handleGetWhitelist).then();
_browser.onMessageAddListener(handleGetDomainWhitelistStatus).then();
_browser.onMessageAddListener(handleSetShowCount).then();

_browser.onMessageAddListener(handleReportBlock).then();
_browser.onMessageAddListener(handleSaveUserFilterList).then();
_browser.onMessageAddListener(function () {
	return true;
}).then();
_browser.tabsOnUpdatedAddListener(injectMinerBlocker).then();