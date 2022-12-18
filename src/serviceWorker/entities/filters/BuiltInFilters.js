import {Filters} from "./Filters.js";

export class BuiltInFilters extends Filters {
    static FILTERS_PATH = '/assets/filters.txt';

    /** @type {Browser} */
    #browser;

    constructor(args = undefined, logger, browser) {
        super(args, logger);
        this.#browser = browser;
        BuiltInFilters.FILTERS_PATH = args['filtersPath'] ? args['filtersPath'] : BuiltInFilters.FILTERS_PATH;
    }

    async set() {
        this._filters = await this.getFiltersFromFile();
    }

    async getCount() {
        const filters = await this.getFiltersFromFile();

        this._logger.debug(
            'Have built-in filter count',
            'BuiltInFilters.run',
            filters.length
        );

        return filters.length;
    }

    async getFiltersFromFile() {
        const response = await this.#browser.fetch(this.#browser.getURL(BuiltInFilters.FILTERS_PATH));

        if (response === undefined) {
            return null;
        }

        let data = await response.text();

        data = data.split('\n');
        return BuiltInFilters.cleanArray(data);
    }

    static cleanArray(arr) {
        return arr.map(function(e){
            return e.trim();
        }).filter(function(str) { 
            return /^[^#]\S/.test(str);
        });
    };

    static isValidFilter(filter) {
        return /^.*:\/\/.*\/.*?\*$/.test(filter);
    }

    /**
     * Get rules from filters.
     *
     * @returns {*[]}
     */
    getRules() {
        let rules = [];

        for (let key = 1; key <= this._filters.length; key++) {
            rules.push({
                "id": key,
                "priority": 1,
                "action": {"type": "block"},
                "condition": {
                    "urlFilter": this._filters[key-1],
                    "resourceTypes": ["main_frame"]
                }
            });
        }

        return rules;
    }

    /**
     * Get rule ids from filters.
     *
     * @returns {number[]}
     */
    getRuleIds() {
        let ruleIds = [];

        Object.keys(this._filters).forEach(function(key) {
            ruleIds.push(Number(key) + 1);
        });

        return ruleIds;
    }
}