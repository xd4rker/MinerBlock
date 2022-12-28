export class DocumentsWithInjection {
    /** @type {number[]}*/
    #documentIds = [];

    /**
     * @param documentId
     * @returns {boolean}
     */
    isInjectionExisting(documentId) {
        return this.#documentIds.includes(documentId);
    }

    addDocumentId(documentId) {
        this.#documentIds.push(documentId);
    }

    removeDocumentId(documentId) {
        const index = this.#documentIds.indexOf(documentId);

        if (index <= -1) {
            return null;
        }

        const deletedItems = this.#documentIds.splice(index, 1);

        return deletedItems.length > 0;
    }
}