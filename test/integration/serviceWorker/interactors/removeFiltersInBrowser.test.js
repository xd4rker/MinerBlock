import { strict as assert } from 'assert';
import {RemoveFiltersInBrowser} from "../../../../src/serviceWorker/interactors/RemoveFiltersInBrowser.js";
import {FakeBrowser} from "../../../serviceWorker/adapters/browser/FakeBrowser.js";

describe('serviceWorker.interactors.removeFiltersInBrowser', () => {
    it('removes filters in browse', async () => {
        const browser = new FakeBrowser();

        const removeFiltersInBrowser = new RemoveFiltersInBrowser(browser);

        const removedFiltersInBrowser = await removeFiltersInBrowser.run();

        assert.equal(removedFiltersInBrowser, undefined);
    });
});