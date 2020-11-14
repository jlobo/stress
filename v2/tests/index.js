import DAuth from "./DAuth";

export default class TestIndex {
    static get names() {
        return ['dauth'];
    };

    /** @param {'dauth'} name
     * @returns {{run: () => Promise }} */
    static test(name) {
        if (name === 'dauth')
            return new DAuth();

        return null;
    }
}
