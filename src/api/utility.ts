export const getIcon = async (url: string): Promise<string> => {
  const urlObj = new URL(url);
  console.log("Trying to get icon from", urlObj.hostname);

  let duckDuckGoIconUrl = `https://icons.duckduckgo.com/ip3/${urlObj.hostname}.ico`;

  try {
    const res = await fetch(duckDuckGoIconUrl);
    if (res) {
      const imageBlob = await res.blob();
      const imageObjectUrl = URL.createObjectURL(imageBlob);

      return imageObjectUrl;
    } else {
      console.log("Could not retrieve favicon from", duckDuckGoIconUrl);
    }
  } catch (error) {
    console.log("Could not retrieve favicon from", duckDuckGoIconUrl);
  }
  return "";
};
