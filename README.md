# ITSM to Azure DevOps Bug Creator Extension

This Microsoft Edge browser extension allows you to quickly create Azure DevOps work items (bugs) from your ITSM system pages. The extension scrapes the current page for relevant information and automatically creates a new bug in your Azure DevOps project.

## Features

- One-click bug creation from ITSM system pages
- Automatic scraping of page title and description
- Direct link to the created bug in Azure DevOps
- Configurable Azure DevOps connection settings

## Installation

1. Clone this repository to your local machine
2. Open Microsoft Edge and navigate to `edge://extensions/`
3. Enable "Developer mode" in the bottom left corner
4. Click "Load unpacked" and select the extension directory
5. The extension icon should appear in your browser toolbar

## Configuration

1. Click on the extension icon in your browser toolbar
2. Click on the settings icon (gear) in the extension popup
3. Enter your Azure DevOps configuration:
   - Organization URL (e.g., `https://dev.azure.com/your-organization`)
   - Project name
   - Personal Access Token (PAT)
   - Default area path (optional)
   - Default iteration path (optional)

### Creating a Personal Access Token (PAT)

1. Go to Azure DevOps portal
2. Click on your profile picture in the top right
3. Select "Personal access tokens"
4. Click "New Token"
5. Give it a name and select the following scopes:
   - Work Items (Read & Write)
6. Copy the generated token and paste it in the extension settings

## Usage

1. Navigate to the ITSM system page you want to create a bug from
2. Click the extension icon in your browser toolbar
3. Review the scraped information
4. Click "Create Bug" to create the work item
5. The new bug will open in a new tab

## Development

This extension is built using:
- HTML/CSS/JavaScript
- Azure DevOps REST API
- Edge Extension APIs

## Security Notes

- Your Azure DevOps PAT is stored locally in the extension's storage
- Never share your PAT or commit it to version control
- The extension only makes requests to your configured Azure DevOps organization

## Troubleshooting

If you encounter any issues:
1. Check that your Azure DevOps PAT is valid and has the correct permissions
2. Verify your organization URL and project name are correct
3. Ensure you're on a supported ITSM system page
4. Check the browser console for any error messages

## Support

For issues and feature requests, please create an issue in this repository. 