# Hướng dẫn Cài đặt kho chứa ảnh (Image Hosting) trên VPS

Đây là bộ công cụ giúp bạn tự tạo kho lưu trữ ảnh trên VPS của mình sử dụng
Docker. Gồm 2 thành phần chính:

1. **FileBrowser**: Giao diện web để bạn upload, xóa, quản lý file ảnh (giống
   Google Drive).
2. **Nginx**: Giúp hiển thị ảnh ra ngoài internet với tốc độ cao.

## 1. Chuẩn bị trên máy tính (caamr.dev)

Thư mục `image-hosting` này đã chứa sẵn file cài đặt.

## 2. Cách cài đặt lên VPS

Bạn cần copy thư mục `image-hosting` này lên VPS của bạn.

### Bước 1: Copy file lên VPS

Sử dụng lệnh scp (trên terminal máy tính của bạn) hoặc dùng phần mềm như
FileZilla / MobaXterm để upload thư mục `image-hosting` lên VPS.

### Bước 2: Chạy Docker trên VPS

Kết nối SSH vào VPS và thực hiện các lệnh sau:

```bash
# 1. Cài đặt Docker (nếu chưa có)
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# 2. Di chuyển vào thư mục đã upload
cd image-hosting

# 3. Tạo file database rỗng cho filebrowser (bắt buộc lần đầu)
touch filebrowser.db

# 4. Chạy dịch vụ
docker compose up -d
```

## 3. Cách sử dụng

### Quản lý ảnh (Upload/Xóa)

- Truy cập trình duyệt: `http://<IP-VPS-CUA-BAN>:8081`
- Tài khoản mặc định:
  - User: `admin`
  - Pass: `admin`
  - (Nhớ đổi pass sau khi đăng nhập: Settings -> Profile -> Password)

### Lấy link ảnh để chèn vào Web

Sau khi upload 1 file ảnh (ví dụ: `demo.jpg`), link ảnh của bạn sẽ là:
`http://<IP-VPS-CUA-BAN>:8080/demo.jpg`

### Ví dụ

Nếu IP VPS là `103.185.184.164`:

- Trang quản lý: `http://103.185.184.164:8081`
- Link ảnh: `http://103.185.184.164:8080/ten-hinh-anh.png`
