'use strict';

var pauseIcon = 'icons/icon_off.png',
	startIcon = 'icons/icon.png',
	mbTabs = {},
	mbwTabs = [],
	urls = [],
	currentTabId,
	mbSettings;

function HTTPGetText(url, handleReqListener, handleReqError) {
	var oReq = new XMLHttpRequest();
	oReq.onload = handleReqListener;  
	oReq.onerror = handleReqError;
	oReq.open('get', url, true);
	oReq.send();
}

function handleReqListener() {
	let data = this.responseText;
}

function handleReqError(err) {
	console.log('Error: ', err);
}

function initBackground() {

	updateSettings(function(value) {
		initListeners(value['mbRunStatus']);
	});
}

function updateSettings(callback) {
	utils.getSettings(function(value) {
		mbSettings = value;

		HTTPGetText(chrome.runtime.getURL('assets/filters.txt'), function() {

			if(mbSettings['mbFilters']) {
				let data = this.responseText;
				data = data.split('\n');
				data = utils.cleanArray(data);
				urls = urls.concat(data);
			}
			urls = urls.concat(mbSettings['mbUserFilters']);

			callback(value);

		}, handleReqError);
		
	});
}

function updateIcon(status, ctabId) {
	let icon = (status === true) ? startIcon : pauseIcon;
	if(ctabId === undefined) {
		chrome.browserAction.setIcon({path: icon});
	} else {
		chrome.browserAction.setIcon({path: icon, tabId: ctabId});
	}

}

function changeMbStatus(status) {
	initListeners(status);
	mbSettings['mbRunStatus'] = status;
	utils.setOption('mbRunStatus', status, utils.noop);
}

function addwList(url) {
	let isUrlwListed = utils.checkWhiteList(url, mbSettings['mbWhiteList']);

	if(isUrlwListed) {
		return;
	}

	if(mbSettings['mbWhiteList'] === null) {
		mbSettings['mbWhiteList'] = [];
	}

	mbSettings['mbWhiteList'].push(url);

	utils.setOption('mbWhiteList', mbSettings['mbWhiteList'], utils.noop);

}

function removewList(url) {
	let isUrlwListed = utils.checkWhiteList(url, mbSettings['mbWhiteList']);
	
	if(!isUrlwListed) {
		return;
	}

	let urlIndex = mbSettings['mbWhiteList'].indexOf(url);

	if(urlIndex > -1) {
		mbSettings['mbWhiteList'].splice(urlIndex, 1);
		utils.setOption('mbWhiteList', mbSettings['mbWhiteList'], utils.noop);
	}

}

function updateBadge(mcount, tabId) {
	chrome.browserAction.setBadgeBackgroundColor({
		color: (mcount == 0) ? [16, 201, 33, 100] : [200, 0, 0, 100],
		tabId: tabId
	});

	chrome.browserAction.setBadgeText({
	    text: String(mcount),
	    tabId: tabId
	});
}

function addmbTab(tabId, rootDomain) {
	if(tabId in mbTabs) {
		if(mbTabs[tabId].indexOf(rootDomain) === -1) {
			mbTabs[tabId].push(rootDomain);
		}

	} else {
		mbTabs[tabId] = [rootDomain];
	}
}

function handleOnUpdatedListener(tabId, changeInfo, tab) {

	let tabwIndex = mbwTabs.indexOf(tabId);

	if(changeInfo && changeInfo.url) {

		if(tabId in mbTabs) {
			delete mbTabs[tabId];
		}

		let isUrlwListed = utils.checkWhiteList(utils.getDomain(changeInfo.url), mbSettings['mbWhiteList']);
		if(isUrlwListed) {
			if(tabwIndex < 0) {
				mbwTabs.push(tabId);
			}
		} else {
			if(tabwIndex > -1) {
				mbwTabs.splice(tabwIndex, 1);
			}
		}
	}
}

function handleOnRemovedListener(tabId) {
	if(tabId in mbTabs) {
		delete mbTabs[tabId];
	}
}

function handleOnBeforeRequest(details) {

	if(details.tabId === -1 || mbwTabs.indexOf(details.tabId) > -1) {
		return {cancel: false};
	}

	let rootDomain = utils.getRootDomain(details.url);
	if(details.tabId in mbTabs) {
		if(mbTabs[details.tabId].indexOf(rootDomain) === -1) {
			mbTabs[details.tabId].push(rootDomain);
		}

	} else {
		mbTabs[details.tabId] = [rootDomain];
	}

	if(mbSettings['mbShowCount']) {
		updateBadge(mbTabs[details.tabId].length, details.tabId);
	}

	return {cancel: true};
}

function initListeners(stat) {

	if(urls.length === 0) {
		return;
	}

	if(chrome.tabs.onUpdated.hasListener(handleOnUpdatedListener)) {
		chrome.tabs.onUpdated.removeListener(handleOnUpdatedListener);
	}

	if(chrome.tabs.onRemoved.hasListener(handleOnRemovedListener)) {
		chrome.tabs.onRemoved.removeListener(handleOnRemovedListener);
	}

	if(chrome.webRequest.onBeforeRequest.hasListener(handleOnBeforeRequest)) {
		chrome.webRequest.onBeforeRequest.removeListener(handleOnBeforeRequest);
	}

	if(stat == true) {
		chrome.tabs.onUpdated.addListener(handleOnUpdatedListener);
		chrome.tabs.onRemoved.addListener(handleOnRemovedListener);
		chrome.webRequest.onBeforeRequest.addListener(handleOnBeforeRequest, {urls: urls}, ['blocking']);
	}
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if(message.action == 'mbPause') {
        changeMbStatus(false);

    } else if(message.action == 'mbStart') {
    	changeMbStatus(true);
    
    } else if(message.action == 'addWlist') {
    	let domain = utils.getDomain(message.tab.url);
    	addwList(domain);

		if(message.tab.id in mbTabs) {
			delete mbTabs[message.tab.id];
		}

		let tabwIndex = mbwTabs.indexOf(message.tab.id);
		if(tabwIndex < 0) {
			mbwTabs.push(message.tab.id);
		}

    } else if(message.action == 'removeWlist') {
    	let domain = utils.getDomain(message.tab.url);
    	removewList(domain);

		let tabwIndex = mbwTabs.indexOf(message.tab.id);
		if(tabwIndex > -1) {
			mbwTabs.splice(tabwIndex, 1);
		}

    } else if(message.action == 'optionUpdated') {
    	urls = [];
		mbwTabs = [];
		initBackground();

    } else if(message.action == 'minerBlockedFromContent') {

    	addmbTab(sender.tab.id, message.minerUrl);

		if(mbSettings['mbShowCount']) {
			updateBadge(mbTabs[sender.tab.id].length, sender.tab.id);
		}

    } else if(message.action == 'getmKillStatus') {
    	if(mbSettings['mbRunStatus'] === false) {
    		sendResponse({mKillStatus: false});

    	} else {
    		let isUrlwListed = utils.checkWhiteList(utils.getDomain(message.url), mbSettings['mbWhiteList']);
    		sendResponse({mKillStatus: !isUrlwListed});
    	}
    }

});

initBackground();