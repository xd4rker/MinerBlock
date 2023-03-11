'use strict';

/**
 * Dispatcher
 *
 * Triggers scan of code injected into page and acts as a relay between service worker and that injected code.
 *
 * 1. Trigger start scan when content script loaded (isolated world)
 * 		- send postMessage to page (content script in main world), injected code is listening for request and will be start scanning
 * 2. Forwards block report to service worker
 * 		- listens to postMessage from page (main world)
 * 		- sendMessage to service worker
 */
class Dispatcher {
	static RUN_DELAY_IN_MILLISECONDS = 4000;
	#minerFound = false;
	#logger;
	#browser;
	#window;
	#navigator;
	#report;

	static ACTION_GET_MINER_FOUND_REQUEST = 'getMinerFoundRequest';
	static ACTION_GET_MINER_FOUND_RESPONSE = 'getMinerFoundResponse';

	constructor(logger, browser, window, navigator) {
		this.#logger = logger;
		this.#browser = browser;
		this.#window = window;
		this.#navigator = navigator;
	}

	init() {
		this.addListener();
	}

	async triggerStartScan() {
		await new Promise(resolve => setTimeout(resolve, this.constructor.RUN_DELAY_IN_MILLISECONDS));

		const status = await this.#browser.sendMessage({action: 'getRunStatus'});

		this.#logger.debug("RunStatus", `MinerBlock.${this.constructor.name}`, status);

		if (status === false) {
			return;
		}

		const isWhitelisted = await this.#browser.sendMessage({
			action: 'getDomainWhitelistStatus',
			domain: this.#window.location.host
		});

		if (isWhitelisted === true) {
			this.#logger.debug("Is whitelisted", `MinerBlock.${this.constructor.name}`, isWhitelisted);

			return;
		}

		this.#logger.debug("Request for scan action to be sent", `MinerBlock.${this.constructor.name}`);
		this.#window.postMessage({type: "CONTENT_SCRIPT", text: "startScan"}, "*");
	}

	async reactToBlockReport(event) {
		if (
			event.source !== this.#window ||
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

		this.#minerFound = true;

		//TODO: sanitization needed? str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"")

		event.data.report['agent'] = this.#navigator.userAgent;

		this.#report = event.data.report;

		await this.#browser.sendMessage({
			'action': 'blockReport',
			'report': this.#report
		});
	}

	async respondToGetMinerFound(message, sender, sendResponse) {
		if (message.action !== this.constructor.ACTION_GET_MINER_FOUND_REQUEST) {
			return;
		}

		await this.#browser.sendMessage({
			action: this.constructor.ACTION_GET_MINER_FOUND_RESPONSE,
			minerFound: this.#minerFound
		});
	}

	addListener() {
		this.#window.addEventListener("load", () => this.triggerStartScan());
		this.#window.addEventListener("message", (event) => this.reactToBlockReport(event), false);
		this.#browser.onMessageAddListener((message, sender, sendResponse) => this.respondToGetMinerFound(message, sender, sendResponse));
	}
}
