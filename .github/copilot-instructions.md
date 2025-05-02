<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Chrome Extension Development

This is a Chrome extension project using Manifest V3. When assisting with this project, remember:

- All JavaScript runs in the context of a Chrome extension
- Background scripts run as service workers in Manifest V3
- Content scripts run in the context of web pages
- Popup scripts run when the extension popup is opened
- Communication between scripts uses the Chrome messaging API
- Storage should use chrome.storage API rather than localStorage

## Key Chrome Extension APIs

- `chrome.tabs` - For interacting with browser tabs
- `chrome.storage` - For persistent storage
- `chrome.runtime` - For background communication
- `chrome.action` - For managing the extension's toolbar button
- `chrome.contextMenus` - For creating context menu items
- `chrome.permissions` - For handling optional permissions

## Development Tips

- Test permissions in manifest.json carefully
- Remember content script isolation from page scripts
- Use Chrome's developer tools for debugging extension components
- Extensions need to be reloaded in chrome://extensions after code changes