class Context {
    /** @type {Browser} */
    #browser;
    /** @type {Logger} */
    #logger;

    constructor() {
        this.#browser = new Browser(new Chrome());
        this.#logger = new Logger(Logger.LEVEL_DEBUG);
    }

    /**
     * @returns {Browser}
     */
    get browser() {
        return this.#browser;
    }

    /**
     * @returns {Logger}
     */
    get logger() {
        return this.#logger;
    }
}