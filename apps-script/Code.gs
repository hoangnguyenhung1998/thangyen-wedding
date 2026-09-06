/**
 * Google Apps Script backend cho RSVP thiệp Thắng & Yến.
 */
const SHEET_NAME = 'RSVP';
const TELEGRAM_BOT_TOKEN = '';
const TELEGRAM_CHAT_ID = '';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || '{}');
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(['Thời gian','Họ tên','Khách của','Tham dự','Số người','Lời nhắn','Khách cá nhân hóa']);
      sheet.setFrozenRows(1);
    }
    const now = new Date();
    sheet.appendRow([now,data.name || '',data.side || '',data.attendance || '',Number(data.guests || 1),data.message || '',data.guest || '']);
    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      const text = ['💌 RSVP mới — Thắng & Yến',`👤 ${data.name || 'Không tên'}`,`🏠 ${data.side || 'Chưa chọn'}`,`✅ ${data.attendance || 'Chưa chọn'}`,`👥 ${data.guests || 1} người`,data.message ? `💬 ${data.message}` : ''].filter(Boolean).join('\n');
      UrlFetchApp.fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {method:'post',contentType:'application/json',payload:JSON.stringify({chat_id:TELEGRAM_CHAT_ID,text})});
    }
    return ContentService.createTextOutput(JSON.stringify({ok:true})).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ok:false,error:String(err)})).setMimeType(ContentService.MimeType.JSON);
  }
}
