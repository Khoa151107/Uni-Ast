import React, { useState, useEffect } from 'react';
import { ActiveView } from '../types';
import { Heart, Play, Pause, ShieldAlert, Sparkles, Smile, ArrowRight } from 'lucide-react';

type BreathPhase = 'idle' | 'inhale' | 'hold' | 'exhale';

interface PsychShockViewProps {
  setView?: (view: ActiveView) => void;
}

export default function PsychShockView({ setView }: PsychShockViewProps) {
  // Breathing bubble states
  const [breathPhase, setBreathPhase] = useState<BreathPhase>('idle');
  const [breathCounter, setBreathCounter] = useState(0);
  const [breathTimer, setBreathTimer] = useState<any>(null);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (breathTimer) clearInterval(breathTimer);
    };
  }, [breathTimer]);

  // Handle breathing flow
  useEffect(() => {
    if (breathPhase === 'idle') {
      if (breathTimer) {
        clearInterval(breathTimer);
        setBreathTimer(null);
      }
      setBreathCounter(0);
      return;
    }

    const interval = setInterval(() => {
      setBreathCounter((prev) => {
        // Phase transition checks
        if (breathPhase === 'inhale' && prev >= 4) {
          setBreathPhase('hold');
          return 0;
        }
        if (breathPhase === 'hold' && prev >= 7) {
          setBreathPhase('exhale');
          return 0;
        }
        if (breathPhase === 'exhale' && prev >= 8) {
          setBreathPhase('inhale');
          return 0;
        }
        return prev + 1;
      });
    }, 1000);

    setBreathTimer(interval);
    return () => clearInterval(interval);
  }, [breathPhase]);

  const startBreathing = () => {
    setBreathPhase('inhale');
    setBreathCounter(0);
  };

  const stopBreathing = () => {
    setBreathPhase('idle');
  };

  const getPhaseText = () => {
    switch (breathPhase) {
      case 'inhale': return 'Hít vào chậm rãi (4s)...';
      case 'hold': return 'Nín thở, tĩnh tâm (7s)...';
      case 'exhale': return 'Thở ra nhẹ nhàng (8s)...';
      default: return 'Hãy sẵn sàng thư giãn...';
    }
  };

  return (
    <div className="space-y-12 pb-16 animate-fade-in font-retro">
      {/* Visual Header Banner */}
      <section className="relative overflow-hidden border-4 border-[#FF9C2A] h-64 sm:h-80 bg-white text-black pixel-shadow-orange mt-6">
        <img
          src="/src/assets/images/regenerated_image_1782628729231.jpg"
          alt="Sốc tâm lý"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
        <div className="relative z-10 h-full flex flex-col justify-end p-8 sm:p-12 max-w-4xl text-black">
          <span className="text-[9px] font-display font-bold tracking-widest text-[#FF9C2A] uppercase mb-2">TÂM LÝ & SỨC KHỎE TINH THẦN</span>
          <h1 className="font-display font-bold text-lg sm:text-xl leading-tight uppercase text-black">
            SỐC TÂM LÝ & ĐỊNH HƯỚNG
          </h1>
          <p className="text-xs text-slate-700 mt-2 max-w-xl leading-relaxed">
            Hành trình đại học không chỉ là điểm số, đó là cuộc chiến tìm lại chính mình giữa những kỳ vọng, hoài nghi và áp lực vô hình.
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
              <Heart className="w-5 h-5 mr-2 text-[#FF9C2A]" />
              Tổng quan
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed font-sans">
              Bước chân vào cánh cổng đại học, many tân sinh viên phải đối mặt với cảm giác "ngợp" trước sự tự do mới mẻ và khối lượng công việc, kỳ vọng khổng lồ. Cảm giác bị lạc lõng trong chính lựa chọn ngành học, khủng hoảng bản sắc cá nhân không phải là hiếm gặp.
            </p>
            <p className="text-sm text-slate-700 leading-relaxed font-sans">
              Áp lực từ sự kỳ vọng lớn lao của gia đình, người thân cùng áp lực tự thân tạo nên một rào cản tâm lý vô hình, khiến mỗi ngày đến trường trở nên căng thẳng. Nhận diện các dấu hiệu tâm lý và biết cách giải tỏa là điều tối quan trọng để bạn duy trì một sức khỏe tinh thần bền bỉ.
            </p>
          </div>

          {/* Causes Section */}
          <div className="space-y-4">
            <h3 className="text-xs font-display font-bold text-[#E70001] pl-3 uppercase tracking-wider flex items-center">
              <ShieldAlert className="w-4 h-4 mr-2 text-[#E70001]" />
              Nguyên nhân chính
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  id: '01',
                  title: 'Khủng hoảng hiện sinh',
                  desc: 'Nghi ngờ về ý nghĩa thực sự của ngành học đang theo đuổi và mục đích sống trong tương lai dài hạn.'
                },
                {
                  id: '02',
                  title: 'Áp lực đồng lứa',
                  desc: 'Căng thẳng tột độ khi so sánh bản thân với sự thể hiện xuất sắc, rực rỡ của bạn bè đồng trang lứa.'
                },
                {
                  id: '03',
                  title: 'Thiếu tự nhận thức',
                  desc: 'Chưa trang bị đủ kỹ năng thấu hiểu điểm mạnh, điểm yếu thực sự và cách quản lý cảm xúc tiêu cực.'
                }
              ].map((item) => (
                <div key={item.id} className="bg-white p-6 border-4 border-[#E70001] pixel-shadow-red space-y-2 relative overflow-hidden group text-black">
                  <div className="absolute top-0 right-0 p-2 text-3xl font-mono font-bold text-slate-100 group-hover:text-[#E70001]/10 transition-colors">
                    {item.id}
                  </div>
                  <h4 className="font-display font-bold text-[#FF9C2A] text-xs uppercase relative z-10 tracking-wide">{item.title}</h4>
                  <p className="text-sm text-slate-700 leading-relaxed relative z-10 font-sans">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Solutions Section */}
          <div className="bg-white p-8 border-4 border-[#9DD044] pixel-shadow-green text-black space-y-6">
            <h2 className="flex items-center text-xs font-display font-bold text-[#9DD044] border-l-4 border-[#9DD044] pl-3 uppercase tracking-wider">
              <Smile className="w-5 h-5 mr-2 text-[#9DD044]" />
              Giải pháp vượt qua khủng hoảng
            </h2>

            <div className="space-y-4 font-sans">
              <div className="p-4 bg-slate-50 border-2 border-[#9DD044] flex items-start space-x-3">
                <span className="text-lg">💬</span>
                <div>
                  <h4 className="font-display font-bold text-xs text-black uppercase">Tham gia diễn đàn chia sẻ</h4>
                  <p className="text-xs text-slate-700 leading-relaxed mt-1">
                    Hãy trải lòng, thảo luận ẩn danh hoặc công khai tại diễn đàn Uni-Assistance để học hỏi kinh nghiệm tháo gỡ áp lực từ các anh chị sinh viên khoá trước. Bạn sẽ nhận ra ai cũng từng trải qua giai đoạn hoang mang này.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-2 border-[#9DD044] flex items-start space-x-3">
                <span className="text-lg">🧘</span>
                <div>
                  <h4 className="font-display font-bold text-xs text-black uppercase">Thiền định & Chánh niệm</h4>
                  <p className="text-xs text-slate-700 leading-relaxed mt-1">
                    Dành ra 5-10 phút mỗi ngày để thực hành hít thở sâu, thiền hành giúp xoa dịu hệ thần kinh, giải phóng các hoóc-môn stress tích tụ do bài vở thi cử dồn dập.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-2 border-[#9DD044] flex items-start space-x-3">
                <span className="text-lg">🎯</span>
                <div>
                  <h4 className="font-display font-bold text-xs text-black uppercase">Tham gia các Workshop định hướng</h4>
                  <p className="text-xs text-slate-700 leading-relaxed mt-1">
                    Đừng bỏ lỡ các chương trình tư vấn học thuật, hướng nghiệp do Phòng Hợp tác doanh nghiệp hay Phòng Công tác sinh viên tổ chức để có cái nhìn thực tế và tự tin hơn.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (Breathing Tool Widget) */}
        <div className="space-y-6">
          
          {/* Mindfulness Breathing Bubble */}
          <div className="bg-white p-6 border-4 border-[#FF9C2A] pixel-shadow-orange text-black space-y-6 text-center">
            <div className="text-left">
              <h3 className="font-display font-bold text-xs text-[#FF9C2A] flex items-center uppercase tracking-wider">
                <Sparkles className="w-5 h-5 mr-1.5 text-[#FF9C2A]" />
                Bong bóng Chánh Niệm
              </h3>
              <p className="text-[8px] text-slate-600 mt-1 uppercase font-display">
                Luyện tập nhịp thở 4-7-8 để ngay lập tức hạ hỏa stress và ổn định nhịp tim.
              </p>
            </div>

            {/* Visual Growing / Shrinking Sphere */}
            <div className="py-8 flex flex-col items-center justify-center">
              <div 
                className={`w-32 h-32 flex flex-col items-center justify-center text-center transition-all duration-1000 border-4 border-black pixel-shadow-orange ${
                  breathPhase === 'inhale' 
                    ? 'scale-110 bg-[#FF9C2A] text-black' 
                    : breathPhase === 'hold' 
                    ? 'scale-115 bg-[#E70001] text-white' 
                    : breathPhase === 'exhale' 
                    ? 'scale-95 bg-[#FF9C2A] text-black' 
                    : 'bg-slate-100 text-slate-500 border-dashed'
                }`}
              >
                <span className="text-sm font-mono font-bold text-current">
                  {breathPhase !== 'idle' ? `${breathCounter}s` : '🧘'}
                </span>
                <span className="text-[8px] uppercase font-display font-bold tracking-widest text-current mt-1">
                  {breathPhase === 'idle' ? 'Sẵn sàng' : breathPhase}
                </span>
              </div>
              
              <p className="text-xs font-display font-bold text-[#FF9C2A] mt-6 min-h-[1.5rem]">
                {getPhaseText()}
              </p>
            </div>

            {/* Breathing controls */}
            <div className="flex justify-center space-x-3 pt-2">
              {breathPhase === 'idle' ? (
                <button
                  onClick={startBreathing}
                  className="px-6 py-2.5 rounded-none bg-[#E70001] hover:bg-[#E70001]/90 text-white font-display font-bold text-[10px] uppercase flex items-center cursor-pointer transition-all active:scale-95 border-2 border-black pixel-shadow-red"
                >
                  <Play className="w-3.5 h-3.5 mr-1.5" /> Bắt đầu luyện thở
                </button>
              ) : (
                <button
                  onClick={stopBreathing}
                  className="px-6 py-2.5 rounded-none bg-slate-100 hover:bg-slate-200 text-black font-display font-bold text-[10px] uppercase flex items-center cursor-pointer transition-all active:scale-95 border-2 border-slate-400"
                >
                  <Pause className="w-3.5 h-3.5 mr-1.5" /> Tạm dừng bài tập
                </button>
              )}
            </div>

            {/* Quick explanation of 4-7-8 */}
            <div className="bg-slate-50 p-4 border-2 border-slate-200 text-left space-y-1.5">
              <h5 className="font-display font-bold text-[9px] text-red-600 uppercase tracking-wider">Quy tắc 4-7-8 hoạt động thế nào?</h5>
              <ul className="text-[10px] text-slate-700 space-y-1.5 leading-normal list-disc pl-3 font-sans">
                <li>Hít vào bằng mũi sâu trong <span className="text-[#FF9C2A] font-bold">4 giây</span>.</li>
                <li>Nín thở hoàn toàn trong <span className="text-[#FF9C2A] font-bold">7 giây</span>.</li>
                <li>Thở ra từ từ qua miệng trong <span className="text-[#FF9C2A] font-bold">8 giây</span>.</li>
                <li>Lặp lại chu kỳ 4 lần để xoa dịu lo lắng.</li>
              </ul>
            </div>
          </div>

          {/* Personality quiz reminder */}
          <div className="bg-white p-5 border-4 border-[#FF9C2A] pixel-shadow-orange text-left space-y-3 text-black">
            <h4 className="text-xs font-display font-bold text-black tracking-wider uppercase">🎨 Thấu hiểu bản thân?</h4>
            <p className="text-[11px] text-slate-700 leading-relaxed font-sans">
              Nhận diện mức độ lo âu tâm lý và stress học tập bằng cách hoàn thành bài trắc nghiệm nhanh 12 câu hỏi chuẩn hoá từ Uni-Assistance.
            </p>
            <button 
              onClick={() => setView && setView('quiz')}
              className="text-[10px] text-[#FF9C2A] hover:text-[#FF9C2A]/80 font-display font-bold transition-colors flex items-center cursor-pointer uppercase"
            >
              Xem trắc nghiệm tính cách <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
