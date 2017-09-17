function saveConfig(minerStatus) {

	minerConfig = {'mStatus': minerStatus};
	chrome.storage.sync.set({'minerConfig': JSON.stringify(minerConfig)});

}

function getConfig(callback) {

	chrome.storage.sync.get('minerConfig', function(result){
		callback((Object.keys(result).length == 0) ? null : JSON.parse(result.minerConfig));
	});

}

function saveExtenionConfig(mStatus) {

	getConfig(function(result) {
		saveConfig((result === null) ? false : mStatus);
	});
}

function refreshCurrentTab() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    	chrome.extension.getBackgroundPage().init();
        chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
        //window.close();
    });
}

document.addEventListener('DOMContentLoaded', function() {

	chrome.tabs.query({
		active: true,
		currentWindow: true
	}, function(tabs) {
		var tab = tabs[0];

		var background = chrome.extension.getBackgroundPage();

		if(background.blockedTabs[tab.id]) {
			document.getElementById('blockedNum').innerText = background.blockedTabs[tab.id].length;
		}

	});

	getConfig(function(result) {
		var mStatus;

		if(result !== null) {
			document.getElementById('pauseButton').style.display = (result.mStatus == false) ? 'none' : '';
			document.getElementById('startButton').style.display = (result.mStatus == true) ? 'none' : '';
			mStatus = result.mStatus;
		} else {
			document.getElementById('pauseButton').style.display = 'none';
			document.getElementById('startButton').style.display = '';
			mStatus = false;
		}

		var startButton = document.getElementById('startButton');
		startButton.addEventListener('click', function() {

			document.getElementById('pauseButton').style.display = '';
			document.getElementById('startButton').style.display = 'none';
			saveExtenionConfig(true);
			chrome.browserAction.setIcon({path: 'icons/icon_on.png'});
			refreshCurrentTab();

		}, false);

		var pauseButton = document.getElementById('pauseButton');
		pauseButton.addEventListener('click', function() {
			document.getElementById('pauseButton').style.display = 'none';
			document.getElementById('startButton').style.display = '';
			saveExtenionConfig(false);
			chrome.browserAction.setIcon({path: 'icons/icon_off.png'});
			refreshCurrentTab();

		}, false);

	});



}, false);