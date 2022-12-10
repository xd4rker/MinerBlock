export class FakeLocalStorage {
    /** @type{object} */
    mbStatistics = {
        "blockReports": [
            {
                "agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
                "time": 1669968318224,
                "url": "http.//lala.com/"
            }
        ],
        "minerBlockCount": 0
    }
    /** @type{object} */
    mbSettings = {
        "runStatus": true,
        "showAlert": false,
        "showCount": false,
        "useBuiltInFilters": true,
        "useUserFilters": false,
        "userFilters": [],
        "whiteList": []
    };

    /**
     * @param {Object} config
     */
    constructor(config = {}) {
        this.mbSettings = config['mbSettings'] ?? this.mbSettings;
        this.mbStatistics = config['mbStatistics'] ?? this.mbStatistics;
    }

    /**
     * @param {string[]} objectNames
     * @returns {Promise<any|undefined>}
     */
    async get(objectNames) {
        if (objectNames.indexOf('mbSettings') !== -1) {
            return { 'mbSettings': this.mbSettings};
        }

        if (objectNames.indexOf('mbStatistics') !== -1) {
            return { 'mbStatistics': this.mbStatistics};
        }

        return undefined;
    }

    /**
     * @param {Object} obj
     * @returns {Promise<boolean>}
     */
    async set(obj) {
        if (obj['mbSettings'] !== undefined) {
            this.mbSettings = obj['mbSettings'];

            return true;
        }

        if (obj['mbStatistics'] !== -1) {
            this.mbStatistics = obj['mbStatistics'];

            return true;
        }

        return false;
    }

    /**
     * @returns {Promise<void>}
     */
    async clear() {}
}