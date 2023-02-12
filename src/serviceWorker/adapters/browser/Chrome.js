/**
 * Wrapper class for Chrome browser.
 */
export class Chrome {
    constructor() {}

    /**
     * @param {number} tabId
     * @param {string[]} files
     * @param {ExecutionWorld|undefined} world
     * @returns {Promise<InjectionResult[]>}
     *
     * @see https://developer.chrome.com/docs/extensions/reference/scripting/#method-executeScript
     */
    async executeScript(tabId, files, world) {
        return chrome.scripting.executeScript({
            target: {tabId: tabId},
            files: files,
            world: world,
        });
    }

    /**
     * @param {string} id
     * @param {string[]} files
     * @param {ExecutionWorld} world
     * @param {string[]} excludeMatches
     * @returns {Promise<void>}
     *
     * @see https://developer.chrome.com/docs/extensions/reference/scripting/#method-registerContentScripts
     */
    async registerContentScripts(id, files, world, excludeMatches)
    {
        return chrome.scripting.registerContentScripts([{
            matches: ['http://*/*'],
            excludeMatches: excludeMatches,
            id: id,
            js: files,
            world: world,
        }]);
    }

    /**
     * @param {string[]} ids
     * @returns {Promise<void>}
     *
     * @see https://developer.chrome.com/docs/extensions/reference/scripting/#method-unregisterContentScripts
     */
    async unregisterContentScripts(ids)
    {
        return chrome.scripting.unregisterContentScripts({
            ids: ids,
        });
    }

    /**
     * @param {string|ColorArray} color
     * @returns {Promise<void>}
     *
     * @see https://developer.chrome.com/docs/extensions/reference/browserAction/#method-setBadgeBackgroundColor
     */
    async setBadgeBackgroundColor(color) {
        return chrome.action.setBadgeBackgroundColor({color: color});
    }

    /**
     * @param {string} text
     * @returns {Promise<void>}
     *
     * @see https://developer.chrome.com/docs/extensions/reference/browserAction/#method-setBadgeText
     */
    async setBadgeText(text) {
        return chrome.action.setBadgeText({text: text});
    }

    /**
     * @param {string|object} iconPath
     * @returns {Promise<void>}
     *
     * @see https://developer.chrome.com/docs/extensions/reference/browserAction/#method-setIcon
     */
    async setIcon(iconPath) {
        return chrome.action.setIcon({path: iconPath});
    }

    /**
     * @param {UpdateRuleOptions} options
     * @returns {Promise<void>}
     *
     * @see https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/#method-updateDynamicRules
     */
    async updateDynamicRules(options) {
        return chrome.declarativeNetRequest.updateDynamicRules(options);
    }

    /**
     * @returns {Promise<chrome.declarativeNetRequest.Rule[]>}
     *
     * @see https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/#method-getDynamicRules
     */
    async getDynamicRules() {
        return chrome.declarativeNetRequest.getDynamicRules();
    }

    /**
     * @param {(message: any, sender: MessageSender, sendResponse: function) => boolean | undefined } callback
     * @returns {Promise<void>}
     *
     * @see https://developer.chrome.com/docs/extensions/reference/runtime/#event-onMessage
     */
    async onMessageAddListener(callback) {
        await chrome.runtime.onMessage.addListener(callback);
    }

    /**
     * @param {(details: object) => void } callback
     * @returns {Promise<void>}
     *
     * @see https://developer.chrome.com/docs/extensions/reference/runtime/#event-onInstalled
     */
    async onInstalledAddListener(callback) {
        return chrome.runtime.onInstalled.addListener(callback);
    }

    /**
     * @param {(tabId: number, changeInfo: object, tab: Tab) => void} callback
     * @returns {Promise<void>}
     *
     * @see https://developer.chrome.com/docs/extensions/reference/tabs/
     */
    async tabsOnUpdatedAddListener(callback) {
        return chrome.tabs.onUpdated.addListener(callback);
    }

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
     * @param {string} path
     * @returns {string}
     *
     * @see https://developer.chrome.com/docs/extensions/reference/runtime/#method-getURL
     */
    getURL(path) {
        return chrome.runtime.getURL(path);
    }

    /**
     * @param {string[]} objectNames
     * @returns {Promise<any|undefined>}
     */
    async localStorageGet(objectNames) {
        const value = await chrome.storage.local.get(objectNames);

        if (Object.entries(value).length === 0) {
            return undefined;
        }

        return value;
    }

    /**
     * @returns {Promise<void>}
     */
    async localStorageClear() {
        return await chrome.storage.local.clear();
    }

    /**
     * @param {Object} obj
     * @returns {Promise<boolean>}
     */
    async localStorageSet(obj) {
        await chrome.storage.local.set(obj);

        if (chrome.runtime.lastError) {
            logger.error(
                'Could not set object',
                'Chrome.localStorageSet',
                chrome.runtime.lastError
            );

            return false;
        }

        return true;
    }
}