/**
 * For filtering pages dynamicRules are created in the browser.
 *
 * When reloading the extension previously might be still existing though filter in settings object being already
 * deleted. This leads to unique id exception, when adding new filter after reloading.
 */
export class RemoveFiltersInBrowser {
    /** @type{Browser} */
    #browser;

    constructor(browser) {
        this.#browser = browser;
    }

    /**
     * @returns {Promise<void>}
     */
    async run() {
        const dynamicRules = await this.#browser.getDynamicRules();

        let ruleIds = [];

        dynamicRules.forEach(function (dynamicRule) {
            /** @type{Rule} dynamicRule */
            ruleIds.push(dynamicRule.id);
        });

        return await this.#browser.removeDynamicRules(ruleIds);
    }
}