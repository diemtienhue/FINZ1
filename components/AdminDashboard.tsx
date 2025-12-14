
import React, { useState } from 'react';
import { Project, NewsItem, ChannelResource, LandingPageTemplate } from '../types';
import { Save, LogOut, Edit, Eye, EyeOff, Plus, Trash2, ArrowLeft, Layers, Settings, Database, AlertCircle, Newspaper, PenTool, ExternalLink, Search, Upload, Image as ImageIcon, Layout as LayoutIcon, CheckCircle2 } from 'lucide-react';

interface AdminDashboardProps {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  news: NewsItem[];
  setNews: React.Dispatch<React.SetStateAction<NewsItem[]>>;
  channelResources: ChannelResource[];
  setChannelResources: React.Dispatch<React.SetStateAction<ChannelResource[]>>;
  templates: LandingPageTemplate[];
  setTemplates: React.Dispatch<React.SetStateAction<LandingPageTemplate[]>>;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  projects, setProjects, 
  news, setNews, 
  channelResources, setChannelResources, 
  templates, setTemplates,
  onLogout 
}) => {
  const [activeView, setActiveView] = useState<'PROJECTS' | 'NEWS' | 'CHANNEL' | 'TEMPLATES' | 'SETTINGS'>('PROJECTS');
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for different edit forms
  const [projectForm, setProjectForm] = useState<Project | null>(null);
  const [newsForm, setNewsForm] = useState<NewsItem | null>(null);
  const [channelForm, setChannelForm] = useState<ChannelResource | null>(null);
  const [templateForm, setTemplateForm] = useState<LandingPageTemplate | null>(null);

  // Mock Settings State
  const [systemSettings, setSystemSettings] = useState({
    contactPhone: '0888.979.809',
    zaloLink: 'https://zalo.me/0888979809',
    baseRate: 1.66,
    maintenanceMode: false,
    footerText: 'Công cụ hỗ trợ sales tài chính và xây dựng hệ thống thực chiến.'
  });

  // --- Handlers for Image Upload (Base64) ---
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'PROJECT' | 'NEWS' | 'TEMPLATE') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (type === 'PROJECT' && projectForm) {
          setProjectForm({ ...projectForm, logo_url: result });
        } else if (type === 'NEWS' && newsForm) {
          setNewsForm({ ...newsForm, imageUrl: result });
        } else if (type === 'TEMPLATE' && templateForm) {
          setTemplateForm({ ...templateForm, imageUrl: result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // --- Handlers for Projects ---
  const handleEditProject = (project: Project) => {
    setProjectForm({ ...project });
    setIsEditing(true);
  };

  const handleAddProject = () => {
    setProjectForm({
      id: `new-${Date.now()}`,
      name: '',
      logo_url: 'https://via.placeholder.com/100', // Default placeholder
      strengths: ['', '', ''],
      register_link: '',
      group_link: '',
      contact_phone: '',
      short_description: '',
      popup_content: '',
      priority: projects.length + 1,
      enabled: false,
      commission_policy: '',
      tab_1_title: '',
      tab_1_content: '',
      tab_2_title: '',
      tab_2_content: '',
      tab_3_title: '',
      tab_3_content: ''
    });
    setIsEditing(true);
  };

  const handleSaveProject = () => {
    if (projectForm) {
      if (projects.find(p => p.id === projectForm.id)) {
         setProjects(prev => prev.map(p => p.id === projectForm.id ? projectForm : p));
      } else {
         setProjects(prev => [...prev, projectForm]);
      }
      resetForms();
      alert("Đã lưu dự án thành công!");
    }
  };

  const toggleProjectStatus = (id: string) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, enabled: !p.enabled } : p));
  };

  const handleDeleteProject = (id: string) => {
    if(window.confirm("Bạn có chắc chắn muốn xóa dự án này không?")) {
      setProjects(prev => prev.filter(p => p.id !== id));
    }
  }

  const handleProjectChange = (field: keyof Project, value: any) => {
    if (projectForm) setProjectForm({ ...projectForm, [field]: value });
  };

  const handleStrengthChange = (index: number, value: string) => {
    if (projectForm) {
      const newStrengths = [...projectForm.strengths];
      newStrengths[index] = value;
      setProjectForm({ ...projectForm, strengths: newStrengths });
    }
  };

  const addStrength = () => {
    if (projectForm) setProjectForm({ ...projectForm, strengths: [...projectForm.strengths, ""] });
  };

  const removeStrength = (index: number) => {
    if (projectForm) {
      const newStrengths = projectForm.strengths.filter((_, i) => i !== index);
      setProjectForm({ ...projectForm, strengths: newStrengths });
    }
  };

  // --- Handlers for News ---
  const handleEditNews = (item: NewsItem) => {
    setNewsForm({ ...item });
    setIsEditing(true);
  };

  const handleAddNews = () => {
    const newId = (news.length + 1).toString();
    setNewsForm({
      id: newId,
      title: '',
      summary: '',
      content: '',
      date: new Date().toISOString().split('T')[0],
      category: 'News',
      imageUrl: 'https://via.placeholder.com/400x200'
    });
    setIsEditing(true);
  };

  const handleSaveNews = () => {
    if (newsForm) {
      if (news.find(n => n.id === newsForm.id)) {
        setNews(prev => prev.map(n => n.id === newsForm.id ? newsForm : n));
      } else {
        setNews(prev => [...prev, newsForm]);
      }
      resetForms();
      alert("Đã lưu bài viết!");
    }
  };

  const handleDeleteNews = (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tin này?")) {
      setNews(prev => prev.filter(n => n.id !== id));
    }
  };

  // --- Handlers for Channel Resources ---
  const handleEditChannel = (item: ChannelResource) => {
    setChannelForm({ ...item });
    setIsEditing(true);
  };

  const handleAddChannel = () => {
    const newId = (channelResources.length + 1).toString();
    setChannelForm({
      id: newId,
      title: '',
      description: '',
      type: 'GUIDE',
      icon_name: 'FileText'
    });
    setIsEditing(true);
  };

  const handleSaveChannel = () => {
    if (channelForm) {
      if (channelResources.find(c => c.id === channelForm.id)) {
        setChannelResources(prev => prev.map(c => c.id === channelForm.id ? channelForm : c));
      } else {
        setChannelResources(prev => [...prev, channelForm]);
      }
      resetForms();
      alert("Đã lưu tài liệu!");
    }
  };

  const handleDeleteChannel = (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tài liệu này?")) {
      setChannelResources(prev => prev.filter(c => c.id !== id));
    }
  };

  // --- Handlers for Templates ---
  const handleEditTemplate = (item: LandingPageTemplate) => {
    setTemplateForm({ ...item });
    setIsEditing(true);
  };

  const handleAddTemplate = () => {
    const newId = (templates.length + 1).toString();
    setTemplateForm({
      id: newId,
      title: '',
      description: '',
      category: 'Finance',
      imageUrl: 'https://via.placeholder.com/400x300',
      demoUrl: '#'
    });
    setIsEditing(true);
  };

  const handleSaveTemplate = () => {
    if (templateForm) {
      if (templates.find(t => t.id === templateForm.id)) {
        setTemplates(prev => prev.map(t => t.id === templateForm.id ? templateForm : t));
      } else {
        setTemplates(prev => [...prev, templateForm]);
      }
      resetForms();
      alert("Đã lưu mẫu giao diện!");
    }
  };

  const handleDeleteTemplate = (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa mẫu này?")) {
      setTemplates(prev => prev.filter(t => t.id !== id));
    }
  };

  // --- Common ---
  const resetForms = () => {
    setProjectForm(null);
    setNewsForm(null);
    setChannelForm(null);
    setTemplateForm(null);
    setIsEditing(false);
  };

  const handleSaveSettings = () => {
    alert("Đã lưu cấu hình hệ thống thành công!");
  };

  // --- Render Functions ---

  const renderProjectForm = () => {
    if (!projectForm) return null;
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-xl overflow-hidden animate-fade-in">
        <div className="bg-gray-50 dark:bg-slate-700/50 p-6 border-b border-gray-200 dark:border-slate-700 flex justify-between items-center">
          <h3 className="text-xl font-bold text-finz-accent flex items-center">
            <button onClick={resetForms} className="mr-3 p-1 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full transition">
              <ArrowLeft className="w-5 h-5 text-gray-500" />
            </button>
            {projects.find(p => p.id === projectForm.id) ? 'Chỉnh sửa dự án' : 'Thêm dự án mới'}
          </h3>
          <div className="flex space-x-3">
            <button onClick={resetForms} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg text-slate-700 dark:text-white font-medium transition">
              Hủy bỏ
            </button>
            <button onClick={handleSaveProject} className="flex items-center px-6 py-2 bg-finz-accent hover:bg-sky-600 rounded-lg text-white font-bold transition shadow-lg shadow-sky-500/20">
              <Save className="w-4 h-4 mr-2" /> Lưu & Xuất bản
            </button>
          </div>
        </div>
        
        <div className="p-6 md:p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
          
          {/* Section 1: Basic Info & Links */}
          <section className="bg-gray-50 dark:bg-slate-700/20 p-5 rounded-2xl border border-gray-100 dark:border-slate-700">
            <h4 className="text-sm font-bold uppercase tracking-wider text-finz-accent mb-4 pb-2 border-b border-gray-200 dark:border-slate-700 flex items-center">
              1. Thông tin Nhận diện & Liên kết
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Tên dự án</label>
                <input type="text" value={projectForm.name} onChange={(e) => handleProjectChange('name', e.target.value)} className="w-full bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg p-2.5 outline-none" />
              </div>
              
              {/* Image Upload Control */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Logo Dự án</label>
                <div className="flex gap-2">
                   <div className="relative flex-1">
                      <input 
                        type="text" 
                        value={projectForm.logo_url} 
                        onChange={(e) => handleProjectChange('logo_url', e.target.value)} 
                        className="w-full bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg p-2.5 outline-none pl-9 text-xs" 
                        placeholder="https://..."
                      />
                      <ImageIcon className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                   </div>
                   <label className="flex items-center justify-center px-4 py-2 bg-gray-200 dark:bg-slate-600 hover:bg-gray-300 dark:hover:bg-slate-500 rounded-lg cursor-pointer transition">
                      <Upload className="w-4 h-4 text-slate-700 dark:text-white" />
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'PROJECT')} />
                   </label>
                </div>
                {/* Image Preview */}
                {projectForm.logo_url && (
                  <div className="mt-2 flex items-center gap-2">
                    <img src={projectForm.logo_url} alt="Preview" className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-slate-600" />
                    <span className="text-xs text-gray-500 italic">Preview Logo</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Link Đăng ký (Nút xanh)</label>
                <input type="text" value={projectForm.register_link} onChange={(e) => handleProjectChange('register_link', e.target.value)} className="w-full bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg p-2.5 outline-none" />
              </div>
               <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Link Group Zalo (Nút xám)</label>
                <input type="text" value={projectForm.group_link} onChange={(e) => handleProjectChange('group_link', e.target.value)} className="w-full bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg p-2.5 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">SĐT Admin (Nút Liên hệ)</label>
                <input type="text" value={projectForm.contact_phone} onChange={(e) => handleProjectChange('contact_phone', e.target.value)} className="w-full bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg p-2.5 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Độ ưu tiên (Số nhỏ xếp trước)</label>
                <input type="number" value={projectForm.priority} onChange={(e) => handleProjectChange('priority', Number(e.target.value))} className="w-full bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg p-2.5 outline-none" />
              </div>
               <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Mô tả ngắn (Hiển thị khi hover vào thẻ dự án)</label>
                <textarea value={projectForm.short_description} onChange={(e) => handleProjectChange('short_description', e.target.value)} className="w-full bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg p-2.5 outline-none h-12 text-sm" />
              </div>
            </div>
          </section>

          {/* Section 2: Highlights */}
          <section className="bg-gray-50 dark:bg-slate-700/20 p-5 rounded-2xl border border-gray-100 dark:border-slate-700">
              <h4 className="text-sm font-bold uppercase tracking-wider text-finz-accent mb-4 pb-2 border-b border-gray-200 dark:border-slate-700 flex items-center">
                2. Điểm nổi bật (Hiển thị đầu Popup)
              </h4>
              <div className="space-y-3">
                {projectForm.strengths.map((s, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                    <input type="text" value={s} onChange={(e) => handleStrengthChange(idx, e.target.value)} className="flex-1 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg p-2 outline-none text-sm"/>
                    <button onClick={() => removeStrength(idx)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
                <button onClick={addStrength} className="flex items-center text-sm font-medium text-finz-accent hover:underline mt-2"><Plus className="w-4 h-4 mr-1" /> Thêm điểm mạnh</button>
              </div>
          </section>

          {/* Section 3: Tabs */}
          <section className="bg-gray-50 dark:bg-slate-700/20 p-5 rounded-2xl border border-gray-100 dark:border-slate-700">
             <h4 className="text-sm font-bold uppercase tracking-wider text-finz-accent mb-4 pb-2 border-b border-gray-200 dark:border-slate-700 flex items-center">
               3. Thông tin Tabs (Accordion đóng/mở)
             </h4>
             <div className="space-y-4">
                {/* Tab 1 */}
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-gray-200 dark:border-slate-600">
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-xs font-bold text-gray-500 mb-1">Tiêu đề Tab 1 (VD: Điều kiện)</label>
                            <input type="text" placeholder="Tiêu đề..." value={projectForm.tab_1_title || ''} onChange={(e) => handleProjectChange('tab_1_title', e.target.value)} className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg p-2 outline-none text-sm font-bold" />
                        </div>
                    </div>
                     <div className="mt-2">
                        <label className="block text-xs font-bold text-gray-500 mb-1">Nội dung Tab 1</label>
                        <textarea placeholder="Nội dung hiển thị khi mở tab..." value={projectForm.tab_1_content || ''} onChange={(e) => handleProjectChange('tab_1_content', e.target.value)} className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg p-2 outline-none h-20 text-sm" />
                    </div>
                </div>
                {/* Tab 2 */}
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-gray-200 dark:border-slate-600">
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-xs font-bold text-gray-500 mb-1">Tiêu đề Tab 2 (VD: Quy trình)</label>
                            <input type="text" placeholder="Tiêu đề..." value={projectForm.tab_2_title || ''} onChange={(e) => handleProjectChange('tab_2_title', e.target.value)} className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg p-2 outline-none text-sm font-bold" />
                        </div>
                    </div>
                     <div className="mt-2">
                        <label className="block text-xs font-bold text-gray-500 mb-1">Nội dung Tab 2</label>
                        <textarea placeholder="Nội dung hiển thị khi mở tab..." value={projectForm.tab_2_content || ''} onChange={(e) => handleProjectChange('tab_2_content', e.target.value)} className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg p-2 outline-none h-20 text-sm" />
                    </div>
                </div>
                {/* Tab 3 */}
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-gray-200 dark:border-slate-600">
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-xs font-bold text-gray-500 mb-1">Tiêu đề Tab 3 (VD: Lưu ý)</label>
                            <input type="text" placeholder="Tiêu đề..." value={projectForm.tab_3_title || ''} onChange={(e) => handleProjectChange('tab_3_title', e.target.value)} className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg p-2 outline-none text-sm font-bold" />
                        </div>
                    </div>
                     <div className="mt-2">
                        <label className="block text-xs font-bold text-gray-500 mb-1">Nội dung Tab 3</label>
                        <textarea placeholder="Nội dung hiển thị khi mở tab..." value={projectForm.tab_3_content || ''} onChange={(e) => handleProjectChange('tab_3_content', e.target.value)} className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg p-2 outline-none h-20 text-sm" />
                    </div>
                </div>
             </div>
          </section>

          {/* Section 4: Details & Policy */}
          <section className="bg-gray-50 dark:bg-slate-700/20 p-5 rounded-2xl border border-gray-100 dark:border-slate-700">
             <h4 className="text-sm font-bold uppercase tracking-wider text-finz-accent mb-4 pb-2 border-b border-gray-200 dark:border-slate-700 flex items-center">
               4. Nội dung chi tiết & Chính sách
             </h4>
             <div className="space-y-4">
               <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Mô tả chi tiết (Nằm dưới Tabs)</label>
                  <textarea value={projectForm.popup_content} onChange={(e) => handleProjectChange('popup_content', e.target.value)} className="w-full bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg p-3 h-32 outline-none text-sm" placeholder="Nhập mô tả chi tiết..." />
               </div>
               <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded-xl border border-green-200 dark:border-green-900/30">
                  <label className="block text-sm font-bold text-green-700 dark:text-green-400 mb-2">Chính sách hoa hồng (Khung xanh lá)</label>
                  <textarea value={projectForm.commission_policy || ''} onChange={(e) => handleProjectChange('commission_policy', e.target.value)} className="w-full bg-white dark:bg-slate-900 border border-green-300 dark:border-green-800 rounded-lg p-3 h-24 outline-none text-sm" placeholder="Nhập chính sách hoa hồng..." />
               </div>
             </div>
          </section>
        </div>
      </div>
    );
  };

  const renderNewsForm = () => {
    if (!newsForm) return null;
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-xl overflow-hidden animate-fade-in">
        <div className="bg-gray-50 dark:bg-slate-700/50 p-6 border-b border-gray-200 dark:border-slate-700 flex justify-between items-center">
          <h3 className="text-xl font-bold text-finz-accent flex items-center">
            <button onClick={resetForms} className="mr-3 p-1 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full transition"><ArrowLeft className="w-5 h-5 text-gray-500" /></button>
            {newsForm.id ? 'Chỉnh sửa Tin tức' : 'Thêm Tin tức mới'}
          </h3>
          <div className="flex space-x-3">
            <button onClick={resetForms} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg text-slate-700 dark:text-white font-medium">Hủy bỏ</button>
            <button onClick={handleSaveNews} className="flex items-center px-6 py-2 bg-finz-accent hover:bg-sky-600 rounded-lg text-white font-bold transition shadow-lg"><Save className="w-4 h-4 mr-2" /> Lưu bài viết</button>
          </div>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Tiêu đề bài viết</label>
                <input type="text" value={newsForm.title} onChange={(e) => setNewsForm({...newsForm, title: e.target.value})} className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg p-2.5 outline-none" />
             </div>
             <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Danh mục</label>
                <select value={newsForm.category} onChange={(e) => setNewsForm({...newsForm, category: e.target.value as any})} className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg p-2.5 outline-none">
                  <option value="News">Tin tức</option>
                  <option value="Knowledge">Kiến thức</option>
                  <option value="Policy">Chính sách</option>
                </select>
             </div>
             
             {/* Image Upload for News */}
             <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Ảnh đại diện (URL hoặc Tải lên)</label>
                <div className="flex gap-2">
                   <div className="relative flex-1">
                      <input 
                        type="text" 
                        value={newsForm.imageUrl} 
                        onChange={(e) => setNewsForm({...newsForm, imageUrl: e.target.value})} 
                        className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg p-2.5 outline-none pl-9"
                      />
                      <ImageIcon className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                   </div>
                   <label className="flex items-center justify-center px-4 py-2 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 rounded-lg cursor-pointer transition">
                      <Upload className="w-4 h-4 text-slate-700 dark:text-gray-300" />
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'NEWS')} />
                   </label>
                </div>
                 {newsForm.imageUrl && (
                  <div className="mt-2">
                    <img src={newsForm.imageUrl} alt="Preview" className="w-32 h-20 rounded-lg object-cover border border-gray-200 dark:border-slate-700" />
                  </div>
                )}
             </div>

             <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Ngày đăng</label>
                <input type="date" value={newsForm.date} onChange={(e) => setNewsForm({...newsForm, date: e.target.value})} className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg p-2.5 outline-none" />
             </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Tóm tắt ngắn</label>
            <textarea value={newsForm.summary} onChange={(e) => setNewsForm({...newsForm, summary: e.target.value})} className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg p-3 h-20 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Nội dung chi tiết</label>
            <textarea value={newsForm.content || ''} onChange={(e) => setNewsForm({...newsForm, content: e.target.value})} className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg p-3 h-48 outline-none" placeholder="Viết nội dung bài viết ở đây..." />
          </div>
        </div>
      </div>
    );
  };

  const renderChannelForm = () => {
    if (!channelForm) return null;
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-xl overflow-hidden animate-fade-in">
        <div className="bg-gray-50 dark:bg-slate-700/50 p-6 border-b border-gray-200 dark:border-slate-700 flex justify-between items-center">
          <h3 className="text-xl font-bold text-finz-accent flex items-center">
            <button onClick={resetForms} className="mr-3 p-1 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full transition"><ArrowLeft className="w-5 h-5 text-gray-500" /></button>
            {channelForm.id ? 'Chỉnh sửa Tài liệu' : 'Thêm Tài liệu mới'}
          </h3>
          <div className="flex space-x-3">
            <button onClick={resetForms} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg text-slate-700 dark:text-white font-medium">Hủy bỏ</button>
            <button onClick={handleSaveChannel} className="flex items-center px-6 py-2 bg-finz-accent hover:bg-sky-600 rounded-lg text-white font-bold transition shadow-lg"><Save className="w-4 h-4 mr-2" /> Lưu tài liệu</button>
          </div>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Tiêu đề tài liệu</label>
                <input type="text" value={channelForm.title} onChange={(e) => setChannelForm({...channelForm, title: e.target.value})} className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg p-2.5 outline-none" />
             </div>
             <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Loại</label>
                <select value={channelForm.type} onChange={(e) => setChannelForm({...channelForm, type: e.target.value as any})} className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg p-2.5 outline-none">
                  <option value="GUIDE">Hướng dẫn</option>
                  <option value="RESOURCE">Tài nguyên</option>
                  <option value="SCRIPT">Kịch bản</option>
                </select>
             </div>
             <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Link liên kết (Optional)</label>
                <input type="text" value={channelForm.link_url || ''} onChange={(e) => setChannelForm({...channelForm, link_url: e.target.value})} className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg p-2.5 outline-none" />
             </div>
             <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Icon</label>
                <select value={channelForm.icon_name || 'FileText'} onChange={(e) => setChannelForm({...channelForm, icon_name: e.target.value})} className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg p-2.5 outline-none">
                   <option value="FileText">FileText</option>
                   <option value="Users">Users</option>
                   <option value="Share2">Share2</option>
                </select>
             </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Mô tả ngắn</label>
            <textarea value={channelForm.description} onChange={(e) => setChannelForm({...channelForm, description: e.target.value})} className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg p-3 h-20 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Nội dung chi tiết (Hiển thị inline)</label>
            <textarea value={channelForm.content || ''} onChange={(e) => setChannelForm({...channelForm, content: e.target.value})} className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg p-3 h-32 outline-none" placeholder="Nội dung hiển thị ngay trên trang..." />
          </div>
        </div>
      </div>
    );
  };

  const renderTemplateForm = () => {
    if (!templateForm) return null;
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-xl overflow-hidden animate-fade-in">
        <div className="bg-gray-50 dark:bg-slate-700/50 p-6 border-b border-gray-200 dark:border-slate-700 flex justify-between items-center">
          <h3 className="text-xl font-bold text-finz-accent flex items-center">
            <button onClick={resetForms} className="mr-3 p-1 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full transition"><ArrowLeft className="w-5 h-5 text-gray-500" /></button>
            {templateForm.id ? 'Chỉnh sửa Mẫu Web' : 'Thêm Mẫu Web mới'}
          </h3>
          <div className="flex space-x-3">
            <button onClick={resetForms} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg text-slate-700 dark:text-white font-medium">Hủy bỏ</button>
            <button onClick={handleSaveTemplate} className="flex items-center px-6 py-2 bg-finz-accent hover:bg-sky-600 rounded-lg text-white font-bold transition shadow-lg"><Save className="w-4 h-4 mr-2" /> Lưu mẫu</button>
          </div>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Tên mẫu giao diện</label>
                <input type="text" value={templateForm.title} onChange={(e) => setTemplateForm({...templateForm, title: e.target.value})} className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg p-2.5 outline-none" />
             </div>
             <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Danh mục</label>
                <select value={templateForm.category} onChange={(e) => setTemplateForm({...templateForm, category: e.target.value as any})} className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg p-2.5 outline-none">
                  <option value="Finance">Tài chính</option>
                  <option value="Insurance">Bảo hiểm</option>
                  <option value="General">Chung</option>
                </select>
             </div>
             
             {/* Image Upload for Template */}
             <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Ảnh xem trước (URL hoặc Tải lên)</label>
                <div className="flex gap-2">
                   <div className="relative flex-1">
                      <input 
                        type="text" 
                        value={templateForm.imageUrl} 
                        onChange={(e) => setTemplateForm({...templateForm, imageUrl: e.target.value})} 
                        className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg p-2.5 outline-none pl-9"
                      />
                      <ImageIcon className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                   </div>
                   <label className="flex items-center justify-center px-4 py-2 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 rounded-lg cursor-pointer transition">
                      <Upload className="w-4 h-4 text-slate-700 dark:text-gray-300" />
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'TEMPLATE')} />
                   </label>
                </div>
                 {templateForm.imageUrl && (
                  <div className="mt-2">
                    <img src={templateForm.imageUrl} alt="Preview" className="w-32 h-20 rounded-lg object-cover border border-gray-200 dark:border-slate-700" />
                  </div>
                )}
             </div>

             <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Link Demo (Optional)</label>
                <input type="text" value={templateForm.demoUrl || ''} onChange={(e) => setTemplateForm({...templateForm, demoUrl: e.target.value})} className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg p-2.5 outline-none" />
             </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Mô tả ngắn</label>
            <textarea value={templateForm.description} onChange={(e) => setTemplateForm({...templateForm, description: e.target.value})} className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg p-3 h-20 outline-none" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 text-slate-800 dark:text-white">
      {/* Admin Top Bar */}
      <div className="flex flex-col xl:flex-row justify-between items-center mb-8 bg-white dark:bg-finz-secondary p-5 rounded-2xl border border-gray-200 dark:border-white/10 shadow-lg">
        <div className="mb-4 xl:mb-0">
           <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-finz-accent to-purple-500">
             Admin Dashboard
           </h2>
           <p className="text-sm text-gray-500 dark:text-gray-400">Hệ thống quản trị tập trung FinZ</p>
        </div>
        
        <div className="flex flex-wrap gap-2 justify-center xl:justify-end">
           <div className="flex bg-gray-100 dark:bg-slate-900 p-1 rounded-xl overflow-x-auto">
            <button onClick={() => { setActiveView('PROJECTS'); resetForms(); }} className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all flex items-center whitespace-nowrap ${activeView === 'PROJECTS' ? 'bg-white dark:bg-finz-accent text-finz-accent dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}>
              <Layers className="w-4 h-4 mr-2" /> Dự án
            </button>
            <button onClick={() => { setActiveView('NEWS'); resetForms(); }} className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all flex items-center whitespace-nowrap ${activeView === 'NEWS' ? 'bg-white dark:bg-finz-accent text-finz-accent dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}>
              <Newspaper className="w-4 h-4 mr-2" /> Tin tức
            </button>
            <button onClick={() => { setActiveView('CHANNEL'); resetForms(); }} className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all flex items-center whitespace-nowrap ${activeView === 'CHANNEL' ? 'bg-white dark:bg-finz-accent text-finz-accent dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}>
              <PenTool className="w-4 h-4 mr-2" /> Xây kênh
            </button>
            <button onClick={() => { setActiveView('TEMPLATES'); resetForms(); }} className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all flex items-center whitespace-nowrap ${activeView === 'TEMPLATES' ? 'bg-white dark:bg-finz-accent text-finz-accent dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}>
              <LayoutIcon className="w-4 h-4 mr-2" /> Phễu bán hàng
            </button>
            <button onClick={() => { setActiveView('SETTINGS'); resetForms(); }} className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all flex items-center whitespace-nowrap ${activeView === 'SETTINGS' ? 'bg-white dark:bg-finz-accent text-finz-accent dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}>
              <Settings className="w-4 h-4 mr-2" /> Cấu hình
            </button>
          </div>
          <button onClick={onLogout} className="flex items-center px-4 py-2 bg-red-50 text-red-600 dark:bg-red-900/10 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors border border-red-200 dark:border-red-900/50 text-sm font-bold whitespace-nowrap">
            <LogOut className="w-4 h-4 mr-2" /> Thoát
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      
      {/* 1. PROJECTS VIEW */}
      {activeView === 'PROJECTS' && (
        <>
          {isEditing ? renderProjectForm() : (
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-xl overflow-hidden animate-fade-in">
              <div className="p-6 border-b border-gray-200 dark:border-slate-700 flex flex-col md:flex-row justify-between items-center gap-4">
                 <div className="flex items-center">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-white flex items-center mr-4"><Database className="w-5 h-5 mr-2 text-finz-accent" /> Danh sách dự án ({projects.length})</h3>
                 </div>
                 <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                       <input 
                         type="text" 
                         placeholder="Tìm dự án..." 
                         value={searchTerm}
                         onChange={(e) => setSearchTerm(e.target.value)}
                         className="w-full pl-9 pr-3 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-600 rounded-lg text-sm outline-none focus:ring-1 focus:ring-finz-accent"
                       />
                       <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    </div>
                    <button onClick={handleAddProject} className="flex items-center px-4 py-2 bg-finz-accent text-white rounded-lg text-sm font-bold hover:bg-sky-600 transition whitespace-nowrap">
                      <Plus className="w-4 h-4 mr-2"/> Thêm dự án
                    </button>
                 </div>
              </div>
              
              {/* Added Scrollable Container for many projects */}
              <div className="overflow-x-auto max-h-[60vh] overflow-y-auto custom-scrollbar">
                <table className="w-full relative">
                  <thead className="sticky top-0 z-10 bg-gray-50 dark:bg-slate-900 text-slate-500 dark:text-gray-400 text-xs uppercase tracking-wider shadow-sm">
                    <tr>
                      <th className="p-4 text-left font-semibold">Dự án</th>
                      <th className="p-4 text-center font-semibold">Trạng thái</th>
                      <th className="p-4 text-center font-semibold">Hành động</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                    {projects
                      .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
                      .sort((a,b) => a.priority - b.priority)
                      .map(project => (
                      <tr key={project.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                        <td className="p-4 flex items-center space-x-3">
                            <img src={project.logo_url} alt="" className="w-10 h-10 rounded-lg object-cover bg-gray-100 dark:bg-slate-800"/>
                            <div>
                                <span className="font-bold text-sm block">{project.name}</span>
                                <span className="text-xs text-gray-500">Priority: {project.priority}</span>
                            </div>
                        </td>
                        <td className="p-4 text-center">
                          <button onClick={() => toggleProjectStatus(project.id)} className={`p-2 rounded-lg transition-colors ${project.enabled ? 'text-green-600 bg-green-50 dark:bg-green-900/20' : 'text-gray-400 bg-gray-100 dark:bg-slate-800'}`}>
                            {project.enabled ? <Eye className="w-4 h-4"/> : <EyeOff className="w-4 h-4"/>}
                          </button>
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex justify-center space-x-2">
                             <button onClick={() => handleEditProject(project)} className="text-finz-accent hover:bg-finz-accent/10 p-2 rounded-lg transition"><Edit className="w-4 h-4"/></button>
                             <button onClick={() => handleDeleteProject(project.id)} className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg transition"><Trash2 className="w-4 h-4"/></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {projects.length === 0 && (
                       <tr>
                         <td colSpan={3} className="p-8 text-center text-gray-500">Chưa có dự án nào. Hãy thêm mới!</td>
                       </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {/* 2. NEWS VIEW */}
      {activeView === 'NEWS' && (
        <>
          {isEditing ? renderNewsForm() : (
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-xl overflow-hidden animate-fade-in">
              <div className="p-6 border-b border-gray-200 dark:border-slate-700 flex justify-between items-center">
                 <h3 className="font-bold text-lg text-slate-800 dark:text-white flex items-center"><Newspaper className="w-5 h-5 mr-2 text-finz-accent" /> Quản lý Tin tức</h3>
                 <button onClick={handleAddNews} className="flex items-center px-4 py-2 bg-finz-accent text-white rounded-lg text-sm font-bold hover:bg-sky-600 transition"><Plus className="w-4 h-4 mr-2"/> Viết bài mới</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-slate-900/50 text-slate-500 dark:text-gray-400 text-xs uppercase tracking-wider">
                    <tr>
                      <th className="p-4 text-left font-semibold">Tiêu đề</th>
                      <th className="p-4 text-left font-semibold">Danh mục</th>
                      <th className="p-4 text-center font-semibold">Ngày đăng</th>
                      <th className="p-4 text-center font-semibold">Hành động</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                    {news.map(item => (
                      <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                        <td className="p-4 font-medium text-sm max-w-xs truncate">{item.title}</td>
                        <td className="p-4 text-sm text-gray-500">{item.category}</td>
                        <td className="p-4 text-center text-sm">{item.date}</td>
                        <td className="p-4 text-center flex items-center justify-center space-x-2">
                          <button onClick={() => handleEditNews(item)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Edit className="w-4 h-4"/></button>
                          <button onClick={() => handleDeleteNews(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4"/></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {/* 3. CHANNEL RESOURCES VIEW */}
      {activeView === 'CHANNEL' && (
        <>
          {isEditing ? renderChannelForm() : (
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-xl overflow-hidden animate-fade-in">
              <div className="p-6 border-b border-gray-200 dark:border-slate-700 flex justify-between items-center">
                 <h3 className="font-bold text-lg text-slate-800 dark:text-white flex items-center"><PenTool className="w-5 h-5 mr-2 text-finz-accent" /> Quản lý Xây kênh</h3>
                 <button onClick={handleAddChannel} className="flex items-center px-4 py-2 bg-finz-accent text-white rounded-lg text-sm font-bold hover:bg-sky-600 transition"><Plus className="w-4 h-4 mr-2"/> Thêm tài liệu</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-slate-900/50 text-slate-500 dark:text-gray-400 text-xs uppercase tracking-wider">
                    <tr>
                      <th className="p-4 text-left font-semibold">Tiêu đề tài liệu</th>
                      <th className="p-4 text-left font-semibold">Loại</th>
                      <th className="p-4 text-center font-semibold">Liên kết</th>
                      <th className="p-4 text-center font-semibold">Hành động</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                    {channelResources.map(item => (
                      <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                        <td className="p-4 font-medium text-sm">{item.title}</td>
                        <td className="p-4 text-sm text-gray-500"><span className="bg-gray-100 dark:bg-slate-900 px-2 py-1 rounded text-xs">{item.type}</span></td>
                        <td className="p-4 text-center text-sm">{item.link_url ? <ExternalLink className="w-4 h-4 mx-auto text-blue-500"/> : '-'}</td>
                        <td className="p-4 text-center flex items-center justify-center space-x-2">
                          <button onClick={() => handleEditChannel(item)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Edit className="w-4 h-4"/></button>
                          <button onClick={() => handleDeleteChannel(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4"/></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {/* 4. TEMPLATES VIEW */}
      {activeView === 'TEMPLATES' && (
        <>
          {isEditing ? renderTemplateForm() : (
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-xl overflow-hidden animate-fade-in">
              <div className="p-6 border-b border-gray-200 dark:border-slate-700 flex justify-between items-center">
                 <h3 className="font-bold text-lg text-slate-800 dark:text-white flex items-center"><LayoutIcon className="w-5 h-5 mr-2 text-finz-accent" /> Quản lý Phễu bán hàng</h3>
                 <button onClick={handleAddTemplate} className="flex items-center px-4 py-2 bg-finz-accent text-white rounded-lg text-sm font-bold hover:bg-sky-600 transition"><Plus className="w-4 h-4 mr-2"/> Thêm mẫu mới</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-slate-900/50 text-slate-500 dark:text-gray-400 text-xs uppercase tracking-wider">
                    <tr>
                      <th className="p-4 text-left font-semibold">Tên mẫu</th>
                      <th className="p-4 text-left font-semibold">Danh mục</th>
                      <th className="p-4 text-center font-semibold">Ảnh Demo</th>
                      <th className="p-4 text-center font-semibold">Hành động</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                    {templates.map(item => (
                      <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                        <td className="p-4 font-medium text-sm">{item.title}</td>
                        <td className="p-4 text-sm text-gray-500"><span className="bg-gray-100 dark:bg-slate-900 px-2 py-1 rounded text-xs">{item.category}</span></td>
                        <td className="p-4 text-center">
                          <img src={item.imageUrl} alt="" className="h-10 w-16 object-cover rounded mx-auto border border-gray-200 dark:border-slate-700" />
                        </td>
                        <td className="p-4 text-center flex items-center justify-center space-x-2">
                          <button onClick={() => handleEditTemplate(item)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Edit className="w-4 h-4"/></button>
                          <button onClick={() => handleDeleteTemplate(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4"/></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {/* 5. SETTINGS VIEW */}
      {activeView === 'SETTINGS' && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-xl p-6 md:p-8 animate-fade-in">
           {/* Settings UI remains similar to before */}
           <div className="flex items-center mb-6">
             <div className="p-3 bg-purple-500/10 rounded-xl mr-4"><Settings className="w-8 h-8 text-purple-500" /></div>
             <div><h3 className="text-xl font-bold text-slate-900 dark:text-white">Cấu hình Hệ thống</h3><p className="text-sm text-gray-500 dark:text-gray-400">Thiết lập chung</p></div>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="space-y-4">
               <div><label className="block text-sm font-medium mb-2">Hotline</label><input type="text" value={systemSettings.contactPhone} onChange={(e) => setSystemSettings({...systemSettings, contactPhone: e.target.value})} className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg p-3 outline-none" /></div>
               <div><label className="block text-sm font-medium mb-2">Link Zalo</label><input type="text" value={systemSettings.zaloLink} onChange={(e) => setSystemSettings({...systemSettings, zaloLink: e.target.value})} className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg p-3 outline-none" /></div>
             </div>
             <div className="space-y-4">
               <div><label className="block text-sm font-medium mb-2">Footer Text</label><textarea value={systemSettings.footerText} onChange={(e) => setSystemSettings({...systemSettings, footerText: e.target.value})} className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg p-3 h-28 outline-none" /></div>
               <button onClick={handleSaveSettings} className="w-full py-3 bg-finz-accent text-white font-bold rounded-xl shadow-lg hover:bg-sky-600 transition">Lưu Cấu Hình</button>
             </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
