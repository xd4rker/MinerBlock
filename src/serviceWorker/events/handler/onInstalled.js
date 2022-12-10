/**
 * Setup browser when just installed.
 *
 * @param {InitSettings} initSettings
 * @param {InitBrowser} initBrowser
 * @returns {Promise<void>}
 */
export async function setup(initSettings, initBrowser) {
    await initSettings.run();

    await initBrowser.run();
}