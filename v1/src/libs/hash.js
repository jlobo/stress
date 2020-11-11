// Tide Protocol - Infrastructure for the Personal Data economy
// Copyright (C) 2019 Tide Foundation Ltd
// 
// This program is free software and is subject to the terms of 
// the Tide Community Open Source License as published by the 
// Tide Foundation Limited. You may modify it and redistribute 
// it in accordance with and subject to the terms of that License.
// This program is distributed WITHOUT WARRANTY of any kind, 
// including without any implied warranty of MERCHANTABILITY or 
// FITNESS FOR A PARTICULAR PURPOSE.
// See the Tide Community Open Source License for more details.
// You should have received a copy of the Tide Community Open 
// Source License along with this program.
// If not, see https://tide.org/licenses_tcosl-1-0-en

import createHash from 'create-hash';
import createHmac from 'create-hmac';

/** @param {Buffer|string} message */
export function sha(message) {
    return shaBuffer(message).toString('base64');
}

/** @param {Buffer|string} message */
export function shaBuffer(message) {
    return createHash('sha256').update(message).digest();
}

/**
 * @param {Buffer | string} message
 * @param {Buffer | string} secret
 */
export function hmac(message, secret) {
    return hmacBuffer(message, secret).toString('base64');
}

/**
 * @param {Buffer | string} message
 * @param {Buffer | string} secret
 */
export function hmacBuffer(message, secret) {
    var data = typeof message === 'string' ? Buffer.from(message, 'utf8') : message;
    return createHmac('sha256', secret).update(data).digest();
}
