# Thiệp cưới Thắng & Yến — 20.09.2026

Bản V1 website tĩnh, tối ưu điện thoại, có:
- Màn hình mở thiệp
- Ảnh cover + album 35 ảnh từ Google Drive
- Countdown
- Lịch nhà gái / nhà trai
- Google Maps hai nhà
- RSVP
- QR mừng cưới cô dâu / chú rể
- Link khách cá nhân hóa `?guest=Tên khách`
- Sẵn backend Google Sheet + Telegram bằng Google Apps Script

## Chạy thử
Mở `index.html` bằng Live Server hoặc chạy:

```bash
python -m http.server 8080
```

Sau đó mở http://localhost:8080

## Kích hoạt RSVP thật
1. Tạo một Google Sheet.
2. Vào `Extensions > Apps Script`.
3. Dán nội dung `apps-script/Code.gs`.
4. Deploy > New deployment > Web app.
5. Execute as: Me; Who has access: Anyone.
6. Copy URL dạng `https://script.google.com/macros/s/.../exec`.
7. Mở `app.js`, dán URL vào `CONFIG.rsvpEndpoint`.

Telegram là tùy chọn. Nếu muốn nhận thông báo Telegram, điền `TELEGRAM_BOT_TOKEN` và `TELEGRAM_CHAT_ID` trong Apps Script trước khi deploy.

## Nhạc nền
Project đã chuẩn bị sẵn đường dẫn `assets/music/cuoi-nhau-di.mp3` nhưng **không kèm file nhạc có bản quyền**. Nếu anh có file âm thanh được phép sử dụng, tạo thư mục `assets/music/` và đặt đúng tên `cuoi-nhau-di.mp3`. Nếu chưa có file, nút nhạc sẽ mở nguồn YouTube chính thức được cấu hình trong `app.js`.

## Cá nhân hóa link mời
Ví dụ:

`https://thangyen.weddingeja.vn/?guest=Anh%20Nguyễn%20Văn%20Nam`

Thiệp sẽ tự hiện: “Thân mời Anh Nguyễn Văn Nam đến chung vui cùng Thắng & Yến”.

## Đưa lên Vercel miễn phí
- Kết nối repo GitHub này với Vercel.
- Framework preset: Other.
- Build command: để trống.
- Output directory: để trống.
- Sau khi chạy ổn mới gắn custom domain.

## Lưu ý ảnh
Bản V1 tải ảnh trực tiếp từ thư mục Google Drive public để triển khai nhanh. Khi chốt giao diện production nên chuyển ảnh sang Cloudflare R2/Images hoặc thư mục `assets/photos` để ổn định và tối ưu tốc độ hơn.
