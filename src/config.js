var threshold = 3;

const devUrls = [...Array(threshold)].map((_, i) => `https://dork${(i + 1)}.azurewebsites.net`);
const prodUrls = [...Array(threshold)].map((_, i) => `http://ork-srv${(i + 1)}`);

export default {
    user: "e576698c-41b5-1504-bde9-08bd4dee15df",
    urls: !__ENV.DEV ? prodUrls : devUrls
}
