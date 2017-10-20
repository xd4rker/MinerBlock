'use strict';

function triggerMbEvent(miner) {
	let event = new CustomEvent('minerBlocked', {
		detail: {
			minerUrl: miner
		}
	});
	document.dispatchEvent(event);
}

for(let name in this) {

	if(name === 'webkitStorageInfo') {
		continue;
	}

	// Check coinhive miner

	if(	this[name]
		&& typeof this[name] !== 'undefined'
		&& typeof this[name].isRunning === 'function'
		&& typeof this[name].stop === 'function') {
		console.log('[+] Coinhive miner found, stopping...');
		this[name].stop();
		this[name] = null;
		triggerMbEvent('coinhive.com');
	}
}