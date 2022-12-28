export class Browser {
    /** @type{import('./Chrome.js').Chrome} */
    #browser;

    constructor(browser) {
        this.#browser = browser;
    }

    /**
     * @param tabId
     * @param files
     * @param world
     * @returns {Promise<InjectionResult[]>}
     */
    async executeScript(tabId, files, world) {
        return this.#browser.executeScript(tabId, files, world);
    }

    /**
     * @param {string|ColorArray} color
     * @returns {Promise<void>}
     */
    async setBadgeBackgroundColor(color) {
        return this.#browser.setBadgeBackgroundColor(color);
    }

    /**
     * @param {string} text
     * @returns {Promise<void>}
     */
    async setBadgeText(text) {
        return this.#browser.setBadgeText(text);
    }

    /**
     * @param {string|object} iconPath
     * @returns {Promise<void>}
     */
    async setIcon(iconPath) {
        return this.#browser.setIcon(iconPath);
    }

    /**
     * Rules are used for filtering pages. To not allow traffic to specific pages. This method removes multiple of these
     * rules.
     *
     * @param {number[]} ruleIdsToBeRemoved
     * @returns {Promise<void>}
     */
    async removeDynamicRules(ruleIdsToBeRemoved) {
        return this.#browser.updateDynamicRules({
            removeRuleIds: ruleIdsToBeRemoved
        });
    }

    /**
     * Rules are used for filtering pages. To not allow traffic to specific pages. This method adds multiple of these
     * rules, in case they existed before, they will be removed.
     *
     * @param {number[]} ruleIdsToBeRemoved
     * @param {Rule[]} rulesToBeAdded
     * @returns {Promise<void>}
     */
    async removeAndAddDynamicRule(ruleIdsToBeRemoved, rulesToBeAdded) {
        return this.#browser.updateDynamicRules({
            addRules: rulesToBeAdded,
            removeRuleIds: ruleIdsToBeRemoved
        });
    }

    /**
     * @returns {Promise<chrome.declarativeNetRequest.Rule[]>}
     */
    async getDynamicRules() {
        return this.#browser.getDynamicRules();
    }

    /**
     * @param {(message: any, sender: MessageSender, sendResponse: function) => boolean | undefined } callback
     * @returns {Promise<void>}
     */
    async onMessageAddListener(callback) {
        await this.#browser.onMessageAddListener(callback);
    }

    /**
     * @param {(details: object) => void } callback
     * @returns {Promise<void>}
     */
    async onInstalledAddListener(callback) {
        return this.#browser.onInstalledAddListener(callback);
    }

    /**
     * @param {(tabId: number, changeInfo: object, tab: Tab) => void} callback
     * @returns {Promise<void>}
     */
    async tabsOnUpdatedAddListener(callback) {
        return this.#browser.tabsOnUpdatedAddListener(callback);
    }

    /**
     * @param {string} path
     * @returns {string}
     */
    getURL(path) {
        return this.#browser.getURL(path);
    }

    /**
     * @param {any} message
     * @returns {Promise<any>}
     */
    async sendMessage(message) {
        return this.#browser.sendMessage(message);
    }

    /**
     * @param {string[]} objectNames
     * @returns {Promise<any|undefined>}
     */
    async localStorageGet(objectNames) {
        return await this.#browser.localStorageGet(objectNames);
    }

    /**
     * @returns {Promise<void>}
     */
    async localStorageClear() {
        return await this.#browser.localStorageClear();
    }

    /**
     * @param {Object} obj
     * @returns {Promise<boolean>}
     */
    async localStorageSet(obj) {
        return await this.#browser.localStorageSet(obj);
    }

    static isSpecialTab(tab) {
        return /^((chrome:)|(chrome-extension:)|(moz-extension:)|(about:)|(file:)|(blob:)|(data:))/.test(tab.url);
    }

    /**
     * @param {string} path
     * @returns {Promise<Response>}
     */
    async fetch(path) {
        return await fetch(path);
    }

    /**
     * @param tabId
     * @param frameId
     * @returns {Promise<GetFrameResultDetails>}
     */
    async getFrame(tabId, frameId) {
        return await this.#browser.getFrame(tabId, frameId);
    }
}