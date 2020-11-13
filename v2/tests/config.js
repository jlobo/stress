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
    return "http://ork" + index;
}

/** @param {number} index */
function orkUrlDev(index) {
    return "http://localhost:500" + index;
}
