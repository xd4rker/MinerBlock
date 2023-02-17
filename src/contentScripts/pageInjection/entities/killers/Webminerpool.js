class WebminerpoolKiller extends Killer {
    static TYPE = 'webMinerPool';

    isMiner(obj) {
        try {
            return obj &&
                typeof obj !== 'undefined' &&
                typeof obj.addWorker === 'function' &&
                typeof obj.startMining === 'function' &&
                typeof obj.stopMining === 'function' &&
                typeof obj.totalhashes === 'number';
        }
        catch (e) {
            logger.error(
                'Exception occurred.',
                `${this.constructor.name}.isMiner`,
                e
            );
        }
    }

    stop(obj) {
        logger.debug('Webminerpool miner found, stopping and removing it...', 'MinerBlock');

        try {
            obj.stopMining();
        } catch(e) {
            logger.error(
                'Exception occurred.',
                `${this.constructor.name}.stop`,
                e
            );
        }

        obj = null;

        this.reportBlock();
    }
}