const threshold = 3;

export default {
    pass: "123456",
    user: Math.floor(Math.random() * 999999999999999).toString(),
    email: "info@tide.org",
    orkUrls: function orkUrls() {
        const fun = process.env.DEV ? orkUrlDev : orkUrl;
        return [...Array(threshold)].map((_, i) => fun(i + 1));
    }
}

/** @param {number} index */
function orkUrl(index) {
    return "http://srv-ork" + index;
}

/** @param {number} index */
function orkUrlDev(index) {
    return "http://172.17.0.3:3000" + index;
}
