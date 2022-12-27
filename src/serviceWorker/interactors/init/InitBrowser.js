/**
 * Initiate browser specific properties.
 */
export class InitBrowser {
    /** @type{SetIcon} */
    #setIcon;
    /** @type{RemoveFiltersInBrowser} */
    #removeFiltersInBrowser;

    constructor(setIcon, removeFiltersInBrowser) {
        this.#setIcon = setIcon;
        this.#removeFiltersInBrowser = removeFiltersInBrowser;
    }

    /**
     * @returns {Promise<void>}
     */
    async run() {
        await Promise.all([
            this.#setIcon.run(),
            this.#removeFiltersInBrowser.run()
        ]);
    }
}