# Google Sheets Integration for KLIPR Contact Form

This document explains how to set up the Google Sheets integration for the contact form on the KLIPR website.

## Step 1: Create a new Google Sheet

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet
2. Rename the spreadsheet to "KLIPR Contact Form Responses"
3. In the first row, add the following headers:
   - A1: Timestamp
   - B1: Name
   - C1: Email
   - D1: Phone
   - E1: Company
   - F1: Message

## Step 2: Create a Google Apps Script

1. From your Google Sheet, click on **Extensions** > **Apps Script**
2. Delete any code in the script editor
3. Paste the following code:

```javascript
function doPost(e) {
  try {
    // Parse the JSON data from the request
    var data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet and sheet
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Sheet1"); // or whatever your sheet name is
    
    // Create timestamp
    var timestamp = new Date();
    
    // Append the data to the sheet
    sheet.appendRow([
      timestamp,
      data.name,
      data.email,
      data.phone,
      data.company,
      data.message
    ]);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch(error) {
    // Log the error
    Logger.log(error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Save the project with a name (e.g., "KLIPR Form Handler")

## Step 3: Deploy the Web App

1. Click on **Deploy** > **New deployment**
2. Select **Web app** as the deployment type
3. Configure the deployment:
   - Description: KLIPR Form Handler
   - Execute as: Me (your email)
   - Who has access: Anyone (if you want to allow public form submissions)
4. Click **Deploy**
5. Copy the Web app URL that appears in the deployment confirmation

## Step 4: Update Your React Form

1. In the `app/boost/page.tsx` file, replace:
   ```javascript
   const sheetUrl = "https://script.google.com/macros/s/YOUR_GOOGLE_SCRIPT_ID/exec";
   ```
   with the actual URL you copied in Step 3:
   ```javascript
   const sheetUrl = "https://script.google.com/macros/s/ACTUAL_SCRIPT_ID_FROM_DEPLOYMENT/exec";
   ```

## Important Notes

- The `no-cors` mode is used because Google Apps Script doesn't support CORS for web apps by default
- Due to `no-cors` mode, you can't directly check the response body in JavaScript
- The form will automatically reset and show a success message upon submission
- You may want to implement additional validation and error handling for production use

## Troubleshooting

If your form submissions aren't reaching Google Sheets:

1. Check that your deployment URL is correct in the React code
2. Make sure the Google Apps Script is deployed with correct permissions
3. Verify the column headers in your Google Sheet match the expected data structure
4. Check the Apps Script execution logs for errors (in the Apps Script editor, go to **View** > **Logs**) 