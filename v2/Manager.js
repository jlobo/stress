import { EventEmitter } from 'events';
import Metric from './Metric.js';
import { sleep } from "./utils.js";

export default class Manager {
    /**
     * @param {{ init?: () => Promise<any>; run: () => Promise<any>; }} test
     * @param {(times: number, fun: () => Promise<void>) => Promise<void>} loop
     * @param {number} [times]
     * @private
     */
    constructor(test, loop, times) {
        this.test = test;
        this.loop = loop;
        this.times = times;
        this.emitter = new EventEmitter();
    }
    /**
     * @param {{ init?: () => Promise<any>; run: () => Promise<any>; }} test
     * @param {number} cycles
     */
    static times(test, cycles) {
        return new Manager(test, ForLoop, cycles);
    }
    
    /**
     * @param {{ init?: () => Promise<any>; run: () => Promise<any>; }} test
     * @param {number} milliseconds
     */
    static duration(test, milliseconds) {
        return new Manager(test, TimeLoop, milliseconds);
    }

    /**
     * @param {'successful'|'error'} event
     * @param {(iter: Metric, err?: Error) => void} listener
     */
    on(event, listener) {
        this.emitter.on(event, listener);
    }

    init() {
        return this.test.init ? this.test.init() : Promise.resolve();
    }
    
    async run() {
        var metric = new Metric();

        await this.loop(this.times, async () => {
            const start = new Date().getTime();

            try {
                await this.test.run();

                metric.IncSuccessful();
                metric.IncDuration(new Date().getTime() - start);

                this.emitter.emit('successful', metric);
            }
            catch (error) {
                metric.IncErrors();
                metric.IncDuration(new Date().getTime() - start);

                this.emitter.emit('error', metric, error);
            }
        })

        return metric.finish();
    }
}

/**
 * @param {number} times
 * @param {() => Promise<void>} fun
 */
async function ForLoop(times, fun) {
    for (let i = 0; i < times; i++) {
        await fun();
    }
}

/**
 * @param {number} times
 * @param {() => Promise<void>} fun
 */
async function TimeLoop(times, fun) {
    var wait = sleep(times).then(() => 'FINISHED');
    while ('FINISHED' !== await Promise.race([wait, fun()])) {

    }
}