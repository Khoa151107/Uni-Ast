import React, { useState, useEffect } from 'react';
import { quizQuestions } from '../data/quizData';
import { ActiveView, QuizResult } from '../types';
import { ArrowLeft, ArrowRight, RotateCcw, AlertTriangle, ShieldCheck, GraduationCap, Users, Heart, Award, Sparkles, HelpCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface QuizViewProps {
  setView: (view: ActiveView) => void;
}

export default function QuizView({ setView }: QuizViewProps) {
  const { currentUser } = useAuth();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [questionId: number]: number }>({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const totalQuestions = quizQuestions.length;

  // Auto-load saved result when user switches
  useEffect(() => {
    const key = `fptu_quiz_result_${currentUser ? currentUser.id : 'guest'}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        setResult(JSON.parse(saved));
        setQuizFinished(true);
      } catch (e) {
        console.error(e);
      }
    } else {
      setResult(null);
      setQuizFinished(false);
      setAnswers({});
      setCurrentQuestionIndex(0);
    }
  }, [currentUser]);

  const handleSelectOption = (score: number) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: score
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResults();
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateResults = () => {
    // Group and average scores by category
    let studySum = 0, studyCount = 0;
    let socialSum = 0, socialCount = 0;
    let extraSum = 0, extraCount = 0;
    let psychSum = 0, psychCount = 0;

    quizQuestions.forEach((q) => {
      const score = answers[q.id] || 3; // default to neutral if unanswered
      if (q.category === 'study') {
        studySum += score;
        studyCount++;
      } else if (q.category === 'social') {
        socialSum += score;
        socialCount++;
      } else if (q.category === 'extra') {
        extraSum += score;
        extraCount++;
      } else if (q.category === 'psych') {
        psychSum += score;
        psychCount++;
      }
    });

    const totalScore = studySum + socialSum + extraSum + psychSum;
    const averageScore = Number((totalScore / 32).toFixed(2));

    // Convert category averages to percentage out of 100 for display
    const studyScore = studyCount > 0 ? (studySum / (studyCount * 5)) * 100 : 0;
    const socialScore = socialCount > 0 ? (socialSum / (socialCount * 5)) * 100 : 0;
    const extraScore = extraCount > 0 ? (extraSum / (extraCount * 5)) * 100 : 0;
    const psychScore = psychCount > 0 ? (psychSum / (psychCount * 5)) * 100 : 0;

    // Overall shock classification based on averageScore:
    // 1.00 – 2.00: Thích nghi tốt
    // 2.01 – 3.00: Sốc văn hóa mức nhẹ
    // 3.01 – 4.00: Sốc văn hóa mức trung bình
    // 4.01 – 5.00: Sốc văn hóa mức cao
    let overallShockLevel: 'good' | 'mild' | 'moderate' | 'severe' = 'mild';
    if (averageScore <= 2.00) {
      overallShockLevel = 'good';
    } else if (averageScore <= 3.00) {
      overallShockLevel = 'mild';
    } else if (averageScore <= 4.00) {
      overallShockLevel = 'moderate';
    } else {
      overallShockLevel = 'severe';
    }

    const calculatedResult: QuizResult = {
      studyScore: Math.round(studyScore),
      socialScore: Math.round(socialScore),
      extraScore: Math.round(extraScore),
      psychScore: Math.round(psychScore),
      overallShockLevel,
      averageScore
    };

    setResult(calculatedResult);
    setQuizFinished(true);

    const key = `fptu_quiz_result_${currentUser ? currentUser.id : 'guest'}`;
    localStorage.setItem(key, JSON.stringify(calculatedResult));
  };

  const resetQuiz = () => {
    const key = `fptu_quiz_result_${currentUser ? currentUser.id : 'guest'}`;
    localStorage.removeItem(key);
    setAnswers({});
    setCurrentQuestionIndex(0);
    setQuizFinished(false);
    setResult(null);
  };

  const currentSelection = answers[currentQuestion?.id];

  if (quizFinished && result) {
    // Determine highest shock dimension
    const scores = [
      { id: 'study', label: 'Sốc học tập', score: result.studyScore, color: 'text-[#FF9C2A]', bg: 'bg-[#FF9C2A]', view: 'study-shock' },
      { id: 'social', label: 'Sốc xã hội', score: result.socialScore, color: 'text-[#FF9C2A]', bg: 'bg-[#FF9C2A]', view: 'social-shock' },
      { id: 'extra', label: 'Sốc ngoại khoá & gắn kết', score: result.extraScore, color: 'text-[#FF9C2A]', bg: 'bg-[#FF9C2A]', view: 'extra-shock' },
      { id: 'psych', label: 'Sốc tâm lý & định hướng', score: result.psychScore, color: 'text-[#FF9C2A]', bg: 'bg-[#FF9C2A]', view: 'psych-shock' }
    ];
    const sortedScores = [...scores].sort((a, b) => b.score - a.score);
    const primaryShock = sortedScores[0];

    const displayAverage = result.averageScore || Number(((result.studyScore + result.socialScore + result.extraScore + result.psychScore) / 20).toFixed(2));

    // Content based on level
    const levelInfo = {
      good: {
        title: 'Thích nghi tốt',
        badgeColor: 'bg-[#9DD044]',
        textColor: 'text-[#9DD044]',
        desc: 'Xin chúc mừng! Bạn đang làm chủ cuộc chơi cực kỳ tốt. Môi trường mới, cách học mới hay bạn bè mới dường như chẳng làm khó được bạn. Bạn năng động, tự tin và tràn đầy năng lượng.',
        advice: [
          'Phong độ này là quá tuyệt vời, hãy cứ tiếp tục phát huy nhé!',
          'Đừng ngại chia sẻ năng lượng tích cực này bằng việc chủ động giúp đỡ các bạn xung quanh. Một lời hỏi han hay rủ rê đi ăn trưa từ bạn có khi lại là "phao cứu sinh" cho một người bạn đang chật vật thích nghi đấy.'
        ]
      },
      mild: {
        title: 'Sốc văn hóa mức nhẹ',
        badgeColor: 'bg-[#F6EB4B]',
        textColor: 'text-[#FF9C2A]',
        desc: 'Bạn đang ở giai đoạn "chuyển giao". Đôi lúc bạn sẽ thấy hơi bỡ ngỡ với cách học tự lập hoặc thèm một bữa cơm nhà, nhưng nhìn chung bạn vẫn kiểm soát tốt mọi thứ.',
        advice: [
          '"Ngơ ngác" lúc đầu là đặc sản của tân sinh viên, chuyện bình thường như cân đường hộp sữa thôi!',
          'Đừng ép bản thân phải hoàn hảo ngay lập tức. Hãy bắt đầu từ những việc nhỏ: hôm nay chủ động bắt chuyện với người ngồi cạnh, ngày mai thử lập một thời khóa biểu tự học đơn giản. Cứ đi từng bước một, bạn đang làm rất tốt rồi!'
        ]
      },
      moderate: {
        title: 'Sốc văn hóa mức trung bình',
        badgeColor: 'bg-[#FF9C2A]',
        textColor: 'text-[#FF9C2A]',
        desc: 'Bạn đang thực sự cảm thấy áp lực. Điểm số không như ý, bài tập dồn dập, cảm giác lạc lõng trong lớp học đông người hay nỗi nhớ nhà đang đè nặng lên vai bạn. Bạn bắt đầu nghi ngờ năng lực của bản thân.',
        advice: [
          'Hít một hơi thật sâu nào! Thả lỏng cơ thể và cho phép bản thân được mệt mỏi một chút.',
          'Đừng "gồng" một mình nữa. Hãy thử nhắn tin tâm sự với đứa bạn thân ở quê, hoặc hẹn một anh/chị khóa trên đi cafe để xin ít "bí kíp" sinh tồn qua mùa thi. Bạn sẽ nhận ra ai lên đại học cũng từng trải qua cảm giác này, bạn không hề cô đơn đâu!'
        ]
      },
      severe: {
        title: 'Sốc văn hóa mức cao',
        badgeColor: 'bg-[#E70001]',
        textColor: 'text-[#E70001]',
        desc: 'Bạn đang rơi vào trạng thái khủng hoảng và kiệt sức cả về tinh thần lẫn thể chất. Bạn muốn trốn chạy, ngại giao tiếp và thậm chí có suy nghĩ muốn bỏ học vì quá ngợp.',
        advice: [
          'Hãy dừng việc tự trách móc bản thân lại ngay nhé. Nhận ra mình đang bất ổn đã là một sự dũng cảm lớn rồi!',
          'Lúc này, bạn rất cần một điểm tựa. Đừng im lặng chịu đựng: hãy chủ động liên hệ với Thầy/Cô cố vấn học tập, hoặc tìm đến Phòng tư vấn tâm lý học đường của trường. Việc trò chuyện với chuyên gia sẽ giúp bạn "gỡ rối" mớ bòng bong trong lòng một cách an toàn và nhẹ nhàng nhất. Mọi chuyện rồi sẽ ổn thôi!'
        ]
      }
    };

    const currentLevel = levelInfo[result.overallShockLevel];

    return (
      <div className="max-w-4xl mx-auto space-y-10 pb-16 animate-fade-in mt-6 font-retro">
        
        {/* Results Banner Header */}
        <div className="bg-white p-8 sm:p-12 border-4 border-black pixel-shadow-orange text-center space-y-6 text-black">
          <div className="mx-auto w-16 h-16 bg-white border-2 border-black flex items-center justify-center text-3xl">
            🏆
          </div>

          <div className="space-y-4">
            <span className="text-[10px] bg-[#FF9C2A] text-black font-display font-bold px-3 py-1 border border-black uppercase tracking-widest">
              [ KẾT QUẢ ĐÁNH GIÁ CỦA BẠN ]
            </span>
            <h1 className="font-display font-bold text-lg sm:text-xl text-black leading-normal uppercase">
              Mức độ thích nghi: {' '}
              <span className={currentLevel.textColor}>
                {currentLevel.title}
              </span>
            </h1>
            
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-slate-50 border-2 border-black text-xs font-mono font-bold">
              <span>ĐIỂM TRUNG BÌNH:</span>
              <span className="text-sm text-[#FF9C2A]">{displayAverage.toFixed(2)} / 5.00</span>
            </div>
            
            <p className="text-sm sm:text-base text-slate-700 max-w-xl mx-auto leading-relaxed pt-2">
              {currentLevel.desc}
            </p>
          </div>
        </div>

        {/* Shock Breakdown Progress Bars & Advice */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-white p-8 border-4 border-black pixel-shadow-orange space-y-6 text-black">
            <h3 className="font-display font-bold text-xs text-[#FF9C2A] flex items-center uppercase tracking-wider">
              📊 Chi tiết từng chỉ số sốc
            </h3>

            <div className="space-y-5">
              {scores.map((item) => (
                <div key={item.id} className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-700 font-display text-[9px] uppercase">{item.label}</span>
                    <span className={`${item.color} font-display text-[9px]`}>{item.score}%</span>
                  </div>
                  <div className="h-4 w-full bg-slate-100 border-2 border-black overflow-hidden">
                    <div 
                      className={`h-full ${item.bg} transition-all duration-1000`}
                      style={{ width: `${item.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lời khuyên chân thành card */}
          <div className="bg-white border-4 border-[#FF9C2A] p-8 pixel-shadow-orange flex flex-col justify-between space-y-6 text-black">
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 bg-[#FF9C2A] border border-black text-black text-[9px] font-bold tracking-widest uppercase font-display">
                💬 LỜI KHUYÊN CHÂN THÀNH
              </span>
              <div className="space-y-3 pt-2">
                {currentLevel.advice.map((adviceText, i) => (
                  <div key={i} className="flex items-start space-x-2">
                    <span className="text-lg text-[#FF9C2A] shrink-0">💡</span>
                    <p className="text-xs sm:text-sm text-slate-700 font-sans leading-relaxed">{adviceText}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-4 font-display">
              {result.overallShockLevel !== 'good' && (
                <div className="p-3 bg-slate-50 border-2 border-dashed border-[#FF9C2A] text-xs sm:text-sm leading-relaxed text-slate-600 font-sans mb-2">
                  👉 Đề xuất đặc biệt: Hãy xem chuyên trang giải pháp cho <strong>{primaryShock.label}</strong> để khắc phục hiệu quả nhất.
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                {result.overallShockLevel !== 'good' ? (
                  <button
                    onClick={() => setView(primaryShock.view as ActiveView)}
                    className="flex-1 py-3 px-4 bg-[#FF9C2A] hover:bg-[#FF9C2A]/80 border-2 border-black text-black text-[10px] font-bold uppercase transition-all flex items-center justify-center cursor-pointer pixel-shadow-orange"
                  >
                    Mở giải pháp cụ thể <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => setView('home')}
                    className="flex-1 py-3 px-4 bg-[#FF9C2A] hover:bg-[#FF9C2A]/80 border-2 border-black text-black text-[10px] font-bold uppercase transition-all flex items-center justify-center cursor-pointer pixel-shadow-orange"
                  >
                    Về Trang Chủ <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </button>
                )}
                
                <button
                  onClick={resetQuiz}
                  className="px-4 py-3 bg-white hover:bg-slate-50 border-2 border-black text-black text-[10px] font-bold uppercase transition-all flex items-center justify-center cursor-pointer pixel-shadow-orange"
                >
                  <RotateCcw className="w-3.5 h-3.5 mr-1.5" /> Làm lại
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto pt-6 pb-16 animate-fade-in font-retro text-lg">
      {/* Quiz Container Layout */}
      <div className="bg-white border-4 border-[#FF9C2A] p-8 sm:p-12 pixel-shadow-orange space-y-8 text-black">
        
        {/* Step Progression Header */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-xs font-bold text-slate-600">
            <span className="tracking-widest uppercase font-display text-[9px] text-[#FF9C2A]">[ QUESTION PROGRESSION ]</span>
            <span className="font-display text-[9px] text-black">CÂU HỎI {currentQuestionIndex + 1} / {totalQuestions}</span>
          </div>
          
          {/* Real styled progress bar */}
          <div className="h-4 w-full bg-slate-100 border-2 border-black overflow-hidden">
            <div 
              className="h-full bg-[#FF9C2A] transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Dynamic Question Title */}
        <div className="space-y-3">
          <h2 className="font-display font-bold text-xs sm:text-sm text-[#FF9C2A] leading-relaxed uppercase tracking-wider">
            {currentQuestion.text}
          </h2>
          <p className="text-sm text-slate-600 font-retro">
            Hãy chọn phương án phản ánh đúng nhất trải nghiệm hiện tại của bạn.
          </p>
        </div>

        {/* The 5 standard options with boxed numbers */}
        <div className="space-y-4 pt-2">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = currentSelection === option.score;
            return (
              <button
                key={idx}
                id={`quiz-option-${option.score}`}
                onClick={() => handleSelectOption(option.score)}
                className={`w-full text-left p-4 border-4 flex items-center transition-all ${
                  isSelected
                    ? 'bg-white border-[#FF9C2A] text-[#FF9C2A]'
                    : 'bg-white border-slate-200 text-slate-800 hover:border-black hover:text-black'
                }`}
              >
                {/* Square Boxed number indicator on the left */}
                <span className={`w-8 h-8 font-display font-bold text-xs flex items-center justify-center mr-4 transition-all border-2 ${
                  isSelected
                    ? 'bg-[#FF9C2A] border-black text-black'
                    : 'bg-slate-100 border-slate-300 text-slate-600'
                }`}>
                  {idx + 1}
                </span>
                <span className="text-sm font-semibold">{option.text}</span>
              </button>
            );
          })}
        </div>

        {/* Navigation Action Footer row */}
        <div className="flex justify-between items-center pt-6 border-t-2 border-slate-200">
          <button
            onClick={handleBack}
            disabled={currentQuestionIndex === 0}
            className={`flex items-center text-[10px] font-display font-bold px-4 py-2.5 border-2 transition-all ${
              currentQuestionIndex === 0
                ? 'opacity-0 pointer-events-none'
                : 'bg-white text-black hover:text-[#FF9C2A] border-black hover:bg-black/5 cursor-pointer'
            }`}
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            QUAY LẠI
          </button>

          <button
            onClick={handleNext}
            disabled={currentSelection === undefined}
            className={`flex items-center text-[10px] font-display font-bold px-6 py-3 border-2 transition-all ${
              currentSelection === undefined
                ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed shadow-none'
                : 'bg-[#FF9C2A] hover:bg-[#FF9C2A]/90 border-black text-black cursor-pointer pixel-shadow-orange'
            }`}
          >
            {currentQuestionIndex === totalQuestions - 1 ? 'HOÀN THÀNH' : 'TIẾP THEO'}
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
