var threshold = 3;

const devUrls = [...Array(threshold)].map((_, i) => `http://172.17.0.2:3000${(i + 1)}`);
const prodUrls = [...Array(threshold)].map((_, i) => `http://srv-ork${(i + 1)}`);
const stageUrls = [...Array(threshold)].map((_, i) => `https://dork${(i + 1)}.azurewebsites.net`);

export default {
    user: "e576698c-41b5-1504-bde9-08bd4dee15df",
    urls: __ENV.DEV ? devUrls
        : __ENV.STAGE ? stageUrls
        : prodUrls
}
