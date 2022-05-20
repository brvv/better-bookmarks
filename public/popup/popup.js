const openExtensionPage = async () => {
  console.log("Here!");
  let createData = {
    url: "../index.html",
  };
  return await browser.tabs.create(createData);
};

const pseudoButton = document.getElementById("pseudoButton");
pseudoButton.addEventListener("click", openExtensionPage);
