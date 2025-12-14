# Hướng dẫn Setup Supabase cho FinZ Ecosystem

## 📋 Tổng quan

Dự án đã được cấu hình sẵn để kết nối với Supabase. Bạn chỉ cần thêm thông tin kết nối vào file `.env`.

## 🚀 Các bước thiết lập

### 1. Tạo file `.env` trong thư mục gốc

Tạo file `.env` (không commit file này vào git) với nội dung:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Lấy thông tin từ Supabase Dashboard

1. Truy cập [Supabase Dashboard](https://app.supabase.com)
2. Chọn project của bạn (hoặc tạo project mới)
3. Vào **Settings** > **API**
4. Copy các giá trị:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`

### 3. Tạo Database Schema

Chạy các SQL sau trong Supabase SQL Editor để tạo các bảng:

```sql
-- Bảng Projects
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo_url TEXT NOT NULL,
  strengths TEXT[] NOT NULL,
  register_link TEXT NOT NULL,
  group_link TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  short_description TEXT NOT NULL,
  popup_content TEXT NOT NULL,
  priority INTEGER NOT NULL DEFAULT 0,
  enabled BOOLEAN NOT NULL DEFAULT true,
  commission_policy TEXT,
  conditions TEXT,
  tab_1_title TEXT,
  tab_1_content TEXT,
  tab_2_title TEXT,
  tab_2_content TEXT,
  tab_3_title TEXT,
  tab_3_content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bảng News
CREATE TABLE news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  content TEXT,
  date DATE NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('News', 'Knowledge', 'Policy')),
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bảng Channel Resources
CREATE TABLE channel_resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('GUIDE', 'RESOURCE', 'SCRIPT')),
  link_url TEXT,
  content TEXT,
  icon_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bảng Landing Page Templates
CREATE TABLE landing_page_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  demo_url TEXT,
  category TEXT NOT NULL CHECK (category IN ('Finance', 'Insurance', 'General')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tạo indexes cho performance
CREATE INDEX idx_projects_enabled ON projects(enabled);
CREATE INDEX idx_projects_priority ON projects(priority);
CREATE INDEX idx_news_date ON news(date DESC);
CREATE INDEX idx_news_category ON news(category);
```

### 4. Cấu hình Row Level Security (RLS)

Nếu bạn muốn bảo mật dữ liệu, hãy bật RLS và tạo policies:

```sql
-- Bật RLS cho tất cả bảng
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE channel_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE landing_page_templates ENABLE ROW LEVEL SECURITY;

-- Policy: Cho phép mọi người đọc (public read)
CREATE POLICY "Public read access" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Public read access" ON news
  FOR SELECT USING (true);

CREATE POLICY "Public read access" ON channel_resources
  FOR SELECT USING (true);

CREATE POLICY "Public read access" ON landing_page_templates
  FOR SELECT USING (true);

-- Policy: Chỉ admin mới được write (bạn cần tạo auth system riêng)
-- CREATE POLICY "Admin write access" ON projects
--   FOR ALL USING (auth.role() = 'admin');
```

## 📁 Cấu trúc Files

```
├── supabaseClient.ts          # Client kết nối Supabase
├── supabase.ts                # Type definitions cho database
├── lib/
│   └── supabaseHelpers.ts     # Helper functions để CRUD dữ liệu
└── .env                        # File chứa credentials (KHÔNG commit)
```

## 💻 Cách sử dụng

### Import client

```typescript
import { supabase } from './supabaseClient';
```

### Sử dụng helper functions

```typescript
import { getProjects, createProject, updateProject } from './lib/supabaseHelpers';

// Lấy danh sách projects
const projects = await getProjects();

// Tạo project mới
const newProject = await createProject({
  name: 'FE TSA',
  logo_url: 'https://...',
  // ... các fields khác
});

// Cập nhật project
await updateProject(projectId, {
  enabled: false
});
```

### Sử dụng trực tiếp Supabase client

```typescript
import { supabase } from './supabaseClient';

// Query trực tiếp
const { data, error } = await supabase
  .from('projects')
  .select('*')
  .eq('enabled', true);
```

## 🔄 Realtime Subscriptions

Để lắng nghe thay đổi realtime:

```typescript
import { subscribeToProjects } from './lib/supabaseHelpers';

const subscription = subscribeToProjects((payload) => {
  console.log('Project changed:', payload);
  // Update UI khi có thay đổi
});

// Unsubscribe khi component unmount
subscription.unsubscribe();
```

## 🛠️ Troubleshooting

### Lỗi: "Supabase configuration missing"

- Kiểm tra file `.env` đã được tạo chưa
- Đảm bảo các biến `VITE_SUPABASE_URL` và `VITE_SUPABASE_ANON_KEY` đã được set
- Restart dev server sau khi thêm `.env`

### Lỗi: "relation does not exist"

- Chạy các SQL scripts ở bước 3 để tạo bảng
- Kiểm tra tên bảng trong code có khớp với database không

### Lỗi: "new row violates row-level security policy"

- Kiểm tra RLS policies đã được tạo đúng chưa
- Hoặc tạm thời disable RLS để test: `ALTER TABLE table_name DISABLE ROW LEVEL SECURITY;`

## 📚 Tài liệu tham khảo

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Supabase Realtime](https://supabase.com/docs/guides/realtime)


