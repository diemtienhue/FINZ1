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


