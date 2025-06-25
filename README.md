# ITSM to Azure DevOps Bug Reporter

A Microsoft Edge extension to scrape your ITSM page and create a Bug in Azure DevOps with one click.

## Features
- Scrape current page for title and description
- Create a Bug in your Azure DevOps project
- Configure your Azure DevOps token, organization, and project
- Error handling and feedback in the popup

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
3. Click **Scrape & Create Bug**.
4. The extension will scrape the page and create a Bug in Azure DevOps. Success or error will be shown in the popup.

## Icons
Icons are from the `/icons` folder.

## Troubleshooting
- If you see an error about missing token/org/project, make sure you have saved them in Settings.
- If Azure DevOps returns an error, it will be shown in the popup.

---
This extension is for internal use. Keep your Azure DevOps token secure. 