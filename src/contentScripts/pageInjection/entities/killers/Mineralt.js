class MineraltKiller extends Killer {
    static TYPE = 'minerAlt';

    isMiner(obj) {
        try {
            return obj &&
                typeof obj !== 'undefined' &&
                typeof obj.db === 'function' &&
                typeof obj.getlf === 'function' &&
                typeof obj.stop === 'function' &&
                typeof obj.hps === 'function' &&
                typeof obj.hps() === 'number';
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
        logger.debug('Mineralt miner found, stopping and removing it...', 'MinerBlock');

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