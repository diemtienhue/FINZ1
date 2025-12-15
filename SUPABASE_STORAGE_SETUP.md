# Hướng dẫn Setup Supabase Storage cho Upload Ảnh

## 🎯 Vấn đề đã được sửa

Trước đây, khi upload ảnh và lưu dự án, ảnh chỉ được lưu trong **state local** của React, không được lưu vào Supabase. Do đó:
- ✅ Ảnh hiển thị trên máy hiện tại (vì lưu trong memory)
- ❌ Khi mở ở máy khác, ảnh không hiển thị (vì không có trong database)

**Giải pháp:** Code đã được cập nhật để:
1. Upload ảnh lên **Supabase Storage** (cho ảnh > 500KB)
2. Lưu base64 vào database (cho ảnh < 500KB)
3. Lưu tất cả dữ liệu vào Supabase Database khi click "Lưu"

## 📋 Các bước thiết lập Storage

### 1. Tạo Storage Bucket trong Supabase

1. Truy cập [Supabase Dashboard](https://app.supabase.com)
2. Chọn project của bạn
3. Vào **Storage** (menu bên trái)
4. Click **"New bucket"**
5. Tạo bucket với tên: `images`
6. Chọn **Public bucket** (để có thể truy cập ảnh công khai)
7. Click **"Create bucket"**

### 2. Cấu hình Policies cho Storage

Sau khi tạo bucket, cần cấu hình quyền truy cập:

#### A. Cho phép Upload (Insert)

1. Vào **Storage** > **Policies** > Chọn bucket `images`
2. Click **"New Policy"**
3. Chọn **"For full customization"**
4. Đặt tên: `Allow authenticated uploads`
5. Dán SQL sau:

```sql
-- Cho phép upload ảnh (có thể customize theo auth của bạn)
INSERT INTO storage.objects (bucket_id, name, owner, metadata)
SELECT 'images', name, auth.uid(), metadata
FROM storage.objects
WHERE bucket_id = 'images';
```

**Hoặc nếu muốn cho phép tất cả (không cần auth):**

```sql
-- Cho phép upload công khai (chỉ dùng cho development)
INSERT INTO storage.objects (bucket_id, name, owner, metadata)
VALUES ('images', name, auth.uid(), metadata);
```

#### B. Cho phép Đọc (Select) - Public

1. Tạo policy mới: `Allow public read access`
2. Dán SQL:

```sql
-- Cho phép đọc công khai
SELECT * FROM storage.objects WHERE bucket_id = 'images';
```

#### C. Cho phép Xóa (Delete) - Optional

1. Tạo policy mới: `Allow authenticated deletes`
2. Dán SQL:

```sql
-- Cho phép xóa (chỉ admin)
DELETE FROM storage.objects 
WHERE bucket_id = 'images' 
AND auth.role() = 'service_role';
```

### 3. Cấu hình đơn giản hơn (Khuyến nghị)

Nếu bạn muốn setup nhanh, có thể tắt RLS tạm thời:

1. Vào **Storage** > **Policies** > bucket `images`
2. Tắt **"Enable RLS"** (chỉ dùng cho development/testing)
3. ⚠️ **Lưu ý:** Chỉ tắt RLS khi đang phát triển. Khi production, nên bật lại và cấu hình policies đúng.

### 4. Test Upload

Sau khi setup xong, test bằng cách:

1. Mở ứng dụng
2. Vào Admin Dashboard
3. Thêm/Sửa một dự án
4. Upload ảnh (chọn file > 500KB để test upload lên Storage)
5. Click "Lưu"
6. Kiểm tra trong Supabase Dashboard > Storage > images để xem ảnh đã được upload chưa

## 🔍 Kiểm tra ảnh đã được lưu

### Cách 1: Kiểm tra trong Supabase Dashboard

1. Vào **Storage** > **images**
2. Xem danh sách các file đã upload
3. Click vào file để xem URL công khai

### Cách 2: Kiểm tra trong Database

1. Vào **Table Editor** > **projects**
2. Xem cột `logo_url`
3. Nếu là URL từ Storage, sẽ có dạng: `https://[project-id].supabase.co/storage/v1/object/public/images/...`
4. Nếu là base64, sẽ bắt đầu bằng: `data:image/...`

## 📝 Lưu ý quan trọng

1. **Kích thước file:**
   - Ảnh < 500KB: Lưu dưới dạng base64 trong database
   - Ảnh > 500KB: Upload lên Supabase Storage và lưu URL

2. **Giới hạn:**
   - Supabase Storage miễn phí: 1GB
   - Base64 trong database: Không nên lưu quá nhiều (làm chậm query)

3. **Bảo mật:**
   - Nên bật RLS và cấu hình policies đúng khi production
   - Không nên cho phép upload công khai không giới hạn

4. **Tối ưu:**
   - Nên resize ảnh trước khi upload (có thể thêm tính năng này sau)
   - Nên compress ảnh để giảm dung lượng

## 🐛 Troubleshooting

### Lỗi: "new row violates row-level security policy"

**Nguyên nhân:** RLS đang bật nhưng chưa có policy cho phép upload.

**Giải pháp:**
- Tắt RLS tạm thời (Storage > Policies > Disable RLS)
- Hoặc tạo policy cho phép upload như hướng dẫn trên

### Lỗi: "Bucket not found"

**Nguyên nhân:** Bucket `images` chưa được tạo.

**Giải pháp:**
- Tạo bucket `images` trong Supabase Dashboard
- Đảm bảo tên bucket chính xác là `images`

### Ảnh không hiển thị sau khi lưu

**Kiểm tra:**
1. Xem console browser có lỗi gì không
2. Kiểm tra URL ảnh trong database có đúng không
3. Kiểm tra bucket có public không
4. Kiểm tra policies có cho phép đọc không

## ✅ Checklist Setup

- [ ] Đã tạo bucket `images` trong Supabase Storage
- [ ] Đã cấu hình policies (hoặc tắt RLS tạm thời)
- [ ] Đã test upload ảnh thành công
- [ ] Đã kiểm tra ảnh hiển thị sau khi lưu
- [ ] Đã test trên máy khác để đảm bảo ảnh hiển thị

---

**Sau khi setup xong, mọi thay đổi trong Admin Dashboard sẽ được lưu vào Supabase và đồng bộ trên tất cả các thiết bị!** 🎉



