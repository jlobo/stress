import config from './config';
import DAuthClientSetError from './libs/DAuthClientSetError';
import { Counter, Rate, Trend } from "k6/metrics";
import { check, sleep } from "k6";

let errorTotal = new Counter("error_total");
let rateTotal = new Rate("error_rate_total");
let errorPrism = new Counter("error_prism");
let ratePrism = new Rate("error_rate_prism");
let errorCMK = new Counter("error_cmk");
let rateCMK = new Rate("error_rate_cmk");

let durationPrism = new Trend("http_req_duration_prism", true);
let durationCmk = new Trend("http_req_duration_cmk", true);

export default function() {
    var client = new DAuthClientSetError(config.urls, durationPrism, durationCmk)

    const rPrm = client.applyPrism(config.user);
    const rCmk = client.signIn(config.user);

    check([rPrm, rCmk], {
      "prism": ([r1]) => typeof r1 === 'boolean',
      "cmk": ([, r2]) => typeof r2 === 'boolean'
    });

    if (typeof rPrm !== 'boolean') {
        errorPrism.add(1);
        ratePrism.add(true);
        errorTotal.add(1);
        rateTotal.add(true);
    } else {
        ratePrism.add(false);
        rateTotal.add(false);
    }

    if (typeof rCmk !== 'boolean') {
        errorCMK.add(1);
        rateCMK.add(true);
        errorTotal.add(1);
        rateTotal.add(true);
    } else {
        rateCMK.add(false);
        rateTotal.add(false);
    }

    sleep(0.5);
}
