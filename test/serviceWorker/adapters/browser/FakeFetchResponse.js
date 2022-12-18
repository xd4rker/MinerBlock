export class FakeFetchResponse {
    #text;
    constructor(text) {
        this.#text = text;
    }

    text () {
        return this.#text;
    }
}