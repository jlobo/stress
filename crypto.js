import BN from "bn.js";
import { shaBuffer } from "./hash";
import elliptic from 'elliptic';

/** @param {string|Buffer} message */
export default function seedPoint(message) {
    var curve = custom25519();
    var [p, order, one] = [curve.p, curve.order, new BN(1)];
    var x = new BN(Array.from(shaBuffer(message)), 'be').mod(p);
        
    var point = curve.point(null, null);
    
    while (point.isInfinity()) {
        try {
            var pnt = curve.pointFromX(x, false); //curve.point(x);
            if (!order || pnt.mul(order).isInfinity())
                point = pnt;
        }
        catch { }
        finally { x.iadd(one); }
    }
    
    return point;
}

/** @returns {elliptic.curve.short & {order: BN}} */
function custom25519() {
    const a = "2aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa984914a144";
    const b = "7b425ed097b425ed097b425ed097b425ed097b425ed097b4260b5e9c7710c864";
    const p = "7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed";
    const n = "1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3ed";
    const gx = "2aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaad245a";
    const gy = "20ae19a1b8a086b4e01edd2c7748d14c923d4d7e6d7c61b229e9c5a27eced3d9";
    const order = "1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3ed";

    // @ts-ignore
    const curve = new elliptic.curve.short({ a, b, p, n, g: [gx, gy] });
    
    const curveOrder = Object.create(curve);
    curveOrder.order = new BN(order, 16);
 
    return curveOrder;
}
