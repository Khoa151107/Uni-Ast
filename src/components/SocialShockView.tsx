import React, { useState } from 'react';
import { ActiveView } from '../types';
import { clubsData } from '../data/clubsData';
import { Users, HelpCircle, MessageSquare, Compass, Sparkles, Smile, ArrowRight } from 'lucide-react';

interface SocialShockViewProps {
  setView: (view: ActiveView) => void;
}

export default function SocialShockView({ setView }: SocialShockViewProps) {
  const [selectedInterest, setSelectedInterest] = useState<string>('all');
  
  // Custom interests list for peer matcher
  const interests = [
    { id: 'all', label: 'Tất cả sở thích', icon: Sparkles },
    { id: 'academic', label: 'Công nghệ & Học thuật', icon: Compass },
    { id: 'art', label: 'Nghệ thuật & Kỹ năng', icon: Smile },
    { id: 'sport', label: 'Thể thao năng động', icon: Users },
  ];

  const filteredClubs = selectedInterest === 'all' 
    ? clubsData 
    : clubsData.filter(club => club.category === selectedInterest);

  return (
    <div className="space-y-12 pb-16 animate-fade-in font-retro">
      {/* Visual Header Banner */}
      <section className="relative overflow-hidden border-4 border-[#FF9C2A] h-64 sm:h-80 bg-white text-black pixel-shadow-orange mt-6">
        <img
          src="/src/assets/images/regenerated_image_1782697252912.jpg"
          alt="Sốc xã hội"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
        <div className="relative z-10 h-full flex flex-col justify-end p-8 sm:p-12 max-w-4xl text-black">
          <span className="text-[9px] font-display font-bold tracking-[0.25em] text-[#FF9C2A] uppercase mb-2">KẾT NỐI & HÒA NHẬP</span>
          <h1 className="font-display font-bold text-lg sm:text-xl leading-tight uppercase text-black">
            SỐC XÃ HỘI
          </h1>
          <p className="text-xs text-slate-700 mt-2 max-w-xl leading-relaxed">
            Hỗ trợ sinh viên FPT vượt qua những rào cản vô hình trong hành trình kết nối, giao lưu và khẳng định bản thân tại môi trường FUDA Đà Nẵng đầy năng động.
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
              <Users className="w-5 h-5 mr-2 text-[#FF9C2A]" />
              Tổng quan
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed font-sans">
              Sốc xã hội tại môi trường đại học là tình trạng khó khăn khi thích ứng với mạng lưới giao thiệp rộng lớn và phức tạp. Tại Đại học FPT, nơi có nhịp sống câu lạc bộ và phong trào phát triển mạnh mẽ, sinh viên dễ dàng cảm thấy ngợp trước sự cởi mở, tự tin của mọi người, hoặc trải qua cảm giác lạc lõng, trống trải vì chưa có nhóm bạn tâm giao thực sự.
            </p>
            <p className="text-sm text-slate-700 leading-relaxed font-sans">
              Nhận diện sớm các nguyên nhân tâm lý và hành vi sẽ giúp các bạn chuyển trạng thái từ phòng thủ, thu mình sang chủ động kết nối lành mạnh theo đúng tốc độ của bản thân.
            </p>
          </div>

          {/* Causes Section */}
          <div className="space-y-4">
            <h2 className="flex items-center text-xs font-display font-bold text-[#E70001] border-l-4 border-[#E70001] pl-3 uppercase tracking-wider">
              <HelpCircle className="w-5 h-5 mr-2 text-[#E70001]" />
              Tại sao bạn bị "Sốc xã hội"?
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  title: 'Nỗi sợ bị cô lập',
                  desc: 'Cảm giác lo lắng thường trực khi chưa tìm thấy "vòng tròn" bạn bè hay CLB phù hợp ngay từ tuần đầu nhập học.'
                },
                {
                  title: 'Khác biệt lối sống',
                  desc: 'Xung đột nhỏ hoặc bất đồng quan điểm giữa các nền tảng gia đình, văn hóa vùng miền khi sinh hoạt tại Ký túc xá.'
                },
                {
                  title: 'Áp lực đồng lứa',
                  desc: 'Cố gắng ép bản thân phải tỏ ra hòa đồng, năng nổ hoặc bắt kịp các cuộc vui của bạn bè mặc dù tính cách hướng nội.'
                },
                {
                  title: 'Tìm kiếm bạn tâm giao',
                  desc: 'Khó khăn trong việc dịch chuyển từ các mối quan hệ xã giao học tập thông thường sang những người bạn thân thực tế.'
                }
              ].map((cause, idx) => (
                <div key={idx} className="bg-white border-4 border-[#E70001] pixel-shadow-red p-6 space-y-2 text-black">
                  <span className="text-[10px] font-mono font-bold text-[#E70001]">0{idx + 1}</span>
                  <h4 className="font-display font-bold text-xs text-[#FF9C2A] uppercase tracking-wide">{cause.title}</h4>
                  <p className="text-sm text-slate-700 leading-relaxed font-sans">{cause.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Solutions Section */}
          <div className="bg-white p-8 border-4 border-[#9DD044] pixel-shadow-green text-black space-y-6">
            <h2 className="flex items-center text-xs font-display font-bold text-[#9DD044] border-l-4 border-[#9DD044] pl-3 uppercase tracking-wider">
              <Smile className="w-5 h-5 mr-2 text-[#9DD044]" />
              Lối thoát & Giải pháp kết nối
            </h2>

            <div className="space-y-6">
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 rounded-none bg-slate-50 border border-black text-[#9DD044] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">✓</div>
                <div>
                  <h4 className="font-display font-bold text-xs text-black uppercase tracking-wide">Tham gia CLB theo đúng sở thích</h4>
                  <p className="text-xs text-slate-700 leading-relaxed mt-1 font-sans">
                    Đại học FPT có hơn 40 CLB. Đừng cố vào CLB danh tiếng nhất nếu nó không hợp với tính cách của bạn. Hãy chọn nơi bạn được là chính mình.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 rounded-none bg-slate-50 border border-black text-[#9DD044] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">✓</div>
                <div>
                  <h4 className="font-display font-bold text-xs text-black uppercase tracking-wide">Tận dụng Tuần lễ Định hướng (Orientation Week)</h4>
                  <p className="text-xs text-slate-700 leading-relaxed mt-1 font-sans">
                    Các hoạt động teambuilding, dã ngoại của lớp học quân sự hay tuần lễ định hướng là cơ hội tuyệt vời nhất để làm quen những người bạn cùng phòng, cùng lớp.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 rounded-none bg-slate-50 border border-black text-[#9DD044] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">✓</div>
                <div>
                  <h4 className="font-display font-bold text-xs text-black uppercase tracking-wide">Tập trung lắng nghe tích cực</h4>
                  <p className="text-xs text-slate-700 leading-relaxed mt-1 font-sans">
                    Giao tiếp tốt không có nghĩa là bạn phải nói thật nhiều. Hãy là một người lắng nghe chân thành, thấu hiểu - đó mới là chìa khoá thu hút người khác.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (Support Tools Widget) */}
        <div className="space-y-6 text-black">
          
          {/* Interactive Club Matcher Tool */}
          <div className="bg-white p-6 border-4 border-[#FF9C2A] pixel-shadow-orange text-black space-y-6">
            <div>
              <h3 className="font-display font-bold text-xs text-[#FF9C2A] uppercase tracking-wider">
                🔍 Bộ Lọc Tìm Kiếm CLB
              </h3>
              <p className="text-[8px] text-slate-600 uppercase tracking-wider font-display mt-1">
                Lựa chọn nhóm sở thích để tìm kiếm câu lạc bộ FPT phù hợp nhất với bạn.
              </p>
            </div>

            {/* Selector list */}
            <div className="flex flex-col space-y-1.5 font-display">
              {interests.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedInterest(item.id)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-none text-[9px] font-bold tracking-wider border-2 transition-all cursor-pointer ${
                      selectedInterest === item.id
                        ? 'bg-[#FF9C2A] border-black text-black font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-black'
                    }`}
                  >
                    <span className="flex items-center">
                      <Icon className="w-4 h-4 mr-2" />
                      {item.label}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-85" />
                  </button>
                );
              })}
            </div>

            {/* Filtered list of clubs */}
            <div className="border-t-2 border-slate-200 pt-5 space-y-3">
              <h4 className="text-xs font-display font-bold text-[#FF9C2A] tracking-wider uppercase">
                🎯 CLB Đề xuất cho bạn ({filteredClubs.length})
              </h4>
              
              <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                {filteredClubs.map((club) => (
                  <div key={club.id} className="p-3 bg-slate-50 border-2 border-slate-200 hover:border-black transition-all space-y-2 text-black">
                    <div className="flex justify-between items-center">
                      <span className="font-display font-bold text-[10px] text-black flex items-center uppercase tracking-wide">
                        <span className="mr-1.5 text-sm">{club.logo}</span>
                        {club.name}
                      </span>
                      <span className="text-[9px] bg-[#E70001] text-white px-2 py-0.5 border border-black font-display font-bold">
                        👥 {club.membersCount}+
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-700 leading-normal font-sans">{club.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Link to Forum Support Box */}
          <div className="bg-white text-black border-4 border-[#FF9C2A] pixel-shadow-orange p-6 space-y-4">
            <div className="w-10 h-10 border-2 border-black bg-slate-50 flex items-center justify-center font-bold text-lg">
              💬
            </div>
            <div className="space-y-1">
              <h4 className="font-display font-bold text-[11px] uppercase tracking-wide text-[#FF9C2A]">Gặp gỡ sinh viên khác ở Diễn đàn</h4>
              <p className="text-xs text-slate-700 leading-relaxed font-sans">
                Đừng chịu đựng nỗi buồn một mình. Diễn đàn Uni-Assistance là nơi quy tụ hàng ngàn sinh viên FPT sẵn sàng trò chuyện, giải đáp thắc mắc và kết bạn mới.
              </p>
            </div>
            <button
              onClick={() => setView('forum')}
              className="w-full py-2.5 bg-[#FF9C2A] hover:bg-[#FF9C2A]/80 text-black border-2 border-black font-display font-bold text-[10px] uppercase tracking-wider transition-all flex items-center justify-center cursor-pointer pixel-shadow-orange"
            >
              <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
              Vào Diễn Đàn Ngay
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
