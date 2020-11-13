import { EventEmitter } from 'events';
import { sleep } from "./utils.js";

export default class Manager {
    constructor(test, times = 1, wait = 50) {
        this.test = test;
        this.times = times;
        this.wait = wait;
        this.emitter = new EventEmitter();
    }

    /**
     * @param {'successful'|'error'} event
     * @param {(iter: number, count: number, duration: number,  ...args: any[]) => void} listener
     */
    on(event, listener) {
        this.emitter.on(event, listener);
    }

    init() {
        return this.test.init ? this.test.init() : Promise.resolve();
    }
    
    async run() {
        let errors = 0;
        let successful = 0;
        let durationTotal = 0;

        for (let i = 0; i < this.times; i++) {
            const waiting = sleep(this.wait);
            const start = new Date().getTime();

            try {
                await this.test.run();

                successful += 1;
                const duration = new Date().getTime() - start;
                durationTotal += duration;
                this.emitter.emit('successful', i, successful, duration);
            }
            catch (error) {
                errors += 1;
                const duration = new Date().getTime() - start;
                this.emitter.emit('error', i, errors, duration, error);
            }

            await waiting;
        }

        return { errors, successful, duration: durationTotal / this.times };
    }
}
