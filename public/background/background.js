import { setupExtension } from "./modules/setup.js";
import { getRootId, getUncategorizedId } from "./modules/misc.js";

const handleInstalled = (details) => {
  console.log(details.reason);

  setupExtension().then((node) => {
    console.log("setup complete!");
  });

  getRootId().then((id) => {
    console.log(id);
  });

  getUncategorizedId().then((id) => {
    console.log(id);
  });
};

browser.runtime.onInstalled.addListener(handleInstalled);
