import {InitSettings} from "../../interactors/init/InitSettings.js";
import {ContextLoader} from "../../ContextLoader.js";

const context = ContextLoader.getInstance();
//TODO: remove tmp assignment
const settingsRepository = context.settingsRepository;
const logger = context.logger;


export async function handleResetSettings(message, sender, sendResponse) {
    if (message.action === 'resetSettings') {
        logger.debug(
            'Got message resetSettings',
            'serviceWorker.handleResetSettings',
            message
        );

        const initSettings = new InitSettings(settingsRepository);
        await initSettings.run();

        sendResponse(true);

        return true;
    }
}