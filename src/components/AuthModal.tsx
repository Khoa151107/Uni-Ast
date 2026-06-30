import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, User as UserIcon, Lock, Sparkles, Smile, ArrowRight } from 'lucide-react';

export default function AuthModal() {
  const {
    showAuthModal,
    setShowAuthModal,
    authModalTab,
    setAuthModalTab,
    login,
    register,
  } = useAuth();

  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!showAuthModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (authModalTab === 'login') {
      const res = login(username, password);
      if (res.success) {
        setSuccessMsg('Đăng nhập thành công! 🎉');
        setTimeout(() => {
          setShowAuthModal(false);
          resetForm();
        }, 1500);
      } else {
        setError(res.error || 'Có lỗi xảy ra.');
      }
    } else {
      const res = register(username, fullName, password);
      if (res.success) {
        setSuccessMsg('Đăng ký tài khoản mới thành công! Chào mừng bạn! 🎉');
        setTimeout(() => {
          setShowAuthModal(false);
          resetForm();
        }, 1800);
      } else {
        setError(res.error || 'Có lỗi xảy ra.');
      }
    }
  };

  const resetForm = () => {
    setUsername('');
    setFullName('');
    setPassword('');
    setError(null);
    setSuccessMsg(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      {/* Modal Container */}
      <div className="w-full max-w-md bg-white border-2 border-[#FF6A00] p-6 space-y-6 relative rounded-none shadow-[4px_4px_0px_0px_rgba(255,106,0,0.15)]">
        
        {/* Close Button */}
        <button
          onClick={() => {
            setShowAuthModal(false);
            resetForm();
          }}
          className="absolute top-4 right-4 p-1 text-slate-400 hover:text-[#FF6A00] hover:bg-[#FFF5EE] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="text-center space-y-1">
          <div className="inline-flex p-2 bg-[#FFF5EE] text-[#FF6A00] border border-[#FF6A00]/20 mb-1">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-display font-bold text-[#0A1128] leading-relaxed">
            {authModalTab === 'login' ? 'Đăng Nhập Sinh Viên' : 'Tạo Tài Khoản Mới'}
          </h3>
          <p className="text-[11px] text-slate-500 font-sans italic">
            {authModalTab === 'login' 
              ? 'Đồng bộ bài viết diễn đàn và danh sách việc cần làm của riêng bạn.' 
              : 'Tham gia mạng lưới thích ứng FUDA Đà Nẵng ngay hôm nay.'}
          </p>
        </div>

        {/* Tab Header Selector */}
        <div className="flex border border-[#FF6A00]/20 p-1 bg-[#FFF5EE]/30 rounded-none">
          <button
            onClick={() => {
              setAuthModalTab('login');
              setError(null);
            }}
            className={`flex-1 py-2 text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
              authModalTab === 'login'
                ? 'bg-[#FF6A00] text-white'
                : 'bg-transparent text-slate-500 hover:text-[#FF6A00]'
            }`}
          >
            Đăng nhập
          </button>
          <button
            onClick={() => {
              setAuthModalTab('register');
              setError(null);
            }}
            className={`flex-1 py-2 text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
              authModalTab === 'register'
                ? 'bg-[#FF6A00] text-white'
                : 'bg-transparent text-slate-500 hover:text-[#FF6A00]'
            }`}
          >
            Đăng ký
          </button>
        </div>

        {/* Alert Notifications */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 text-[11px] p-2.5 font-sans italic text-center">
            ⚠️ {error}
          </div>
        )}
        {successMsg && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] p-2.5 font-bold text-center animate-pulse">
            {successMsg}
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Full Name (Only for Register) */}
          {authModalTab === 'register' && (
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0A1128] block">
                Họ và tên của bạn
              </label>
              <div className="relative">
                <Smile className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Văn A..."
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 border border-[#FF6A00]/20 rounded-none text-xs focus:outline-none focus:border-[#FF6A00] focus:ring-1 focus:ring-[#FF6A00] bg-white font-sans italic"
                />
              </div>
            </div>
          )}

          {/* Username Input */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0A1128] block">
              Tên đăng nhập
            </label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                placeholder="Nhập tên đăng nhập viết liền không dấu..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 border border-[#FF6A00]/20 rounded-none text-xs focus:outline-none focus:border-[#FF6A00] focus:ring-1 focus:ring-[#FF6A00] bg-white font-mono"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0A1128] block">
              Mật khẩu bảo mật
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input
                type="password"
                required
                placeholder="Nhập mật khẩu của bạn..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 border border-[#FF6A00]/20 rounded-none text-xs focus:outline-none focus:border-[#FF6A00] focus:ring-1 focus:ring-[#FF6A00] bg-white"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-[#FF6A00] hover:bg-[#E05C00] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-all cursor-pointer shadow-none"
          >
            <span>{authModalTab === 'login' ? 'Đăng Nhập Ngay' : 'Kích Hoạt Tài Khoản'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Bottom Switch Tab */}
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => {
              setAuthModalTab(authModalTab === 'login' ? 'register' : 'login');
              setError(null);
            }}
            className="text-[11px] text-[#FF6A00] hover:underline font-sans italic"
          >
            {authModalTab === 'login' 
              ? 'Bạn chưa có tài khoản? Đăng ký tại đây' 
              : 'Bạn đã có tài khoản rồi? Đăng nhập ngay'}
          </button>
        </div>

      </div>
    </div>
  );
}
