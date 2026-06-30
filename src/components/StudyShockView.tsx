import React, { useState, useEffect } from 'react';
import { GraduationCap, Clock, Calendar, CheckSquare, Plus, Trash2, Play, Pause, RotateCcw, AlertTriangle, Lightbulb } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function StudyShockView() {
  const { currentUser } = useAuth();

  // To-do list state
  const [tasks, setTasks] = useState<{ id: string; text: string; completed: boolean }[]>([]);
  const [newTaskText, setNewTaskText] = useState('');

  // Sync tasks state with user session
  useEffect(() => {
    const key = `fptu_tasks_${currentUser ? currentUser.id : 'guest'}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        setTasks(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse tasks:', e);
        setTasks([]);
      }
    } else {
      // Default tasks for a new session
      const defaultTasks = [
        { id: '1', text: 'Xem tài liệu chuẩn bị cho tiết học ngày mai', completed: false },
        { id: '2', text: 'Hoàn thành 3 video khoá học Coursera', completed: true },
        { id: '3', text: 'Thảo luận Assignment 1 cùng nhóm', completed: false }
      ];
      setTasks(defaultTasks);
      localStorage.setItem(key, JSON.stringify(defaultTasks));
    }
  }, [currentUser]);

  // Save tasks to user-specific localStorage when modified
  const saveTasks = (newTasks: typeof tasks) => {
    setTasks(newTasks);
    const key = `fptu_tasks_${currentUser ? currentUser.id : 'guest'}`;
    localStorage.setItem(key, JSON.stringify(newTasks));
  };

  // Pomodoro state
  const [pomoPreset, setPomoPreset] = useState<25 | 50>(25);
  const [pomoTime, setPomoTime] = useState(25 * 60);
  const [isPomoRunning, setIsPomoRunning] = useState(false);
  const [pomoMode, setPomoMode] = useState<'work' | 'break'>('work');
  const [pomoNotification, setPomoNotification] = useState<string | null>(null);

  // Toggle active sidebar tool
  const [activeTool, setActiveTool] = useState<'pomo' | 'todo' | 'info'>('pomo');

  // Play sound effect using Web Audio API when transitioning
  const playPomoSound = (frequency = 600, duration = 0.5) => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn('Audio feedback failed or blocked by autoplay policy:', e);
    }
  };

  // Pomodoro effect ticker with precise automatic countdown transition
  useEffect(() => {
    let timer: any = null;
    if (isPomoRunning) {
      if (pomoTime > 0) {
        timer = setInterval(() => {
          setPomoTime((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        // pomoTime is exactly 0 and it's running
        if (pomoMode === 'work') {
          const breakTime = pomoPreset === 25 ? 5 : 10;
          setPomoMode('break');
          setPomoTime(breakTime * 60);
          playPomoSound(880, 0.6); // Clear crisp high beep
          setPomoNotification(`🎉 Hết giờ làm việc! Hệ thống tự động đếm ngược thời gian giải lao ${breakTime} phút.`);
        } else {
          setPomoMode('work');
          setPomoTime(pomoPreset * 60);
          playPomoSound(660, 0.6); // Slightly lower beep
          setPomoNotification(`💪 Hết giờ nghỉ ngơi! Hệ thống tự động đếm ngược thời gian làm việc ${pomoPreset} phút.`);
        }
      }
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPomoRunning, pomoTime, pomoMode, pomoPreset]);

  // Pomodoro notification auto-clear effect
  useEffect(() => {
    if (pomoNotification) {
      const timer = setTimeout(() => {
        setPomoNotification(null);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [pomoNotification]);

  // Pomodoro controls
  const togglePomo = () => {
    setIsPomoRunning(!isPomoRunning);
    setPomoNotification(null);
  };

  const resetPomo = () => {
    setIsPomoRunning(false);
    setPomoNotification(null);
    if (pomoMode === 'work') {
      setPomoTime(pomoPreset * 60);
    } else {
      setPomoTime((pomoPreset === 25 ? 5 : 10) * 60);
    }
  };

  const changePreset = (preset: 25 | 50) => {
    setIsPomoRunning(false);
    setPomoPreset(preset);
    setPomoNotification(null);
    setPomoMode('work');
    setPomoTime(preset * 60);
  };

  const formatPomoTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // To-do list actions
  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    const updated = [...tasks, { id: Date.now().toString(), text: newTaskText, completed: false }];
    saveTasks(updated);
    setNewTaskText('');
  };

  const toggleTask = (id: string) => {
    const updated = tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
    saveTasks(updated);
  };

  const deleteTask = (id: string) => {
    const updated = tasks.filter((t) => t.id !== id);
    saveTasks(updated);
  };

  return (
    <div className="space-y-12 pb-16 animate-fade-in font-retro">
      {/* Visual Header Banner */}
      <section className="relative overflow-hidden border-4 border-[#FF9C2A] h-64 sm:h-80 bg-white text-black pixel-shadow-orange mt-6">
        <img
          src="/src/assets/images/regenerated_image_1782696707774.jpg"
          alt="Sốc học tập"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
        <div className="relative z-10 h-full flex flex-col justify-end p-8 sm:p-12 max-w-4xl text-black">
          <span className="text-[9px] font-display font-bold tracking-[0.25em] text-[#FF9C2A] uppercase mb-2">KIẾN THỨC & PHƯƠNG PHÁP</span>
          <h1 className="font-display font-bold text-lg sm:text-xl leading-tight uppercase text-black">
            SỐC HỌC TẬP
          </h1>
          <p className="text-xs text-slate-700 mt-2 max-w-xl leading-relaxed">
            Chuyển giao từ phổ thông sang FPT University là một "cú sốc" về sự tự chủ. Biến áp lực thành động lực bứt phá cùng Uni-assistance.
          </p>
        </div>
      </section>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Columns (Overview, Causes, Solutions) */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Overview Section */}
          <div className="bg-white p-8 border-4 border-[#FF9C2A] pixel-shadow-orange text-black space-y-4">
            <h2 className="flex items-center text-xs font-display font-bold text-[#FF9C2A] border-l-4 border-[#FF9C2A] pl-3 uppercase tracking-wider">
              <GraduationCap className="w-5 h-5 mr-2 text-[#FF9C2A]" />
              Tổng quan
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed font-sans">
              Sốc học tập là tình trạng sinh viên cảm thấy choáng ngợp, căng thẳng quá mức khi đối mặt với sự thay đổi đột ngột trong môi trường giáo dục. Tại FPTU, điều này thường xảy ra vào học kỳ đầu tiên khi các bạn phải làm quen với hệ thống giáo trình quốc tế, các khóa học trực tuyến Coursera và nhịp độ thi cử dồn dập.
            </p>
            <p className="text-sm text-slate-700 leading-relaxed font-sans">
              Sự tác động của cú sốc này không chỉ dừng lại ở kết quả học tập (GPA) mà còn ảnh hưởng trực tiếp đến sức khỏe tinh thần, gây ra cảm giác tự ti, nghi ngờ năng lực bản thân và mất phương hướng nếu không được định hướng sớm.
            </p>
          </div>

          {/* Causes Section */}
          <div className="bg-white p-8 border-4 border-[#E70001] pixel-shadow-red text-black space-y-6">
            <h2 className="flex items-center text-xs font-display font-bold text-[#E70001] border-l-4 border-[#E70001] pl-3 uppercase tracking-wider">
              <AlertTriangle className="w-5 h-5 mr-2 text-[#E70001]" />
              Nguyên nhân chính
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 bg-[#E70001] border border-black"></div>
                  <h4 className="font-display font-bold text-[11px] text-[#FF9C2A] uppercase">Thay đổi môi trường học</h4>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed font-sans">
                  Từ việc được thầy cô "cầm tay chỉ việc" ở cấp 3 sang giảng đường đại học đề cao sự tự giác, tự lực nghiên cứu và thảo luận nhóm hoàn toàn.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 bg-[#E70001] border border-black"></div>
                  <h4 className="font-display font-bold text-[11px] text-[#FF9C2A] uppercase">Khối lượng kiến thức lớn</h4>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed font-sans">
                  Cấu trúc học theo "block" nhanh chóng yêu cầu sinh viên phải tiếp thu một lượng từ vựng chuyên ngành khổng lồ chỉ trong vài tuần ngắn ngủi.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 bg-[#E70001] border border-black"></div>
                  <h4 className="font-display font-bold text-[11px] text-[#FF9C2A] uppercase">Kỹ năng tự học hạn chế</h4>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed font-sans">
                  Sinh viên chưa kịp hình thành phương pháp tự đọc giáo trình Tiếng Anh, ghi chép khoa học và ôn luyện bài trước khi lên giảng đường.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 bg-[#E70001] border border-black"></div>
                  <h4 className="font-display font-bold text-[11px] text-[#FF9C2A] uppercase">Áp lực từ bạn bè học tốt</h4>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed font-sans">
                  Hội chứng "Peer Pressure" khi so sánh bản thân với các bạn siêu ngoại ngữ, giỏi CNTT xung quanh khiến sinh viên cảm thấy bất an.
                </p>
              </div>
            </div>
          </div>

          {/* Solutions Section */}
          <div className="bg-white p-8 border-4 border-[#9DD044] pixel-shadow-green text-black space-y-6">
            <h2 className="flex items-center text-xs font-display font-bold text-[#9DD044] border-l-4 border-[#9DD044] pl-3 uppercase tracking-wider">
              <Lightbulb className="w-5 h-5 mr-2 text-[#9DD044]" />
              Giải pháp đề xuất
            </h2>

            <div className="space-y-4 font-sans">
              <div className="p-4 bg-slate-50 border-2 border-[#9DD044] space-y-2">
                <h4 className="font-display font-bold text-[10px] text-[#FF9C2A] uppercase tracking-wide">1. Chủ động học tập chủ động (Active Learning)</h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Áp dụng phương pháp <span className="font-semibold text-[#FF9C2A]">Active Recall</span> (chủ động gợi nhớ) và <span className="font-semibold text-[#FF9C2A]">Spaced Repetition</span> (lặp lại ngắt quãng). Hãy đặt câu hỏi "Tại sao?" thay vì chỉ học vẹt các khái niệm.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border-2 border-[#9DD044] space-y-2">
                <h4 className="font-display font-bold text-[10px] text-[#FF9C2A] uppercase tracking-wide">2. Quản lý thời gian kỷ luật</h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Lên thời gian biểu cho từng ngày, sử dụng các công cụ đắc lực như Pomodoro để tập trung tuyệt đối. Chia nhỏ các dự án lớn (Assignment, Project) thành các đầu việc nhỏ để triệt tiêu việc dồn deadline sát ngày thi.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border-2 border-[#9DD044] space-y-2">
                <h4 className="font-display font-bold text-[10px] text-[#FF9C2A] uppercase tracking-wide">3. Tận dụng mạng lưới hỗ trợ sinh viên</h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Đừng ngần ngại đặt câu hỏi cho giảng viên qua email hoặc sau giờ học. Tham gia học nhóm cùng bạn bè và tìm kiếm sự hỗ trợ từ các anh chị Mentor (các học sinh khoá trên đạt GPA xuất sắc).
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (Support Tools Widget) */}
        <div className="space-y-6 text-black">
          <div className="bg-white p-6 border-4 border-[#FF9C2A] pixel-shadow-orange text-black space-y-6">
            <h3 className="font-display font-bold text-xs text-[#FF9C2A] uppercase tracking-wider">
              🛠️ Công cụ hỗ trợ
            </h3>
            
            {/* Quick tool switcher buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setActiveTool('pomo')}
                className={`p-3 rounded-none flex flex-col items-center justify-center text-center transition-all border-2 font-display text-[9px] font-bold ${
                  activeTool === 'pomo'
                    ? 'bg-[#FF9C2A] border-[#FF9C2A] text-black border-2 border-black'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-black'
                }`}
              >
                <Clock className="w-5 h-5 mb-1" />
                <span>POMODORO</span>
              </button>

              <button
                onClick={() => setActiveTool('todo')}
                className={`p-3 rounded-none flex flex-col items-center justify-center text-center transition-all border-2 font-display text-[9px] font-bold ${
                  activeTool === 'todo'
                    ? 'bg-[#FF9C2A] border-[#FF9C2A] text-black border-2 border-black'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-black'
                }`}
              >
                <CheckSquare className="w-5 h-5 mb-1" />
                <span>TO-DO LIST</span>
              </button>
            </div>

            {/* Widget Area */}
            <div className="border-t-2 border-slate-200 pt-6">
              {activeTool === 'pomo' && (
                <div className="space-y-5 text-center">
                  {/* Preset Selector */}
                  <div className="space-y-1.5">
                    <span className="text-[8px] font-display font-bold uppercase tracking-wider text-slate-600 block">
                      Cấu hình Pomodoro
                    </span>
                    <div className="flex justify-center border-2 border-slate-200 p-1 bg-slate-50 max-w-[260px] mx-auto">
                      <button
                        onClick={() => changePreset(25)}
                        className={`flex-1 py-1.5 text-[9px] font-display font-bold tracking-wider uppercase transition-all cursor-pointer ${
                          pomoPreset === 25
                            ? 'bg-[#FF9C2A] text-black border border-black'
                            : 'bg-transparent text-slate-500 hover:text-black'
                        }`}
                      >
                        ⏱️ Mốc 25 / 5
                      </button>
                      <button
                        onClick={() => changePreset(50)}
                        className={`flex-1 py-1.5 text-[9px] font-display font-bold tracking-wider uppercase transition-all cursor-pointer ${
                          pomoPreset === 50
                            ? 'bg-[#FF9C2A] text-black border border-black'
                            : 'bg-transparent text-slate-500 hover:text-black'
                        }`}
                      >
                        ⚡ Mốc 50 / 10
                      </button>
                    </div>
                  </div>

                  <div className="inline-block px-3 py-1 bg-slate-100 border-2 border-[#FF9C2A] text-black text-[9px] font-display font-bold tracking-wider uppercase">
                    ⏱️ {pomoMode === 'work' ? 'Thời gian làm việc' : 'Thời gian nghỉ ngơi'}
                  </div>
                  
                  {pomoNotification && (
                    <div className="bg-[#E70001] border-2 border-black text-white text-[10px] p-2 text-center font-retro leading-normal animate-pulse max-w-[260px] mx-auto">
                      {pomoNotification}
                    </div>
                  )}

                  <div className="text-5xl font-mono font-bold tracking-tight text-black">
                    {formatPomoTime(pomoTime)}
                  </div>

                  <div className="flex justify-center space-x-3">
                    <button
                      onClick={togglePomo}
                      className="px-5 py-2.5 bg-[#FF9C2A] hover:bg-[#FF9C2A]/90 border-2 border-black text-black font-display font-bold text-[10px] uppercase flex items-center space-x-1 pixel-shadow-orange cursor-pointer transition-all active:scale-95"
                    >
                      {isPomoRunning ? (
                        <>
                          <Pause className="w-4 h-4 mr-1" /> Tạm dừng
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-1" /> Bắt đầu
                        </>
                      )}
                    </button>
                    
                    <button
                      onClick={resetPomo}
                      className="p-2.5 bg-slate-100 border-2 border-black hover:bg-slate-200 text-black cursor-pointer transition-all active:scale-95"
                      title="Reset"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {activeTool === 'todo' && (
                <div className="space-y-4">
                  {/* User identification badge / alert */}
                  {currentUser ? (
                    <div className="flex items-center space-x-2 p-2 bg-slate-50 border-2 border-slate-200 text-[9px] font-display text-slate-700">
                      <img
                        src={currentUser.avatarSeed}
                        alt={currentUser.fullName}
                        className="w-5 h-5 bg-white border border-slate-300 shrink-0"
                      />
                      <span>
                        Đồng bộ: {currentUser.fullName}
                      </span>
                    </div>
                  ) : (
                    <div className="p-2.5 bg-white border-2 border-[#E70001] text-[#E70001] text-[9px] leading-normal font-retro">
                      ⚠️ Danh sách Khách. Tiến trình chỉ lưu tạm ở trình duyệt này.
                    </div>
                  )}

                  {/* Task list */}
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                    {tasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex items-center justify-between p-2.5 bg-white border-2 border-slate-200 hover:border-[#FF9C2A] transition-all text-xs"
                      >
                        <label className="flex items-center space-x-2.5 cursor-pointer flex-1">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTask(task.id)}
                            className="w-4 h-4 text-[#FF9C2A] focus:ring-[#FF9C2A] border-slate-300 rounded-none cursor-pointer accent-[#FF9C2A]"
                          />
                          <span className={`font-sans font-medium ${task.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                            {task.text}
                          </span>
                        </label>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="text-slate-500 hover:text-[#E70001] p-1 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                    {tasks.length === 0 && (
                      <p className="text-center text-xs text-slate-500 py-6">Không có đầu việc nào. Hãy thêm việc mới!</p>
                    )}
                  </div>

                  {/* Task add form */}
                  <form onSubmit={addTask} className="flex gap-2 pt-2 border-t border-slate-200">
                    <input
                      type="text"
                      placeholder="Thêm nhiệm vụ mới..."
                      value={newTaskText}
                      onChange={(e) => setNewTaskText(e.target.value)}
                      className="flex-1 px-3 py-2 border-2 border-slate-300 bg-white text-black text-xs focus:outline-none focus:border-[#FF9C2A] font-sans"
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 bg-[#FF9C2A] hover:bg-[#FF9C2A]/80 text-black font-display font-bold text-[10px] uppercase border-2 border-black cursor-pointer transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              )}
            </div>

            <div className="border-t-2 border-slate-200 pt-6 space-y-3 font-display text-[9px] uppercase">
              <h4 className="text-[#FF9C2A] font-bold tracking-wider">[ Tài nguyên ngoài đề xuất ]</h4>
              <div className="space-y-2 text-xs normal-case">
                <a
                  href="https://calendar.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 bg-slate-50 border-2 border-slate-200 hover:border-black transition-all group"
                >
                  <span className="font-semibold text-slate-700 flex items-center gap-2">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg"
                      alt="Google Calendar"
                      className="w-4 h-4 object-contain"
                      referrerPolicy="no-referrer"
                    />
                    Google Calendar
                  </span>
                  <span className="text-[9px] text-slate-500 group-hover:text-black font-bold font-display uppercase">[ Mở ↗ ]</span>
                </a>
                <a
                  href="https://notion.so"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 bg-slate-50 border-2 border-slate-200 hover:border-black transition-all group"
                >
                  <span className="font-semibold text-slate-700 flex items-center gap-2">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/e/e9/Notion-logo.svg"
                      alt="Notion"
                      className="w-4 h-4 object-contain"
                      referrerPolicy="no-referrer"
                    />
                    Notion
                  </span>
                  <span className="text-[9px] text-slate-500 group-hover:text-black font-bold font-display uppercase">[ Mở ↗ ]</span>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
