/** made by jose */

import BN from "bn.js";
import short from 'elliptic/lib/elliptic/curve/short';
import { concat, padLeft, randomBytes } from "./utils";

export default class Point {
    /** @param {import('elliptic').curve.base.BasePoint} point*/
    constructor(point) {
        this._point = point;
    }

    /** @returns {Uint8Array} */
    toArray() {
        var x = padLeft(new Uint8Array(this._point.getX().toArray('be')), 32);
        var y = padLeft(new Uint8Array(this._point.getY().toArray('be')), 32);
        return concat(x, y);
    }

    inspect() {
        return `{x:${this._point.getX().toString(16)}, y: ${this._point.getY().toString(16)}}`;
    }

    static random() {
        var curve = custom25519();
        var r = new BN(Array.from(randomBytes(32)), 'be');

        return new Point(curve.g.mul(r));
    }
    
    /** @param {Uint8Array} data */
    static seed(data) {
        var curve = custom25519();
        var [p, order, one] = [curve.p, curve.order, new BN(1)];
        
        var x = new BN(Array.from(data), 'be').mod(p);
        
        var point = curve.point(null, null);
        
        while (point.isInfinity()) {
            try {
                var pnt = curve.pointFromX(x, false);
                if (!order || pnt.mul(order).isInfinity())
                    point = pnt;
            }
            catch { }
            finally { x.iadd(one); }
        }
        return new Point(point);
    }

    /** @param {Uint8Array} data */
    static from(data) {
        if (!data || data.length != 64)
            throw new Error("Invalid point");
        
        var curve = custom25519();
        var x = new BN(Array.from(data.slice(0, 32)), 'be');
        var y = new BN(Array.from(data.slice(32)), 'be');
        return new Point(curve.point(x, y));
    }
}

/** @returns {short & {order: BN}} */
function custom25519() {
    const a = "2aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa984914a144";
    const b = "7b425ed097b425ed097b425ed097b425ed097b425ed097b4260b5e9c7710c864";
    const p = "7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed";
    const n = "1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3ed";
    const gx = "2aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaad245a";
    const gy = "20ae19a1b8a086b4e01edd2c7748d14c923d4d7e6d7c61b229e9c5a27eced3d9";
    const order = "1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3ed";

    // @ts-ignore
    const curve = new short({ a, b, p, n, g: [gx, gy] });
    
    const curveOrder = Object.create(curve);
    curveOrder.order = new BN(order, 16);
 
    return curveOrder;
}
