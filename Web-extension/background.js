chrome.runtime.onInstalled.addListener(() => {
  const rules = [
    {
      id: 1,
      priority: 1,
      action: { type: "block" },
      condition: {
        urlFilter: "*://*.badad.com/*", // Block badad.com
        resourceTypes: ["main_frame", "sub_frame"],
      },
    },
    {
      id: 2,
      priority: 1,
      action: { type: "block" },
      condition: {
        urlFilter: "*://*.evilads.org/*", // Block evilads.org
        resourceTypes: ["main_frame", "sub_frame"],
      },
    },
    {
      id: 3,
      priority: 1,
      action: { type: "block" },
      condition: {
        urlFilter: "*://*.maliciousad.com/*", // Block maliciousad.com
        resourceTypes: ["main_frame", "sub_frame"],
      },
    },
    {
      id: 4,
      priority: 1,
      action: { type: "block" },
      condition: {
        urlFilter: "*://*.doubleclick.net/*", // Block DoubleClick ads
        resourceTypes: ["script", "image", "xmlhttprequest", "stylesheet"],
      },
    },
    {
      id: 5,
      priority: 1,
      action: { type: "block" },
      condition: {
        urlFilter: "*://*.googleadservices.com/*", // Block Google Ads
        resourceTypes: ["script", "image", "xmlhttprequest", "stylesheet"],
      },
    },
    {
      id: 6,
      priority: 1,
      action: { type: "block" },
      condition: {
        urlFilter: "*://*.ads.yahoo.com/*", // Block Yahoo Ads
        resourceTypes: ["script", "image", "xmlhttprequest", "stylesheet"],
      },
    },
    {
      id: 7,
      priority: 1,
      action: { type: "block" },
      condition: {
        urlFilter: "*://*.facebook.com/*", // Block Facebook-related ads
        resourceTypes: ["main_frame", "sub_frame"],
      },
    },
    {
      id: 8,
      priority: 1,
      action: { type: "block" },
      condition: {
        urlFilter: "*://*.instagram.com/*",
        resourceTypes: ["main_frame", "sub_frame"],
      },
    },
    {
      id: 9,
      priority: 1,
      action: { type: "block" },
      condition: {
        urlFilter: "*://*.snapchat.com/*",
        resourceTypes: ["main_frame", "sub_frame"],
      },
    },
    {
      id: 10,
      priority: 1,
      action: { type: "block" },
      condition: {
        urlFilter: "*://*.twitter.com/*",
        resourceTypes: ["main_frame", "sub_frame"],
      },
    },
    {
      id: 11,
      priority: 1,
      action: { type: "block" },
      condition: {
        urlFilter: "*://*.tiktok.com/*",
        resourceTypes: ["main_frame", "sub_frame"],
      },
    },
    {
      id: 12,
      priority: 1,
      action: { type: "block" },
      condition: {
        urlFilter: "*://*.youtube.com/*",
        resourceTypes: ["main_frame", "sub_frame"],
      },
    },
    {
      id: 13,
      priority: 1,
      action: { type: "block" },
      condition: {
        urlFilter: "*://*.messenger.com/*",
        resourceTypes: ["main_frame", "sub_frame"],
      },
    },
    {
      id: 14,
      priority: 1,
      action: { type: "block" },
      condition: {
        urlFilter: "*://*.reddit.com/*",
        resourceTypes: ["main_frame", "sub_frame"],
      },
    },
    {
      id: 15,
      priority: 1,
      action: { type: "block" },
      condition: {
        urlFilter: "*://127.0.0.1:5500/index.html/*", // Block malicious website
        resourceTypes: ["main_frame", "sub_frame"],
      },
    },
  ];

  // Update the dynamic rules
  chrome.declarativeNetRequest.updateDynamicRules(
    {
      removeRuleIds: rules.map((rule) => rule.id), // Remove existing rules by ID
      addRules: rules, // Add the updated rules
    },
    () => {
      if (chrome.runtime.lastError) {
        console.error("Error updating rules:", chrome.runtime.lastError.message);
      } else {
        console.log("Rules updated successfully.");
      }
    }
  );
});

// Listen for page load events and detect suspicious ads
chrome.webNavigation.onCompleted.addListener(
  function (details) {
    console.log("Page loaded:", details.url);

    // Check for suspicious URLs and log them
    if (details.url.includes("maliciousad.com") || details.url.includes("evilads.org")) {
      console.log("Suspicious ad detected on: " + details.url);

      // Store the logs in chrome.storage.local
      chrome.storage.local.get({ adLogs: [] }, function (result) {
        let logs = result.adLogs || [];
        logs.push({ url: details.url, timestamp: new Date().toLocaleString() });
        chrome.storage.local.set({ adLogs: logs });
      });
    }
  },
  { url: [{ urlMatches: "http://*/*" }, { urlMatches: "https://*/*" }] }
);
