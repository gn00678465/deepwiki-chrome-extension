# DeepWiki Chrome Extension

A Chrome extension template with manifest v3 support.

## Features

- Popup interface with interactive elements
- Background service worker for extension functionality
- Content scripts for page interaction
- Chrome storage API integration
- Message passing between components

## Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" by toggling the switch in the top-right corner
3. Click "Load unpacked" and select the extension directory
4. The extension icon should appear in your browser toolbar

## File Structure

- `manifest.json`: Extension configuration
- `popup.html`: Popup UI
- `popup.js`: Popup functionality
- `background.js`: Background service worker
- `content.js`: Content script for webpage interaction
- `styles.css`: Styling for popup UI
- `icons/`: Directory containing icon files

## Development

To modify this extension:

1. Edit the files as needed
2. Go to `chrome://extensions/`
3. Click the refresh icon on the extension card
4. Test your changes

## License

This project is licensed under the MIT License.