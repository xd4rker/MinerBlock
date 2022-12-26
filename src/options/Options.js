'use strict';

class Options {
    #whitelist = [];
    #userFilterList = [];
    #showCount = false;
    #useBuiltInFiltersStatus = false;
    #useUserFiltersStatus = false;

    static ACTION_GET_USE_BUILT_IN_FILTER_STATUS = 'getUseBuiltInFiltersStatus';
    static ACTION_GET_USE_USER_FILTER_STATUS = 'getUseUserFiltersStatus';
    static ACTION_SHOW_COUNT = 'getShowCount';
    static ACTION_SET_SHOW_COUNT = 'setShowCount';
    static ACTION_GET_WHITELIST = 'getWhitelist';
    static ACTION_GET_USER_FILTER_LIST = 'getUserFilterList';
    static ACTION_SAVE_USER_FILTER_LIST = 'saveUserFilterList';
    static ACTION_SAVE_WHITELIST = 'saveWhitelist';
    static ACTION_TOGGLE_BUILT_IN_FILTERS = 'toggleBuiltInFilters';
    static ACTION_TOGGLE_USER_FILTERS = 'toggleUserFilters';
    static ACTION_RESET_SETTINGS = 'resetSettings';

    static ELEMENT_ID_USER_FILTER_LIST_SAVE = 'mbUserFiltersListSave';
    static ELEMENT_ID_USER_FILTERS_LIST = 'mbUserFiltersList';
    static ELEMENT_ID_WHITELIST = 'mbWhiteList';
    static ELEMENT_ID_SHOW_COUNT = 'mbShowCount';
    static ELEMENT_ID_WHITELIST_SAVE = 'mbWhiteListSave';
    static ELEMENT_ID_CHECKBOX_USE_BUILT_IN_FILTER = 'useBuiltInFilters';
    static ELEMENT_ID_CHECKBOX_USE_USER_FILTER = 'useUserFilters';
    static ELEMENT_ID_RESET_SETTINGS = 'btnResetSettings';

    static TAB_ID_GENERAL = 'general';
    static TAB_ID_WHITELIST = 'whitelist';
    static TAB_ID_USER_FILTER = 'userFilter';
    static TAB_ID_ABOUT = 'about';
    static TAB_ID_MISC = 'misc';

    static ELEMENT_ID_TAB_BUTTON_GENERAL = 'generalBtn';
    static ELEMENT_ID_TAB_BUTTON_WHITELIST = 'whitelistBtn';
    static ELEMENT_ID_TAB_BUTTON_USER_FILTER = 'filtersBtn';
    static ELEMENT_ID_TAB_BUTTON_ABOUT = 'aboutBtn';
    static ELEMENT_ID_TAB_BUTTON_MISC = 'miscBtn';

    static DIV_ID_GENERAL = 'generalContent';
    static DIV_ID_WHITELIST = 'whitelistContent';
    static DIV_ID_USER_FILTER = 'userFiltersContent';
    static DIV_ID_ABOUT = 'aboutContent';
    static DIV_ID_MISC = 'miscContent';

    static EVENT_WHITE_LIST_UPDATED = 'whiteListUpdated';

    static EOL = '\n';

    /** @type{Browser} */
    #browser;

    constructor(browser) {
        this.#browser = browser;
    }

    async init() {
        logger.debug('Initiate', 'Options.js');

        await this.showCurrentTab(Options.TAB_ID_GENERAL);

        await this.setShowCount();
        this.initShowCountElement();

        await this.setWhitelist();
        this.initWhitelistElement();

        await this.setUserFilterList();
        this.initUserFilterListElement();

        await this.setUseBuiltInFilters();
        this.initUseBuiltInFiltersElement();

        await this.setUseUserFilters();
        this.initUseUserFiltersElement();

        this.initEventListeners();

        logger.debug('Initiated', 'Options.js', this);
    }

    async showCurrentTab(currentTabId) {
        document.getElementById(Options.ELEMENT_ID_TAB_BUTTON_GENERAL).style.backgroundColor = (currentTabId === Options.TAB_ID_GENERAL) ? '#fff' : '#eee';
        document.getElementById(Options.ELEMENT_ID_TAB_BUTTON_GENERAL).style.borderBottom = (currentTabId === Options.TAB_ID_GENERAL) ? '1px solid #fff' : '1px solid #eee';
        document.getElementById(Options.DIV_ID_GENERAL).style.display = (currentTabId === Options.TAB_ID_GENERAL) ? 'inline' : 'none';

        document.getElementById(Options.ELEMENT_ID_TAB_BUTTON_WHITELIST).style.backgroundColor = (currentTabId === Options.TAB_ID_WHITELIST) ? '#fff' : '#eee';
        document.getElementById(Options.ELEMENT_ID_TAB_BUTTON_WHITELIST).style.borderBottom = (currentTabId === Options.TAB_ID_WHITELIST) ? '1px solid #fff' : '1px solid #eee';
        document.getElementById(Options.DIV_ID_WHITELIST).style.display = (currentTabId === Options.TAB_ID_WHITELIST) ? 'inline' : 'none';

        document.getElementById(Options.ELEMENT_ID_TAB_BUTTON_USER_FILTER).style.backgroundColor = (currentTabId === Options.TAB_ID_USER_FILTER) ? '#fff' : '#eee';
        document.getElementById(Options.ELEMENT_ID_TAB_BUTTON_USER_FILTER).style.borderBottom = (currentTabId === Options.TAB_ID_USER_FILTER) ? '1px solid #fff' : '1px solid #eee';
        document.getElementById(Options.DIV_ID_USER_FILTER).style.display = (currentTabId === Options.TAB_ID_USER_FILTER) ? 'inline' : 'none';

        document.getElementById(Options.ELEMENT_ID_TAB_BUTTON_ABOUT).style.backgroundColor = (currentTabId === Options.TAB_ID_ABOUT) ? '#fff' : '#eee';
        document.getElementById(Options.ELEMENT_ID_TAB_BUTTON_ABOUT).style.borderBottom = (currentTabId === Options.TAB_ID_ABOUT) ? '1px solid #fff' : '1px solid #eee';
        document.getElementById(Options.DIV_ID_ABOUT).style.display = (currentTabId === Options.TAB_ID_ABOUT) ? 'inline' : 'none';

        document.getElementById(Options.ELEMENT_ID_TAB_BUTTON_MISC).style.backgroundColor = (currentTabId === Options.TAB_ID_MISC) ? '#fff' : '#eee';
        document.getElementById(Options.ELEMENT_ID_TAB_BUTTON_MISC).style.borderBottom = (currentTabId === Options.TAB_ID_MISC) ? '1px solid #fff' : '1px solid #eee';
        document.getElementById(Options.DIV_ID_MISC).style.display = (currentTabId === Options.TAB_ID_MISC) ? 'inline' : 'none';
    }

    async setWhitelist() {
        this.#whitelist = await this.#browser.sendMessage({action: Options.ACTION_GET_WHITELIST});
    }

    async setUserFilterList() {
        this.#userFilterList = await this.#browser.sendMessage({action: Options.ACTION_GET_USER_FILTER_LIST});
    }

    async setShowCount() {
        this.#showCount = await this.#browser.sendMessage({action: Options.ACTION_SHOW_COUNT});
    }

    async setUseBuiltInFilters() {
        this.#useBuiltInFiltersStatus = await this.#browser.sendMessage({action: Options.ACTION_GET_USE_BUILT_IN_FILTER_STATUS});
    }

    async setUseUserFilters() {
        this.#useUserFiltersStatus = await this.#browser.sendMessage({action: Options.ACTION_GET_USE_USER_FILTER_STATUS});
    }

    initWhitelistElement() {
        const whitelistElement = document.getElementById(Options.ELEMENT_ID_WHITELIST);

        let textAreaText = "";

        this.#whitelist.forEach((element) => {
            textAreaText += `${element}${Options.EOL}`;
        });

        whitelistElement.value = textAreaText;
    }

    initUserFilterListElement() {
        const userFilterListElement = document.getElementById(Options.ELEMENT_ID_USER_FILTERS_LIST);
        if (this.#userFilterList.length === 0) {
            return;
        }

        let textAreaText = "";

        this.#userFilterList.forEach((element) => {
            textAreaText += `${element}${Options.EOL}`;
        });

        userFilterListElement.value = textAreaText;
    }

    initUseBuiltInFiltersElement() {
        const elementUseBuiltInFilter = document.getElementById(Options.ELEMENT_ID_CHECKBOX_USE_BUILT_IN_FILTER);

        elementUseBuiltInFilter.checked = this.#useBuiltInFiltersStatus;
    }

    initUseUserFiltersElement() {
        const elementUseUserFilter = document.getElementById(Options.ELEMENT_ID_CHECKBOX_USE_USER_FILTER);

        elementUseUserFilter.checked = this.#useUserFiltersStatus;
    }

    initShowCountElement() {
        const showCountElement = document.getElementById(Options.ELEMENT_ID_SHOW_COUNT);

        showCountElement.checked = this.#showCount;
    }

    async triggerSaveWhitelistItem() {
        const whitelistElement = document.getElementById(Options.ELEMENT_ID_WHITELIST);

        if (whitelistElement.value === '') {
            return;
        }

        const lines = whitelistElement.value.split(Options.EOL);

        let domains = [];

        lines.forEach((element) => {
            if (element === '') {
                return;
            }

            domains.push(element.trim());
        });

        await this.#browser.sendMessage({action: Options.ACTION_SAVE_WHITELIST, 'domains': domains});

        await this.setWhitelist();
        this.initWhitelistElement();
    }

    async triggerSaveUserFilterList() {
        const userFilterList = document.getElementById(Options.ELEMENT_ID_USER_FILTERS_LIST);

        if (userFilterList.value === '') {
            return;
        }

        const lines = userFilterList.value.split(Options.EOL);

        let uriPattern = [];

        lines.forEach((element) => {
            if (element === '') {
                return;
            }

            uriPattern.push(element.trim());
        });

        await this.#browser.sendMessage({action: Options.ACTION_SAVE_USER_FILTER_LIST, 'uriPattern': uriPattern});

        await this.setUserFilterList();
        this.initUserFilterListElement();
    }

    async triggerUseBuiltInFilter() {
        const elementUseBuiltInFilter = document.getElementById(Options.ELEMENT_ID_CHECKBOX_USE_BUILT_IN_FILTER);

        const checked = elementUseBuiltInFilter.checked;

        await this.#browser.sendMessage({action: Options.ACTION_TOGGLE_BUILT_IN_FILTERS, 'use': checked});
    }

    async triggerUseUserFilter() {
        const elementUseUserFilter = document.getElementById(Options.ELEMENT_ID_CHECKBOX_USE_USER_FILTER);

        const checked = elementUseUserFilter.checked;

        await this.#browser.sendMessage({action: Options.ACTION_TOGGLE_USER_FILTERS, 'use': checked});
    }

    async triggerResetSettings() {
        await this.#browser.sendMessage({action: Options.ACTION_RESET_SETTINGS});
    }

    async triggerSetShowCount() {
        const elementShowCount = document.getElementById(Options.ELEMENT_ID_SHOW_COUNT);

        const checked = elementShowCount.checked;

        await this.#browser.sendMessage({action: Options.ACTION_SET_SHOW_COUNT, 'showCount': checked});
    }

    async reactToWhiteListChange(request) {
        if (request.event === undefined) {
            return;
        }

        if (request.event !== Options.EVENT_WHITE_LIST_UPDATED) {
            return;
        }

        logger.debug('Received info that white list was updated.', 'Options.reactToWhiteListChange', request);

        await this.setWhitelist();
        this.initWhitelistElement();
    }

    initEventListeners() {
        document.getElementById(Options.ELEMENT_ID_WHITELIST_SAVE).addEventListener('click', () => this.triggerSaveWhitelistItem());

        document.getElementById(Options.ELEMENT_ID_USER_FILTER_LIST_SAVE).addEventListener('click', () => this.triggerSaveUserFilterList());

        document.getElementById(Options.ELEMENT_ID_TAB_BUTTON_GENERAL).addEventListener('click', () => this.showCurrentTab(Options.TAB_ID_GENERAL));
        document.getElementById(Options.ELEMENT_ID_TAB_BUTTON_WHITELIST).addEventListener('click', () => this.showCurrentTab(Options.TAB_ID_WHITELIST));
        document.getElementById(Options.ELEMENT_ID_TAB_BUTTON_USER_FILTER).addEventListener('click', () => this.showCurrentTab(Options.TAB_ID_USER_FILTER));
        document.getElementById(Options.ELEMENT_ID_TAB_BUTTON_ABOUT).addEventListener('click', () => this.showCurrentTab(Options.TAB_ID_ABOUT));
        document.getElementById(Options.ELEMENT_ID_TAB_BUTTON_MISC).addEventListener('click', () => this.showCurrentTab(Options.TAB_ID_MISC));

        document.getElementById(Options.ELEMENT_ID_CHECKBOX_USE_BUILT_IN_FILTER).addEventListener('click', () => this.triggerUseBuiltInFilter());
        document.getElementById(Options.ELEMENT_ID_CHECKBOX_USE_USER_FILTER).addEventListener('click', () => this.triggerUseUserFilter());

        document.getElementById(Options.ELEMENT_ID_RESET_SETTINGS).addEventListener('click', () => this.triggerResetSettings());
        document.getElementById(Options.ELEMENT_ID_SHOW_COUNT).addEventListener('click', () => this.triggerSetShowCount());

        this.#browser.onMessageAddListener(
            (request, sender, sendResponse) => this.reactToWhiteListChange(request, sender, sendResponse)
        ).then();
    }
}