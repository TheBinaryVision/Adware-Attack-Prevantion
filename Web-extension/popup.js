// Fetch and display logs when the popup is opened
chrome.storage.local.get({ adLogs: [], isBlocking: true }, function (result) {
    const logList = document.getElementById("log-list");
    logList.innerHTML = ""; // Clear previous logs

    const toggleSwitch = document.getElementById("adblock-toggle");
    toggleSwitch.checked = result.isBlocking; // Set toggle state

    // If no logs, show a message indicating no ad behavior detected
    if (result.adLogs.length === 0) {
        const noLogsItem = document.createElement("li");
        noLogsItem.textContent = "No suspicious ad behavior detected.";
        logList.appendChild(noLogsItem);
    } else {
        // Loop through logs and display each
        result.adLogs.forEach((log) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${log.timestamp}: ${log.url}`;
            logList.appendChild(listItem);
        });
    }
});

// List of blocked websites from the manifest and background script
const blockedWebsites = [
    "badad.com",
    "evilads.org",
    "maliciousad.com",
    "doubleclick.net",
    "googleadservices.com",
    "ads.yahoo.com",
    "facebook.com",
    "instagram.com",
    "snapchat.com",
    "twitter.com",
    "tiktok.com",
    "youtube.com",
    "messenger.com",
    "reddit.com",
    "http://127.0.0.1:5500/index.html",
];

// Event listener for the button to show the blocked websites
document.getElementById("blockList").addEventListener("click", function () {
    const blockedWebsitesList = document.getElementById("blocked-websites-list");
    blockedWebsitesList.style.display = "block"; // Show the blocked websites list
    blockedWebsitesList.innerHTML = ""; // Clear previous list

    // Add each blocked website to the list
    blockedWebsites.forEach((website) => {
        const listItem = document.createElement("li");
        listItem.textContent = website;
        blockedWebsitesList.appendChild(listItem);
    });
});

// Event listener for the toggle switch
document.getElementById("adblock-toggle").addEventListener("change", function (event) {
    const isEnabled = event.target.checked;
    chrome.storage.local.set({ isBlocking: isEnabled }); // Save toggle state
    const statusText = document.getElementById("toggle-status");
    statusText.textContent = isEnabled ? "Ad blocker is ON" : "Ad blocker is OFF";
});
