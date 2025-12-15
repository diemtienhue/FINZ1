
import React, { useState, useEffect } from 'react';
import { INITIAL_PROJECTS, MOCK_NEWS, MOCK_CHANNEL_RESOURCES, MOCK_TEMPLATES } from './constants';
import { Project, NewsItem, ChannelResource, LandingPageTemplate, TabType } from './types';
import Layout from './components/Layout';
import ProjectCard from './components/ProjectCard';
import ProjectPopup from './components/ProjectPopup';
import LoanCalculator from './components/LoanCalculator';
import DTITool from './components/DTITool';
import AdminDashboard from './components/AdminDashboard';
import LoginPage from './components/LoginPage';
import SupabaseTest from './components/SupabaseTest';
import { CheckCircle2, TrendingUp, ShieldCheck, Facebook, FileText, Share2, Users, ChevronRight, ExternalLink, ClipboardCheck, Monitor, Palette } from 'lucide-react';
import { getProjects, getAllProjects, getNews, getChannelResources, getTemplates } from './lib/supabaseHelpers';

function App() {
  const [activeTab, setActiveTab] = useState<TabType | 'ADMIN_LOGIN'>('HOME');
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Lift state for News, Channel Resources, and Templates to App level
  const [news, setNews] = useState<NewsItem[]>(MOCK_NEWS);
  const [channelResources, setChannelResources] = useState<ChannelResource[]>(MOCK_CHANNEL_RESOURCES);
  const [templates, setTemplates] = useState<LandingPageTemplate[]>(MOCK_TEMPLATES);
  
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load dữ liệu từ Supabase khi ứng dụng khởi động
  // GIỮ NGUYÊN dữ liệu mock, chỉ load từ Supabase nếu có dữ liệu
  useEffect(() => {
    const loadDataFromSupabase = async () => {
      try {
        setIsLoading(true);
        
        // Load tất cả dữ liệu từ Supabase
        const [projectsResult, newsResult, channelResult, templatesResult] = await Promise.allSettled([
          getProjects(),
          getNews(),
          getChannelResources(),
          getTemplates()
        ]);

        // Xử lý Projects: Nếu Supabase có dữ liệu thì dùng, không thì giữ nguyên mock
        if (projectsResult.status === 'fulfilled' && projectsResult.value && projectsResult.value.length > 0) {
          const mappedProjects: Project[] = projectsResult.value.map((p: any) => ({
            id: p.id,
            name: p.name,
            logo_url: p.logo_url,
            strengths: p.strengths || [],
            register_link: p.register_link,
            group_link: p.group_link,
            contact_phone: p.contact_phone,
            short_description: p.short_description,
            popup_content: p.popup_content,
            priority: p.priority,
            enabled: p.enabled,
            commission_policy: p.commission_policy,
            conditions: p.conditions,
            tab_1_title: p.tab_1_title,
            tab_1_content: p.tab_1_content,
            tab_2_title: p.tab_2_title,
            tab_2_content: p.tab_2_content,
            tab_3_title: p.tab_3_title,
            tab_3_content: p.tab_3_content,
          }));
          setProjects(mappedProjects);
          console.log('✅ Đã load projects từ Supabase:', mappedProjects.length, 'items');
        } else {
          console.log('ℹ️ Supabase không có projects, giữ nguyên dữ liệu mock:', INITIAL_PROJECTS.length, 'items');
          // Giữ nguyên INITIAL_PROJECTS - không thay đổi
        }

        // Xử lý News: Nếu Supabase có dữ liệu thì dùng, không thì giữ nguyên mock
        if (newsResult.status === 'fulfilled' && newsResult.value && newsResult.value.length > 0) {
          const mappedNews: NewsItem[] = newsResult.value.map((n: any) => ({
            id: n.id,
            title: n.title,
            summary: n.summary,
            content: n.content || undefined,
            date: n.date,
            category: n.category as 'News' | 'Knowledge' | 'Policy',
            imageUrl: n.image_url, // Map image_url -> imageUrl
          }));
          setNews(mappedNews);
          console.log('✅ Đã load news từ Supabase:', mappedNews.length, 'items');
        } else {
          console.log('ℹ️ Supabase không có news, giữ nguyên dữ liệu mock:', MOCK_NEWS.length, 'items');
          // Giữ nguyên MOCK_NEWS - không thay đổi
        }

        // Xử lý Channel Resources: Nếu Supabase có dữ liệu thì dùng, không thì giữ nguyên mock
        if (channelResult.status === 'fulfilled' && channelResult.value && channelResult.value.length > 0) {
          const mappedChannelResources: ChannelResource[] = channelResult.value.map((c: any) => ({
            id: c.id,
            title: c.title,
            description: c.description,
            type: c.type,
            link_url: c.link_url,
            content: c.content,
            icon_name: c.icon_name,
          }));
          setChannelResources(mappedChannelResources);
          console.log('✅ Đã load channel resources từ Supabase:', mappedChannelResources.length, 'items');
        } else {
          console.log('ℹ️ Supabase không có channel resources, giữ nguyên dữ liệu mock:', MOCK_CHANNEL_RESOURCES.length, 'items');
          // Giữ nguyên MOCK_CHANNEL_RESOURCES - không thay đổi
        }

        // Xử lý Templates: Nếu Supabase có dữ liệu thì dùng, không thì giữ nguyên mock
        if (templatesResult.status === 'fulfilled' && templatesResult.value && templatesResult.value.length > 0) {
          const mappedTemplates: LandingPageTemplate[] = templatesResult.value.map((t: any) => ({
            id: t.id,
            title: t.title,
            description: t.description,
            imageUrl: t.image_url, // Map image_url -> imageUrl
            demoUrl: t.demo_url || undefined, // Map demo_url -> demoUrl
            category: t.category as 'Finance' | 'Insurance' | 'General',
          }));
          setTemplates(mappedTemplates);
          console.log('✅ Đã load templates từ Supabase:', mappedTemplates.length, 'items');
        } else {
          console.log('ℹ️ Supabase không có templates, giữ nguyên dữ liệu mock:', MOCK_TEMPLATES.length, 'items');
          // Giữ nguyên MOCK_TEMPLATES - không thay đổi
        }

        console.log('✅ Hoàn tất load dữ liệu từ Supabase!');
      } catch (error) {
        console.error('❌ Lỗi khi load dữ liệu từ Supabase:', error);
        // Giữ nguyên mock data nếu có lỗi - không thay đổi gì
        console.log('ℹ️ Giữ nguyên tất cả dữ liệu mock do lỗi');
      } finally {
        setIsLoading(false);
      }
    };

    loadDataFromSupabase();
  }, []);

  // Triggered when clicking the Admin button in Layout
  const handleAdminClick = () => {
    if (isAdminLoggedIn) {
      setActiveTab('ADMIN');
    } else {
      setActiveTab('ADMIN_LOGIN');
    }
  };

  const handleLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    setActiveTab('ADMIN');
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    setActiveTab('HOME');
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const renderChannelIcon = (name?: string) => {
    switch(name) {
      case 'Users': return <Users className="w-5 h-5 mr-2 text-green-500 shrink-0"/>;
      case 'FileText': return <FileText className="w-5 h-5 mr-2 text-finz-highlight shrink-0"/>;
      case 'Share2': return <Share2 className="w-5 h-5 mr-2 text-finz-accent shrink-0"/>;
      default: return <CheckCircle2 className="w-5 h-5 mr-2 text-gray-400 shrink-0"/>;
    }
  };

  // Reload dữ liệu từ Supabase (dùng cho Admin sau khi save)
  // Chỉ reload nếu Supabase có dữ liệu, không thay thế mock data
  const reloadData = async () => {
    try {
      const [projectsResult, newsResult, channelResult, templatesResult] = await Promise.allSettled([
        getAllProjects(), // Dùng getAllProjects để lấy cả disabled
        getNews(),
        getChannelResources(),
        getTemplates()
      ]);

      // Chỉ cập nhật nếu Supabase có dữ liệu
      if (projectsResult.status === 'fulfilled' && projectsResult.value && projectsResult.value.length > 0) {
        const mappedProjects: Project[] = projectsResult.value.map((p: any) => ({
          id: p.id,
          name: p.name,
          logo_url: p.logo_url,
          strengths: p.strengths || [],
          register_link: p.register_link,
          group_link: p.group_link,
          contact_phone: p.contact_phone,
          short_description: p.short_description,
          popup_content: p.popup_content,
          priority: p.priority,
          enabled: p.enabled,
          commission_policy: p.commission_policy,
          conditions: p.conditions,
          tab_1_title: p.tab_1_title,
          tab_1_content: p.tab_1_content,
          tab_2_title: p.tab_2_title,
          tab_2_content: p.tab_2_content,
          tab_3_title: p.tab_3_title,
          tab_3_content: p.tab_3_content,
        }));
        setProjects(mappedProjects);
      }

      if (newsResult.status === 'fulfilled' && newsResult.value && newsResult.value.length > 0) {
        const mappedNews: NewsItem[] = newsResult.value.map((n: any) => ({
          id: n.id,
          title: n.title,
          summary: n.summary,
          content: n.content || undefined,
          date: n.date,
          category: n.category as 'News' | 'Knowledge' | 'Policy',
          imageUrl: n.image_url,
        }));
        setNews(mappedNews);
      }

      if (channelResult.status === 'fulfilled' && channelResult.value && channelResult.value.length > 0) {
        const mappedChannelResources: ChannelResource[] = channelResult.value.map((c: any) => ({
          id: c.id,
          title: c.title,
          description: c.description,
          type: c.type,
          link_url: c.link_url,
          content: c.content,
          icon_name: c.icon_name,
        }));
        setChannelResources(mappedChannelResources);
      }

      if (templatesResult.status === 'fulfilled' && templatesResult.value && templatesResult.value.length > 0) {
        const mappedTemplates: LandingPageTemplate[] = templatesResult.value.map((t: any) => ({
          id: t.id,
          title: t.title,
          description: t.description,
          imageUrl: t.image_url,
          demoUrl: t.demo_url || undefined,
          category: t.category as 'Finance' | 'Insurance' | 'General',
        }));
        setTemplates(mappedTemplates);
      }
    } catch (error) {
      console.error('Error reloading data:', error);
    }
  };

  const renderContent = () => {
    // Hiển thị loading khi đang load dữ liệu lần đầu
    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-finz-accent mx-auto mb-4"></div>
            <p className="text-slate-600 dark:text-gray-400">Đang tải dữ liệu từ Supabase...</p>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'ADMIN_LOGIN':
        return <LoginPage onLoginSuccess={handleLoginSuccess} onBack={() => setActiveTab('HOME')} />;

      case 'ADMIN':
        if (!isAdminLoggedIn) {
           return <LoginPage onLoginSuccess={handleLoginSuccess} onBack={() => setActiveTab('HOME')} />;
        }
        return (
          <AdminDashboard 
            projects={projects} 
            setProjects={setProjects} 
            news={news}
            setNews={setNews}
            channelResources={channelResources}
            setChannelResources={setChannelResources}
            templates={templates}
            setTemplates={setTemplates}
            onLogout={handleLogout}
          />
        );
      
      case 'CALCULATOR':
        return <LoanCalculator />;
      
      case 'DTI':
        return <DTITool />;
      
      case 'BUILD_CHANNEL':
        return (
          <div className="text-slate-900 dark:text-white max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Xây dựng kênh tài chính</h2>
            <div className="space-y-6">
              {channelResources.length === 0 && <p className="text-gray-500 italic">Chưa có tài liệu nào.</p>}
              
              {channelResources.map((item) => (
                <div key={item.id} className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold text-finz-accent mb-2 flex items-center">
                    {renderChannelIcon(item.icon_name)}
                    {item.title}
                  </h3>
                  <p className="text-slate-600 dark:text-gray-300 mb-4">{item.description}</p>
                  
                  {item.content && (
                    <div className="bg-gray-50 dark:bg-black/20 p-4 rounded-xl text-sm text-slate-700 dark:text-gray-400 mb-4 border border-gray-100 dark:border-white/5 whitespace-pre-line">
                      {item.content}
                    </div>
                  )}

                  {item.link_url && (
                    <a href={item.link_url} target="_blank" rel="noreferrer" className="inline-flex items-center px-4 py-2 bg-finz-accent/10 hover:bg-finz-accent/20 text-finz-accent rounded-lg font-medium transition">
                      <ExternalLink className="w-4 h-4 mr-2" /> Truy cập tài liệu
                    </a>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl border border-purple-500/20 text-center">
               <h4 className="font-bold text-slate-800 dark:text-white mb-2">Tham gia cộng đồng kín</h4>
               <p className="text-sm text-gray-500 mb-4">Nhận trọn bộ tài liệu và support 1-1 từ đội ngũ Admin</p>
               <button className="px-6 py-2 bg-finz-secondary text-white rounded-lg font-bold hover:bg-slate-700 transition">Tham gia ngay</button>
            </div>
          </div>
        );

      case 'LANDING_PAGE':
        return (
           <div className="max-w-6xl mx-auto">
             <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Kho giao diện Phễu bán hàng</h2>
                <p className="text-slate-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Các mẫu Landing Page được tối ưu hóa cho chuyển đổi cao, chuyên biệt cho lĩnh vực Tài chính & Bảo hiểm. 
                  Giúp bạn xây dựng thương hiệu cá nhân chuyên nghiệp.
                </p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {templates.map(template => (
                  <div key={template.id} className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-slate-700 hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1">
                    <div className="h-48 overflow-hidden relative">
                       <img src={template.imageUrl} alt={template.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                       <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-white text-xs px-2 py-1 rounded font-bold">{template.category}</div>
                    </div>
                    <div className="p-6">
                       <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{template.title}</h3>
                       <p className="text-slate-500 dark:text-gray-400 text-sm mb-4 line-clamp-2">{template.description}</p>
                       <div className="flex gap-2">
                          <button className="flex-1 py-2 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-slate-700 dark:text-gray-300 rounded-lg text-sm font-semibold transition">
                             Xem trước
                          </button>
                          <a href="https://zalo.me/g/axlofr797" target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center py-2 bg-finz-accent hover:bg-sky-600 text-white rounded-lg text-sm font-semibold transition shadow-sm">
                             Chọn mẫu
                          </a>
                       </div>
                    </div>
                  </div>
                ))}
             </div>

             <div className="p-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl shadow-xl text-center text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-white/10 backdrop-blur-[1px]"></div>
                <div className="relative z-10">
                   <Monitor className="w-12 h-12 mx-auto mb-4 text-white/80" />
                   <h3 className="text-2xl font-bold mb-2">Bạn muốn sở hữu một phễu chuyển đổi để xây tệp khách hàng cho riêng mình?</h3>
                   <p className="text-blue-100 mb-6 max-w-xl mx-auto">Đăng ký ngay để được đội ngũ kỹ thuật hỗ trợ setup website bán hàng chuẩn SEO, tích hợp Form đăng ký về Zalo/Google Sheet.</p>
                   <a 
                     href="https://zalo.me/g/axlofr797" 
                     target="_blank" 
                     rel="noreferrer"
                     className="inline-flex items-center px-8 py-3 bg-white text-blue-600 rounded-full font-bold hover:bg-blue-50 transition shadow-lg"
                   >
                     <Palette className="w-5 h-5 mr-2" /> Đăng ký thiết kế
                   </a>
                   <p className="text-xs text-blue-200 mt-4 opacity-80">Tham gia nhóm Zalo để được tư vấn chi tiết</p>
                </div>
             </div>
           </div>
        );

      case 'NEWS':
        return (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Tin mới tài chính</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map(item => (
                <div key={item.id} className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-slate-700 hover:border-finz-accent transition-all cursor-pointer group">
                  <div className="h-40 bg-gray-200 dark:bg-gray-700 overflow-hidden relative">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                    <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded font-bold uppercase">{item.category}</span>
                  </div>
                  <div className="p-4 flex flex-col h-[calc(100%-160px)]">
                    <h3 className="text-slate-900 dark:text-white font-bold mb-2 line-clamp-2 text-sm md:text-base group-hover:text-finz-accent transition-colors">{item.title}</h3>
                    <p className="text-slate-500 dark:text-gray-400 text-xs md:text-sm line-clamp-3 mb-3 flex-1">{item.summary}</p>
                    <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-white/5">
                       <span className="text-gray-400 text-xs">{item.date}</span>
                       <span className="text-finz-accent text-xs font-semibold flex items-center">Đọc thêm <ChevronRight className="w-3 h-3 ml-1"/></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'SUPABASE_TEST':
        return <SupabaseTest />;

      case 'HOME':
      default:
        return (
          <>
            {/* Hero Section */}
            <div className="mb-10 text-center md:text-left">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-finz-accent/10 dark:to-purple-500/10 border border-blue-100 dark:border-finz-accent/20 rounded-3xl p-6 md:p-10 relative overflow-hidden shadow-sm dark:shadow-none transition-colors">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200 dark:bg-finz-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50 dark:opacity-100"></div>
                <div className="relative z-10">
                  <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
                    <span className="text-slate-900 dark:text-white drop-shadow-sm">
                      FINZ – ĐIỂM CHẠM TỐI ƯU
                    </span>
                  </h1>
                  <p className="text-slate-600 dark:text-gray-300 text-lg md:max-w-2xl mb-8 font-medium">
                    Công cụ hỗ trợ Sales tài chính & CTV mở thẻ tín dụng 1-1. Theo dõi khách hàng realtime, giảm lost, tăng tỉ lệ duyệt.
                  </p>
                  
                  {/* Benefits Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 md:max-w-3xl">
                    <div className="bg-white/60 dark:bg-slate-900/50 p-3 rounded-xl border border-blue-100 dark:border-white/5 flex items-center shadow-sm">
                      <ShieldCheck className="w-8 h-8 text-green-500 dark:text-green-400 mr-3" />
                      <div className="text-left">
                        <div className="text-slate-900 dark:text-white font-bold text-sm">Giảm Lost</div>
                        <div className="text-slate-500 dark:text-gray-400 text-xs">Theo dõi sát sao</div>
                      </div>
                    </div>
                    <div className="bg-white/60 dark:bg-slate-900/50 p-3 rounded-xl border border-blue-100 dark:border-white/5 flex items-center shadow-sm">
                      <TrendingUp className="w-8 h-8 text-finz-accent mr-3" />
                      <div className="text-left">
                        <div className="text-slate-900 dark:text-white font-bold text-sm">Tăng tỉ lệ duyệt</div>
                        <div className="text-slate-500 dark:text-gray-400 text-xs">Xây dựng Credit</div>
                      </div>
                    </div>
                     <div className="bg-white/60 dark:bg-slate-900/50 p-3 rounded-xl border border-blue-100 dark:border-white/5 flex items-center shadow-sm">
                      <CheckCircle2 className="w-8 h-8 text-finz-highlight mr-3" />
                      <div className="text-left">
                        <div className="text-slate-900 dark:text-white font-bold text-sm">Thu nhập bền vững</div>
                        <div className="text-slate-500 dark:text-gray-400 text-xs">Đa dạng dự án</div>
                      </div>
                    </div>
                  </div>

                  {/* Modern Action Buttons - Uniform Style */}
                  <div className="flex flex-row flex-nowrap gap-3 justify-center md:justify-start overflow-x-auto py-2">
                    <button 
                       onClick={() => setActiveTab('CALCULATOR')}
                       className="group relative flex items-center justify-center px-3 sm:px-6 py-3 sm:py-4 bg-gradient-to-br from-sky-400 to-blue-600 hover:from-sky-300 hover:to-blue-500 text-white rounded-xl sm:rounded-2xl font-semibold sm:font-bold transition-all duration-300 shadow-lg shadow-sky-300/40 hover:shadow-amber-200/60 hover:-translate-y-1 border border-amber-100/70 whitespace-nowrap"
                    >
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite]"></span>
                      <ShieldCheck className="w-5 h-5 mr-2" />
                      Máy tính Tín chấp
                    </button>
                    
                    <a 
                       href="https://zalo.me/g/axlofr797"
                       target="_blank"
                       rel="noreferrer"
                       className="group relative flex items-center justify-center px-3 sm:px-6 py-3 sm:py-4 bg-gradient-to-br from-sky-400 to-blue-600 hover:from-sky-300 hover:to-blue-500 text-white rounded-xl sm:rounded-2xl font-semibold sm:font-bold transition-all duration-300 shadow-lg shadow-sky-300/40 hover:shadow-amber-200/60 hover:-translate-y-1 border border-amber-100/70 whitespace-nowrap"
                    >
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite]"></span>
                      <ClipboardCheck className="w-5 h-5 mr-2" /> 
                      Kiểm tra CIC
                    </a>
                    
                    <button 
                       onClick={() => setActiveTab('DTI')}
                       className="group relative flex items-center justify-center px-3 sm:px-6 py-3 sm:py-4 bg-gradient-to-br from-sky-400 to-blue-600 hover:from-sky-300 hover:to-blue-500 text-white rounded-xl sm:rounded-2xl font-semibold sm:font-bold transition-all duration-300 shadow-lg shadow-sky-300/40 hover:shadow-amber-200/60 hover:-translate-y-1 border border-amber-100/70 whitespace-nowrap"
                    >
                       <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite]"></span>
                       <TrendingUp className="w-5 h-5 mr-2" />
                      Chick DTI
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Projects Grid */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center">
                  <span className="w-1 h-8 bg-finz-highlight rounded-full mr-3"></span>
                  Dự án Hot 2025
                </h2>
                <span className="text-xs text-finz-accent font-medium cursor-pointer hover:underline">Xem tất cả</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.filter(p => p.enabled).sort((a,b) => a.priority - b.priority).map((project) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    onOpenPopup={handleProjectClick}
                  />
                ))}
              </div>
            </div>

            {/* Footer Section */}
            <footer className="border-t border-gray-200 dark:border-slate-800 pt-8 pb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-slate-900 dark:text-white font-bold mb-4">Về FinZ Ecosystem</h3>
                  <p className="text-slate-600 dark:text-gray-400 text-xs leading-relaxed max-w-lg mb-3">
                    Các đối tác được triển khai trên Finz gồm: FE credit (Công ty tài chính ngân hàng Việt nam Thịnh Vượng, VIB (ngân hàng quốc tế VIB), Tnex (Công ty tài chính thuộc MSB) , Homecredit (Công ty tài chính Homecredit, Mfast (Công ty CP Thanh Toán số), Cnext (Công ty CP giải pháp Cnext)
                  </p>
                  <p className="text-slate-500 dark:text-gray-500 text-xs italic leading-relaxed max-w-lg">
                    Công cụ được tạo ra để hỗ trợ sales tài chính tiêu dùng cả về nghiệp vụ và xây dựng hệ thống thực chiến. Không áp dụng cho số đông
                  </p>
                </div>
                <div className="flex flex-col md:items-end">
                   <h3 className="text-slate-900 dark:text-white font-bold mb-4">Liên hệ hỗ trợ</h3>
                   <a href="https://zalo.me/0888979809" target="_blank" rel="noreferrer" className="text-finz-accent text-sm mb-2 hover:underline">
                     Zalo: 0888.979.809
                   </a>
                   <a href="#" className="flex items-center text-slate-600 dark:text-gray-400 text-sm hover:text-blue-500 transition-colors">
                     <Facebook className="w-4 h-4 mr-2" /> Fanpage FinZ
                   </a>
                </div>
              </div>
              <div className="text-center pt-4 border-t border-gray-200 dark:border-slate-800">
                <p className="text-slate-500 dark:text-gray-600 text-xs mb-2">© 2025 FinZ Ecosystem. All rights reserved.</p>
                <p className="text-slate-400 dark:text-gray-700 text-[10px] italic">Nói không với các hình thức tín dụng đen</p>
              </div>
            </footer>
          </>
        );
    }
  };

  return (
    <Layout 
      activeTab={activeTab === 'ADMIN_LOGIN' ? 'HOME' : activeTab as TabType} 
      setActiveTab={(t) => setActiveTab(t)} 
      onAdminLogin={handleAdminClick}
      projects={projects}
      onProjectClick={handleProjectClick}
    >
      {renderContent()}
      
      {/* Global Project Popup */}
      {selectedProject && (
        <ProjectPopup 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </Layout>
  );
}

export default App;
