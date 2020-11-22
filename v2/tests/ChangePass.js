import { CP256Key } from "tide-js/node_modules/cryptide";
import DAuthJwtFlow from "tide-js/src/dauth/DAuthJwtFlow";
import config from "./config";

export default class ChangePass {
    constructor() {
        this.flow = new DAuthJwtFlow(config.user);
        this.flow.cmkUrls = config.orkUrls();
        this.flow.cvkUrls = this.flow.cmkUrls;
        this.flow.vendorPub = CP256Key.generate().public();
        this.oldPass = config.pass;
    }

    init() {
        return this.flow.signUp(config.pass, config.email, config.threshold);
    }
    
    async run() {
        const newPass = Math.random().toString();
        await this.flow.changePass(this.oldPass, newPass, config.threshold);
        this.oldPass = newPass;
    }
}
