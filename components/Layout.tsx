
import React, { useState, useEffect } from 'react';
import { TabType, Project } from '../types';
import { Home, Calculator, PieChart, PenTool, Newspaper, Menu, LogIn, ChevronRight, Sun, Moon, Layout as LayoutIcon } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onAdminLogin: () => void;
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, onAdminLogin, projects, onProjectClick }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(false); // Default to Light Mode

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  // Quick nav items for Mobile Bottom Bar (Scrollable if many)
  const navItems = [
    { id: 'HOME', icon: Home, label: 'Trang chủ' },
    { id: 'CALCULATOR', icon: Calculator, label: 'Tín chấp' },
    { id: 'DTI', icon: PieChart, label: 'DTI' },
    { id: 'BUILD_CHANNEL', icon: PenTool, label: 'Xây kênh' },
    { id: 'LANDING_PAGE', icon: LayoutIcon, label: 'Phễu bán hàng' },
    { id: 'NEWS', icon: Newspaper, label: 'Tin tức' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-transparent transition-colors duration-300">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-finz-primary/80 backdrop-blur-md border-b border-gray-200 dark:border-white/10 h-16 flex items-center justify-between px-4 sm:px-6 transition-colors duration-300">
        <div 
          className="flex items-center space-x-2 cursor-pointer" 
          onClick={() => setActiveTab('HOME')}
        >
          <div className="w-8 h-8 bg-gradient-to-tr from-finz-accent to-blue-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">
            F
          </div>
          <span className="text-lg font-bold text-slate-800 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:to-gray-400">
            FinZ Ecosystem
          </span>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-slate-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Admin Trigger */}
          <button 
            onClick={onAdminLogin}
            className="p-2 text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            title="Admin Login"
          >
            <LogIn className="w-5 h-5" />
          </button>
          
          {/* Hamburger for Mobile Sidebar */}
          <button 
            className="md:hidden p-2 text-slate-800 dark:text-white"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar (Left) - Using strict width */}
        <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-white/10 pt-6 fixed h-full z-30 transition-colors duration-300">
          <div className="px-4 mb-6">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Menu chính</h3>
            <nav className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as TabType)}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                    activeTab === item.id 
                      ? 'bg-finz-accent text-white shadow-lg shadow-finz-accent/20' 
                      : 'text-slate-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="px-4 mt-auto mb-24">
             <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Dự án Hot</h3>
             <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
                {projects.filter(p => p.enabled).slice(0, 5).map(p => (
                  <div 
                    key={p.id} 
                    className="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg cursor-pointer group transition-colors"
                    onClick={() => onProjectClick(p)}
                  >
                    <img src={p.logo_url} alt="" className="w-6 h-6 rounded-full grayscale group-hover:grayscale-0 transition-all"/>
                    <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-slate-900 dark:group-hover:text-white truncate">{p.name}</span>
                  </div>
                ))}
             </div>
          </div>
        </aside>

        {/* Mobile Off-Canvas Sidebar (Right) */}
        {isSidebarOpen && (
           <div className="fixed inset-0 z-50 md:hidden flex justify-end">
             <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)}></div>
             <div className="relative w-64 bg-white dark:bg-slate-900 h-full p-6 shadow-2xl animate-slide-left transition-colors">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Menu Dự Án</h3>
                <div className="space-y-4">
                  {projects.filter(p => p.enabled).map(p => (
                    <div 
                      key={p.id} 
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/5 active:bg-finz-accent/10"
                      onClick={() => {
                        onProjectClick(p);
                        setIsSidebarOpen(false);
                      }}
                    >
                       <div className="flex items-center space-x-3">
                         <img src={p.logo_url} alt="" className="w-8 h-8 rounded-full"/>
                         <span className="text-sm font-medium text-slate-900 dark:text-white">{p.name}</span>
                       </div>
                       <ChevronRight className="w-4 h-4 text-gray-500" />
                    </div>
                  ))}
                </div>
             </div>
           </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-transparent md:ml-64 pb-24 md:pb-8 p-4">
          <div className="max-w-5xl mx-auto animate-fade-in">
             {children}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-gray-200 dark:border-white/10 pb-safe transition-colors">
        <div className="flex items-center justify-between px-2 py-1 overflow-x-auto no-scrollbar">
           {navItems.map((item) => {
             const Icon = item.icon;
             const isActive = activeTab === item.id;
             return (
               <button
                 key={item.id}
                 onClick={() => setActiveTab(item.id as TabType)}
                 className={`flex flex-col items-center justify-center min-w-[70px] py-2 px-1 rounded-lg transition-all ${
                   isActive ? 'text-finz-accent' : 'text-slate-500 dark:text-gray-500'
                 }`}
               >
                 <Icon className={`w-6 h-6 mb-1 ${isActive ? 'fill-current bg-finz-accent/10 p-0.5 rounded' : ''}`} strokeWidth={isActive ? 2.5 : 2} />
                 <span className="text-[10px] font-medium whitespace-nowrap">{item.label}</span>
               </button>
             );
           })}
        </div>
      </nav>
    </div>
  );
};

export default Layout;
