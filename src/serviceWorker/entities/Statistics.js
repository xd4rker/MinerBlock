export class Statistics {
    #minerBlockCount = 0;

    #blockReports = [];

    constructor(args) {
        if (args !== undefined) {
            this.setAttributes(args);
        }
    }

    /**
     * @param {Object} args
     */
    setAttributes(args) {
        this.#minerBlockCount = args.minerBlockCount !== undefined ? args.minerBlockCount : this.#minerBlockCount;
        this.#blockReports = args.blockReports !== undefined ? args.blockReports : this.#minerBlockCount;
    }

    /**
     * @param blockReport
     * @returns {number}
     */
    addBlockReport(blockReport) {
        return this.#blockReports.push(blockReport);
    }

    /**
     * @returns {number}
     */
    get minerBlockCount() {
        return this.#blockReports.length;
    }

    /**
     * @returns {{blockReports: *[], minerBlockCount: number}}
     */
    get toDict() {
        return {
            'minerBlockCount': this.#minerBlockCount,
            'blockReports': this.#blockReports
        };
    }

    get blockReports() {
        return this.#blockReports;
    }
}