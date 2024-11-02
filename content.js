// content.js
(function() {
  // Detect and remove injected ads
  const adSelectors = [
    "iframe[src*='ads']",
    "div[class*='ad']",
    "script[src*='ads']",
    "img[src*='ads']"
  ];

  adSelectors.forEach(selector => {
    let ads = document.querySelectorAll(selector);
    ads.forEach(ad => {
      ad.style.display = "none"; // Hides the ad element
      console.log("Blocked ad: " + ad.src);
    });
  });
  // Detecting ad scripts being loaded on the page
const adScripts = document.querySelectorAll('script[src*="ads"], iframe[src*="ads"], img[src*="ads"]');
adScripts.forEach(ad => {
  console.log("Detected potential ad:", ad.src);
  // You can add logic to block these scripts or iframes
});
// content.js

const adDomains = [
  "badad.com",
  "evilads.org",
  "maliciousad.com",
  // Add more suspicious ad domains here
];

// Check if any of the specified ad domains are present in the page URL
adDomains.forEach(domain => {
  if (window.location.href.includes(domain)) {
    // Alert the user about the suspicious ad domain
    alert("Suspicious ad domain detected: " + domain);
  }
});

  // Detect and log ad sources (background alert)
  const potentialAds = document.querySelectorAll('script[src], iframe[src], img[src]');
  potentialAds.forEach(item => {
    if (item.src.includes("maliciousad.com") || item.src.includes("eviladsource.com")) {
      console.log("Blocked malicious ad source: " + item.src);
    }
  });
})();
