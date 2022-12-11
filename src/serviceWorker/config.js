import {Chrome} from "./adapters/browser/Chrome.js";
import {Browser} from "./adapters/browser/Browser.js";
import {Logger} from "./adapters/Logger.js";
import {SettingsRepository} from "./repositories/SettingsRepository.js";
import {LocalStorage} from "./repositories/adapters/LocalStorage.js";
import {StatisticsRepository} from "./repositories/StatisticsRepository.js";

export const _browser = new Browser(new Chrome());

export const storage = new LocalStorage(
    _browser
);

export const logger = new Logger(Logger.LEVEL_DEBUG);

export const settingsRepository = new SettingsRepository(storage, logger);
export const statisticsRepository = new StatisticsRepository(storage, logger);