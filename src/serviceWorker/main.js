'use strict';

import {
	handleAddUserFilterListItem, handleAddWhitelistItem, handleGetDomainWhitelistStatus,
	handleGetMinerBlockCount,
	handleGetRunStatus,
	handleGetShowCount,
	handleGetUseBuiltInFiltersStatus,
	handleGetUserFilterList, handleGetUseUserFiltersStatus, handleGetWhitelist,
	handleMbPause, handleMbStart,
	handleRemoveUserFilterListItem, handleRemoveWhitelistItem, handleReportBlock,
	handleResetSettings, handleSetShowCount,
	handleToggleBuiltInFilters, handleToggleUserFilters, handleSaveWhitelist, handleSaveUserFilterList
} from "./events/handler/onMessage.js";
import {setup} from "./events/handler/onInstalled.js";
import {injectMinerBlocker} from "./events/handler/tabs/onUpdated.js";
import {InitSettings} from "./interactors/init/InitSettings.js";
import {InitBrowser} from "./interactors/init/InitBrowser.js";
import {SetIcon} from "./interactors/SetIcon.js";
import {_browser, settingsRepository} from "./config.js";
import {Visuals} from "./entities/Visuals.js";
import {RemoveFiltersInBrowser} from "./interactors/RemoveFiltersInBrowser.js";

const initSettings = new InitSettings(settingsRepository);
const initBrowser = new InitBrowser(new SetIcon(
	settingsRepository,
	_browser,
	new Visuals()
), new RemoveFiltersInBrowser(_browser));

_browser.onInstalledAddListener(() => setup(initSettings, initBrowser)).then();

_browser.onMessageAddListener(handleGetRunStatus).then();
_browser.onMessageAddListener(handleGetMinerBlockCount).then();
_browser.onMessageAddListener(handleGetUserFilterList).then();
_browser.onMessageAddListener(handleAddUserFilterListItem).then();
_browser.onMessageAddListener(handleRemoveUserFilterListItem).then();
_browser.onMessageAddListener(handleGetShowCount).then();
_browser.onMessageAddListener(handleToggleBuiltInFilters).then();
_browser.onMessageAddListener(handleGetUseBuiltInFiltersStatus).then();
_browser.onMessageAddListener(handleResetSettings).then();
_browser.onMessageAddListener(handleMbPause).then();
_browser.onMessageAddListener(handleMbStart).then();
_browser.onMessageAddListener(handleAddWhitelistItem).then();
_browser.onMessageAddListener(handleSaveWhitelist).then();
_browser.onMessageAddListener(handleRemoveWhitelistItem).then();
_browser.onMessageAddListener(handleGetWhitelist).then();
_browser.onMessageAddListener(handleGetDomainWhitelistStatus).then();
_browser.onMessageAddListener(handleSetShowCount).then();
_browser.onMessageAddListener(handleToggleUserFilters).then();
_browser.onMessageAddListener(handleGetUseUserFiltersStatus).then();
_browser.onMessageAddListener(handleReportBlock).then();
_browser.onMessageAddListener(handleSaveUserFilterList).then();
_browser.onMessageAddListener(function () {
	return true;
}).then();
_browser.tabsOnUpdatedAddListener(injectMinerBlocker).then();