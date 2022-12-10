export class Logger {
    /** @type {number} */
    static LEVEL_ERROR = -1;
    /** @type {number} */
    static LEVEL_DEBUG = 3;

    #logLevel = Logger.LEVEL_ERROR;

    constructor(logLevel) {
        this.#logLevel = logLevel;
    }

    /**
     * @param {string} message
     * @param {string?} where
     * @param {any?} details
     */
    debug (message, where = undefined, details = undefined) {
        if (Logger.LEVEL_DEBUG <= this.#logLevel) {
            console.log(where, message, details);
        }
    }

    /**
     * @param {string} message
     * @param {string?} where
     * @param {any?} details
     */
    error (message, where = undefined, details = undefined) {
        if (Logger.LEVEL_ERROR <= this.#logLevel) {
            console.log(where, message, details);
        }
    }
}