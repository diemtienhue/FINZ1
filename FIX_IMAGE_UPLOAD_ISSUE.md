# 🔧 Đã Sửa: Vấn đề Ảnh không lưu vào Supabase

## ❌ Vấn đề ban đầu

Khi upload ảnh ở Dashboard và click "Lưu":
- ✅ Thấy thông báo "Lưu thành công"
- ✅ Ảnh hiển thị trên máy hiện tại
- ❌ Khi mở ở máy khác → **Ảnh không hiển thị**

### Nguyên nhân

Code trong `handleSaveProject` chỉ cập nhật **state local** của React, **KHÔNG gọi API Supabase**:

```typescript
// ❌ CODE CŨ - Chỉ lưu trong memory
const handleSaveProject = () => {
  if (projectForm) {
    setProjects(prev => prev.map(...)); // Chỉ cập nhật state
    alert("Đã lưu thành công!");
  }
};
```

**Kết quả:**
- Dữ liệu chỉ tồn tại trong memory của trình duyệt
- Khi refresh hoặc mở ở máy khác → mất dữ liệu
- Supabase database không được cập nhật

## ✅ Giải pháp đã áp dụng

### 1. Sửa `handleSaveProject` để gọi API Supabase

```typescript
// ✅ CODE MỚI - Lưu vào Supabase
const handleSaveProject = async () => {
  setIsSaving(true);
  try {
    if (isExisting) {
      const updated = await updateProject(id, {...}); // Gọi API
      setProjects(prev => prev.map(...));
    } else {
      const created = await createProject({...}); // Gọi API
      setProjects(prev => [...prev, created]);
    }
    alert("Đã lưu thành công!");
  } catch (error) {
    alert(`Lỗi: ${error.message}`);
  } finally {
    setIsSaving(false);
  }
};
```

### 2. Thêm Upload Ảnh lên Supabase Storage

- **Ảnh < 500KB:** Lưu dưới dạng base64 trong database
- **Ảnh > 500KB:** Upload lên Supabase Storage và lưu URL

### 3. Cập nhật tất cả các hàm Save/Delete

- ✅ `handleSaveProject` → Gọi `createProject`/`updateProject`
- ✅ `handleSaveNews` → Gọi `createNews`/`updateNews`
- ✅ `handleSaveChannel` → Gọi `createChannelResource`/`updateChannelResource`
- ✅ `handleSaveTemplate` → Gọi `createTemplate`/`updateTemplate`
- ✅ `handleDeleteProject` → Gọi `deleteProject`
- ✅ `toggleProjectStatus` → Gọi `updateProject`

### 4. Thêm Loading State

- Hiển thị spinner khi đang lưu
- Disable nút "Lưu" khi đang xử lý
- Hiển thị thông báo lỗi nếu có

## 📋 Các file đã được sửa

1. **`components/AdminDashboard.tsx`**
   - Import các hàm từ `lib/supabaseHelpers.ts`
   - Sửa tất cả handlers để gọi API
   - Thêm hàm `uploadImageToStorage`
   - Thêm loading state

2. **`SUPABASE_STORAGE_SETUP.md`** (MỚI)
   - Hướng dẫn setup Supabase Storage bucket
   - Cấu hình policies
   - Troubleshooting

## 🚀 Các bước tiếp theo (QUAN TRỌNG)

### Bước 1: Setup Supabase Storage

**BẮT BUỘC** để upload ảnh hoạt động:

1. Vào Supabase Dashboard > **Storage**
2. Tạo bucket tên: `images`
3. Chọn **Public bucket**
4. Cấu hình policies (xem `SUPABASE_STORAGE_SETUP.md`)

### Bước 2: Test lại

1. Mở Admin Dashboard
2. Thêm/Sửa một dự án
3. Upload ảnh
4. Click "Lưu"
5. **Kiểm tra:**
   - Xem trong Supabase Dashboard > **Table Editor** > `projects` → Cột `logo_url` có được cập nhật không?
   - Mở ở máy khác → Ảnh có hiển thị không?

### Bước 3: (Tùy chọn) Load dữ liệu từ Supabase khi khởi động

Hiện tại App.tsx đang dùng `INITIAL_PROJECTS` từ constants. Nếu muốn load từ Supabase:

```typescript
// Trong App.tsx
import { useEffect } from 'react';
import { getProjects, getNews, getChannelResources, getTemplates } from './lib/supabaseHelpers';

useEffect(() => {
  // Load dữ liệu từ Supabase khi component mount
  const loadData = async () => {
    try {
      const [projectsData, newsData, channelData, templatesData] = await Promise.all([
        getProjects(),
        getNews(),
        getChannelResources(),
        getTemplates()
      ]);
      
      setProjects(projectsData);
      setNews(newsData);
      setChannelResources(channelData);
      setTemplates(templatesData);
    } catch (error) {
      console.error('Error loading data:', error);
      // Fallback to mock data nếu lỗi
    }
  };
  
  loadData();
}, []);
```

## ✅ Checklist

- [x] Đã sửa `handleSaveProject` để gọi API
- [x] Đã sửa tất cả handlers khác
- [x] Đã thêm upload ảnh lên Storage
- [x] Đã thêm loading state
- [ ] **Bạn cần:** Setup Supabase Storage bucket
- [ ] **Bạn cần:** Test lại upload ảnh
- [ ] **Bạn cần:** (Tùy chọn) Thêm useEffect để load dữ liệu từ Supabase

## 🎯 Kết quả mong đợi

Sau khi setup xong:
- ✅ Upload ảnh → Lưu vào Supabase Storage hoặc database
- ✅ Click "Lưu" → Dữ liệu được lưu vào Supabase Database
- ✅ Mở ở máy khác → Ảnh và dữ liệu hiển thị đúng
- ✅ Refresh trang → Dữ liệu vẫn còn (vì đã lưu vào database)

## 🐛 Nếu vẫn gặp lỗi

1. **Kiểm tra Console:** Mở DevTools (F12) > Console xem có lỗi gì không
2. **Kiểm tra Network:** Xem request có được gửi đến Supabase không
3. **Kiểm tra Supabase Dashboard:** Xem dữ liệu có được lưu vào database không
4. **Kiểm tra Storage:** Xem ảnh có được upload lên Storage không

---

**Sau khi hoàn thành các bước trên, vấn đề sẽ được giải quyết hoàn toàn!** 🎉

