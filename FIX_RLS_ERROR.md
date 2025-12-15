# 🔧 Fix Lỗi RLS: "new row violates row-level security policy"

## ❌ Lỗi hiện tại

```
Lỗi khi lưu dự án: new row violates row-level security policy for table "projects"
```

## 🔍 Nguyên nhân

1. **RLS đang được bật** trên bảng `projects` trong Supabase
2. **Chỉ có policy cho SELECT** (đọc), không có policy cho INSERT/UPDATE/DELETE
3. Khi code cố gắng INSERT/UPDATE → Bị chặn bởi RLS

## ✅ Giải pháp

### Cách 1: Tắt RLS tạm thời (Nhanh nhất - Khuyến nghị cho Development)

**Chạy SQL này trong Supabase SQL Editor:**

```sql
-- Tắt RLS cho tất cả bảng
ALTER TABLE public.projects DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.news DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.channel_resources DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.landing_page_templates DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_settings DISABLE ROW LEVEL SECURITY;
```

**Ưu điểm:**
- ✅ Nhanh, đơn giản
- ✅ Hoạt động ngay lập tức
- ✅ Phù hợp cho development/testing

**Nhược điểm:**
- ⚠️ Không an toàn cho production
- ⚠️ Mọi người đều có thể INSERT/UPDATE/DELETE

### Cách 2: Tạo Policies cho phép INSERT/UPDATE/DELETE

**Chạy file `FIX_RLS_POLICIES.sql` trong Supabase SQL Editor**

Hoặc copy SQL từ file đó.

**Ưu điểm:**
- ✅ Giữ RLS bật (an toàn hơn)
- ✅ Có thể customize policies sau

**Nhược điểm:**
- ⚠️ Vẫn cho phép mọi người INSERT/UPDATE (cần thêm auth sau)

## 🚀 Các bước thực hiện

### Bước 1: Mở Supabase Dashboard

1. Truy cập [Supabase Dashboard](https://app.supabase.com)
2. Chọn project của bạn
3. Vào **SQL Editor** (menu bên trái)

### Bước 2: Chạy SQL

**Option A: Tắt RLS (Nhanh nhất)**

Copy và chạy:
```sql
ALTER TABLE public.projects DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.news DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.channel_resources DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.landing_page_templates DISABLE ROW LEVEL SECURITY;
```

**Option B: Tạo Policies (Tốt hơn)**

Mở file `FIX_RLS_POLICIES.sql` và copy toàn bộ SQL vào SQL Editor, sau đó chạy.

### Bước 3: Test lại

1. Refresh trang admin dashboard
2. Upload ảnh
3. Click "Lưu"
4. ✅ Không còn lỗi!

## 📋 Kiểm tra Policies hiện tại

Để xem policies hiện có:

```sql
-- Xem tất cả policies của bảng projects
SELECT * FROM pg_policies WHERE tablename = 'projects';

-- Xem RLS có đang bật không
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('projects', 'news', 'channel_resources', 'landing_page_templates');
```

## 🔒 Bảo mật cho Production (Sau này)

Khi deploy production, nên:

1. **Bật lại RLS**
2. **Tạo policies dựa trên authentication:**
   ```sql
   -- Ví dụ: Chỉ cho phép authenticated users
   CREATE POLICY "Authenticated users can manage projects"
       ON public.projects
       FOR ALL
       USING (auth.role() = 'authenticated')
       WITH CHECK (auth.role() = 'authenticated');
   ```

3. **Hoặc dùng service_role key** cho admin operations (backend only)

## ✅ Checklist

- [ ] Đã mở Supabase SQL Editor
- [ ] Đã chạy SQL để tắt RLS hoặc tạo policies
- [ ] Đã refresh trang admin dashboard
- [ ] Đã test upload ảnh và lưu
- [ ] Không còn lỗi RLS

---

**Sau khi fix xong, upload ảnh và lưu sẽ hoạt động bình thường!** 🎉

