class MinerBlocker {
    static OBJECTS_EXCLUDED_FROM_SCAN = [
        'webkitStorageInfo'
    ];

    static EVENT_TEXT_START_SCAN = 'startScan';
    static EVENT_DATA_TYPE = 'CONTENT_SCRIPT';

    /** @type{CoinHiveKiller|MineraltKiller|WebminerpoolKiller[]} */
    _killer = [];

    constructor(killer) {
        this._killer = killer;
        this.addListeners();
    }

    async scan() {
        for(let domObjectName in window) {
            if (MinerBlocker.OBJECTS_EXCLUDED_FROM_SCAN.indexOf(domObjectName) !== -1) {
                continue;
            }
            this._killer.forEach((killer) => {
                if (killer.isMiner(window[domObjectName]) === true) {
                    killer.stop(window[domObjectName]);
                }
            })
        }
    }

    async handleScanRequest(event) {
        if (
            event.source !== window ||
            event.data.type === undefined ||
            event.data.text === undefined
        ) {
            return;
        }

        if (event.data.type !== MinerBlocker.EVENT_DATA_TYPE) {
            return;
        }

        if (event.data.text !== MinerBlocker.EVENT_TEXT_START_SCAN) {
            return;
        }
        logger.debug('Received scan request', 'Minerblock', event);

        await this.scan();
    }

    addListeners() {
        window.addEventListener("message", (event) => this.handleScanRequest(event), false);
    }
}
