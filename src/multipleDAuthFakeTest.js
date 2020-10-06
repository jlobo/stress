import config from './config';
import DAuthClientSetError from './libs/DAuthClientSetError';

export let options = {
    stages: [
        { duration: "15s", target: 50 },
        { duration: "30s", target: 50 },
        { duration: "15s", target: 0 }
    ]
};

export default function() {
    var client = new DAuthClientSetError(config.urls)

    client.applyPrism(config.user);
    client.signIn(config.user);
}
