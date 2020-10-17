import config from './config';
import DAuthClientSetError from './libs/DAuthClientSetError';
import { Counter, Rate } from "k6/metrics";
import { check, sleep } from "k6";

let ErrorCount = new Counter("errors");
let ErrorRate = new Rate("error_rate");

export default function() {
    var client = new DAuthClientSetError(config.urls)

    const r1 = client.applyPrism(config.user);
    const r2 = client.signIn(config.user);

    let success = check([r1, r2], {
      "200 or 400": ([r1, r2]) => typeof r1 === 'boolean' && typeof r2 === 'boolean'
    });
        
    if (success) {
        ErrorCount.add(1);
        ErrorRate.add(true);
    } else {
        ErrorRate.add(false);
    }

    sleep(0.5);
}
