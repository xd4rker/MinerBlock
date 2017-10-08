(function () {

    'use strict';

    function injectmKiller(status) {
    	if(status) {
		    var node = document.getElementsByTagName('body')[0];
		    var script = document.createElement('script');
		    script.setAttribute('type', 'text/javascript');
		    script.setAttribute('src', chrome.extension.getURL('js/minerkill.js'));
		    node.appendChild(script);    		
    	}
    }

    function initmKiller() {
		chrome.runtime.sendMessage({action: 'getmKillStatus', url: location.host}, function(res) {
			injectmKiller(res.mKillStatus);
		});
    }

	document.onreadystatechange = function () {
		if (document.readyState === "complete") {
			initmKiller();
		}
	}

	document.addEventListener('minerBlocked', function(e) {
		chrome.runtime.sendMessage({action: 'minerBlockedFromContent', minerUrl: e.detail.minerUrl}, function() {});
	}, false);

}());