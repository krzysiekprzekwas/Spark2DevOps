// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "getPageData") {
    const pageData = scrapePageData();
    sendResponse(pageData);
  }
  return true;
});

function scrapePageData() {
  // This is a basic implementation. You'll need to customize the selectors
  // based on your specific ITSM system's HTML structure
  const data = {
    title: '',
    description: ''
  };

  // Try to find the title
  // Common selectors for titles
  const titleSelectors = [
    'h1',
    '.ticket-title',
    '.incident-title',
    '#ticket-title',
    '[data-testid="ticket-title"]'
  ];

  for (const selector of titleSelectors) {
    const element = document.querySelector(selector);
    if (element) {
      data.title = element.textContent.trim();
      break;
    }
  }

  // Try to find the description
  // Common selectors for descriptions
  const descriptionSelectors = [
    '.ticket-description',
    '.incident-description',
    '#ticket-description',
    '[data-testid="ticket-description"]',
    '.description-content'
  ];

  for (const selector of descriptionSelectors) {
    const element = document.querySelector(selector);
    if (element) {
      data.description = element.textContent.trim();
      break;
    }
  }

  // If no title was found, use the page title
  if (!data.title) {
    data.title = document.title;
  }

  // If no description was found, try to get some meaningful content
  if (!data.description) {
    // Try to get the first paragraph or div with substantial content
    const contentElements = document.querySelectorAll('p, div');
    for (const element of contentElements) {
      const text = element.textContent.trim();
      if (text.length > 50) { // Arbitrary length to ensure meaningful content
        data.description = text;
        break;
      }
    }
  }

  // Add URL to description if we have one
  if (data.description) {
    data.description += `\n\nSource URL: ${window.location.href}`;
  }

  return data;
} 