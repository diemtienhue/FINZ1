/**
 * Helper functions cho Supabase operations
 * Các hàm tiện ích để làm việc với Supabase dễ dàng hơn
 */

import { supabase } from '../supabaseClient';
import { Database } from '../supabase';

// Type aliases cho dễ sử dụng
type Project = Database['public']['Tables']['projects']['Row'];
type ProjectInsert = Database['public']['Tables']['projects']['Insert'];
type ProjectUpdate = Database['public']['Tables']['projects']['Update'];

type NewsItem = Database['public']['Tables']['news']['Row'];
type NewsInsert = Database['public']['Tables']['news']['Insert'];
type NewsUpdate = Database['public']['Tables']['news']['Update'];

type ChannelResource = Database['public']['Tables']['channel_resources']['Row'];
type ChannelInsert = Database['public']['Tables']['channel_resources']['Insert'];
type ChannelUpdate = Database['public']['Tables']['channel_resources']['Update'];

type Template = Database['public']['Tables']['landing_page_templates']['Row'];
type TemplateInsert = Database['public']['Tables']['landing_page_templates']['Insert'];
type TemplateUpdate = Database['public']['Tables']['landing_page_templates']['Update'];

// ==================== STORAGE HELPERS ====================

/**
 * Upload ảnh lên Supabase Storage
 * @param file File ảnh cần upload
 * @param folder Thư mục lưu trữ (ví dụ: 'templates', 'projects', 'news')
 * @returns URL công khai của ảnh đã upload
 */
export async function uploadImageToStorage(file: File, folder: string = 'images'): Promise<string> {
  try {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      throw new Error('File phải là ảnh (image)');
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      throw new Error('File quá lớn. Kích thước tối đa là 10MB');
    }

    // Tạo tên file unique
    const fileExt = file.name.split('.').pop();
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    
    // Upload file lên Storage
    const { data, error } = await supabase.storage
      .from('finz_assets')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Error uploading image to Storage:', error);
      
      // Xử lý các lỗi phổ biến
      if (error.message?.includes('Bucket not found') || error.message?.includes('The resource was not found')) {
        throw new Error('Bucket "finz_assets" chưa được tạo trong Supabase Storage. Vui lòng tạo bucket "finz_assets" trong Supabase Dashboard > Storage.');
      } else if (error.message?.includes('new row violates row-level security policy') || error.message?.includes('RLS')) {
        throw new Error('Chưa có quyền upload. Vui lòng kiểm tra RLS policies trong Supabase Storage > finz_assets bucket.');
      } else if (error.message?.includes('duplicate')) {
        throw new Error('File đã tồn tại. Vui lòng thử lại.');
      } else {
        throw new Error(`Lỗi upload: ${error.message || 'Không xác định'}`);
      }
    }

    if (!data) {
      throw new Error('Upload thành công nhưng không nhận được dữ liệu phản hồi');
    }

    // Lấy URL công khai
    const { data: { publicUrl } } = supabase.storage
      .from('finz_assets')
      .getPublicUrl(data.path);

    if (!publicUrl) {
      throw new Error('Không thể lấy URL công khai của ảnh');
    }

    return publicUrl;
  } catch (error: any) {
    console.error('Failed to upload image to Storage:', error);
    // Nếu là lỗi đã được xử lý (có message), throw lại
    if (error.message && !error.message.includes('Failed to upload')) {
      throw error;
    }
    // Nếu là lỗi chưa xử lý, wrap lại với message rõ ràng
    throw new Error(error.message || 'Lỗi không xác định khi upload ảnh');
  }
}

/**
 * Xóa ảnh khỏi Supabase Storage
 * @param imageUrl URL của ảnh cần xóa
 */
export async function deleteImageFromStorage(imageUrl: string): Promise<void> {
  try {
    // Extract file path từ URL
    // URL format: https://[project-id].supabase.co/storage/v1/object/public/finz_assets/...
    const urlParts = imageUrl.split('/storage/v1/object/public/finz_assets/');
    if (urlParts.length !== 2) {
      console.warn('Invalid image URL format:', imageUrl);
      return;
    }

    const filePath = urlParts[1];
    const { error } = await supabase.storage
      .from('finz_assets')
      .remove([filePath]);

    if (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  } catch (error) {
    console.error('Failed to delete image from Storage:', error);
    // Không throw error để không làm gián đoạn flow chính
  }
}

// ==================== PROJECTS ====================

/**
 * Lấy tất cả projects đã enabled, sắp xếp theo priority
 */
export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('enabled', true)
    .order('priority', { ascending: true });

  if (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }

  return data || [];
}

/**
 * Lấy tất cả projects (kể cả disabled) - dùng cho admin
 */
export async function getAllProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('priority', { ascending: true });

  if (error) {
    console.error('Error fetching all projects:', error);
    throw error;
  }

  return data || [];
}

/**
 * Lấy project theo ID
 */
export async function getProjectById(id: string): Promise<Project | null> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching project:', error);
    return null;
  }

  return data;
}

/**
 * Tạo project mới
 */
export async function createProject(project: ProjectInsert): Promise<Project> {
  const { data, error } = await supabase
    .from('projects')
    .insert(project)
    .select()
    .single();

  if (error) {
    console.error('Error creating project:', error);
    throw error;
  }

  return data;
}

/**
 * Cập nhật project
 */
export async function updateProject(id: string, updates: ProjectUpdate): Promise<Project> {
  const { data, error } = await supabase
    .from('projects')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating project:', error);
    throw error;
  }

  return data;
}

/**
 * Xóa project
 */
export async function deleteProject(id: string): Promise<void> {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
}

/**
 * Toggle enabled status của project
 */
export async function toggleProjectStatus(id: string, enabled: boolean): Promise<Project> {
  return updateProject(id, { enabled });
}

// ==================== NEWS ====================

/**
 * Lấy tất cả news items
 */
export async function getNews(): Promise<NewsItem[]> {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching news:', error);
    throw error;
  }

  return data || [];
}

/**
 * Lấy news item theo ID
 */
export async function getNewsById(id: string): Promise<NewsItem | null> {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching news item:', error);
    return null;
  }

  return data;
}

/**
 * Tạo news item mới
 */
export async function createNews(news: NewsInsert): Promise<NewsItem> {
  const { data, error } = await supabase
    .from('news')
    .insert(news)
    .select()
    .single();

  if (error) {
    console.error('Error creating news:', error);
    throw error;
  }

  return data;
}

/**
 * Cập nhật news item
 */
export async function updateNews(id: string, updates: NewsUpdate): Promise<NewsItem> {
  const { data, error } = await supabase
    .from('news')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating news:', error);
    throw error;
  }

  return data;
}

/**
 * Xóa news item
 */
export async function deleteNews(id: string): Promise<void> {
  const { error } = await supabase
    .from('news')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting news:', error);
    throw error;
  }
}

// ==================== CHANNEL RESOURCES ====================

/**
 * Lấy tất cả channel resources
 */
export async function getChannelResources(): Promise<ChannelResource[]> {
  const { data, error } = await supabase
    .from('channel_resources')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching channel resources:', error);
    throw error;
  }

  return data || [];
}

/**
 * Tạo channel resource mới
 */
export async function createChannelResource(resource: ChannelInsert): Promise<ChannelResource> {
  const { data, error } = await supabase
    .from('channel_resources')
    .insert(resource)
    .select()
    .single();

  if (error) {
    console.error('Error creating channel resource:', error);
    throw error;
  }

  return data;
}

/**
 * Cập nhật channel resource
 */
export async function updateChannelResource(id: string, updates: ChannelUpdate): Promise<ChannelResource> {
  const { data, error } = await supabase
    .from('channel_resources')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating channel resource:', error);
    throw error;
  }

  return data;
}

/**
 * Xóa channel resource
 */
export async function deleteChannelResource(id: string): Promise<void> {
  const { error } = await supabase
    .from('channel_resources')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting channel resource:', error);
    throw error;
  }
}

// ==================== TEMPLATES ====================

/**
 * Lấy tất cả landing page templates
 */
export async function getTemplates(): Promise<Template[]> {
  const { data, error } = await supabase
    .from('landing_page_templates')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching templates:', error);
    throw error;
  }

  return data || [];
}

/**
 * Tạo template mới
 */
export async function createTemplate(template: TemplateInsert): Promise<Template> {
  const { data, error } = await supabase
    .from('landing_page_templates')
    .insert(template)
    .select()
    .single();

  if (error) {
    console.error('Error creating template:', error);
    throw error;
  }

  return data;
}

/**
 * Cập nhật template
 */
export async function updateTemplate(id: string, updates: TemplateUpdate): Promise<Template> {
  const { data, error } = await supabase
    .from('landing_page_templates')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating template:', error);
    throw error;
  }

  return data;
}

/**
 * Xóa template
 */
export async function deleteTemplate(id: string): Promise<void> {
  const { error } = await supabase
    .from('landing_page_templates')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting template:', error);
    throw error;
  }
}

// ==================== REALTIME SUBSCRIPTIONS ====================

/**
 * Subscribe to projects changes (realtime)
 */
export function subscribeToProjects(callback: (payload: any) => void) {
  return supabase
    .channel('projects_changes')
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'projects' }, 
      callback
    )
    .subscribe();
}

/**
 * Subscribe to news changes (realtime)
 */
export function subscribeToNews(callback: (payload: any) => void) {
  return supabase
    .channel('news_changes')
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'news' }, 
      callback
    )
    .subscribe();
}


