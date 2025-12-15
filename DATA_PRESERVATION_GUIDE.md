# 📋 Hướng dẫn: Giữ nguyên dữ liệu hiện có

## ✅ Đã đảm bảo KHÔNG XÓA dữ liệu

### 1. Dữ liệu Mock vẫn được giữ nguyên

**File `constants.ts`:**
- ✅ `INITIAL_PROJECTS` - Vẫn giữ nguyên, không thay đổi
- ✅ `MOCK_NEWS` - Vẫn giữ nguyên, không thay đổi
- ✅ `MOCK_CHANNEL_RESOURCES` - Vẫn giữ nguyên, không thay đổi
- ✅ `MOCK_TEMPLATES` - Vẫn giữ nguyên, không thay đổi

### 2. Logic Load dữ liệu thông minh

**Trong `App.tsx`:**

```typescript
// Khi khởi động app:
1. Luôn khởi tạo state với mock data (INITIAL_PROJECTS, MOCK_NEWS, etc.)
2. Sau đó thử load từ Supabase
3. Nếu Supabase CÓ dữ liệu → Dùng dữ liệu từ Supabase
4. Nếu Supabase KHÔNG có dữ liệu hoặc lỗi → GIỮ NGUYÊN mock data
```

**Kết quả:**
- ✅ Mock data luôn được giữ làm fallback
- ✅ Nếu Supabase rỗng → Vẫn hiển thị mock data
- ✅ Nếu Supabase có dữ liệu → Ưu tiên dùng Supabase
- ✅ Không bao giờ mất dữ liệu

### 3. Cách hoạt động

#### Kịch bản 1: Supabase chưa có dữ liệu
```
1. App khởi động → Hiển thị INITIAL_PROJECTS (mock data)
2. Thử load từ Supabase → Supabase rỗng
3. Giữ nguyên INITIAL_PROJECTS → User vẫn thấy dữ liệu
```

#### Kịch bản 2: Supabase đã có dữ liệu
```
1. App khởi động → Hiển thị INITIAL_PROJECTS tạm thời
2. Load từ Supabase → Có dữ liệu
3. Thay thế bằng dữ liệu từ Supabase → User thấy dữ liệu mới
4. Mock data vẫn còn trong constants.ts (không bị xóa)
```

#### Kịch bản 3: Supabase lỗi
```
1. App khởi động → Hiển thị INITIAL_PROJECTS
2. Thử load từ Supabase → Lỗi kết nối
3. Giữ nguyên INITIAL_PROJECTS → User vẫn thấy dữ liệu
```

## 🔧 Chức năng hoạt động thực tế

### Upload Ảnh
- ✅ Upload lên Supabase Storage bucket `finz_assets`
- ✅ Lấy Public URL từ Storage
- ✅ Lưu URL vào database

### Chỉnh sửa dữ liệu
- ✅ Lưu vào Supabase Database
- ✅ Cập nhật state ngay lập tức
- ✅ Đồng bộ trên tất cả thiết bị

### Xóa dữ liệu
- ✅ Xóa trong Supabase Database
- ✅ Cập nhật state
- ⚠️ **Lưu ý:** Chỉ xóa trong database, không ảnh hưởng mock data

## 📊 Cấu trúc dữ liệu

### Mock Data (constants.ts)
```
INITIAL_PROJECTS: Project[]     // 6 dự án mẫu
MOCK_NEWS: NewsItem[]           // 3 tin tức mẫu
MOCK_CHANNEL_RESOURCES: ...     // 3 tài liệu mẫu
MOCK_TEMPLATES: ...             // 3 mẫu landing page
```

### Supabase Database
```
projects: Project[]             // Dữ liệu thực tế từ database
news: NewsItem[]                // Dữ liệu thực tế từ database
channel_resources: ...          // Dữ liệu thực tế từ database
landing_page_templates: ...     // Dữ liệu thực tế từ database
```

## 🎯 Kết quả

### ✅ Đảm bảo
1. **Mock data không bao giờ bị xóa** - Vẫn còn trong `constants.ts`
2. **Luôn có dữ liệu hiển thị** - Dùng mock nếu Supabase rỗng
3. **Upload và chỉnh sửa hoạt động** - Lưu vào Supabase thực tế
4. **Đồng bộ realtime** - Dữ liệu từ Supabase được cập nhật

### 📝 Lưu ý
- Mock data chỉ là **fallback** khi Supabase rỗng
- Khi có dữ liệu trong Supabase → Ưu tiên dùng Supabase
- Có thể import mock data vào Supabase nếu muốn (tùy chọn)

## 🚀 Sử dụng

### Bước 1: Khởi động app
- App sẽ tự động load từ Supabase
- Nếu Supabase rỗng → Hiển thị mock data

### Bước 2: Thêm/Sửa dữ liệu
- Upload ảnh → Lưu vào Supabase Storage
- Click "Lưu" → Lưu vào Supabase Database
- Dữ liệu được đồng bộ ngay lập tức

### Bước 3: Xem kết quả
- Refresh trang → Dữ liệu từ Supabase được load
- Mở ở máy khác → Thấy dữ liệu đã lưu

---

**Dữ liệu của bạn được bảo vệ an toàn!** 🛡️



