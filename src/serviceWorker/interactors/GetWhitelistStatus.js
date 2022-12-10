/**
 * Get status if MinerBlock whitelisting is activated.
 */
export class GetWhitelistStatus {
    /** @type{string} */
    #domain;
    /** @type{GetWhitelist} */
    #getWhitelist;
    /** @type{Logger} */
    #logger;

    constructor(domain, getWhitelist, logger) {
        this.#domain = domain;
        this.#getWhitelist = getWhitelist;
        this.#logger = logger;
    }

    async run() {
        const whitelist = await this.#getWhitelist.run();

        if (whitelist.includes(this.#domain)) {
            this.#logger.debug(
                'Url whitelisted.',
                'GetWhitelistStatus',
                this.#domain
            );

            return true;
        }

        this.#logger.debug(
            'Url not whitelisted.',
            'GetWhitelistStatus',
            this.#domain
        );

        return false;
    }
}