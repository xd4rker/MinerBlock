/**
 * Wrapper class for Chrome browser.
 */
class Chrome {
    constructor() {}

    /**
     * @param {any} message
     * @returns {Promise<any>}
     *
     * @see https://developer.chrome.com/docs/extensions/reference/runtime/#method-sendMessage
     */
    async sendMessage(message) {
        return chrome.runtime.sendMessage(message);
    }

    /**
     * Reload tab.
     *
     * @param {number} tabId
     * @returns {Promise<void>}
     *
     * @see https://developer.chrome.com/docs/extensions/reference/tabs/#method-reload
     */
    async reload(tabId) {
        return await chrome.tabs.reload(tabId);
    }

    /**
     * @param {object} queryInfo
     * @returns {Promise<*>}
     *
     * @see https://developer.chrome.com/docs/extensions/reference/tabs/#method-query
     */
    async tabsQuery(queryInfo) {
        return await chrome.tabs.query(queryInfo);
    }

    /**
     * @returns {Promise<void>}
     *
     * @see https://developer.chrome.com/docs/extensions/reference/runtime/#method-openOptionsPage
     *
     * TODO: catch failing opening
     */
    async openOptionsPage() {
        await chrome.runtime.openOptionsPage();
    }

    /**
     * @param {function(*, *, *): Promise<void>} callback
     * @returns {Promise<void>}
     *
     * @see https://developer.chrome.com/docs/extensions/reference/runtime/#event-onMessage
     */
    async onMessageAddListener(callback) {
        await chrome.runtime.onMessage.addListener(callback);
    }
}