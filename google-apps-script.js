// Google Apps Script Code
// Bu kodu Google Apps Script'te çalıştırın ve web app olarak deploy edin

function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet and sheet
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getActiveSheet();
    
    // Prepare the row data
    const rowData = [
      data.timestamp || new Date().toLocaleString('tr-TR'),
      data.date || new Date().toISOString().split('T')[0],
      data.serviceType || '',
      data.alinacakSemt || '',
      data.teslimEdilecekSemt || data.verilecekSemt || '',
      data.paketBoyutu || '',
      data.aracTuru || data.kuryeTipi || '',
      data.paketTuru || '',
      data.source || ''
    ];
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Data saved successfully' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Function to set up the sheet headers
function setupSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getActiveSheet();
  
  // Set headers
  const headers = [
    'Timestamp',
    'Date',
    'Service Type',
    'Alınacak Semt',
    'Teslim Edilecek Semt',
    'Paket Boyutu',
    'Araç Türü',
    'Paket Türü',
    'Source'
  ];
  
  // Clear existing data and set headers
  sheet.clear();
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Format headers
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight('bold')
    .setBackground('#4285f4')
    .setFontColor('white');
    
  // Auto-resize columns
  sheet.autoResizeColumns(1, headers.length);
}

// Function to test the setup
function testSetup() {
  setupSheet();
  Logger.log('Sheet setup completed successfully');
} 