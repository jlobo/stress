/** made by jose */
import { urlEncode, Resp } from "./ClientBase";
import { randomBytes } from "k6/crypto";
import http from "k6/http";

export default class DAuthClientSetError {
    /**
     * @param {string[]} urls
     * @param {import("k6/metrics").Trend} prismMetric
     * @param {import("k6/metrics").Trend} cmkMetric
     */
    constructor(urls, prismMetric, cmkMetric) {
        this.urls = urls.map(url => url + "/api");
        this._prismMetric = prismMetric;
        this._cmkMetric = cmkMetric;
    }

    /** @param {string} user */
    applyPrism(user) {
        const reqs = this.urls.map(url => ({ method: 'GET',
            url: `${url}/cmk/prism/${user}/${urlEncode(randomBytes(64))}` }));
        
        const resps = http.batch(reqs);
        const erros = resps.filter(resp => !(resp.status == 400 || resp.status == 200));
        resps.forEach(resp => this._prismMetric.add(resp.timings.duration));

        if (erros.length > 0)
            return Error(erros[0].error);

        return resps.some(resp => resp.status == 400);
    }

    /** @param {string} user */
    signIn(user) {
        const reqs = this.urls.map(url => ({
            method: 'GET',
            url: `${url}/cmk/auth/${user}/${urlEncode(randomBytes(32))}`
        }));

        const resps = http.batch(reqs);
        const erros = resps.filter(resp => !(resp.status == 401 || resp.status == 418 || resp.status == 200));
        resps.forEach(resp => this._cmkMetric.add(resp.timings.duration));

        if (erros.length > 0)
            return Error(erros[0].error);

        return resps.some(resp => resp.status == 401);
    }
}
