import {FakeFetchResponse} from "./FakeFetchResponse.js";
import {faker} from "@faker-js/faker";

export class FakeBrowser {
    #data = {
        'executeScript': {
            'return': [{
                'documentId': '14A797CED8E785AAEEE9B35FE9E09C5A',
                'frameId': 0,
                'result': null
            }]
        },
        'fetch': '*://*/*cryptonight.wasm\n*://*/*deepMiner.js\n*://load.jsecoin.com/*\n*://*.coin-hive.com/lib*\n',
        'sendMessage': {
            'return': true
        },
        'getDynamicRules': {
            'return':[{
                "id": 1,
                "priority": 1,
                "action": {"type": "block"},
                "condition": {
                    "urlFilter": faker.internet.url(),
                    "resourceTypes": ["main_frame"]
                }
            }]
        }
    };

    constructor(data = null) {
        this.#data = data ?? this.#data;
    }

    /**
     * @param tabId
     * @param files
     * @param world
     * @returns {Promise<Object[]>}
     */
    async executeScript(tabId, files, world) {
        return this.#data['executeScript']['return'];
    }

    /**
     * @param {number[]} ruleIdsToBeRemoved
     * @param {Rule[]} rulesToBeAdded
     * @returns {Promise<void>}
     */
    async removeAndAddDynamicRule(ruleIdsToBeRemoved, rulesToBeAdded) {

    }

    /**
     * @param {number[]} ruleIdsToBeRemoved
     * @returns {Promise<void>}
     */
    async removeDynamicRules(ruleIdsToBeRemoved) {

    }

    /**
     * @param {string} path
     * @returns {string}
     */
    getURL(path) {
        return path
    }

    /**
     * @param {string} path
     * @returns {Promise<FakeFetchResponse>}
     */
    async fetch(path) {
        return new FakeFetchResponse(this.#data.fetch);
    }

    /**
     * @param {string|ColorArray} color
     * @returns {Promise<void>}
     */
    async setBadgeBackgroundColor(color) {

    }

    /**
     * @param {string} text
     * @returns {Promise<void>}
     */
    async setBadgeText(text) {

    }

    /**
     * @param {any} message
     * @returns {Promise<any>}
     */
    async sendMessage(message) {
        return this.#data['sendMessage']['return'];
    }

    /**
     * @returns {Promise<chrome.declarativeNetRequest.Rule[]>}
     */
    async getDynamicRules() {
        return this.#data['getDynamicRules']['return'];
    }

    /**
     * @param {string|object} iconPath
     * @returns {Promise<void>}
     */
    async setIcon(iconPath) {

    }

    /**
     * @param {string} id
     * @param {string[]} files
     * @param {ExecutionWorld} world
     * @param {string[]} excludeMatches
     * @returns {Promise<void>}
     */
    async registerContentScripts(id, files, world, excludeMatches)
    {

    }

    /**
     * @param {string[]} ids
     * @returns {Promise<void>}
     */
    async unregisterContentScripts(ids)
    {

    }
}