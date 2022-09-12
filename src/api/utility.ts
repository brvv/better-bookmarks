export const getIcon = async (url : string) : Promise<string> => {
    let duckDuckGoIconUrl = `https://icons.duckduckgo.com/ip3/${url.replace(/^https?:\/\//, '')}`;

    while (duckDuckGoIconUrl[duckDuckGoIconUrl.length - 1] === '/') {
        duckDuckGoIconUrl = duckDuckGoIconUrl.slice(0, -1);
    }

    duckDuckGoIconUrl = duckDuckGoIconUrl + ".ico";
    console.log(duckDuckGoIconUrl)

    const res = await fetch(duckDuckGoIconUrl);
    if (res) {
        const imageBlob = await res.blob();
        const imageObjectUrl = URL.createObjectURL(imageBlob);

        return imageObjectUrl;
    }
    return "";
}