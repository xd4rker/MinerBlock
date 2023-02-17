export class ResetMinerBlockerRegistration {
    /** @type{RegisterMinerBlocker} */
    #registerMinerBlocker;
    /** @type{UnregisterMinerBlocker} */
    #unregisterMinerBlocker;
    /** @type{Logger} */
    #logger;
    /** @type{Browser} */
    #browser;

    constructor(registerMinerBlocker, unregisterMinerBlocker, browser, logger) {
        this.#registerMinerBlocker = registerMinerBlocker;
        this.#unregisterMinerBlocker = unregisterMinerBlocker;
        this.#logger = logger;
        this.#browser = browser;
    }

    async run() {
        await this.#unregisterMinerBlocker.run();
        await this.#registerMinerBlocker.run();

        this.#logger.debug('Reset registration minerBlock', 'ResetMinerBlockerRegistration.run');
    }
}