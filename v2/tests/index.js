import ChangePass from "./ChangePass";
import DAuth from "./DAuth";
import SignUp from "./SignUp";

export default class TestIndex {
    static get names() {
        return ['dauth', 'signup', 'change'];
    };

    /** @param {'dauth'} name
     * @returns {{run: () => Promise }} */
    static test(name) {
        if (name === 'dauth')
            return new DAuth();

        if (name === 'signup')
            return new SignUp();

        if (name === 'change')
            return new ChangePass();

        return null;
    }
}
