// Background script for Chrome Extension (Service Worker in Manifest V3)
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
  
  // Example: Set initial storage values
  chrome.storage.local.set({
    isEnabled: true,
    preferences: {
      theme: 'light',
      notifications: true
    }
  });
});

// Example: Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getStatus") {
    sendResponse({status: "Extension is running"});
  }
  // Make sure to return true if you want to send a response asynchronously
  return true;
});