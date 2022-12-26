'use strict';

import {
	handleAddWhitelistItem,
	handleMbPause, handleMbStart,
	handleResetSettings
} from "./events/handler/onMessage.js";
import {setup} from "./events/handler/onInstalled.js";
import {injectMinerBlocker} from "./events/handler/tabs/onUpdated.js";
import {InitSettings} from "./interactors/init/InitSettings.js";
import {InitBrowser} from "./interactors/init/InitBrowser.js";
import {SetIcon} from "./interactors/SetIcon.js";
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
import {HandleAddReport} from "./events/handler/onMessage/HandleAddReport.js";
import {AddReportBlock} from "./interactors/AddReportBlock.js";
import {HighlightBadge} from "./interactors/HighlightBadge.js";
import {HandleSetShowCount} from "./events/handler/onMessage/HandleSetShowCount.js";
import {SetShowCount} from "./interactors/SetShowCount.js";
import {HandleGetDomainWhitelistStatus} from "./events/handler/onMessage/HandleGetDomainWhitelistStatus.js";
import {GetWhitelistStatus} from "./interactors/GetWhitelistStatus.js";
import {GetWhitelist} from "./interactors/GetWhitelist.js";
import {HandleGetWhitelist} from "./events/handler/onMessage/HandleGetWhitelist.js";
import {HandleSaveUserFilterList} from "./events/handler/onMessage/HandleSaveUserFilterList.js";
import {SaveUserFilterList} from "./interactors/SaveUserFilterList.js";
import {ContextLoader} from "./ContextLoader.js";
import {HandleSaveWhitelist} from "./events/handler/onMessage/HandleSaveWhitelist.js";
import {SaveWhitelist} from "./interactors/SaveWhitelist.js";
import {HandleRemoveWhitelistItem} from "./events/handler/onMessage/HandleRemoveWhitelistItem.js";
import {RemoveWhitelistItem} from "./interactors/RemoveWhitelistItem.js";

const context = ContextLoader.getInstance();
//TODO: remove tmp assignment
const settingsRepository = context.settingsRepository;
const statisticsRepository = context.statisticsRepository;
const logger = context.logger;
const _browser = context.browser;

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


// onMessage #9

const handleAddReport = new HandleAddReport(
	new AddReportBlock(
		statisticsRepository,
		logger
	),
	new HighlightBadge(
		_browser,
		3000,
		[200, 0, 0, 100],
		'+1',
		logger
	),
	logger
);

_browser.onMessageAddListener(handleAddReport.run.bind(handleAddReport)).then();


// onMessage #10

const handleSetShowCount = new HandleSetShowCount(
	new SetShowCount(
		settingsRepository,
		logger
	),
	logger
);

_browser.onMessageAddListener(handleSetShowCount.run.bind(handleSetShowCount)).then();


// onMessage #11

const handleGetDomainWhitelistStatus = new HandleGetDomainWhitelistStatus(
	new GetWhitelistStatus(
		new GetWhitelist(settingsRepository, logger),
		logger
	),
	logger
);

_browser.onMessageAddListener(handleGetDomainWhitelistStatus.run.bind(handleGetDomainWhitelistStatus)).then();


// onMessage #12

const handleGetWhitelist = new HandleGetWhitelist(
	new GetWhitelist(settingsRepository, logger),
	logger
);

_browser.onMessageAddListener(handleGetWhitelist.run.bind(handleGetWhitelist)).then();


// onMessage #13

const handleSaveUserFilterList = new HandleSaveUserFilterList(
	new SaveUserFilterList(
		settingsRepository,
		new UserFilters(undefined, logger, new BuiltInFilters(undefined, logger, _browser)),
		logger,
		_browser
	),
	logger
);

_browser.onMessageAddListener(handleSaveUserFilterList.run.bind(handleSaveUserFilterList)).then();


// onMessage #14

const handleSaveWhitelist = new HandleSaveWhitelist(
	new SaveWhitelist(context.settingsRepository, context.logger),
	context.browser,
	context.logger
);

_browser.onMessageAddListener(handleSaveWhitelist.run.bind(handleSaveWhitelist)).then();


// onMessage #15

const handleRemoveWhitelistItem = new HandleRemoveWhitelistItem(
	new RemoveWhitelistItem(context.settingsRepository, context.logger),
	context.browser,
	context.logger
);

_browser.onMessageAddListener(handleRemoveWhitelistItem.run.bind(handleRemoveWhitelistItem)).then();


_browser.onMessageAddListener(handleResetSettings).then();
_browser.onMessageAddListener(handleMbPause).then();
_browser.onMessageAddListener(handleMbStart).then();
_browser.onMessageAddListener(handleAddWhitelistItem).then();

_browser.onMessageAddListener(function () {
	return true;
}).then();
_browser.tabsOnUpdatedAddListener(injectMinerBlocker).then();