import DAuthClient from './DAuthClient';
import DAuthClientError from './DAuthClientError';
import Point from './Point';

var url = 'http://localhost:5001';
var user = "e576698c-41b5-1504-bde9-08bd4dee15df";

export function test1() {
    var client = new DAuthClient(url)
    var random = Point.random();

    var [, tkn] = client.applyPrism(user, random);
    client.signIn(user, tkn);
    console.log(`successful`);
}

export default function test2() {
    var client = new DAuthClientError(url)

    client.applyPrism(user);
    client.signIn(user);
    
    console.log(`<<<<< successful >>>>>`);
}
