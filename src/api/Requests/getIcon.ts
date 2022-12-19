const fetchImage = async (url: string): Promise<string | null> => {
  try {
    const res = await fetch(url);
    if (res) {
      const imageBlob = await res.blob();
      const imageObjectUrl = URL.createObjectURL(imageBlob);

      return imageObjectUrl;
    } else {
      console.log("Could not retrieve image from", url);
    }
  } catch (error) {
    return null;
  }
  return null;
};

export const getIcon = async (url: string): Promise<string | null> => {
  const urlObj = new URL(url);

  let duckDuckGoIconUrl = `https://icons.duckduckgo.com/ip3/${urlObj.hostname}.ico`;
  const image = fetchImage(duckDuckGoIconUrl);
  if (!image) {
    console.log("Could not fetch from", duckDuckGoIconUrl);
  }
  return image;
};
