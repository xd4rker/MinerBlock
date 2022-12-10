export class Filters {
    _filters = [];
    /** @type{Logger} */
    _logger;

    constructor(args = undefined, logger) {
        if (args !== undefined) {
            this.setAttributes(args);
        }

        this._logger = logger;
    }

    setAttributes(args) {
        this._filters = args['filters'] ? args['filters'] : this._filters;
    }

    get filters() {
        return this._filters;
    }

    static isValidFilter(filter) {
        return /^.*:\/\/.*\/.*?\*$/.test(filter);
    }
}