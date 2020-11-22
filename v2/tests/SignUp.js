import { CP256Key } from "tide-js/node_modules/cryptide";
import DAuthJwtFlow from "tide-js/src/dauth/DAuthJwtFlow";
import Guid from "tide-js/src/guid";
import config from "./config";

export default class DAuth {
    constructor() {
        this.flow = new DAuthJwtFlow(new Guid().toString());
        this.flow.cmkUrls = config.orkUrls();
        this.flow.cvkUrls = this.flow.cmkUrls;
        this.flow.vendorPub = CP256Key.generate().public();
    }

    run() {
        return this.flow.signUp(config.pass, config.email, config.threshold);
    }
}
