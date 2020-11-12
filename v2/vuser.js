import { EventEmitter } from 'events';
import req from "superagent";
import { sleep } from "./utils.js";

const wait = 200;

export default class VUser {
    /** @param {string} url */
    constructor(url, times = 1) {
        this.url = url;
        this.times = times;
        this.emitter = new EventEmitter();
    }

    /**
     * @param {'successful'|'error'} event
     * @param {(...args: any[]) => void} listener
     */
    on(event, listener) {
        this.emitter.on(event, listener);
    }

    async run() {
        let errors = 0;
        let successful = 0;
        let durationTotal = 0;
        
        for (let i = 0; i < this.times; i++) {
            const start = new Date().getTime();

            try {
                const resp = await req.get(this.url).timeout({ deadline: 30000 });
                successful += 1;
                const duration = new Date().getTime() - start;
                durationTotal += duration;
                this.emitter.emit('successful', successful, duration, resp.status);
            }
            catch (error) {
                errors += 1;
                const duration = new Date().getTime() - start;
                this.emitter.emit('error', errors, duration, error);
            }
            await sleep(wait);
        }

        return { errors, successful, duration: durationTotal / this.times };
    }
}
