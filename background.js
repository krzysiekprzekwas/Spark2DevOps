// Initialize extension when installed
chrome.runtime.onInstalled.addListener(function() {
  // Set default settings
  chrome.storage.sync.get(['settings'], function(result) {
    if (!result.settings) {
      chrome.storage.sync.set({
        settings: {
          orgUrl: '',
          projectName: '',
          pat: '',
          areaPath: '',
          iterationPath: ''
        }
      });
    }
  });
});

// Listen for any errors in the extension
chrome.runtime.onError.addListener(function(error) {
  console.error('Extension error:', error);
}); 