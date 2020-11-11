/** made by jose */


import http from 'k6/http';
import { fromByteArray, toByteArray } from 'base64-js';

export default class ClientBase {
  /**
   * @param {string} url
   */
  constructor(url) {
    this.url = url + "/api";
  }

    /** @param {string} path
     *  @protected */
    _get(path) {
        return new Resp(http.get(this.url + path));
    }

    /** @param {string} path
    * @param {any} data
    * @protected **/
    _post(path, data) {
        return new Resp(http.post(this.url + path, JSON.stringify(data), 
            {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}));
    }

    /** @param {string} path
    * @param {any} data
    * @protected **/
    _put(path, data) {
        return new Resp(http.put(this.url + path, JSON.stringify(data), 
            {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}));
    }
}

/** @param {string} text */
export function fromBase64(text) {
  return toByteArray(text);
}

/** @param {string|Uint8Array|number[]} data */
export function urlEncode(data) {
    const text = typeof data === "string" ? data : fromByteArray(data);
    return text.replace(/\=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}


export class Resp {
    get status() { return this.resp.status; } 
    get isOk() { return this.resp.status == 200; } 
    get error() { return this.resp.error; } 
    get url() { return this.resp.url; } 
    
    get text() { 
        return typeof this.resp.body === 'string' ? this.resp.body
            : fromByteArray(this.resp.body); 
    }

    get body() {
        return typeof this.resp.body === 'string' ? JSON.parse(this.resp.body) 
            : fromByteArray(this.resp.body); 
    }
    
    /** @param {import("k6/http").RefinedResponse<import("k6/http").ResponseType>} resp */
    constructor(resp) {
        this.resp = resp;
    }
}