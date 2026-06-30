import React from 'react';
import { ActiveView } from '../types';
import { BookOpen, Users, Heart, ArrowRight, Award, Compass } from 'lucide-react';
import { motion } from 'motion/react';
import AntigravityCanvas from './AntigravityCanvas';

interface HomeViewProps {
  setView: (view: ActiveView) => void;
}

export default function HomeView({ setView }: HomeViewProps) {
  const stars = [
    { top: '12%', left: '8%', size: 2, delay: 0 },
    { top: '22%', left: '42%', size: 3, delay: 1.2 },
    { top: '78%', left: '18%', size: 2, delay: 0.7 },
    { top: '65%', left: '85%', size: 2.5, delay: 2.0 },
    { top: '38%', left: '92%', size: 1.5, delay: 0.9 },
    { top: '82%', left: '48%', size: 3, delay: 1.5 },
  ];

  return (
    <div className="space-y-16 pb-16 animate-fade-in font-sans text-lg">
      {/* Hero Banner Section with Antigravity space theme */}
      <section 
        className="relative overflow-hidden bg-white/70 border border-white/40 text-black p-8 sm:p-12 md:p-16 mt-6 rounded-3xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-lg shadow-orange-500/5 backdrop-blur-md"
        style={{
          backgroundImage: 'linear-gradient(rgba(249, 115, 22, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(249, 115, 22, 0.02) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      >
        {/* Dynamic interactive background canvas */}
        <AntigravityCanvas />

        {/* Antigravity floating gradient background meshes */}
        <motion.div
          className="absolute top-0 left-0 w-80 h-80 rounded-full bg-indigo-600/5 blur-[90px] pointer-events-none"
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -30, 20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-violet-600/5 blur-[100px] pointer-events-none"
          animate={{
            x: [0, -50, 30, 0],
            y: [0, 40, -30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Floating quantum/star particles */}
        {stars.map((star, idx) => (
          <motion.div
            key={idx}
            className="absolute bg-orange-500 rounded-full pointer-events-none"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              boxShadow: '0 0 6px rgba(255, 156, 42, 0.6)',
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: 3 + idx % 3,
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Content columns */}
        <div className="lg:col-span-7 space-y-6 relative z-10">
          <span className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase text-orange-600">
            [ UNIVERSITY ADAPTATION SYSTEM ]
          </span>
          <h1 className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter leading-none text-orange-500 uppercase mb-4">
            <span className="block neo-text-shadow mb-1">UNI</span>
            <span className="block neo-text-shadow">ASSISTANCE</span>
          </h1>
          <p className="text-base text-slate-700 leading-relaxed max-w-lg mt-4 font-sans">
            Hành trang thích ứng toàn diện dành riêng cho tân sinh viên Đại học FPT. Vượt qua những cú sốc đầu đời, chủ động học tập và thăng hoa tại FUDA Đà Nẵng.
          </p>
          <div className="pt-4 flex flex-wrap gap-4">
            <button
              onClick={() => setView('quiz')}
              className="flex items-center justify-center px-6 py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 font-bold tracking-wide text-white uppercase text-[10px] transition-all cursor-pointer rounded-xl shadow-md shadow-orange-500/20 active:scale-95"
            >
              Làm bài đánh giá ngay
              <ArrowRight className="w-3.5 h-3.5 ml-2" />
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('discover-categories');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center justify-center px-6 py-3.5 bg-white/60 hover:bg-orange-500/5 font-bold tracking-wide text-orange-600 hover:text-orange-700 border border-orange-500/25 uppercase text-[10px] transition-all cursor-pointer rounded-xl"
            >
              Khám phá thêm
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col h-full justify-center relative z-10">
          <motion.div 
            whileHover={{ y: -4, scale: 1.01 }}
            className="bg-white/80 border border-slate-200/50 flex flex-col justify-between p-8 relative min-h-[260px] rounded-2xl shadow-sm shadow-orange-500/5 backdrop-blur-md"
          >
            <div className="space-y-4 pt-4">
              <span className="text-[10px] font-bold tracking-widest text-orange-600 uppercase">ESTABLISHED 2026</span>
              <h3 className="text-3xl sm:text-4xl font-display font-black text-orange-500 leading-none uppercase tracking-tighter neo-text-shadow mb-2">FUDA LIFE</h3>
              <p className="text-sm leading-relaxed text-slate-600 italic font-sans">
                A structured study of adaptation, social integration, and mental stamina in a high-octane academic environment.
              </p>
            </div>
            <div className="h-[1px] bg-slate-200/60 mt-6"></div>
          </motion.div>
        </div>
      </section>

      {/* Core Columns Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-slate-800">
        {/* Card 1: Học tập hiệu quả */}
        <div 
          onClick={() => setView('study-shock')}
          className="group cursor-pointer bg-white/60 p-6 border-3 border-slate-950 rounded-xl shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-1.5 transition-all duration-300 backdrop-blur-md flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-xl border-3 border-slate-950 bg-orange-500 flex items-center justify-center text-white mb-6 group-hover:scale-105 transition-transform shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-display font-black text-sm sm:text-base text-slate-900 group-hover:text-orange-600 transition-colors uppercase tracking-tight">
              Học tập hiệu quả
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 mt-4 leading-relaxed font-sans">
              Tổng hợp tài liệu, phương pháp học tập tối ưu và lộ trình cụ thể cho từng kỳ học tại FPTU. Giúp bạn tránh bỡ ngỡ với các khóa học Coursera hay giáo trình quốc tế.
            </p>
          </div>
        </div>

        {/* Card 2: Ngoại khóa & CLB */}
        <div 
          onClick={() => setView('extra-shock')}
          className="group cursor-pointer bg-white/60 p-6 border-3 border-slate-950 rounded-xl shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-1.5 transition-all duration-300 backdrop-blur-md flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-xl border-3 border-slate-950 bg-orange-500 flex items-center justify-center text-white mb-6 group-hover:scale-105 transition-transform shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-display font-black text-sm sm:text-base text-slate-900 group-hover:text-orange-600 transition-colors uppercase tracking-tight">
              Ngoại khóa & CLB
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 mt-4 leading-relaxed font-sans">
              Khám phá cộng đồng CLB năng động, các sự kiện đình đám và cơ hội phát triển kỹ năng mềm. Đừng để bị ngợp trong "mê cung" hoạt động ở FUDA Đà Nẵng nhé!
            </p>
          </div>
        </div>

        {/* Card 3: Xã hội & Cộng đồng */}
        <div 
          onClick={() => setView('social-shock')}
          className="group cursor-pointer bg-white/60 p-6 border-3 border-slate-950 rounded-xl shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-1.5 transition-all duration-300 backdrop-blur-md flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-xl border-3 border-slate-950 bg-orange-500 flex items-center justify-center text-white mb-6 group-hover:scale-105 transition-transform shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-display font-black text-sm sm:text-base text-slate-900 group-hover:text-orange-600 transition-colors uppercase tracking-tight">
              XÃ HỘI & CỘNG ĐỒNG
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 mt-4 leading-relaxed font-sans">
              Kết nối bạn bè, mở rộng mạng lưới mối quan hệ và tham gia các hoạt động vì cộng đồng tại FUDA Đà Nẵng. Xây dựng kỹ năng giao tiếp và hòa nhập môi trường đại học dễ dàng hơn.
            </p>
          </div>
        </div>

        {/* Card 4: Tâm lý & Sức khỏe */}
        <div 
          onClick={() => setView('psych-shock')}
          className="group cursor-pointer bg-white/60 p-6 border-3 border-slate-950 rounded-xl shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-1.5 transition-all duration-300 backdrop-blur-md flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-xl border-3 border-slate-950 bg-orange-500 flex items-center justify-center text-white mb-6 group-hover:scale-105 transition-transform shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-display font-black text-sm sm:text-base text-slate-900 group-hover:text-orange-600 transition-colors uppercase tracking-tight">
              Tâm lý & Sức khỏe
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 mt-4 leading-relaxed font-sans">
              Lắng nghe và sẻ chia. Tư vấn tâm lý, cân bằng cuộc sống và duy trì năng lượng tích cực. Vượt qua khủng hoảng hiện sinh và áp lực học tập một cách lành mạnh.
            </p>
          </div>
        </div>
      </section>

      {/* Discover Categories Section */}
      <section id="discover-categories" className="space-y-8 scroll-mt-20">
        <div className="text-center max-w-xl mx-auto space-y-4">
          <h2 className="font-bold text-lg sm:text-xl text-orange-600 uppercase tracking-widest">
            :: Khám phá chuyên mục ::
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mx-auto"></div>
          <p className="text-sm text-orange-600 uppercase tracking-wider font-sans">
            Dễ dàng tìm thấy những gì bạn cần qua các chủ đề chính.
          </p>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              id: 'study-shock',
              tag: 'KIẾN THỨC',
              title: 'Sốc Học Tập',
              image: '/src/assets/images/regenerated_image_1782628730685.jpg',
              borderColor: 'border-[#FF9C2A]',
              shadowColor: 'pixel-shadow-orange',
            },
            {
              id: 'social-shock',
              tag: 'KẾT NỐI',
              title: 'Sốc Xã Hội',
              image: '/src/assets/images/regenerated_image_1782628723093.jpg',
              borderColor: 'border-[#FF9C2A]',
              shadowColor: 'pixel-shadow-orange',
            },
            {
              id: 'extra-shock',
              tag: 'SÔI ĐỘNG',
              title: 'Sốc Ngoại Khóa',
              image: '/src/assets/images/regenerated_image_1782628728027.jpg',
              borderColor: 'border-[#FF9C2A]',
              shadowColor: 'pixel-shadow-orange',
            },
            {
              id: 'psych-shock',
              tag: 'CÂN BẰNG',
              title: 'Sốc Tâm Lý\nVà Định Hướng',
              image: '/src/assets/images/regenerated_image_1782628729231.jpg',
              borderColor: 'border-[#FF9C2A]',
              shadowColor: 'pixel-shadow-orange',
            }
          ].map((category) => (
            <div
              key={category.id}
              onClick={() => setView(category.id as ActiveView)}
              className={`group relative cursor-pointer overflow-hidden border border-white/50 rounded-2xl h-80 ${category.shadowColor} hover:-translate-y-1.5 transition-all duration-300 bg-white/40 backdrop-blur-sm`}
            >
              {/* Image background */}
              <img
                src={category.image}
                alt={category.title}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-95 group-hover:scale-105 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-300"></div>
              
              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col justify-end relative z-10 bg-white/92 backdrop-blur-md border-t border-slate-200/40 rounded-b-2xl">
                <span className="text-[10px] font-bold tracking-wider text-orange-600 uppercase mb-1 font-display">
                  {category.tag}
                </span>
                <h3 className="font-display font-bold text-[11px] leading-snug whitespace-pre-line group-hover:underline uppercase text-slate-800 group-hover:text-orange-600 transition-colors">
                  {category.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Onboarding & Quiz Promo Section */}
      <section className="bg-white/90 p-8 sm:p-12 md:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-slate-800 mt-16 relative">
        {/* Onboarding checklist */}
        <div className="lg:col-span-5 space-y-8 pr-2">
          <div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-orange-500 uppercase tracking-tight leading-tight neo-text-shadow">
              Bắt đầu từ đâu?
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 uppercase tracking-wider mt-2 font-semibold">
              Lộ trình 3 bước giúp bạn chủ động hòa nhập vào FUDA Đà Nẵng.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex items-center justify-center w-9 h-9 rounded-md bg-orange-500 text-white font-display font-black text-sm shrink-0 border-2 border-slate-950 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                1
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-display font-black text-sm sm:text-base text-slate-900 uppercase tracking-wide">Xác định mục tiêu</h4>
                <p className="text-xs sm:text-sm text-slate-700 mt-1 font-sans leading-relaxed">
                  Định hướng những gì bạn muốn đạt được trong năm học thứ nhất tại đại học FPT.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex items-center justify-center w-9 h-9 rounded-md bg-orange-500 text-white font-display font-black text-sm shrink-0 border-2 border-slate-950 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                2
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-display font-black text-sm sm:text-base text-slate-900 uppercase tracking-wide">Tùy chỉnh lộ trình</h4>
                <p className="text-xs sm:text-sm text-slate-700 mt-1 font-sans leading-relaxed">
                  Lựa chọn các chuyên mục và câu lạc bộ phù hợp với sở thích, năng lực cá nhân.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex items-center justify-center w-9 h-9 rounded-md bg-orange-500 text-white font-display font-black text-sm shrink-0 border-2 border-slate-950 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                3
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-display font-black text-sm sm:text-base text-slate-900 uppercase tracking-wide">Kết nối & Phát triển</h4>
                <p className="text-xs sm:text-sm text-slate-700 mt-1 font-sans leading-relaxed">
                  Tham gia cộng đồng, đặt câu hỏi tại diễn đàn để nhận hỗ trợ kịp thời từ các tiền bối khóa trên.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Banner Card (exactly matched to screenshot style) */}
        <div className="lg:col-span-7 bg-white text-slate-800 p-8 sm:p-12 border-3 border-slate-950 rounded-xl relative overflow-hidden group shadow-neo backdrop-blur-md">
          <div className="relative z-10 max-w-lg mx-auto text-center space-y-6">
            <span className="inline-block px-3.5 py-1.5 border-2 border-slate-950 bg-[#e5b042] rounded-md text-[9px] font-display font-black tracking-wider uppercase text-slate-950 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
              TỰ ĐÁNH GIÁ
            </span>
            <h3 
              className="font-display font-black text-2xl sm:text-3xl tracking-tight leading-snug uppercase"
              style={{ textShadow: 'none', color: '#e26a37' }}
            >
              Bạn đang bị "sốc" ở mức độ nào?
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans max-w-md mx-auto">
              Làm bài kiểm tra nhanh 12 câu hỏi đầy đủ các khía cạnh để nhận diện loại sốc và mức độ bạn đang trải qua, từ đó nhận lời khuyên thích hợp nhất.
            </p>
            
            <div className="pt-4">
              <button
                onClick={() => setView('quiz')}
                className="inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white font-display font-black text-xs px-8 py-4 tracking-wider uppercase rounded-md transition-all cursor-pointer border-3 border-slate-950 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] active:scale-95"
              >
                Bắt đầu Quiz
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
