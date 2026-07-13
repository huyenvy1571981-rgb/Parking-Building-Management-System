# Parking Driver Mobile App

Ứng dụng React Native + Expo dành cho Parking User / Driver theo mục 3.3.6 của tài liệu SRS.

## Chức năng

- Splash và onboarding
- Đăng ký, OTP demo, đăng nhập và sinh trắc học cục bộ
- Tìm kiếm bãi xe, xem bảng giá và slot trống
- Đặt chỗ, thanh toán mô phỏng và vé QR
- Theo dõi lượt gửi, phí tạm tính và thanh toán trước
- Lịch sử giao dịch, phương tiện, vé tháng
- Thông báo, phản hồi và báo cáo sự cố

## Cấu hình

1. Sao chép `.env.example` thành `.env`.
2. Đặt `EXPO_PUBLIC_API_URL` thành địa chỉ IP LAN của máy chạy backend. Không dùng `127.0.0.1` khi chạy trên điện thoại thật.
3. Chạy backend tại cổng 8000.
4. Cài và chạy app:

```powershell
npm install
npm start
```

OTP demo mặc định là `123456`. Thanh toán và QR gateway hiện được mô phỏng theo giới hạn dự án trong SRS.
