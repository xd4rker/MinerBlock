export class Browser {
    #data = {
        'executeScript': {
            'return': [{
                'documentId': '14A797CED8E785AAEEE9B35FE9E09C5A',
                'frameId': 0,
                'result': null
            }]
        }
    };

    constructor(data) {
        this.#data = data;
    }

    /**
     * @param tabId
     * @param files
     * @param world
     * @returns {Promise<Object[]>}
     */
    async executeScript(tabId, files, world) {
        return this.#data['executeScript']['return'];
    }
}