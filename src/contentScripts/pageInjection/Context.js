class Context {
    /** @type {Logger} */
    #logger;
    /** @type {MinerBlocker} */
    #minerBlocker;

    constructor() {
        this.#logger = new Logger(Logger.LEVEL_DEBUG);
        this.#minerBlocker = new MinerBlocker([
            new CoinHiveKiller(),
            new MineraltKiller(),
            new WebminerpoolKiller()
        ]);
    }

    /**
     * @returns {Logger}
     */
    get logger() {
        return this.#logger;
    }

    get minerBlocker() {
        return this.#minerBlocker;
    }
}