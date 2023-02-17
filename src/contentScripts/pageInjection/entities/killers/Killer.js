class Killer {
    static MINER_TYPES = [
        'coinHive',
        'minerAlt',
        'webMinerPool'
    ];

    reportBlock() {
        window.postMessage({
            type: "BLOCKER",
            text: "blockReport",
            report: {
                'url': window.location.href,
                'time': Date.now(),
                'type': this.constructor.TYPE
            }
        }, "*");
    }
}