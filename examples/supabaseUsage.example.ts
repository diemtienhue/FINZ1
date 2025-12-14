/**
 * Ví dụ sử dụng Supabase trong FinZ Ecosystem
 * 
 * File này chỉ là ví dụ, không được import vào code chính
 */

import { supabase } from '../supabaseClient';
import { 
  getProjects, 
  createProject, 
  updateProject,
  getNews,
  subscribeToProjects 
} from '../lib/supabaseHelpers';

// ==================== VÍ DỤ 1: Lấy danh sách Projects ====================

async function exampleGetProjects() {
  try {
    // Sử dụng helper function
    const projects = await getProjects();
    console.log('Projects:', projects);
    
    // Hoặc sử dụng trực tiếp Supabase client
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('enabled', true)
      .order('priority', { ascending: true });
    
    if (error) throw error;
    console.log('Projects (direct):', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

// ==================== VÍ DỤ 2: Tạo Project mới ====================

async function exampleCreateProject() {
  try {
    const newProject = await createProject({
      name: 'FE TSA 1-1',
      logo_url: 'https://picsum.photos/100/100?random=1',
      strengths: [
        'Hoa hồng nhận tươi sau giải ngân',
        'Nhập hồ sơ trực tiếp siêu nhanh'
      ],
      register_link: 'https://www.finconnect.vn/register',
      group_link: 'https://zalo.me/g/oucpop180',
      contact_phone: '0888979809',
      short_description: 'Dự án vay tiêu dùng tín chấp hàng đầu',
      popup_content: 'Quy trình duyệt siêu tốc...',
      priority: 1,
      enabled: true,
      commission_policy: 'Khoản vay < 30tr: 900.000đ/hồ sơ'
    });
    
    console.log('Created project:', newProject);
  } catch (error) {
    console.error('Error:', error);
  }
}

// ==================== VÍ DỤ 3: Cập nhật Project ====================

async function exampleUpdateProject(projectId: string) {
  try {
    const updated = await updateProject(projectId, {
      enabled: false,
      priority: 10
    });
    
    console.log('Updated project:', updated);
  } catch (error) {
    console.error('Error:', error);
  }
}

// ==================== VÍ DỤ 4: Realtime Subscription ====================

function exampleRealtimeSubscription() {
  // Subscribe to changes
  const subscription = subscribeToProjects((payload) => {
    console.log('Change type:', payload.eventType);
    console.log('New data:', payload.new);
    console.log('Old data:', payload.old);
    
    // Update UI khi có thay đổi
    // Ví dụ: refetch data, update state, etc.
  });
  
  // Unsubscribe khi không cần nữa (ví dụ: component unmount)
  // subscription.unsubscribe();
  
  return subscription;
}

// ==================== VÍ DỤ 5: Sử dụng trong React Component ====================

/*
import { useEffect, useState } from 'react';
import { getProjects, Project } from '../lib/supabaseHelpers';

function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchProjects();
    
    // Subscribe to realtime changes
    const subscription = subscribeToProjects(() => {
      // Refetch khi có thay đổi
      fetchProjects();
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      {projects.map(project => (
        <div key={project.id}>{project.name}</div>
      ))}
    </div>
  );
}
*/

// ==================== VÍ DỤ 6: Error Handling ====================

async function exampleWithErrorHandling() {
  try {
    const projects = await getProjects();
    return { success: true, data: projects };
  } catch (error: any) {
    // Xử lý các loại lỗi khác nhau
    if (error.code === 'PGRST116') {
      // Không tìm thấy dữ liệu
      console.log('No projects found');
      return { success: true, data: [] };
    } else if (error.code === '42501') {
      // Permission denied (RLS)
      console.error('Permission denied. Check RLS policies.');
      return { success: false, error: 'Permission denied' };
    } else {
      // Lỗi khác
      console.error('Unexpected error:', error);
      return { success: false, error: error.message };
    }
  }
}

// ==================== VÍ DỤ 7: Batch Operations ====================

async function exampleBatchOperations() {
  try {
    // Lấy nhiều bảng cùng lúc
    const [projects, news, templates] = await Promise.all([
      getProjects(),
      getNews(),
      getTemplates()
    ]);
    
    console.log('All data loaded:', { projects, news, templates });
  } catch (error) {
    console.error('Error:', error);
  }
}


