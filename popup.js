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

function setStatus(msg, type) {
  const status = document.getElementById('status');
  status.classList.remove('success', 'error');
  status.textContent = msg;
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
      setStatus('Bug created! ID: ' + res.id, 'success');
    } else {
      setStatus('Error: ' + (res && res.error ? res.error : 'Unknown error'), 'error');
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