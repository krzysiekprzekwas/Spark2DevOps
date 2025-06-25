let createdBugUrl = null;

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

function setStatus(msg, type, url) {
  const status = document.getElementById('status');
  const statusText = document.getElementById('status-text');
  status.classList.remove('success', 'error');
  statusText.textContent = msg;
  status.style.cursor = (type === 'success' && url) ? 'pointer' : 'default';
  createdBugUrl = (type === 'success' && url) ? url : null;
  if (type === 'success') status.classList.add('success');
  else if (type === 'error') status.classList.add('error');
}

document.getElementById('create-bug').addEventListener('click', () => {
  const title = document.getElementById('bug-title').value;
  const description = document.getElementById('bug-desc').value;
  const reproSteps = document.getElementById('bug-repro').value;
  const reportedBy = document.getElementById('bug-reportedby').value;
  setStatus('Creating bug...');
  chrome.runtime.sendMessage({ action: 'createBug', data: { title, description, reproSteps, reportedBy } }, (res) => {
    if (res && res.success) {
      // Compose Azure DevOps bug URL
      chrome.storage.sync.get(['azureOrg', 'azureProject'], (result) => {
        const org = result.azureOrg;
        const project = result.azureProject;
        const url = `https://dev.azure.com/${org}/${project}/_workitems/edit/${res.id}`;
        setStatus('Bug created! ID: ' + res.id, 'success', url);
      });
    } else {
      setStatus('Error: ' + (res && res.error ? res.error : 'Unknown error'), 'error');
    }
  });
});

document.getElementById('status').addEventListener('click', () => {
  if (createdBugUrl) {
    chrome.tabs.create({ url: createdBugUrl });
  }
});

document.getElementById('open-options').addEventListener('click', (e) => {
  e.preventDefault();
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('options.html'));
  }
}); 