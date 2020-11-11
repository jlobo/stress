/**
 * @param {Uint8Array} buff1
 * @param {Uint8Array} buff2
 * @return {Uint8Array}
 */
export function concat(buff1, buff2) {
    var buff = new Uint8Array(buff1.length + buff2.length);
    buff.set(buff1, 0);
    buff.set(buff2, buff1.byteLength);
    
    return buff;
}

/**
 * @param {Uint8Array} buff
 * @param {number} length
 * @return {Uint8Array}
 */
export function padLeft(buff, length) {
    if (buff.length >= length)
        return buff;
    
    var buff = new Uint8Array(length);
    buff.set(buff, buff.length - buff.byteLength);
    
    return buff;
}

/** @param {number} size */
export function randomBytes(size) {
    var buffer = new Uint8Array(size);
    for (let i = 0; i < buffer.length; i++) {
        buffer[i] = Math.random() * 256
    }
    return buffer;
}
