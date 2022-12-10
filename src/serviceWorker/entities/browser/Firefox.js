/**
 * Wrapper class for Firefox browser.
 */
export class Firefox {
    constructor() {}

    /**
     * @param {number} tabId
     * @param {string[]} files
     * @param {ExecutionWorld|undefined} world
     * @returns {Promise<chrome.scripting.InjectionResult<chrome.scripting.Awaited<unknown>>[]>}
     *
     * @see https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/scripting/executeScript
     *
     * TODO: check world param
     */
    async executeScript(tabId, files, world) {
        return browser.scripting.executeScript({
            target: {tabId: tabId},
            files: files,
            world: world,
        });
    }

    /**
     * @param {string|ColorArray} color
     * @returns {Promise<void>}
     *
     * @see https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/action/setBadgeBackgroundColor
     */
    async setBadgeBackgroundColor(color) {
        return browser.action.setBadgeBackgroundColor({color: color});
    }

    /**
     * @param {string} text
     * @returns {Promise<void>}
     *
     * @see https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/action/setBadgeText
     */
    async setBadgeText(text) {
        return browser.action.setBadgeText({text: text});
    }

    /**
     * @param {string|object} iconPath
     * @returns {Promise<void>}
     *
     * @see https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/action/setIcon
     */
    async setIcon(iconPath) {
        return browser.action.setIcon({path: iconPath});
    }

    /**
     * @param {UpdateRuleOptions} options
     * @returns {Promise<void>}
     *
     * TODO: replace dummy
     */
    async updateDynamicRules(options) {
        return new Promise(() => {});
    }

    /**
     * @returns {Promise<chrome.declarativeNetRequest.Rule[]>}
     *
     * TODO: replace dummy
     */
    async getDynamicRules() {
        return [];
    }

    /**
     * @param {(message: any, sender: MessageSender, sendResponse: function) => boolean | undefined } callback
     * @returns {Promise<void>}
     *
     * @see https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage
     */
    async onMessageAddListener(callback) {
        await browser.runtime.onMessage.addListener(callback);
    }

    /**
     * @param {(details: object) => void } callback
     * @returns {Promise<void>}
     *
     * @see https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onInstalled
     */
    async onInstalledAddListener(callback) {
        return browser.runtime.onInstalled.addListener(callback);
    }

    /**
     * @param {(tabId: number, changeInfo: object, tab: Tab) => void} callback
     * @returns {Promise<void>}
     *
     * @see https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/onUpdated
     */
    async tabsOnUpdatedAddListener(callback) {
        return browser.tabs.onUpdated.addListener(callback);
    }

    /**
     * @param {any} message
     * @returns {Promise<any>}
     *
     * @see https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/sendMessage
     */
    async sendMessage(message) {
        return browser.runtime.sendMessage(message);
    }

    /**
     * @param {string} path
     * @returns {string}
     *
     * @see https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/getURL
     */
    getURL(path) {
        return browser.runtime.getURL(path);
    }

    /**
     * @param {string[]} objectNames
     * @returns {Promise<any|undefined>}
     */
    async localStorageGet(objectNames) {
        const value = await browser.storage.local.get(objectNames);

        if (Object.entries(value).length === 0) {
            return undefined;
        }

        return value;
    }

    /**
     * @returns {Promise<void>}
     *
     * @see https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage/StorageArea/clear
     */
    async localStorageClear() {
        return await browser.storage.local.clear();
    }

    /**
     * @param {Object} obj
     * @returns {Promise<boolean>}
     *
     * @see https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage/StorageArea/get
     */
    async localStorageSet(obj) {
        await browser.storage.local.set(obj);

        if (browser.runtime.lastError) {
            logger.error(
                'Could not set object',
                'Chrome.localStorageSet',
                browser.runtime.lastError
            );

            return false;
        }

        return true;
    }
}