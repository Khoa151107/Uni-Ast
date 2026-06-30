import React, { useState } from 'react';
import { ActiveView } from '../types';
import { Compass, HelpCircle, ShieldCheck, ExternalLink } from 'lucide-react';

interface ExtraShockViewProps {
  setView?: (view: ActiveView) => void;
}

export default function ExtraShockView({ setView }: ExtraShockViewProps) {
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);
  const [showFomoWarning, setShowFomoWarning] = useState(false);

  // Realistic major FPTU freshman events list
  const events = [
    { id: 'f-camp', name: 'F-Camp 2026', date: '15/09/2026', desc: 'Đại hội chào tân sinh viên lớn nhất FPTU với chuỗi hoạt động văn hóa, teambuilding bùng nổ.' },
    { id: 'fuda-fest', name: 'FUDA Music Festival', date: '28/09/2026', desc: 'Đêm nhạc đại nhạc hội quy tụ dàn ca sĩ khách mời đình đám cùng các CLB nghệ thuật tại Đà Nẵng.' },
    { id: 'club-fair', name: 'FPTU Club Fair', date: '05/10/2026', desc: 'Ngày hội tuyển thành viên của tất cả các CLB học thuật, thể thao và nghệ thuật.' },
    { id: 'hackathon', name: 'FUDA Tech Hackathon', date: '18/10/2026', desc: 'Cuộc thi lập trình 24 giờ liên tục dành cho các tân binh đam mê công nghệ tại FPTU Đà Nẵng.' },
    { id: 'charity', name: 'Trung Thu Ấm Áp', date: '25/09/2026', desc: 'Chiến dịch tình nguyện mang niềm vui đến cho trẻ em vùng cao của CLB Tình Nguyện.' }
  ];

  const handleRegisterEvent = (eventId: string) => {
    if (registeredEvents.includes(eventId)) {
      setRegisteredEvents(registeredEvents.filter(id => id !== eventId));
      if (registeredEvents.length <= 3) {
        setShowFomoWarning(false);
      }
    } else {
      const newList = [...registeredEvents, eventId];
      setRegisteredEvents(newList);
      // Burnout warning: If registering for more than 2 events
      if (newList.length > 2) {
        setShowFomoWarning(true);
      }
    }
  };

  return (
    <div className="space-y-12 pb-16 animate-fade-in font-retro">
      {/* Visual Header Banner */}
      <section className="relative overflow-hidden border-4 border-[#FF9C2A] h-64 sm:h-80 bg-white text-black pixel-shadow-orange mt-6">
        <img
          src="/src/assets/images/regenerated_image_1782697347269.png"
          alt="Sốc ngoại khóa"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
        <div className="relative z-10 h-full flex flex-col justify-end p-8 sm:p-12 max-w-4xl text-black">
          <span className="text-[9px] font-display font-bold tracking-widest text-[#FF9C2A] uppercase mb-2">ĐAM MÊ & CÂN BẰNG</span>
          <h1 className="font-display font-bold text-lg sm:text-xl leading-tight uppercase text-black">
            SỐC NGOẠI KHÓA
          </h1>
          <p className="text-xs text-slate-700 mt-2 max-w-xl leading-relaxed">
            Đừng để những "đại hội câu lạc bộ" hay cơn bão sự kiện cuốn trôi thời gian học tập và làm kiệt sức trải nghiệm sinh viên quý báu của bạn.
          </p>
        </div>
      </section>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-black">
        
        {/* Left Columns (Overview, Causes, Solutions) */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Overview Section */}
          <div className="bg-white p-8 border-4 border-[#FF9C2A] pixel-shadow-orange text-black space-y-4">
            <h2 className="flex items-center text-xs font-display font-bold text-[#FF9C2A] border-l-4 border-[#FF9C2A] pl-3 uppercase tracking-wider">
              <Compass className="w-5 h-5 mr-2 text-[#FF9C2A]" />
              Tổng quan: Mê cung Câu lạc bộ
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed font-sans">
              Bạn vừa bước chân vào giảng đường và ngay lập tức bị bủa vây bởi hàng chục lời mời chào nhiệt tình từ các CLB, ban ngành và đội nhóm. Cảm giác "ngập thở" trước một biển lựa chọn là hoàn toàn có thật. Nhiều sinh viên rơi vào trạng thái kiệt sức khi cố gắng đa nhiệm quá đà giữa việc học tập chính khóa và hàng loạt hoạt động thiện nguyện, văn nghệ, hay tuyển thành viên.
            </p>
            <p className="text-sm text-slate-700 leading-relaxed font-sans">
              Đây không chỉ đơn thuần là sự bận rộn thông thường, đó là một cơn sốc tâm lý sâu sắc khi ranh giới giữa đam mê, phát triển bản thân và nghĩa vụ bị xóa nhòa khiến bạn mệt mỏi, sao nhãng việc học tập chính khóa.
            </p>
          </div>

          {/* Causes/Why shock? section */}
          <div className="space-y-4">
            <h3 className="text-xs font-display font-bold text-[#E70001] pl-3 uppercase tracking-wider flex items-center">
              <HelpCircle className="w-4 h-4 mr-2 text-[#E70001]" />
              Tại sao bạn bị "Sốc ngoại khóa"?
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 border-4 border-[#E70001] pixel-shadow-red space-y-2 text-black">
                <div className="w-8 h-8 rounded-none border-2 border-black bg-slate-50 text-[#E70001] flex items-center justify-center font-bold text-sm">
                  ⚠️
                </div>
                <h4 className="font-display font-bold text-[#FF9C2A] text-xs uppercase tracking-wide">Hội chứng sợ bỏ lỡ (FOMO)</h4>
                <p className="text-sm text-slate-700 leading-relaxed font-sans">
                  Cảm giác bất an khi thấy bạn bè xung quanh ai cũng có "profile" ngoại khóa rực rỡ, năng nổ chụp ảnh check-in sự kiện dẫn đến việc đăng ký tham gia vô tội vạ.
                </p>
              </div>

              <div className="bg-white p-6 border-4 border-[#E70001] pixel-shadow-red space-y-2 text-black">
                <div className="w-8 h-8 rounded-none border-2 border-black bg-slate-50 text-[#E70001] flex items-center justify-center font-bold text-sm">
                  ⏳
                </div>
                <h4 className="font-display font-bold text-[#FF9C2A] text-xs uppercase tracking-wide">Quản lý thời gian yếu kém</h4>
                <p className="text-sm text-slate-700 leading-relaxed font-sans">
                  Chưa thích nghi được với lối sống tự lập, dẫn đến sự chồng chéo lịch trình trầm trọng giữa lịch học chuyên ngành, bài tập nhóm, đi làm thêm và sinh hoạt CLB.
                </p>
              </div>
            </div>
          </div>

          {/* Solutions Section */}
          <div className="bg-white p-8 border-4 border-[#9DD044] pixel-shadow-green text-black space-y-6">
            <h2 className="flex items-center text-xs font-display font-bold text-[#9DD044] border-l-4 border-[#9DD044] pl-3 uppercase tracking-wider">
              <ShieldCheck className="w-5 h-5 mr-2 text-[#9DD044]" />
              Lối thoát cho tâm hồn bận rộn
            </h2>

            <div className="space-y-6">
              <div className="flex space-x-4 items-start">
                <span className="text-lg font-mono font-bold text-[#FF9C2A]">01</span>
                <div className="space-y-1">
                  <h4 className="font-display font-bold text-black text-xs uppercase tracking-wide">Chất lượng hơn Số lượng</h4>
                  <p className="text-xs text-slate-700 leading-relaxed font-sans">
                    Hãy lựa chọn duy nhất <span className="font-semibold text-[#FF9C2A]">1 đến tối đa 2 câu lạc bộ</span> thực sự phù hợp với mục tiêu định hướng nghề nghiệp hoặc đam mê cốt lõi, thay vì tham gia dàn trải nhiều nơi mà không hoạt động hiệu quả.
                  </p>
                </div>
              </div>

              <div className="flex space-x-4 items-start">
                <span className="text-lg font-mono font-bold text-[#FF9C2A]">02</span>
                <div className="space-y-1">
                  <h4 className="font-display font-bold text-black text-xs uppercase tracking-wide">Học cách nói "Không"</h4>
                  <p className="text-xs text-slate-700 leading-relaxed font-sans">
                    Biết từ chối lịch trình phụ, lời mời tụ tập hoặc các buổi hoạt động bổ sung khi nhận thấy quỹ thời gian học tập bị xâm lấn. Nói "Không" để giữ gìn sức khỏe là một kỹ năng sinh tồn thiết yếu tại đại học.
                  </p>
                </div>
              </div>

              <div className="flex space-x-4 items-start">
                <span className="text-lg font-mono font-bold text-[#FF9C2A]">03</span>
                <div className="space-y-1">
                  <h4 className="font-display font-bold text-black text-xs uppercase tracking-wide">Lắng nghe bản thân</h4>
                  <p className="text-xs text-slate-700 leading-relaxed font-sans">
                    Thiết lập ít nhất <span className="font-semibold text-[#FF9C2A]">1 ngày hoàn toàn nghỉ ngơi</span> trong tuần, tuyệt đối không tham gia hoạt động ngoại khóa để cơ thể tái tạo năng lượng và cân bằng trạng thái cảm xúc.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (Support Tools Widget) */}
        <div className="space-y-6 text-black">
          
          {/* FPT Event Manager Link Card */}
          <div className="bg-white/80 p-6 border border-orange-500/15 rounded-2xl shadow-lg shadow-orange-500/5 backdrop-blur-md text-black space-y-5">
            <div className="space-y-1.5">
              <h3 className="font-bold text-sm text-orange-600 uppercase tracking-wider flex items-center gap-1.5">
                📅 Cổng Sự Kiện FPTU
              </h3>
              <p className="text-xs text-slate-500">
                Theo dõi và đăng ký các sự kiện tại Campus Đà Nẵng
              </p>
            </div>

            <div className="text-sm text-slate-700 leading-relaxed font-sans space-y-3">
              <p>
                Trang tin tức và quản lý sự kiện chính thức dành cho sinh viên Đại học FPT Đà Nẵng. Nơi tổng hợp tất cả hoạt động, workshop, F-Camp và lễ hội lớn nhỏ.
              </p>
              <div className="p-3 bg-orange-500/5 border border-orange-500/10 rounded-xl text-xs text-orange-700">
                Hãy chủ động lên kế hoạch tham gia từ 1 - 2 sự kiện lớn mỗi kỳ để vừa phát triển bản thân vừa cân bằng việc học tập bạn nhé!
              </div>
            </div>

            <a
              href="https://fpt-event-manager.web.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full px-6 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold tracking-wide text-xs uppercase rounded-xl transition-all shadow-md shadow-orange-500/20 active:scale-[0.98] cursor-pointer text-center group"
            >
              Xem Cổng Sự Kiện FPTU
              <ExternalLink className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
