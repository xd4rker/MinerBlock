export class HandleResetSettings {
    static EVENT_NAME = 'resetSettings';

    /** @type {import("./../../interactors/InitSettings.js").InitSettings} */
    #initSettings;
    /** @type {Logger} */
    #logger;

    constructor(initSettings, logger) {
        this.#initSettings = initSettings;
        this.#logger = logger;
    }

    async run(message, sender, sendResponse) {
        if (message.action === HandleResetSettings.EVENT_NAME) {
            this.#logger.debug(
                'Got message resetSettings',
                'serviceWorker.handleResetSettings',
                message
            );

            const settingsInitialized = await this.#initSettings.run();

            sendResponse(settingsInitialized);

            return true;
        }
    }
}