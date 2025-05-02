document.addEventListener('DOMContentLoaded', function() {
  const actionButton = document.getElementById('actionButton');
  const resultDiv = document.getElementById('result');

  actionButton.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      resultDiv.textContent = 'Action performed on: ' + tabs[0].url;
      
      // Example of sending a message to the content script
      chrome.tabs.sendMessage(tabs[0].id, {action: "performAction"}, function(response) {
        if (response && response.status) {
          resultDiv.textContent = response.message;
        }
      });
    });
  });
});