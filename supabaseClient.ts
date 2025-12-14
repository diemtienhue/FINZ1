import { createClient } from '@supabase/supabase-js';

// Lấy các biến môi trường từ import.meta.env (Vite)
// TypeScript sẽ nhận diện types từ vite-env.d.ts
const supabaseUrl: string = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey: string = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Kiểm tra nếu thiếu thông tin cấu hình
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '⚠️ Supabase configuration missing!\n' +
    'Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.\n' +
    'See .env.example for reference.'
  );
}

// Tạo Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'x-client-info': 'finz-ecosystem@1.0.0'
    }
  }
});

// Export type helpers
export type { Database } from './supabase';

