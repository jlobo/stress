import config from './config';
import DAuthClientError from './libs/DAuthClientError';

export default function() {
    var client = new DAuthClientError(config.urls[0])

    client.applyPrism(config.user);
    client.signIn(config.user);
}
