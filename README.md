# Adware Prevention Chrome Extension

This Chrome extension blocks adware-related content, providing a safer, cleaner browsing experience by preventing malicious ad networks from loading and tracking user behavior. With features like ad-blocking, ad source logging, and a user interface for reviewing blocked sources, this extension aims to offer robust adware prevention and security.

# Features

- **Ad-blocking and Request Interception**: Uses Chrome's `DeclarativeNetRequest` API to block ads from known malicious sources.
- **Ad Source Logging**: Records blocked sources in local storage, allowing users to track what is being blocked.
- **User Interface**: Provides a list of blocked ad sources for transparency and user control.
- **Dynamic Rule Updates**: Adds flexible rules for blocking new ad sources.
- **Obfuscation for Security**: Uses code obfuscation to prevent bypassing the extension’s functionality.

---

## Installation

Follow these steps to set up the development environment and run the extension in Chrome.

### Prerequisites

- **Node.js**: Ensure Node.js (v14 or higher) is installed. [Download Node.js here](https://nodejs.org/).
- **Chrome Browser**: This extension is developed and tested on Chrome.

### Setting Up the Environment

1. **Clone the Repository**: Clone the GitHub repository to your local machine.
   ```bash
   git clone https://github.com/yourusername/adware-prevention-extension.git
   cd adware-prevention-extension
   ```

2. **Install Dependencies**: Install dependencies if any Node packages are used in the development process.
   ```bash
   npm install
   ```

3. **Create Manifest and Scripts**: Set up `manifest.json` and core scripts if not preconfigured.
   - Ensure `manifest.json` contains all required permissions (`declarativeNetRequest`, `storage`, etc.).
   - Configure `popup.js` and `background.js` for functionality.

### Deploying the Extension in Chrome

1. **Load Unpacked Extension**:
   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable **Developer Mode** (toggle in the top right).
   - Click **Load unpacked** and select the project directory (`adware-prevention-extension`).

2. **Testing**:
   - Once loaded, the extension icon should appear in Chrome’s toolbar.
   - Click on the extension icon to open the UI and verify the ad-blocking and logging features.
   - Navigate to a known ad-heavy website and check the logs for blocked requests.

### Usage

After deploying, the extension will automatically block and log requests from adware-related domains. Users can view blocked sources by clicking **View Blocked Websites** in the popup UI. 

---

## Development and Deployment

### Project Structure

- `manifest.json`: Contains extension metadata, permissions, and configuration.
- `popup.html`, `popup.js`, `popup.css`: UI files for the extension popup.
- `background.js`: Background script for handling request blocking.
- `blocked-websites-list.json`: Stores blocked domains (example file for simulation).

### Making Code Changes

To modify or add functionality:
1. Edit code in `popup.js` or `background.js` as needed.
2. Update `manifest.json` for any new permissions or background scripts.
3. Reload the extension in `chrome://extensions` after making changes.

### Obfuscation Techniques

To protect the extension's logic, the code includes obfuscation techniques:
- **JavaScript Obfuscator**: Tools like [javascript-obfuscator](https://www.npmjs.com/package/javascript-obfuscator) can be used.
   ```bash
   npx javascript-obfuscator popup.js background.js --output obfuscated/
   ```

- Replace original JavaScript files with obfuscated versions for added security.

---

## Future Scope

This extension can be enhanced with:
- **Automatic Rule Updates**: Regularly update blocking rules to cover new threats.
- **User-Customizable Block Lists**: Allow users to add custom domains for blocking.
- **Advanced Threat Intelligence**: Incorporate machine learning models for real-time adware detection.

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.
