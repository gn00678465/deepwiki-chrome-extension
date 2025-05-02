// Content script: Runs in the context of web pages
console.log('DeepWiki Extension content script loaded');

// Listen for messages from the popup or background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "performAction") {
    // Example action: get the page title
    const pageTitle = document.title;
    
    // Send a response back
    sendResponse({
      status: true,
      message: `Page title: ${pageTitle}`
    });
  }
  // Return true to indicate you will send a response asynchronously
  return true;
});