
'use strict';

const RUN_DELAY_IN_MILLISECONDS = 4000;

const context = ContextLoader.getInstance();

//TODO: remove tmp assignment
const logger = context.logger;
const _browser = context.browser;

/**
 * Triggers scan of code injected into page and acts as a relay between service worker and that injected code.
 *
 * 1. Trigger start scan when content script loaded
 * 		- send postMessage to page, injected code is listening for request and will be start scanning
 * 2. Forwards block report to service worker
 * 		- listens to postMessage from page
 * 		- sendMessage to service worker
 */

async function triggerStartScan() {
	await new Promise(resolve => setTimeout(resolve, RUN_DELAY_IN_MILLISECONDS));

	const status = await _browser.sendMessage({action: 'getRunStatus'});

	logger.debug("Run", 'Dispatcher', status);

	if (status === false) {
		return;
	}

	const isWhitelisted = await _browser.sendMessage({action: 'getDomainWhitelistStatus', domain: window.location.host});

	if (isWhitelisted === true) {
		logger.debug("Is whitelisted", 'Minerblock', isWhitelisted);

		return;
	}

	logger.debug("Request for scan action to be sent", 'Dispatcher');
	window.postMessage({type: "CONTENT_SCRIPT", text: "startScan"}, "*");
}

async function reactToBlockReport(event) {
	if (
		event.source !== window ||
		event.data.type === undefined ||
		event.data.text === undefined ||
		event.data.report === undefined
	) {
		return;
	}

	if (event.data.type !== "BLOCKER") {
		return;
	}

	if (event.data.text !== "blockReport") {
		return;
	}

	//TODO: sanitization needed? str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"")

	event.data.report['agent'] = navigator.userAgent;

	await _browser.sendMessage({
		'action': 'blockReport',
		'report': event.data.report
	});
}


window.addEventListener("load", () => triggerStartScan());
window.addEventListener("message", (event) => reactToBlockReport(event), false);

