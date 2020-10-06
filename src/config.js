var threshold = 7;

export default {
    user: "e576698c-41b5-1504-bde9-08bd4dee15df",
    urls: [...Array(threshold)].map((_, i) => `https://dork${(i + 1)}.azurewebsites.net`)
}
