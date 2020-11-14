import { CP256Key } from "tide-js/node_modules/cryptide";
import DAuthJwtFlow from "tide-js/src/dauth/DAuthJwtFlow";
import config from "./config";

export default class DAuth {
    constructor() {
        this.flow = new DAuthJwtFlow(config.user);
        this.flow.cmkUrls = config.orkUrls();
        this.flow.cvkUrls = this.flow.cmkUrls;
        this.flow.vendorPub = CP256Key.generate().public();
    }

    init() {
        return this.flow.signUp(config.pass, config.email, config.threshold);
    }
    
    run() {
        return this.flow.logIn(config.pass);
    }
}
