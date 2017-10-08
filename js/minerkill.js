'use strict';

function triggerEvent(miner) {
	let event = new CustomEvent('minerBlocked', {
		detail: {
			minerUrl: miner
		}
	});
	document.dispatchEvent(event);
}

let event = new Event('minerBlocked');

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
		triggerEvent('coinhive.com');
	}
}