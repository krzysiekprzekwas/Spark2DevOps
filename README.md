# ITSM to Azure DevOps Bug Reporter

A Microsoft Edge extension to scrape your ITSM page and create a Bug in Azure DevOps with one click.

## Features
- Scrape current page for title, description, repro steps, and reported by
- All fields are editable before submission
- Create a Bug in your Azure DevOps project
- Configure your Azure DevOps token, organization, and project
- Error handling and feedback in the popup
- Clickable green status message (with arrow) opens the created bug in Azure DevOps
- Modern, user-friendly UI

## Installation
1. Download or clone this repository.
2. Open Microsoft Edge and go to `edge://extensions/`.
3. Enable **Developer mode** (toggle in the lower left).
4. Click **Load unpacked** and select the folder containing this extension.

## Configuration
1. Click the extension icon, then click **Settings**.
2. Enter your Azure DevOps **Personal Access Token**, **Organization**, and **Project**.
3. Click **Save**.

## Usage
1. Navigate to your ITSM page you want to report as a bug.
2. Click the extension icon.
3. The popup will automatically scrape and prefill four fields: **Title**, **Description**, **Repro Steps**, and **Reported by**.
4. You can edit any of these fields before submitting.
5. Click **Create Bug**.
6. The extension will create a Bug in Azure DevOps. The status message will:
   - Show in **green** if successful, with a right arrow icon. Click it to open the created bug in a new tab.
   - Show in **red** if there was an error, with details.
   - Show in **gray** for neutral info.

## Icons
Icons are from the `/icons` folder.

## Troubleshooting
- If you see an error about missing token/org/project, make sure you have saved them in Settings.
- If Azure DevOps returns an error, it will be shown in the popup.
- If the bug is created but you don't see the clickable status, check your Azure DevOps configuration.

---
This extension is for internal use. Keep your Azure DevOps token secure. 