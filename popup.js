document.addEventListener('DOMContentLoaded', function() {
  const settingsIcon = document.getElementById('settingsIcon');
  const mainContent = document.getElementById('mainContent');
  const settingsContent = document.getElementById('settingsContent');
  const saveSettingsButton = document.getElementById('saveSettings');
  const createBugButton = document.getElementById('createBug');

  // Load settings when popup opens
  loadSettings();
  loadCurrentPageData();

  // Toggle settings view
  settingsIcon.addEventListener('click', function() {
    mainContent.classList.toggle('hidden');
    settingsContent.classList.toggle('hidden');
  });

  // Save settings
  saveSettingsButton.addEventListener('click', function() {
    const settings = {
      orgUrl: document.getElementById('orgUrl').value,
      projectName: document.getElementById('projectName').value,
      pat: document.getElementById('pat').value,
      areaPath: document.getElementById('areaPath').value,
      iterationPath: document.getElementById('iterationPath').value
    };

    chrome.storage.sync.set({ settings: settings }, function() {
      alert('Settings saved!');
      mainContent.classList.remove('hidden');
      settingsContent.classList.add('hidden');
    });
  });

  // Create bug
  createBugButton.addEventListener('click', function() {
    const title = document.getElementById('bugTitle').value;
    const description = document.getElementById('bugDescription').value;

    chrome.storage.sync.get(['settings'], function(result) {
      if (!result.settings || !result.settings.orgUrl || !result.settings.pat) {
        alert('Please configure your Azure DevOps settings first!');
        mainContent.classList.add('hidden');
        settingsContent.classList.remove('hidden');
        return;
      }

      createBugInAzureDevOps(title, description, result.settings);
    });
  });
});

function loadSettings() {
  chrome.storage.sync.get(['settings'], function(result) {
    if (result.settings) {
      document.getElementById('orgUrl').value = result.settings.orgUrl || '';
      document.getElementById('projectName').value = result.settings.projectName || '';
      document.getElementById('pat').value = result.settings.pat || '';
      document.getElementById('areaPath').value = result.settings.areaPath || '';
      document.getElementById('iterationPath').value = result.settings.iterationPath || '';
    }
  });
}

function loadCurrentPageData() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: "getPageData"}, function(response) {
      if (response) {
        document.getElementById('bugTitle').value = response.title || '';
        document.getElementById('bugDescription').value = response.description || '';
      }
    });
  });
}

async function createBugInAzureDevOps(title, description, settings) {
  const url = `${settings.orgUrl}/${settings.projectName}/_apis/wit/workitems/$bug?api-version=6.0`;
  
  const workItemData = [
    {
      op: "add",
      path: "/fields/System.Title",
      value: title
    },
    {
      op: "add",
      path: "/fields/System.Description",
      value: description
    }
  ];

  if (settings.areaPath) {
    workItemData.push({
      op: "add",
      path: "/fields/System.AreaPath",
      value: settings.areaPath
    });
  }

  if (settings.iterationPath) {
    workItemData.push({
      op: "add",
      path: "/fields/System.IterationPath",
      value: settings.iterationPath
    });
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json-patch+json',
        'Authorization': `Basic ${btoa(`:${settings.pat}`)}`
      },
      body: JSON.stringify(workItemData)
    });

    if (response.ok) {
      const result = await response.json();
      const workItemUrl = `${settings.orgUrl}/${settings.projectName}/_workitems/edit/${result.id}`;
      chrome.tabs.create({ url: workItemUrl });
    } else {
      throw new Error('Failed to create work item');
    }
  } catch (error) {
    alert('Error creating bug: ' + error.message);
  }
} 