/** made by jose */

import Point from "./Point";
import ClientBase, { fromBase64, urlEncode } from "./ClientBase";

export default class DAuthClient extends ClientBase {
  /**
   * @param {string} url
   */
  constructor(url) {
    super(url);
  }

  /** @param {string} user
   *  @param {Point} pass
   *  @returns {[Point, any]} */
  applyPrism(user, pass) {
    var res = this._get(`/cmk/prism/${user}/${urlEncode(pass.toArray())}`);
  
    return [ Point.from(fromBase64(res.body.prism)), res.body.token ]
  }

  /** @param {string} user
   *  @param {any} token */
  signIn(user, token) {
    var tkn = urlEncode(token);
    var res = this._get(`/cmk/auth/${user}/${tkn}`);
    return fromBase64(res.text);
  }
}
