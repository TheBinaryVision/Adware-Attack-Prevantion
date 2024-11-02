// Listen for requests
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      // Set of known adware domains to block (using a Set for faster lookups)
      const blockList = new Set([
        "badad.com",
        "malwareads.net",
        "adwaredomain.com",
        // Add more domains as needed
      ]);
  
      // Extract the domain from the URL (using URL API for better parsing)
      const url = new URL(details.url);
      const domain = url.hostname;
  
      // Check if the domain is in the block list
      if (blockList.has(domain)) {
        console.log(`Blocked adware request: ${details.url}`);
        return { cancel: true }; // Block the request
      }
  
      return { cancel: false }; // Allow the request
    },
    { urls: ["<all_urls>"] },
    ["blocking"]
  );
  
  // Listen for tab updates
  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    // Check if the tab has finished loading
    if (changeInfo.status === "complete") {
      // Inject a content script into the tab
      chrome.tabs.executeScript(tabId, {
        file: "contentScript.js",
        runAt: "document_end"
      });
    }
  });
  
  // Listen for messages from content scripts
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // Handle messages from content scripts
    if (request.action === "blockAd") {
      // Block the ad
      chrome.tabs.update(sender.tab.id, { url: "about:blank" });
    }
  });