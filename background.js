var blockedTabs = [];

function updateBadge(mcount) {
	chrome.browserAction.setBadgeBackgroundColor({
		color: (mcount == 0) ? [16, 201, 33, 100] : [200, 0, 0, 100]
	});

	chrome.browserAction.setBadgeText({
	    text: String(mcount)
	});
}


function onUpdatedListener(tabId, changeInfo, tab) {
	if(changeInfo.url) {
		updateBadge(0);
		delete blockedTabs[tabId];
	}
}

chrome.tabs.onUpdated.addListener(onUpdatedListener);

function onActivatedListener(details) {
	if(details.tabId in blockedTabs) {
		console.log('TAB: ' + details.tabId + ' Blocked: ' + blockedTabs[details.tabId].length);
		updateBadge(blockedTabs[details.tabId].length);
	} else {
		console.log('TAB: ' + details.tabId + ' Blocked: 0');
		updateBadge(0);
	}
}

chrome.tabs.onActivated.addListener(onActivatedListener);

function blockReq(details) {

	if(details.tabId in blockedTabs) {
		if(blockedTabs[details.tabId].indexOf(details.url) == -1) {
			blockedTabs[details.tabId].push(details.url);
		}
	} else {
		blockedTabs[details.tabId] = [details.url];
	}
	updateBadge(blockedTabs[details.tabId].length);

	return {cancel: true};
}

function updateFilters(urls) {
	if(chrome.webRequest.onBeforeRequest.hasListener(blockReq)) {
		chrome.webRequest.onBeforeRequest.removeListener(blockReq);
	}

	chrome.webRequest.onBeforeRequest.addListener(blockReq, {urls: urls}, ['blocking']);
}

urls = ["*://*.jsecoin.com/*", "*://*.coin-hive.com/*"]

updateListener(true);

function updateListener(stat) {
	if(chrome.webRequest.onBeforeRequest.hasListener(blockReq)) {
		chrome.webRequest.onBeforeRequest.removeListener(blockReq);
	}

	if(chrome.tabs.onUpdated.hasListener(onUpdatedListener)) {
		chrome.tabs.onUpdated.removeListener(onUpdatedListener);
	}

	if(chrome.tabs.onActivated.hasListener(onActivatedListener)) {
		chrome.tabs.onActivated.removeListener(onActivatedListener);
	}

	if(stat == true) {
		chrome.tabs.onUpdated.addListener(onUpdatedListener);
		chrome.tabs.onActivated.addListener(onActivatedListener);
		chrome.webRequest.onBeforeRequest.addListener(blockReq, {urls: urls}, ['blocking']);
	}
}

function init() {
	console.log('[+] Calling init')
	updateBadge(0);

	chrome.storage.sync.get('minerConfig', function(result){
		if((Object.keys(result).length != 0)) {
			var mconf = JSON.parse(result.minerConfig);
			if(mconf.mStatus == true) {
				console.log('[+] Miner Blocker is running');
				chrome.browserAction.setIcon({path: 'icons/icon.png'});
				updateListener(true);
			} else {
				console.log('[+] Miner Blocker is paused');
				chrome.browserAction.setIcon({path: 'icons/icon_off.png'});
				updateListener(false);
				chrome.browserAction.setBadgeText({ 'text': '' });
			}
		} else {

			minerConfig = {'mStatus': true};
			chrome.storage.sync.set({'minerConfig': JSON.stringify(minerConfig)});

		}
	});
}

init();

//updateFilters(urls)