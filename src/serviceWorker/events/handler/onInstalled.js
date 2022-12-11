/**
 * Setup browser when just installed.
 *
 * @param {InitSettings} initSettings
 * @param {InitBrowser} initBrowser
 * @returns {Promise<void>}
 */
export async function setup(initSettings, initBrowser) {
    //TODO: run settings migration from 1.x.x versions
    await initSettings.run();

    await initBrowser.run();
}