
import React, { useState } from 'react';
import { Project } from '../types';
import { X, CheckCircle2, ChevronDown, ChevronUp, Users } from 'lucide-react';

interface ProjectPopupProps {
  project: Project;
  onClose: () => void;
}

const ProjectPopup: React.FC<ProjectPopupProps> = ({ project, onClose }) => {
  const [openTabIndex, setOpenTabIndex] = useState<number | null>(null);

  const toggleTab = (index: number) => {
    setOpenTabIndex(openTabIndex === index ? null : index);
  };

  const tabs = [
    { title: project.tab_1_title, content: project.tab_1_content },
    { title: project.tab_2_title, content: project.tab_2_content },
    { title: project.tab_3_title, content: project.tab_3_content },
  ].filter(tab => tab.title && tab.content); // Only show tabs that have data

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div 
        className="w-full sm:max-w-lg bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-t-2xl sm:rounded-2xl max-h-[95vh] overflow-hidden flex flex-col shadow-2xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Popup Header */}
        <div className="p-5 border-b border-gray-200 dark:border-slate-800 flex justify-between items-center bg-gray-50 dark:bg-slate-800/50">
          <div className="flex items-center space-x-3">
            <img src={project.logo_url} alt="Logo" className="w-12 h-12 rounded-full border-2 border-finz-accent" />
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">{project.name}</h2>
              <p className="text-xs text-slate-500 dark:text-gray-400">Thông tin chi tiết dự án</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 bg-gray-200 dark:bg-white/5 rounded-full hover:bg-gray-300 dark:hover:bg-white/10 text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Popup Content */}
        <div className="p-5 overflow-y-auto custom-scrollbar flex-1 space-y-6 bg-white dark:bg-slate-900">
          
          {/* Highlights Section */}
          <div className="bg-finz-accent/10 border border-finz-accent/20 p-4 rounded-xl">
            <h4 className="text-finz-accent font-bold mb-3 text-sm uppercase tracking-wider border-b border-finz-accent/20 pb-2">ĐIỂM NỔI BẬT CỦA DỰ ÁN</h4>
            <div className="grid grid-cols-1 gap-2">
              {project.strengths.map((s, i) => (
                <div key={i} className="flex items-start text-sm text-slate-700 dark:text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-finz-accent mr-2 mt-0.5 shrink-0"/>
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Collapsible Tabs (Accordions) */}
          {tabs.length > 0 && (
            <div className="space-y-2">
              {tabs.map((tab, idx) => (
                <div key={idx} className="border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden">
                  <button 
                    onClick={() => toggleTab(idx)}
                    className="w-full flex justify-between items-center p-3 bg-gray-50 dark:bg-slate-800/50 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <span className="font-semibold text-sm text-slate-800 dark:text-white">{tab.title}</span>
                    {openTabIndex === idx ? (
                      <ChevronUp className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    )}
                  </button>
                  {openTabIndex === idx && (
                    <div className="p-3 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700 text-sm text-slate-600 dark:text-gray-300 whitespace-pre-line leading-relaxed animate-fade-in">
                      {tab.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* General Detail Content */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-semibold mb-2 text-sm uppercase tracking-wider">Mô tả chi tiết</h4>
            <p className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-line">{project.popup_content}</p>
          </div>

          {project.commission_policy && (
            <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded-xl border border-green-100 dark:border-green-900/30">
              <h4 className="text-green-700 dark:text-green-400 font-bold mb-2 text-sm uppercase tracking-wider">Chính sách hoa hồng</h4>
              <div className="text-slate-700 dark:text-gray-300 text-sm whitespace-pre-line">{project.commission_policy}</div>
            </div>
          )}
        </div>
        
        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
             {/* Register Button */}
            <a href={project.register_link} target="_blank" rel="noreferrer" className="flex items-center justify-center py-2.5 bg-finz-accent text-white rounded-xl font-bold hover:bg-sky-600 transition-all shadow-md text-sm">
              Đăng ký ngay
            </a>
            {/* Zalo Support */}
            <a 
              href={`https://zalo.me/${project.contact_phone}`} 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center justify-center py-2.5 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400 rounded-xl font-bold hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all text-sm"
            >
              Liên hệ Admin
            </a>
          </div>
          
          {/* Join Group Button */}
          <a 
            href={project.group_link} 
            target="_blank" 
            rel="noreferrer"
            className="w-full flex items-center justify-center py-2.5 bg-finz-secondary hover:bg-slate-700 text-white rounded-xl font-bold transition-all shadow-sm text-sm"
          >
             <Users className="w-4 h-4 mr-2" /> Tham gia Group Hỗ Trợ
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectPopup;
