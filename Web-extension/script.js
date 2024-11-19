// Initialize the block list
const blockList = new Set([
  "badad.com",
  "malwareads.net",
  "adwaredomain.com",
  // Add more domains as needed
]);

// Function to fetch the blocking status from storage
function isBlockingEnabled(callback) {
  chrome.storage.local.get({ isBlocking: true }, function (result) {
      callback(result.isBlocking);
  });
}

// Web request listener
chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
      return new Promise((resolve) => {
          isBlockingEnabled((isBlocking) => {
              if (isBlocking) {
                  const url = new URL(details.url);
                  const domain = url.hostname;

                  if (blockList.has(domain)) {
                      console.log(`Blocked adware request: ${details.url}`);
                      resolve({ cancel: true }); // Block the request
                  } else {
                      resolve({ cancel: false }); // Allow the request
                  }
              } else {
                  resolve({ cancel: false }); // Allow all requests if blocking is disabled
              }
          });
      });
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);

// Listener for tab updates
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === "complete") {
      // Check if blocking is enabled before injecting the script
      isBlockingEnabled((isBlocking) => {
          if (isBlocking) {
              chrome.scripting.executeScript({
                  target: { tabId: tabId },
                  files: ["contentScript.js"],
              });
          }
      });
  }
});

// Listener for messages from content scripts
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "blockAd") {
      // Block the ad
      chrome.tabs.update(sender.tab.id, { url: "about:blank" });
      sendResponse({ success: true });
  }
});
