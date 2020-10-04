import DAuthClient from './DAuthClient';
import Point from './Point';

export default function() {
    var client = new DAuthClient('http://localhost:5001')
    var user = "e576698c-41b5-1504-bde9-08bd4dee15df";
    var random = Point.random();

    var [, tkn] = client.applyPrism(user, random);
    client.signIn(user, tkn);
    console.log(`successful`);
}