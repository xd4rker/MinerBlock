import {InitBrowser} from "../../interactors/init/InitBrowser.js";
import {InitSettings} from "../../interactors/init/InitSettings.js";
import {MbPause} from "../../interactors/MbPause.js";
import {MbStart} from "../../interactors/MbStart.js";
import {RemoveFiltersInBrowser} from "../../interactors/RemoveFiltersInBrowser.js";
import {SetIcon} from "../../interactors/SetIcon.js";
import {Visuals} from "../../entities/Visuals.js";
import {ContextLoader} from "../../ContextLoader.js";

const context = ContextLoader.getInstance();
//TODO: remove tmp assignment
const settingsRepository = context.settingsRepository;
const logger = context.logger;
const _browser = context.browser;


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

export async function handleMbPause(message, sender, sendResponse) {
    if (message.action === 'mbPause') {
        logger.debug(
            'Received action mbPause',
            'serviceWorker.handleMbPause',
            message
        );

        const setIcon = new SetIcon(
            settingsRepository,
            _browser,
            new Visuals()
        );

        const mbPause = new MbPause(
            settingsRepository,
            setIcon,
            logger
        );

        await mbPause.run();

        sendResponse(true);

        return true;
    }
}

export async function handleMbStart(message, sender, sendResponse) {
    if (message.action === 'mbStart') {
        const setIcon = new SetIcon(
            settingsRepository,
            _browser,
            new Visuals()
        );

        const mbStart = new MbStart(
            settingsRepository,
            new InitBrowser(setIcon, new RemoveFiltersInBrowser(_browser))
        );
        await mbStart.run();

        sendResponse(true);

        return true;
    }
}