/** made by jose */

import ClientBase, { urlEncode } from "./ClientBase";
import { randomBytes } from "k6/crypto";

export default class DAuthClientError extends ClientBase {
  /** @param {string} url */
  constructor(url) {
    super(url);
  }

  /** @param {string} user */
  applyPrism(user) {
    var res = this._get(`/cmk/prism/${user}/${urlEncode(randomBytes(64))}`);
    if (!res.isOk)
      return Error(res.error);

    res.text;
  }

  /** @param {string} user */
  signIn(user) {
    var res = this._get(`/cmk/auth/${user}/${urlEncode(randomBytes(32))}`);
    if (!res.isOk)
      return Error(res.error);

    res.text;
  }
}
