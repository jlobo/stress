export default class Metric {
    get seconds() {
        return Math.trunc(((this.end || new Date().getTime()) - this.start) / 1000);
    }

    get durationSg() {
        return Math.trunc(this.duration / 1000);
    }

    get successfulRate() {
        return (this.successful / this.duration * 1000).toFixed(4);
    }
    
    constructor() {
        this.iter = 0;
        this.errors = 0;
        this.successful = 0;
        this.duration = 0;
        this.start = new Date().getTime();
        this.end = 0;
    }

    IncErrors() {
        this.iter++;
        this.errors++;
    }

    IncSuccessful() {
        this.iter++;
        this.successful++;
    }

    /** @param {number} time */
    IncDuration(time) {
        this.duration += time;
    }

    finish() {
        this.end = new Date().getTime();
        return this;
    }

    print() {
        return `===> [iter:${this.iter} / sg:${this.durationSg}] [ok:${this.successful} - err:${this.errors}] rate:${this.successfulRate}/sg`;
    }
}
