// Fetch and display logs when the popup is opened
chrome.storage.local.get({ adLogs: [] }, function(result) {
    const logList = document.getElementById('log-list');
    logList.innerHTML = ''; // Clear previous logs

    // If no logs, show a message indicating no ad behavior detected
    if (result.adLogs.length === 0) {
        const noLogsItem = document.createElement('li');
        noLogsItem.textContent = "No suspicious ad behavior detected.";
        logList.appendChild(noLogsItem);
    } else {
        // Loop through logs and display each
        result.adLogs.forEach(log => {
            const listItem = document.createElement('li');
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
    "reddit.com"
];

// Event listener for the button to show the blocked websites
document.getElementById('blockList').addEventListener('click', function() {
    const blockedWebsitesList = document.getElementById('blocked-websites-list');
    blockedWebsitesList.style.display = 'block';  // Show the blocked websites list
    blockedWebsitesList.innerHTML = '';  // Clear previous list

    // Add each blocked website to the list
    blockedWebsites.forEach(website => {
        const listItem = document.createElement('li');
        listItem.textContent = website;
        blockedWebsitesList.appendChild(listItem);
    });
});
