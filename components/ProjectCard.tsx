
import React, { useState } from 'react';
import { Project } from '../types';
import { Info, Users, ExternalLink, Star, ArrowRight, Sparkles } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onOpenPopup: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenPopup }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Requirement: Filter top 3 important criteria for the card view
  const displayStrengths = project.strengths.slice(0, 3);

  return (
    <div 
      className="relative flex flex-col h-full bg-white dark:bg-slate-800/80 backdrop-blur-sm border border-gray-100 dark:border-white/10 rounded-3xl p-5 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className="flex items-start space-x-4 mb-5">
        <div className="relative">
           <img 
            src={project.logo_url} 
            alt={project.name} 
            className="w-14 h-14 rounded-2xl object-cover border border-gray-100 dark:border-white/10 shadow-md flex-shrink-0"
          />
          <div className="absolute -bottom-1 -right-1 bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white dark:border-slate-800">
            HOT
          </div>
        </div>
        
        <div className="flex-1 min-w-0 pt-1">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white truncate pr-2">{project.name}</h3>
          
          {/* Star Rating System */}
          <div className="flex items-center mt-1 space-x-1">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-xs font-semibold text-slate-400 dark:text-gray-500 ml-1">(5.0)</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent mb-5"></div>

      {/* Strengths (Top 3 Only) */}
      <div className="flex-1 mb-6">
        <ul className="space-y-3">
          {displayStrengths.map((s, idx) => (
            <li key={idx} className="flex items-start text-sm text-slate-600 dark:text-gray-300 group/item">
              <div className="mt-0.5 mr-3 p-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400 group-hover/item:bg-blue-100 transition-colors">
                 <Sparkles className="w-2.5 h-2.5" />
              </div>
              <span className="leading-snug">{s}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Desktop Hover Preview (Tooltip style) */}
      {isHovered && (
        <div className="hidden lg:block absolute -top-16 left-1/2 -translate-x-1/2 w-64 bg-slate-900 text-white p-3 rounded-xl shadow-xl z-20 pointer-events-none animate-fade-in text-center">
          <p className="text-xs leading-relaxed line-clamp-2">{project.short_description}</p>
          <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 rotate-45"></div>
        </div>
      )}

      {/* Actions */}
      <div className="mt-auto space-y-3">
        {/* Primary Actions Grid */}
        <div className="grid grid-cols-2 gap-3">
          <a 
            href={project.register_link} 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center justify-center py-2.5 px-3 bg-gradient-to-r from-finz-accent to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-blue-500/20 active:scale-95"
          >
            <ExternalLink className="w-3.5 h-3.5 mr-1.5" /> Đăng ký
          </a>
          <a 
            href={project.group_link} 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center justify-center py-2.5 px-3 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-700 dark:text-white text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-600 transition-all active:scale-95"
          >
            <Users className="w-3.5 h-3.5 mr-1.5" /> Group
          </a>
        </div>
        
        {/* "Learn More" Button - Designed with Depth */}
        <button 
          onClick={() => onOpenPopup(project)}
          className="group/btn relative w-full flex items-center justify-between py-3 px-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl shadow-sm hover:shadow-md hover:border-finz-accent/50 dark:hover:border-finz-accent/50 transition-all duration-300 overflow-hidden"
        >
          {/* Subtle background gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-finz-accent/5 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
          
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-finz-accent/10 flex items-center justify-center mr-3 group-hover/btn:scale-110 transition-transform">
               <Info className="w-4 h-4 text-finz-accent" />
            </div>
            <span className="text-sm font-bold text-slate-700 dark:text-gray-200 group-hover/btn:text-finz-accent transition-colors">
              Tìm hiểu thêm dự án
            </span>
          </div>
          
          <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover/btn:bg-finz-accent group-hover/btn:text-white transition-all">
             <ArrowRight className="w-3 h-3" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
