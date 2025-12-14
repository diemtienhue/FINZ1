import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { CheckCircle2, XCircle, Loader2, AlertCircle } from 'lucide-react';

const SupabaseTest: React.FC = () => {
  const [status, setStatus] = useState<'checking' | 'success' | 'error' | 'warning'>('checking');
  const [message, setMessage] = useState<string>('');
  const [details, setDetails] = useState<any>(null);

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      // Kiểm tra env variables
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseKey) {
        setStatus('error');
        setMessage('❌ Thiếu cấu hình Supabase!');
        setDetails({
          url: supabaseUrl ? '✅ Đã cấu hình' : '❌ Chưa cấu hình',
          key: supabaseKey ? '✅ Đã cấu hình' : '❌ Chưa cấu hình',
          hint: 'Vui lòng thêm VITE_SUPABASE_URL và VITE_SUPABASE_ANON_KEY vào file .env.local'
        });
        return;
      }

      // Test 1: Kiểm tra kết nối cơ bản
      setMessage('Đang kiểm tra kết nối...');
      
      const { data, error } = await supabase
        .from('projects')
        .select('count')
        .limit(1);

      if (error) {
        // Một số lỗi vẫn có nghĩa là kết nối thành công (chỉ là bảng chưa tồn tại)
        if (error.code === 'PGRST116' || 
            error.code === '42P01' || 
            error.message.includes('relation') || 
            error.message.includes('does not exist')) {
          setStatus('warning');
          setMessage('✅ Kết nối thành công! (Bảng chưa tồn tại)');
          setDetails({
            connection: '✅ Thành công',
            tables: '⚠️ Chưa tạo bảng',
            action: 'Chạy SQL scripts trong SUPABASE_SETUP.md để tạo bảng'
          });
        } else {
          setStatus('error');
          setMessage('❌ Lỗi kết nối: ' + error.message);
          setDetails({
            code: error.code,
            message: error.message,
            hint: error.message.includes('fetch') 
              ? 'Kiểm tra lại SUPABASE_URL có đúng không' 
              : 'Kiểm tra lại cấu hình Supabase'
          });
        }
        return;
      }

      // Test 2: Kiểm tra Auth
      const { data: { session }, error: authError } = await supabase.auth.getSession();

      setStatus('success');
      setMessage('✅ Kết nối Supabase thành công!');
      setDetails({
        connection: '✅ Thành công',
        auth: authError ? '⚠️ ' + authError.message : '✅ Hoạt động bình thường',
        session: session ? 'Đã đăng nhập' : 'Chưa đăng nhập (OK)',
        tables: data ? '✅ Có thể truy vấn database' : '✅ Kết nối OK'
      });

    } catch (err: any) {
      setStatus('error');
      setMessage('❌ Lỗi: ' + err.message);
      setDetails({
        error: err.message,
        hint: err.message.includes('fetch') 
          ? 'Kiểm tra lại SUPABASE_URL hoặc kết nối internet' 
          : 'Kiểm tra lại cấu hình'
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-xl">
      <div className="flex items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center">
          <AlertCircle className="w-6 h-6 mr-2 text-finz-accent" />
          Kiểm tra kết nối Supabase
        </h2>
      </div>

      <div className="space-y-4">
        {/* Status Indicator */}
        <div className={`p-4 rounded-xl border-2 ${
          status === 'checking' ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' :
          status === 'success' ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' :
          status === 'warning' ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800' :
          'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
        }`}>
          <div className="flex items-center space-x-3">
            {status === 'checking' && <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />}
            {status === 'success' && <CheckCircle2 className="w-5 h-5 text-green-500" />}
            {status === 'warning' && <AlertCircle className="w-5 h-5 text-yellow-500" />}
            {status === 'error' && <XCircle className="w-5 h-5 text-red-500" />}
            <p className={`font-semibold ${
              status === 'checking' ? 'text-blue-700 dark:text-blue-300' :
              status === 'success' ? 'text-green-700 dark:text-green-300' :
              status === 'warning' ? 'text-yellow-700 dark:text-yellow-300' :
              'text-red-700 dark:text-red-300'
            }`}>
              {message}
            </p>
          </div>
        </div>

        {/* Details */}
        {details && (
          <div className="bg-gray-50 dark:bg-slate-900/50 p-4 rounded-xl">
            <h3 className="text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Chi tiết:</h3>
            <ul className="space-y-1 text-sm text-slate-600 dark:text-gray-400">
              {Object.entries(details).map(([key, value]) => (
                <li key={key} className="flex items-start">
                  <span className="font-medium mr-2">{key}:</span>
                  <span>{String(value)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Config Info */}
        <div className="bg-gray-50 dark:bg-slate-900/50 p-4 rounded-xl">
          <h3 className="text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Thông tin cấu hình:</h3>
          <div className="space-y-1 text-xs text-slate-600 dark:text-gray-400 font-mono">
            <div>
              <span className="font-medium">URL:</span>{' '}
              {import.meta.env.VITE_SUPABASE_URL 
                ? `${import.meta.env.VITE_SUPABASE_URL.substring(0, 40)}...` 
                : '❌ Chưa cấu hình'}
            </div>
            <div>
              <span className="font-medium">Key:</span>{' '}
              {import.meta.env.VITE_SUPABASE_ANON_KEY 
                ? `${import.meta.env.VITE_SUPABASE_ANON_KEY.substring(0, 20)}...` 
                : '❌ Chưa cấu hình'}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={testConnection}
          className="w-full px-4 py-2 bg-finz-accent hover:bg-sky-600 text-white rounded-lg font-semibold transition shadow-lg"
        >
          🔄 Kiểm tra lại
        </button>
      </div>
    </div>
  );
};

export default SupabaseTest;


