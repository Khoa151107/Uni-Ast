import React from 'react';
import { ActiveView } from '../types';
import Logo from './Logo';

interface FooterProps {
  setView: (view: ActiveView) => void;
}

export default function Footer({ setView }: FooterProps) {
  return (
    <footer className="bg-white/40 backdrop-blur-md border-t border-slate-200/40 mt-auto py-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Logo Brand */}
          <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => setView('home')}>
            <Logo className="h-10 sm:h-12 w-auto" showText={true} />
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-6 text-[10.5px] font-bold uppercase tracking-wide text-slate-700">
            <button onClick={() => setView('study-shock')} className="hover:text-orange-500 transition-colors">Sốc Học Tập</button>
            <button onClick={() => setView('extra-shock')} className="hover:text-orange-500 transition-colors">Sốc Ngoại Khóa</button>
            <button onClick={() => setView('social-shock')} className="hover:text-orange-500 transition-colors">Sốc Xã Hội</button>
            <button onClick={() => setView('psych-shock')} className="hover:text-orange-500 transition-colors">Sốc Tâm Lý</button>
            <button onClick={() => setView('forum')} className="hover:text-orange-500 transition-colors">Diễn Đàn SV</button>
            <button onClick={() => setView('quiz')} className="hover:text-orange-500 transition-colors underline font-bold normal-case text-xs text-orange-500">Trắc Nghiệm Sốc ↗</button>
          </div>
        </div>

        <div className="border-t border-slate-200/40 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] tracking-wider text-slate-500">
          <p>
            &copy; 2026 Uni-Assistance. Crafted for FPTU Students.
          </p>
          
          <div className="flex space-x-12 mt-4 sm:mt-0 items-end">
            <div className="flex flex-col items-end">
              <span className="text-[8px] uppercase font-bold tracking-widest mb-1 italic text-slate-400">READ & LEARN</span>
              <div className="h-1 w-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
