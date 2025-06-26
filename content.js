// Listen for messages from popup or background
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'scrapePage') {
    // Scrape data from the page using specific element IDs from the ITSM system
    let title = '';
    let description = '';
    let reproSteps = '';
    let reportedBy = '';

    const titleEl = document.getElementById('ticket-detail-ticket-title');
    if (titleEl) {
      title = titleEl.innerText;
    }

    const descriptionEl = document.getElementById('ticket-details-description');
    if (descriptionEl) {
      const fullText = descriptionEl.innerText;
      // Both description and repro steps are taken from the same element, as requested.
      // The user can edit them separately in the popup.
      description = fullText;
      reproSteps = fullText;
    }

    const reportedByEl = document.getElementById('ticket-detail-contact');
    if (reportedByEl) {
      reportedBy = reportedByEl.innerText;
    }

    sendResponse({ title, description, reproSteps, reportedBy });
  }
  return true; // Keep the message channel open for the asynchronous response
}); 