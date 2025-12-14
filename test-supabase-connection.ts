/**
 * Script test kết nối Supabase
 * Chạy: npx tsx test-supabase-connection.ts
 * Hoặc: node --loader tsx test-supabase-connection.ts
 */

import { supabase } from './supabaseClient';

async function testConnection() {
  console.log('🔍 Đang kiểm tra kết nối Supabase...\n');
  
  // Kiểm tra env variables
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  console.log('📋 Thông tin cấu hình:');
  console.log('   URL:', supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : '❌ CHƯA CẤU HÌNH');
  console.log('   Key:', supabaseKey ? `${supabaseKey.substring(0, 20)}...` : '❌ CHƯA CẤU HÌNH');
  console.log('');
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ LỖI: Thiếu cấu hình Supabase!');
    console.log('   Vui lòng thêm vào file .env.local:');
    console.log('   VITE_SUPABASE_URL=your_url');
    console.log('   VITE_SUPABASE_ANON_KEY=your_key');
    process.exit(1);
  }
  
  // Test 1: Kiểm tra kết nối cơ bản
  console.log('🧪 Test 1: Kiểm tra kết nối cơ bản...');
  try {
    const { data, error } = await supabase.from('projects').select('count').limit(1);
    
    if (error) {
      if (error.code === 'PGRST116') {
        console.log('   ✅ Kết nối thành công! (Bảng projects chưa tồn tại - cần tạo schema)');
      } else if (error.code === '42P01') {
        console.log('   ✅ Kết nối thành công! (Bảng projects chưa tồn tại - cần tạo schema)');
      } else if (error.message.includes('relation') || error.message.includes('does not exist')) {
        console.log('   ✅ Kết nối thành công! (Bảng chưa tồn tại - cần tạo schema)');
        console.log('   💡 Chạy SQL scripts trong SUPABASE_SETUP.md để tạo bảng');
      } else {
        console.error('   ❌ Lỗi:', error.message);
        console.error('   Code:', error.code);
      }
    } else {
      console.log('   ✅ Kết nối thành công! Có thể truy vấn database.');
    }
  } catch (err: any) {
    console.error('   ❌ Lỗi kết nối:', err.message);
    if (err.message.includes('fetch')) {
      console.error('   💡 Kiểm tra lại SUPABASE_URL có đúng không');
    }
    process.exit(1);
  }
  
  console.log('');
  
  // Test 2: Kiểm tra auth
  console.log('🧪 Test 2: Kiểm tra Auth service...');
  try {
    const { data: { session } } = await supabase.auth.getSession();
    console.log('   ✅ Auth service hoạt động bình thường');
    console.log('   Session:', session ? 'Đã đăng nhập' : 'Chưa đăng nhập (OK)');
  } catch (err: any) {
    console.error('   ❌ Lỗi Auth:', err.message);
  }
  
  console.log('');
  console.log('✅ Tất cả test đã hoàn thành!');
  console.log('');
  console.log('📝 Bước tiếp theo:');
  console.log('   1. Nếu bảng chưa tồn tại, chạy SQL scripts trong SUPABASE_SETUP.md');
  console.log('   2. Bắt đầu sử dụng Supabase trong code của bạn!');
}

// Chạy test
testConnection().catch(console.error);


