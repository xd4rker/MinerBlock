class ContextLoader {
    /** @type {Context} */
    static #instance;

    /**
     * @returns {Context}
     */
    static getInstance() {
        if (ContextLoader.#instance === undefined) {
            ContextLoader.#instance = new Context();
        }

        return ContextLoader.#instance;
    }
}