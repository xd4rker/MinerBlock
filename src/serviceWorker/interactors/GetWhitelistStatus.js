/**
 * Get status if MinerBlock whitelisting is activated.
 */
export class GetWhitelistStatus {
    /** @type{GetWhitelist} */
    #getWhitelist;
    /** @type{Logger} */
    #logger;

    constructor(getWhitelist, logger) {
        this.#getWhitelist = getWhitelist;
        this.#logger = logger;
    }

    async run(domain) {
        //TODO: ignore internal pages

        const whitelist = await this.#getWhitelist.run();

        if (whitelist.includes(domain)) {
            this.#logger.debug(
                'Url whitelisted.',
                'GetWhitelistStatus',
                domain
            );

            return true;
        }

        this.#logger.debug(
            'Url not whitelisted.',
            'GetWhitelistStatus',
            domain
        );

        return false;
    }
}