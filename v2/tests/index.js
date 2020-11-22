import DAuth from "./DAuth";
import SignUp from "./SignUp";

export default class TestIndex {
    static get names() {
        return ['dauth', 'signup'];
    };

    /** @param {'dauth'} name
     * @returns {{run: () => Promise }} */
    static test(name) {
        if (name === 'dauth')
            return new DAuth();

        if (name === 'signup')
            return new SignUp();

        return null;
    }
}
