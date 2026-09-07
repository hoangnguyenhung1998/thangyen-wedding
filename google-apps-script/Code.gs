const SPREADSHEET_ID = 'PASTE_SPREADSHEET_ID_HERE';
const SHEET_NAME = 'Trang tính1';

function doPost(e) {
  const data = JSON.parse(e.postData.contents || '{}');
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  sheet.appendRow([new Date(), data.name || '', data.side || '', data.attendance || '', Number(data.guests || 0), data.message || '', data.guest || '', data.source || 'wedding-site']);
  return ContentService.createTextOutput(JSON.stringify({ok:true})).setMimeType(ContentService.MimeType.JSON);
}

function setupSheet() {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  sheet.getRange(1,1,1,8).setValues([['Thời gian gửi','Tên khách','Khách của','Trạng thái tham dự','Số người','Lời chúc','Tên trên link mời','Nguồn']]);
  sheet.setFrozenRows(1);
  sheet.getRange('A:A').setNumberFormat('dd/MM/yyyy HH:mm:ss');
  sheet.getRange(1,1,1,8).setFontWeight('bold');
  sheet.autoResizeColumns(1,8);
}
