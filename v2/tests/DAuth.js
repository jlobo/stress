import { EventEmitter } from 'events';
import { sleep } from "../utils.js";
import { CP256Key } from "cryptide";
import DAuthJwtFlow from "tide-js/src/dauth/DAuthJwtFlow";

const wait = 50;
var pass = "123456";
var user = Math.floor(Math.random() * 9999999999999999).toString();
var email = "info@tide.org";

export default class DAuth {
    /**
     * @param {string[]} urls
     * @param {number} threshold
     */
    constructor(urls, threshold, times = 1) {
        this.times = times;
        this.threshold = threshold;
        this.emitter = new EventEmitter();
        this.venKey = CP256Key.generate();

        this.flow = new DAuthJwtFlow(user);
        this.flow.cmkUrls = urls;
        this.flow.cvkUrls = urls;
        this.flow.vendorPub = this.venKey.public();
    }

    /**
     * @param {'successful'|'error'} event
     * @param {(...args: any[]) => void} listener
     */
    on(event, listener) {
        this.emitter.on(event, listener);
    }

    init() {
        return this.flow.signUp(pass, email, this.threshold);
    }
    
    async run() {
        let errors = 0;
        let successful = 0;
        let durationTotal = 0;

        for (let i = 0; i < this.times; i++) {
            const waiting =  sleep(wait);
            const start = new Date().getTime();

            try {
                await this.flow.logIn(pass);

                successful += 1;
                const duration = new Date().getTime() - start;
                durationTotal += duration;
                this.emitter.emit('successful', successful, duration, 200);
            }
            catch (error) {
                errors += 1;
                const duration = new Date().getTime() - start;
                this.emitter.emit('error', errors, duration, error);
            }

            await waiting;
        }

        return { errors, successful, duration: durationTotal / this.times };
    }
}
