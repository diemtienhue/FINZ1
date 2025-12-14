
export interface Project {
  id: string;
  name: string;
  logo_url: string;
  strengths: string[];
  register_link: string;
  group_link: string;
  contact_phone: string;
  short_description: string;
  popup_content: string; // HTML or Markdown string
  priority: number;
  enabled: boolean;
  commission_policy?: string;
  conditions?: string;
  
  // New fields for 3 expandable tabs
  tab_1_title?: string;
  tab_1_content?: string;
  tab_2_title?: string;
  tab_2_content?: string;
  tab_3_title?: string;
  tab_3_content?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content?: string; // Full content
  date: string;
  category: 'News' | 'Knowledge' | 'Policy';
  imageUrl: string;
}

export interface ChannelResource {
  id: string;
  title: string;
  description: string;
  type: 'GUIDE' | 'RESOURCE' | 'SCRIPT';
  link_url?: string; // For external drive/docs links
  content?: string; // For inline reading
  icon_name?: string; // e.g., 'FileText', 'Video', 'Image'
}

export interface LandingPageTemplate {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  demoUrl?: string; // Link to preview the template
  category: 'Finance' | 'Insurance' | 'General';
}

export type TabType = 'HOME' | 'CALCULATOR' | 'DTI' | 'BUILD_CHANNEL' | 'LANDING_PAGE' | 'NEWS' | 'ADMIN' | 'SUPABASE_TEST';

export interface CalculatorResult {
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
  breakdown: {
    month: number;
    principal: number;
    interest: number;
    balance: number;
  }[];
}
