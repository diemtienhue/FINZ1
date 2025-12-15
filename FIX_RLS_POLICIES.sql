-- =====================================================
-- FIX RLS POLICIES - Cho phép INSERT/UPDATE/DELETE
-- =====================================================
-- Chạy file này trong Supabase SQL Editor để fix lỗi:
-- "new row violates row-level security policy"
-- =====================================================

-- =====================================================
-- CÁCH 1: TẮT RLS TẠM THỜI (Nhanh nhất cho Development)
-- =====================================================
-- Chỉ dùng khi đang phát triển, KHÔNG dùng cho production!

ALTER TABLE public.projects DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.news DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.channel_resources DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.landing_page_templates DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_settings DISABLE ROW LEVEL SECURITY;

-- =====================================================
-- CÁCH 2: TẠO POLICIES CHO PHÉP INSERT/UPDATE/DELETE
-- =====================================================
-- (Chỉ chạy nếu muốn giữ RLS bật)

-- Xóa các policies cũ nếu có
DROP POLICY IF EXISTS "Public read access" ON public.projects;
DROP POLICY IF EXISTS "Public read access" ON public.news;
DROP POLICY IF EXISTS "Public read access" ON public.channel_resources;
DROP POLICY IF EXISTS "Public read access" ON public.landing_page_templates;
DROP POLICY IF EXISTS "Public read access" ON public.system_settings;

DROP POLICY IF EXISTS "Admin can manage projects" ON public.projects;
DROP POLICY IF EXISTS "Admin can manage news" ON public.news;
DROP POLICY IF EXISTS "Admin can manage channel resources" ON public.channel_resources;
DROP POLICY IF EXISTS "Admin can manage templates" ON public.landing_page_templates;
DROP POLICY IF EXISTS "Admin can manage system settings" ON public.system_settings;

-- Bật RLS lại
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.channel_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.landing_page_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- POLICIES: Cho phép đọc công khai (SELECT)
-- =====================================================

CREATE POLICY "Public can view enabled projects"
    ON public.projects
    FOR SELECT
    USING (enabled = true);

CREATE POLICY "Public can view all news"
    ON public.news
    FOR SELECT
    USING (true);

CREATE POLICY "Public can view all channel resources"
    ON public.channel_resources
    FOR SELECT
    USING (true);

CREATE POLICY "Public can view all templates"
    ON public.landing_page_templates
    FOR SELECT
    USING (true);

CREATE POLICY "Public can view system settings"
    ON public.system_settings
    FOR SELECT
    USING (true);

-- =====================================================
-- POLICIES: Cho phép INSERT/UPDATE/DELETE công khai
-- =====================================================
-- ⚠️ CẢNH BÁO: Policies này cho phép mọi người INSERT/UPDATE/DELETE
-- Chỉ dùng cho development/testing. Production nên dùng authentication.

-- Projects: Cho phép tất cả thao tác
CREATE POLICY "Allow all operations on projects"
    ON public.projects
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- News: Cho phép tất cả thao tác
CREATE POLICY "Allow all operations on news"
    ON public.news
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- Channel Resources: Cho phép tất cả thao tác
CREATE POLICY "Allow all operations on channel_resources"
    ON public.channel_resources
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- Landing Page Templates: Cho phép tất cả thao tác
CREATE POLICY "Allow all operations on landing_page_templates"
    ON public.landing_page_templates
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- System Settings: Cho phép tất cả thao tác
CREATE POLICY "Allow all operations on system_settings"
    ON public.system_settings
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- =====================================================
-- KẾT THÚC
-- =====================================================
-- Sau khi chạy script này:
-- 1. Refresh trang admin dashboard
-- 2. Thử upload ảnh và lưu lại
-- 3. Lỗi RLS sẽ được fix!
-- =====================================================

