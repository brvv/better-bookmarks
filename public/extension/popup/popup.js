const openExtensionPage = async () => {
  let createData = {
    url: "../dashboard.html",
  };
  await browser.tabs.create(createData);
  window.close();
};

const openDashboardButton = document.getElementById("openDashboardButton");
openDashboardButton.addEventListener("click", openExtensionPage);
