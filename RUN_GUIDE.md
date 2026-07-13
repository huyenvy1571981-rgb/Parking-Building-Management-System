# Hướng dẫn chạy Parking Building Management System

Project gồm ba phần:

- `backend`: FastAPI API và database.
- `frontend`: Web quản trị bằng Next.js.
- `mobile`: Ứng dụng tài xế bằng React Native + Expo.

## 1. Yêu cầu môi trường

Cài đặt trước:

- Python 3.9 trở lên.
- Node.js và npm.
- Expo Go trên điện thoại Android/iOS.
- Máy tính và điện thoại kết nối cùng một mạng Wi-Fi.

## 2. Chạy backend

Mở PowerShell thứ nhất:

```powershell
cd .\Parking-Building-Management-System\backend
```

Cài dependency:

```powershell
python -m pip install -r requirements.txt
```

Nếu chưa có file `.env`:

```powershell
Copy-Item .env.example .env
notepad .env
```

Nội dung cấu hình SQLite:

```env
DATABASE_URL=sqlite:///./parking_demo.db
SECRET_KEY=replace-with-a-long-random-secret
MOBILE_DEMO_OTP=123456
```

Khởi tạo bảng và dữ liệu demo trong lần chạy đầu tiên:

```powershell
python init_db.py
python seed_demo.py
```

Chạy backend:

```powershell
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Giữ cửa sổ này mở. Kiểm tra API tại:

```text
http://127.0.0.1:8000/docs
```

## 3. Chạy web quản trị

Mở PowerShell thứ hai:

```powershell
cd .\Parking-Building-Management-System\frontend
```

Cài dependency trong lần chạy đầu tiên:

```powershell
npm.cmd install
```

Nếu chưa có file `.env`:

```powershell
Copy-Item .env.example .env
```

Nội dung `frontend/.env`:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

Chạy web:

```powershell
npm.cmd run dev
```

Mở trình duyệt:

```text
http://localhost:3000/login
```

Tài khoản quản trị demo:

```text
Username: admin
Password: 123456
```

## 4. Chạy Mobile App

### 4.1 Lấy địa chỉ IP máy tính

Mở PowerShell và chạy:

```powershell
ipconfig
```

Tìm `IPv4 Address` của Wi-Fi, ví dụ:

```text
192.168.1.2
```

Không sử dụng IP VMware hoặc Tailscale nếu điện thoại kết nối qua Wi-Fi thông thường.

### 4.2 Cấu hình và chạy Expo

Mở PowerShell thứ ba:

```powershell
cd .\Parking-Building-Management-System\mobile
```

Cài dependency trong lần chạy đầu tiên:

```powershell
npm.cmd install
```

Nếu chưa có file `.env`:

```powershell
Copy-Item .env.example .env
notepad .env
```

Thay IP bằng IPv4 Wi-Fi của máy tính:

```env
EXPO_PUBLIC_API_URL=http://192.168.1.2:8000
```

Chạy Expo và xóa cache:

```powershell
npm.cmd start -- --clear
```

Sau khi mã QR xuất hiện:

1. Mở Expo Go trên điện thoại.
2. Bảo đảm điện thoại và máy tính cùng Wi-Fi.
3. Quét QR để mở ứng dụng.

OTP đăng ký demo:

```text
123456
```

## 5. Thứ tự chạy mỗi lần sử dụng

Không cần chạy lại `init_db.py` và `seed_demo.py` nếu database đã được tạo.

Chỉ cần mở ba PowerShell:

### Backend

```powershell
cd .\Parking-Building-Management-System\backend
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Web

```powershell
cd .\Parking-Building-Management-System\frontend
npm.cmd run dev
```

### Mobile

```powershell
cd .\Parking-Building-Management-System\mobile
npm.cmd start -- --clear
```

## 6. Luồng kiểm tra Web và Mobile

1. Đăng ký hoặc đăng nhập trên mobile.
2. Đặt chỗ trên mobile và nhận vé QR.
3. Đăng nhập web bằng tài khoản admin.
4. Mở `Đặt chỗ & QR` trên web.
5. Nhập QR token hoặc mã booking để check-in.
6. Backend tạo parking session và chuyển slot sang `Occupied`.
7. Mobile hiển thị lượt gửi trong tab `Vé xe`.
8. Web hiển thị biển số xe tại Parking Slot tương ứng.

## 7. Xử lý lỗi thường gặp

### PowerShell chặn npm.ps1

Sử dụng:

```powershell
npm.cmd run dev
npm.cmd start
```

thay vì `npm run dev` hoặc `npm start`.

### Mobile không kết nối backend

Trên trình duyệt điện thoại, thử mở:

```text
http://192.168.1.2:8000
```

Nếu không mở được:

- Kiểm tra hai thiết bị cùng Wi-Fi.
- Kiểm tra IP trong `mobile/.env`.
- Cho phép Python qua Windows Firewall ở Private Network.
- Khởi động lại Expo sau khi sửa `.env`.

### Giao diện chưa cập nhật

Web:

```text
Ctrl+Shift+R
```

Expo: nhấn `r` trong cửa sổ Metro hoặc chạy lại:

```powershell
npm.cmd start -- --clear
```

### Dừng server

Tại từng cửa sổ PowerShell, nhấn:

```text
Ctrl+C
```

