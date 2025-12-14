import React, { useState } from 'react';
import { Lock, User, Key, ArrowLeft } from 'lucide-react';
import { ADMIN_CREDENTIALS } from '../constants';

interface LoginPageProps {
  onLoginSuccess: () => void;
  onBack: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onBack }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      onLoginSuccess();
    } else {
      setError('Tên đăng nhập hoặc mật khẩu không chính xác');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 overflow-hidden animate-slide-up">
        
        <div className="bg-finz-primary p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-finz-accent/10"></div>
          <div className="relative z-10">
            <div className="mx-auto w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm border border-white/20">
              <Lock className="w-8 h-8 text-finz-accent" />
            </div>
            <h2 className="text-2xl font-bold text-white">Admin Portal</h2>
            <p className="text-gray-400 text-sm mt-1">Đăng nhập hệ thống quản trị FinZ</p>
          </div>
        </div>

        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Tài khoản</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-finz-accent transition-colors"
                  placeholder="Nhập username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Mật khẩu</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Key className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-finz-accent transition-colors"
                  placeholder="Nhập password"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm rounded-lg text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg shadow-sky-500/20 text-sm font-bold text-white bg-finz-accent hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-finz-accent transition-all transform hover:-translate-y-0.5"
            >
              Đăng nhập Dashboard
            </button>

            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={onBack}
                className="text-sm text-slate-500 dark:text-gray-400 hover:text-finz-accent dark:hover:text-white flex items-center justify-center mx-auto transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-1" /> Quay lại trang chủ
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;