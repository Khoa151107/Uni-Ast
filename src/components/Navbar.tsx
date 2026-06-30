import React from 'react';
import { ActiveView } from '../types';
import { Sparkles, MessageSquare, GraduationCap, Users, Compass, ShieldAlert, Award, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';

interface NavbarProps {
  currentView: ActiveView;
  setView: (view: ActiveView) => void;
}

export default function Navbar({ currentView, setView }: NavbarProps) {
  const { currentUser, logout, setShowAuthModal, setAuthModalTab } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white/75 backdrop-blur-md border-b border-white/40 shadow-sm transition-all font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2.5 cursor-pointer group"
            onClick={() => setView('home')}
            id="nav-logo"
          >
            <Logo className="h-10 sm:h-12 w-auto" showText={true} />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-2">
            {[
              { id: 'study-shock', label: 'HỌC TẬP', icon: GraduationCap, color: '#FF9C2A' },
              { id: 'extra-shock', label: 'NGOẠI KHÓA', icon: Compass, color: '#FF9C2A' },
              { id: 'social-shock', label: 'XÃ HỘI', icon: Users, color: '#FF9C2A' },
              { id: 'psych-shock', label: 'TÂM LÝ & SỨC KHỎE', icon: ShieldAlert, color: '#FF9C2A' },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => setView(item.id as ActiveView)}
                  className={`flex items-center px-3.5 py-2 rounded-xl transition-all duration-100 text-[10.5px] font-bold tracking-wide ${
                    isActive
                      ? 'bg-orange-500 text-white shadow-md shadow-orange-500/15'
                      : 'text-slate-700 hover:text-orange-500 hover:bg-orange-500/5'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 mr-1.5 ${isActive ? 'text-white' : 'text-orange-500'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right side CTA / Forum / Quiz / User Auth */}
          <div className="flex items-center space-x-2">
            <button
              id="nav-forum"
              onClick={() => setView('forum')}
              className={`flex items-center px-3.5 py-2 rounded-xl transition-all text-[10.5px] font-bold tracking-wide ${
                currentView === 'forum'
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/15'
                  : 'text-slate-700 hover:text-orange-500 hover:bg-orange-500/5'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
              DIỄN ĐÀN
            </button>
            
            <button
              id="nav-quiz"
              onClick={() => setView('quiz')}
              className="relative group hidden sm:flex items-center bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-4 py-2 text-[10.5px] font-bold tracking-wide uppercase transition-all rounded-xl shadow-md shadow-orange-500/20"
            >
              <Award className="w-3.5 h-3.5 mr-1.5 animate-pulse" />
              LÀM QUIZ
            </button>

            {/* Profile Avatar & Info or Login Button */}
            {currentUser ? (
              <div className="flex items-center space-x-1.5 border border-slate-200/80 p-1 bg-white/80 backdrop-blur-md rounded-xl shadow-sm">
                <img
                  src={currentUser.avatarSeed}
                  alt={currentUser.fullName}
                  className="w-7 h-7 bg-white border border-slate-100 rounded-lg shrink-0"
                  title={`Tài khoản: ${currentUser.fullName} (@${currentUser.username})`}
                />
                <span className="text-[10.5px] font-bold text-slate-700 px-1 hidden lg:inline max-w-[85px] truncate">
                  {currentUser.fullName}
                </span>
                <button
                  onClick={logout}
                  className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                  title="Đăng xuất"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setAuthModalTab('login');
                  setShowAuthModal(true);
                }}
                className="flex items-center px-3.5 py-2 border border-orange-500/30 hover:bg-orange-500/10 text-orange-600 text-[10.5px] font-bold tracking-wide transition-all uppercase cursor-pointer rounded-xl"
                title="Đăng nhập tài khoản"
              >
                <User className="w-3.5 h-3.5 sm:mr-1.5 text-orange-500" />
                <span className="hidden sm:inline">ĐĂNG NHẬP</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
