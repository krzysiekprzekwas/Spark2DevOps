chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'createBug') {
    const { title, description, reproSteps, reportedBy } = request.data;
    chrome.storage.sync.get(['azureToken', 'azureOrg', 'azureProject'], (result) => {
      const token = result.azureToken;
      const org = result.azureOrg;
      const project = result.azureProject;
      if (!token || !org || !project) {
        sendResponse({ error: 'Azure DevOps token, org, or project not set.' });
        return;
      }
      fetch(`https://dev.azure.com/${org}/${project}/_apis/wit/workitems/$Bug?api-version=7.0`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json-patch+json',
          'Authorization': 'Basic ' + btoa(':' + token)
        },
        body: JSON.stringify([
          { "op": "add", "path": "/fields/System.Title", "value": title },
          { "op": "add", "path": "/fields/System.Description", "value": description },
          { "op": "add", "path": "/fields/Microsoft.VSTS.TCM.ReproSteps", "value": reproSteps },
          { "op": "add", "path": "/fields/Custom.Reportedby", "value": reportedBy }
        ])
      })
      .then(async response => {
        if (!response.ok) {
          const err = await response.text();
          throw new Error(err);
        }
        return response.json();
      })
      .then(data => {
        sendResponse({ success: true, id: data.id });
      })
      .catch(error => {
        sendResponse({ error: error.message });
      });
    });
    return true; // async
  }
}); 