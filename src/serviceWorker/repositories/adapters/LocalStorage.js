export class LocalStorage {
    /** @type{Browser} */
    #browser;

    constructor(browser) {
        this.#browser = browser;
    }

    /**
     * @param {string[]} objectNames
     * @returns {Promise<any|undefined>}
     */
    async get(objectNames) {
        return await this.#browser.localStorageGet(objectNames);
    }

    /**
     * @param {Object} obj
     * @returns {Promise<boolean>}
     */
    async set(obj) {
        return await this.#browser.localStorageSet(obj);
    }

    /**
     * @returns {Promise<void>}
     */
    async clear() {
        return this.#browser.localStorageClear();
    }
}