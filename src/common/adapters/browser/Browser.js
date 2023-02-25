class Browser {
    /** @type{Chrome} */
    #browser;

    constructor(browser) {
        this.#browser = browser;
    }

    /**
     * @param {any} message
     * @returns {Promise<any>}
     */
    async sendMessage(message) {
        return this.#browser.sendMessage(message);
    }

    /**
     * @param {number} tabId
     * @param {any} message
     * @returns {Promise<any>}
     */
    async sendMessageToTabs(tabId, message) {
        return this.#browser.sendMessageToTabs(tabId, message);
    }

    /**
     * Reload tab by tab id.
     *
     * @param {number} tabId
     * @returns {Promise<void>}
     */
    async reload(tabId) {
        return await this.#browser.reload(tabId);
    }

    /**
     * @param {object} queryInfo
     * @returns {Promise<*>}
     *
     * @see https://developer.chrome.com/docs/extensions/reference/tabs/#method-query
     */
    async tabsQuery(queryInfo) {
        return await this.#browser.tabsQuery(queryInfo);
    }

    /**
     * @returns {Promise<void>}
     */
    async openOptionsPage() {
        await this.#browser.openOptionsPage();
    }

    /**
     * @param {function(*, *, *): Promise<void>} callback
     * @returns {Promise<void>}
     */
    async onMessageAddListener(callback) {
        await this.#browser.onMessageAddListener(callback);
    }

    static isSpecialTab(tab) {
        return /^((chrome:)|(chrome-extension:)|(moz-extension:)|(about:)|(file:)|(blob:)|(data:))/.test(tab.url);
    }
}
