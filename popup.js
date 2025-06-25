// On popup open, scrape the page and fill fields
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  chrome.tabs.sendMessage(tabs[0].id, { action: 'scrapePage' }, (response) => {
    if (response) {
      document.getElementById('bug-title').value = response.title || '';
      document.getElementById('bug-desc').value = response.description || '';
      document.getElementById('bug-repro').value = response.reproSteps || '';
      document.getElementById('bug-reportedby').value = response.reportedBy || '';
    }
  });
});

document.getElementById('create-bug').addEventListener('click', () => {
  const title = document.getElementById('bug-title').value;
  const description = document.getElementById('bug-desc').value;
  const reproSteps = document.getElementById('bug-repro').value;
  const reportedBy = document.getElementById('bug-reportedby').value;
  document.getElementById('status').textContent = 'Creating bug...';
  chrome.runtime.sendMessage({ action: 'createBug', data: { title, description, reproSteps, reportedBy } }, (res) => {
    if (res && res.success) {
      document.getElementById('status').textContent = 'Bug created! ID: ' + res.id;
    } else {
      document.getElementById('status').textContent = 'Error: ' + (res && res.error ? res.error : 'Unknown error');
    }
  });
});

document.getElementById('open-options').addEventListener('click', (e) => {
  e.preventDefault();
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('options.html'));
  }
}); 