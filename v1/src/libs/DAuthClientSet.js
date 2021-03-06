/** made by jose */
import { urlEncode, Resp } from "./ClientBase";
import { randomBytes } from "k6/crypto";
import http from "k6/http";

export default class DAuthClientSet {
    /** @param {string[]} urls */
    constructor(urls) {
        this.urls = urls.map(url => url + "/api");
    }

    /** @param {string} user
     *  @param {Point} pass*/
    applyPrism(user, pass) {
        const reqs = this.urls.map(url => ({ method: 'GET',
            url: `${url}/cmk/prism/${user}/${urlEncode(pass.toArray())}` }));
        
        const resps = http.batch(reqs).map(res => new Resp(res));
        const erros = resps.filter(resp => !resp.isOk);
        if (erros.length > 0)
            return Error(erros[0].error);

        return resps.map(resp => resp.text);
    }

    /** @param {string} user */
    signIn(user) {
        const reqs = this.urls.map(url => ({
            method: 'GET',
            url: `${url}/cmk/auth/${user}/${urlEncode(randomBytes(32))}`
        }));

        const resps = http.batch(reqs).map(res => new Resp(res));
        const erros = resps.filter(resp => !resp.isOk);
        if (erros.length > 0)
            return Error(erros[0].error);

        return resps.map(resp => resp.text);
    }
}
