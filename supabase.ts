/**
 * Database Types cho Supabase
 * 
 * File này chứa các type definitions cho database schema.
 * Để generate types tự động từ Supabase, chạy lệnh:
 * 
 * npx supabase gen types typescript --project-id YOUR_PROJECT_ID > supabase.ts
 * 
 * Hoặc sử dụng Supabase CLI:
 * supabase gen types typescript --local > supabase.ts
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      // Bảng Projects
      projects: {
        Row: {
          id: string
          name: string
          logo_url: string
          strengths: string[]
          register_link: string
          group_link: string
          contact_phone: string
          short_description: string
          popup_content: string
          priority: number
          enabled: boolean
          commission_policy: string | null
          conditions: string | null
          tab_1_title: string | null
          tab_1_content: string | null
          tab_2_title: string | null
          tab_2_content: string | null
          tab_3_title: string | null
          tab_3_content: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          logo_url: string
          strengths: string[]
          register_link: string
          group_link: string
          contact_phone: string
          short_description: string
          popup_content: string
          priority: number
          enabled?: boolean
          commission_policy?: string | null
          conditions?: string | null
          tab_1_title?: string | null
          tab_1_content?: string | null
          tab_2_title?: string | null
          tab_2_content?: string | null
          tab_3_title?: string | null
          tab_3_content?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          logo_url?: string
          strengths?: string[]
          register_link?: string
          group_link?: string
          contact_phone?: string
          short_description?: string
          popup_content?: string
          priority?: number
          enabled?: boolean
          commission_policy?: string | null
          conditions?: string | null
          tab_1_title?: string | null
          tab_1_content?: string | null
          tab_2_title?: string | null
          tab_2_content?: string | null
          tab_3_title?: string | null
          tab_3_content?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      // Bảng News
      news: {
        Row: {
          id: string
          title: string
          summary: string
          content: string | null
          date: string
          category: 'News' | 'Knowledge' | 'Policy'
          image_url: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          summary: string
          content?: string | null
          date: string
          category: 'News' | 'Knowledge' | 'Policy'
          image_url: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          summary?: string
          content?: string | null
          date?: string
          category?: 'News' | 'Knowledge' | 'Policy'
          image_url?: string
          created_at?: string
          updated_at?: string
        }
      }
      // Bảng Channel Resources
      channel_resources: {
        Row: {
          id: string
          title: string
          description: string
          type: 'GUIDE' | 'RESOURCE' | 'SCRIPT'
          link_url: string | null
          content: string | null
          icon_name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          type: 'GUIDE' | 'RESOURCE' | 'SCRIPT'
          link_url?: string | null
          content?: string | null
          icon_name?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          type?: 'GUIDE' | 'RESOURCE' | 'SCRIPT'
          link_url?: string | null
          content?: string | null
          icon_name?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      // Bảng Landing Page Templates
      landing_page_templates: {
        Row: {
          id: string
          title: string
          description: string
          image_url: string
          demo_url: string | null
          category: 'Finance' | 'Insurance' | 'General'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          image_url: string
          demo_url?: string | null
          category: 'Finance' | 'Insurance' | 'General'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          image_url?: string
          demo_url?: string | null
          category?: 'Finance' | 'Insurance' | 'General'
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}


