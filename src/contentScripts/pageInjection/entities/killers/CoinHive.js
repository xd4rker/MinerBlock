class CoinHiveKiller extends Killer {
    static TYPE = 'coinHive';

    isMiner(obj) {
        try {
            return obj &&
                typeof obj !== 'undefined' &&
                typeof obj.isRunning === 'function' &&
                typeof obj.stop === 'function' &&
                (
                    typeof obj._siteKey === 'string' ||
                    typeof obj._sitek === 'string' ||
                    typeof obj._newSiteKey === 'string' ||
                    typeof obj._sitek === 'string' ||
                    typeof obj._address === 'string'
                );
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
        logger.debug('CoinHive miner found, stopping and removing it...', 'MinerBlock');

        try {
            obj.stop();
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



