'use strict';

class PopUp {
    static ELEMENT_ID_MB_START_BUTTON = 'startButton';
    static ELEMENT_ID_MB_PAUSE_BUTTON = 'pauseButton';
    static ELEMENT_ID_OPEN_SETTINGS_BUTTON = 'settingsBtn';

    static ELEMENT_ID_ADD_WHITELIST = 'addWlist';
    static ELEMENT_ID_MINER_BLOCK_COUNT = 'blockedNum';
    static ELEMENT_ID_CURRENT_PAGE_STATE = 'blockedDomains';
    static ELEMENT_ID_MINER_BLOCK_STATISTICS = 'hidePs';
    static ELEMENT_ID_REMOVE_WHITELIST = 'removeWlist';

    static ACTION_SHOW_BLOCK_COUNT = 'getShowCount';
    static ACTION_ADD_WHITELIST = 'addWhitelistItem';
    static ACTION_REMOVE_WHITELIST = 'removeWhitelistItem';
    static ACTION_START = 'mbStart';
    static ACTION_GET_DOMAIN_WHITELIST_STATUS = 'getDomainWhitelistStatus';
    static ACTION_GET_RUN_STATUS = 'getRunStatus';
    static ACTION_GET_MINER_BLOCK_COUNT = 'getMinerBlockCount';
    static ACTION_PAUSE = 'mbPause';
    static ACTION_GET_RECENT_BLOCK_REPORT = 'getRecentBlockReport'
    static ACTION_GET_MINER_FOUND_REQUEST = 'getMinerFoundRequest';
    static ACTION_GET_MINER_INFO_REQUEST = 'getMinerInfoRequest';

    #runStatus;
    #domain;
    #isSpecialTab;
    #isDomainWhitelisted;
    #minerBlockCount;
    #showBlockCount = false;
    #minerFoundOnCurrentPage = null;
    #minerTypeOfCurrentTab = null;

    //TODO: set attribute via serviceWorker
    #reloadAllTabsWhenTogglingStatus = false;

    /** @type{Browser} */
    #browser;

    #queryCurrentTab = {
        active: true,
        currentWindow: true
    };

    constructor(browser) {
        this.#browser = browser;
    }

    async setMinerBlockCount() {
        this.#minerBlockCount = await this.#browser.sendMessage({action: PopUp.ACTION_GET_MINER_BLOCK_COUNT});
    }

    async setShowBlockCount() {
        this.#showBlockCount = await this.#browser.sendMessage({action: PopUp.ACTION_SHOW_BLOCK_COUNT});
    }

    async setMinerFoundOnCurrentPage() {
        this.#minerFoundOnCurrentPage = await this.minerFoundInCurrentTab();
    }

    async setMinerTypeOfCurrentTab() {
        this.#minerTypeOfCurrentTab = await this.getMinerTypeOfCurrentTab();
    }

    async setRunStatus() {
        this.#runStatus = await this.#browser.sendMessage({action: PopUp.ACTION_GET_RUN_STATUS});
    }

    async setDomain() {
        const tabs = await this.#browser.tabsQuery(this.#queryCurrentTab);

        const url = tabs[0].url ?? undefined;

        this.#domain = Domain.getDomain(url);
    }

    async setIsSpecialTab() {
        const currentTabIsSpecialTab = await this.isCurrentTabSpecialTab();

        this.#isSpecialTab = currentTabIsSpecialTab === true;
    }

    async setIsDomainWhitelisted() {
        this.#isDomainWhitelisted = await this.#browser.sendMessage({
            action: PopUp.ACTION_GET_DOMAIN_WHITELIST_STATUS,
            domain: this.#domain
        });
    }

    async triggerMbStart() {
        await this.#browser.sendMessage({action: PopUp.ACTION_START});

        if (this.#reloadAllTabsWhenTogglingStatus === false) {
            window.close();

            return;
        }

        await this.reloadAllNoneSpecialTabs();

        window.close();
    }

    async triggerMbPause() {
        await this.#browser.sendMessage({action: PopUp.ACTION_PAUSE});

        if (this.#reloadAllTabsWhenTogglingStatus === false) {
            window.close();

            return;
        }

        await this.reloadAllNoneSpecialTabs();
        window.close();
    }

    /**
     * @returns {Promise<void>}
     */
    async triggerOpenOptionsPage() {
        await this.#browser.openOptionsPage();

        window.close();
    }

    async triggerAddWlist() {
        await this.#browser.sendMessage({action: PopUp.ACTION_ADD_WHITELIST, domain: this.#domain});

        if (this.#runStatus === false) {
            window.close();

            return;
        }

        const tab = await this.#browser.tabsQuery(this.#queryCurrentTab);

        await this.#browser.reload(tab.id);

        window.close();
    }

    async triggerRemoveWlist() {
        await this.#browser.sendMessage({action: PopUp.ACTION_REMOVE_WHITELIST, domain: this.#domain});

        if (this.#runStatus === false) {
            window.close();

            return;
        }

        const tab = await this.#browser.tabsQuery(this.#queryCurrentTab);

        await this.#browser.reload(tab.id);

        window.close();
    }

    /**
     * @returns {Promise<void>}
     */
    async reloadAllNoneSpecialTabs() {
        const allTabs = await this.#browser.tabsQuery({});

        /** @type{Tab} tab */
        allTabs.forEach((tab) => {
            if (this.#browser.constructor.isSpecialTab(tab) === true) {
                return;
            }

            this.#browser.reload(tab.id);
        });
    }

    async init() {
        await this.setRunStatus();
        await this.setDomain();
        await this.setIsSpecialTab();
        await this.setIsDomainWhitelisted();
        await this.setMinerBlockCount();
        await this.setShowBlockCount();
        await this.setMinerFoundOnCurrentPage();

        if (this.#minerFoundOnCurrentPage === true) {
            await this.setMinerTypeOfCurrentTab();
        }

        this.initElements();
        this.initEventListeners();

        logger.debug('PopUp object initiated.', 'PopUp.init', this);
    }

     initElements() {
        this.initMbSetStatusButton();
        this.initBlockCount();
        this.initCurrentPageState();

        if (this.#isSpecialTab === true) {
            return;
        }

        logger.debug('Url whitelist status', 'PopUp.initElements', this.#isDomainWhitelisted);

        this.initWhiteListStatus(this.#isDomainWhitelisted);
    }

    /**
     * @returns {Promise<boolean>}
     */
    async isCurrentTabSpecialTab() {
        const activeTabs = await this.#browser.tabsQuery(this.#queryCurrentTab);

        if (activeTabs.length === 0) {
            return false;
        }

        return this.#browser.constructor.isSpecialTab(activeTabs[0]) === true;
    }

    initEventListeners() {
        document.getElementById(PopUp.ELEMENT_ID_MB_START_BUTTON).addEventListener('click', () => this.triggerMbStart());
        document.getElementById(PopUp.ELEMENT_ID_MB_PAUSE_BUTTON).addEventListener('click', () => this.triggerMbPause());
        document.getElementById(PopUp.ELEMENT_ID_OPEN_SETTINGS_BUTTON).addEventListener('click', () => this.triggerOpenOptionsPage());
        document.getElementById(PopUp.ELEMENT_ID_ADD_WHITELIST).addEventListener('click', () => this.triggerAddWlist());
        document.getElementById(PopUp.ELEMENT_ID_REMOVE_WHITELIST).addEventListener('click', () => this.triggerRemoveWlist());
    }

    initMbSetStatusButton() {
        document.getElementById(PopUp.ELEMENT_ID_MB_PAUSE_BUTTON).style.display = (this.#runStatus === true) ? '' : 'none';
        document.getElementById(PopUp.ELEMENT_ID_MB_START_BUTTON).style.display = (this.#runStatus === true) ? 'none' : '';
    }

    initWhiteListStatus(whitelisted) {
        document.getElementById(PopUp.ELEMENT_ID_ADD_WHITELIST).style.display = (whitelisted === true) ? 'none' : '';
        document.getElementById(PopUp.ELEMENT_ID_REMOVE_WHITELIST).style.display = (whitelisted === true) ? '' : 'none';
    }

    initBlockCount() {
        document.getElementById(PopUp.ELEMENT_ID_MINER_BLOCK_COUNT).innerText = this.#minerBlockCount;
        document.getElementById(PopUp.ELEMENT_ID_MINER_BLOCK_STATISTICS).style.display =
            (this.#showBlockCount === true) ? '' : 'none';
    }

    initCurrentPageState() {
        if (this.#minerFoundOnCurrentPage === false || this.#minerFoundOnCurrentPage === null) {
            return;
        }

        let table = document.getElementById(PopUp.ELEMENT_ID_CURRENT_PAGE_STATE);

        let newRow = document.createElement('tr');
        let newCell = document.createElement('td');

        if (this.#minerTypeOfCurrentTab === false || this.#minerTypeOfCurrentTab === null) {
            return;
        }

        newCell.innerText = `${this.#minerTypeOfCurrentTab}, found and blocked.`;

        newRow.appendChild(newCell);
        table.appendChild(newRow);
    }

    /**
     * @returns {Promise<boolean|null>}
     */
    async minerFoundInCurrentTab() {
        if (this.#isSpecialTab === true) {
            return null;
        }

        const tabs = await this.#browser.tabsQuery({active: true, currentWindow: true});

        let response;

        try {
            response = await this.#browser.sendMessageToTabs(
                tabs[0].id,
                {action: this.constructor.ACTION_GET_MINER_FOUND_REQUEST}
            );
        } catch (e) {
            return null;
        }

        if (response.minerFound === undefined) {
            return false;
        }

        return response.minerFound === true;
    }

    /**
     * @returns {Promise<*|boolean|null>}
     */
    async getMinerTypeOfCurrentTab() {
        if (this.#isSpecialTab === true) {
            return null;
        }

        const tabs = await this.#browser.tabsQuery({active: true, currentWindow: true});

        let response;

        try {
            response = await this.#browser.sendMessageToTabs(
                tabs[0].id,
                {action: this.constructor.ACTION_GET_MINER_INFO_REQUEST}
            );
        } catch (e) {
            return null;
        }

        if (response.minerInfo.type === undefined) {
            return false;
        }

        return response.minerInfo.type;
    }
}
