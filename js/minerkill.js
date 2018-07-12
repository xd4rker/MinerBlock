'use strict';

function triggerMblockEvent(miner) {
	let event = new CustomEvent('minerBlocked', {
		detail: {
			minerUrl: miner
		}
	});
	document.dispatchEvent(event);
}

setTimeout(function() {
	for(let name in this) {

		if(name === 'webkitStorageInfo') {
			continue;
		}

		try {

			// Check CoinHive like miners
			if(	this[name]
				&& typeof this[name] !== 'undefined'
				&& typeof this[name].isRunning === 'function'
				&& typeof this[name].stop === 'function'
				&& (typeof this[name]._siteKey === 'string' || typeof this[name]._newSiteKey === 'string' || typeof this[name]._address === 'string')
				) {
				console.log('[+] Coinhive miner found, stopping...');
				this[name].stop();
				this[name] = null;
				triggerMblockEvent('CoinHive (inline)');
			}

			// Check Mineralt miners
			if( this[name]
				&& typeof this[name] !== 'undefined'
				&& typeof this[name].db === 'function'
				&& typeof this[name].getlf === 'function'
				&& typeof this[name].stop === 'function'
				&& typeof this[name].hps === 'function'
				&& typeof this[name].hps() === 'number'
				) {
				console.log('[+] Mineralt miner found, stopping...');
				this[name].stop();
				this[name] = null;
				triggerMblockEvent('Mineralt (inline)');
			}

			// Check Webminerpool miners
			if( this[name]
				&& typeof this[name] !== 'undefined'
				&& typeof this[name].addWorker === 'function'
				&& typeof this[name].startMining === 'function'
				&& typeof this[name].stopMining === 'function'
				&& typeof this[name].totalhashes === 'number'
				) {
				console.log('[+] Webminerpool miner found, stopping...');
				this[name].stopMining();
				this[name] = null;
				triggerMblockEvent('Webminerpool (inline)');
			}

		} catch(mberr) {}
	}
}, 2000);
