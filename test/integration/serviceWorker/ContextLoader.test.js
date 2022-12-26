import { strict as assert } from 'assert';
import {ContextLoader} from "../../../src/serviceWorker/ContextLoader.js";

describe('serviceWorker.ContextLoader', () => {
    it('checks if same context instance loaded', async () => {
        const contextLoadOne = ContextLoader.getInstance();

        const contextLoadTwo = ContextLoader.getInstance();

        assert.equal(contextLoadOne, contextLoadTwo);
    })
});