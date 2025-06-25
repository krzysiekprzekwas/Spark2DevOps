document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get(['azureToken', 'azureOrg', 'azureProject'], (result) => {
    document.getElementById('token').value = result.azureToken || '';
    document.getElementById('org').value = result.azureOrg || '';
    document.getElementById('project').value = result.azureProject || '';
  });

  document.getElementById('save').addEventListener('click', () => {
    const token = document.getElementById('token').value;
    const org = document.getElementById('org').value;
    const project = document.getElementById('project').value;
    chrome.storage.sync.set({ azureToken: token, azureOrg: org, azureProject: project }, () => {
      document.getElementById('status').textContent = 'Saved!';
      setTimeout(() => { document.getElementById('status').textContent = ''; }, 2000);
    });
  });
}); 