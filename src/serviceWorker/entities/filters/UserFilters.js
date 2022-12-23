import {Filters} from "./Filters.js";

export class UserFilters extends Filters {
    /** @type{BuiltInFilters} */
    #builtInFilters;

    constructor(args = undefined, logger, builtInFilters) {
        super(args, logger);

        this.#builtInFilters = builtInFilters;
    }

    async set(filters) {
        this._filters = filters;
    }

    /**
     * Get rules defined by the user, respectively filters, using offset for built-int rules.
     *
     * These rules are browser specific configurations that in this case are configured to block traffic.
     *
     * When defining rules we partition into built in and user specific ones. The first rules block contains the built-in
     * rules (reason why offset used) the second the user specific rules.
     *
     * @returns {Promise<Rule[]>}
     */
    async getRules() {
        const offset = await this.#builtInFilters.getCount();

        let rules = [];

        const idStart = offset + 1;
        const idEnd = offset + this._filters.length;

        this._logger.debug(
            'Using following parameters to get rules',
            'UserFilters.getRules',
            {
                'idStart': idStart,
                'idEnd': idEnd,
                'offset': offset
            }
        );

        this._logger.debug(
            'Have filters',
            'UserFilters.getRules',
            this._filters
        );

        for (let id = idStart; id <= idEnd; id++) {
            const key = id - offset - 1;

            rules.push({
                "id": id,
                "priority": 1,
                "action": {"type": "block"},
                "condition": {
                    "urlFilter": this._filters[key],
                    "resourceTypes": ["main_frame"]
                }
            });
        }

        return rules;
    }

    /**
     * Get rule ids from filters.
     *
     * @returns {Promise<*[]>}
     */
    async getRuleIds() {
        const offset = await this.#builtInFilters.getCount();

        let ruleIds = [];

        Object.keys(this._filters).forEach(function (key) {
            ruleIds.push(Number(key) + offset + 1);
        });

        return ruleIds;
    }
}