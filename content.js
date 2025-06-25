// Listen for messages from popup or background
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'scrapePage') {
    // Try to get title and description from the page
    const title = document.title || '';
    let description = '';
    let reproSteps = '';
    let reportedBy = '';
    // Try meta tag first for description
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      description = meta.getAttribute('content') || '';
    } else {
      // Fallback: try to find a main content area
      const main = document.querySelector('main');
      if (main) {
        description = main.innerText.slice(0, 1000);
      } else {
        description = document.body.innerText.slice(0, 1000);
      }
    }
    // Try to find repro steps
    const reproEl = document.querySelector('[id*="repro" i], [id*="steps" i], [name*="repro" i], [name*="steps" i], label[for*="repro" i], label[for*="steps" i]');
    if (reproEl) {
      if (reproEl.value) {
        reproSteps = reproEl.value;
      } else if (reproEl.innerText) {
        reproSteps = reproEl.innerText.slice(0, 1000);
      }
    }
    // Try to find reported by
    const reportedByEl = document.querySelector('[id*="reported" i], [id*="by" i], [name*="reported" i], [name*="by" i], label[for*="reported" i], label[for*="by" i]');
    if (reportedByEl) {
      if (reportedByEl.value) {
        reportedBy = reportedByEl.value;
      } else if (reportedByEl.innerText) {
        reportedBy = reportedByEl.innerText.slice(0, 200);
      }
    }
    sendResponse({ title, description, reproSteps, reportedBy });
  }
  return true;
}); 