export class RegisterMinerBlocker {
    /** @type{string[]} */
    static filePaths = [
        '/contentScripts/pageInjection/adapters/Logger.js',
        '/contentScripts/pageInjection/entities/killers/Killer.js',
        '/contentScripts/pageInjection/entities/killers/CoinHive.js',
        '/contentScripts/pageInjection/entities/killers/Mineralt.js',
        '/contentScripts/pageInjection/entities/killers/Webminerpool.js',
        '/contentScripts/pageInjection/entities/Minerkill.js',
        '/contentScripts/pageInjection/Context.js',
        '/contentScripts/pageInjection/ContextLoader.js',
        '/contentScripts/pageInjection/main.js',
    ];
    /** @type{string} */
    static id = 'wx5xgw6j4w4whe3r34tvw4xu4';
    /** @type{ExecutionWorld} */
    static world = 'MAIN';
    /** @type{GetRunStatus} */
    #getRunStatus;
    /** @type{GetWhitelist} */
    #getWhitelist;
    /** @type{Logger} */
    #logger;
    /** @type{Browser} */
    #browser;

    constructor(getRunStatus, getWhitelist, browser, logger) {
        this.#getRunStatus = getRunStatus;
        this.#getWhitelist = getWhitelist;
        this.#logger = logger;
        this.#browser = browser;
    }

    async run() {
        const status = await this.#getRunStatus.run();
        const whitelist = await this.#getWhitelist.run();

        console.log('adfasdfaf', status);

        if (status === false) {
            return;
        }

        this.#logger.debug('About to register minerBlock', 'RegisterMinerBlocker.run', {
            'whitelist': whitelist
        });

        await this.#browser.registerContentScripts(
            RegisterMinerBlocker.id,
            RegisterMinerBlocker.filePaths,
            RegisterMinerBlocker.world,
            whitelist
        );
    }
}