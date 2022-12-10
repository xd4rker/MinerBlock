/**
 * Highlight the browser badge.
 */
export class HighlightBadge {
    /** @type{Browser} */
    #browser;
    /** @type{number} */
    #duration;
    /** @type{string|ColorArray} */
    #color;
    /** @type{string} */
    #text;
    /** @type{Logger} */
    #logger;

    constructor(browser, duration, color, text, logger) {
        this.#browser = browser;
        this.#duration = duration;
        this.#color = color;
        this.#text = text;
        this.#logger = logger;
    }

    async run() {
        this.#logger.debug('Set badge', 'HighlightBadge.run', {
            'duration': this.#duration,
            'color': this.#color,
            'text': this.#text
        });

        await this.#browser.setBadgeBackgroundColor(this.#color);
        await this.#browser.setBadgeText(this.#text);

        await new Promise(resolve => setTimeout(resolve, this.#duration));

        await this.#browser.setBadgeText('');
    }
}