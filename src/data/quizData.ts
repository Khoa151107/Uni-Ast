import { QuizQuestion } from '../types';

// Normal options helper (a:1, b:2, c:3, d:4, e:5)
const normalOptions = [
  { text: "Hoàn toàn không đồng ý", score: 1 },
  { text: "Không đồng ý", score: 2 },
  { text: "Trung lập", score: 3 },
  { text: "Đồng ý", score: 4 },
  { text: "Hoàn toàn đồng ý", score: 5 }
];

// Reversed options helper (a:5, b:4, c:3, d:2, e:1)
const reversedOptions = [
  { text: "Hoàn toàn không đồng ý", score: 5 },
  { text: "Không đồng ý", score: 4 },
  { text: "Trung lập", score: 3 },
  { text: "Đồng ý", score: 2 },
  { text: "Hoàn toàn đồng ý", score: 1 }
];

export const quizQuestions: QuizQuestion[] = [
  // SECTION 1: STUDY SHOCK (1 - 8)
  {
    id: 1,
    text: "Tôi gặp khó khăn trong việc theo kịp khối lượng bài tập ở đại học.",
    category: 'study',
    options: normalOptions
  },
  {
    id: 2,
    text: "Phương pháp học ở đại học khác xa những gì tôi từng quen thuộc.",
    category: 'study',
    options: normalOptions
  },
  {
    id: 3,
    text: "Tôi thường không biết cách chuẩn bị cho các bài kiểm tra hoặc thi ở đại học.",
    category: 'study',
    options: normalOptions
  },
  {
    id: 4,
    text: "Tôi cảm thấy áp lực trước yêu cầu tự học của chương trình đại học.",
    category: 'study',
    options: normalOptions
  },
  {
    id: 5,
    text: "Tôi dễ mất tập trung trong các buổi học ở đại học.",
    category: 'study',
    options: normalOptions
  },
  {
    id: 6,
    text: "Tôi cảm thấy tự tin về khả năng học tập của mình tại trường đại học.",
    category: 'study',
    options: reversedOptions
  },
  {
    id: 7,
    text: "Tôi biết cách tìm kiếm sự hỗ trợ học tập khi cần.",
    category: 'study',
    options: reversedOptions
  },
  {
    id: 8,
    text: "Tôi cảm thấy mình đang thích nghi tốt với môi trường học tập mới.",
    category: 'study',
    options: reversedOptions
  },

  // SECTION 2: SOCIAL SHOCK (9 - 16)
  {
    id: 9,
    text: "Tôi cảm thấy khó kết bạn trong môi trường đại học.",
    category: 'social',
    options: normalOptions
  },
  {
    id: 10,
    text: "Tôi thường cảm thấy lạc lõng giữa các bạn cùng lớp.",
    category: 'social',
    options: normalOptions
  },
  {
    id: 11,
    text: "Tôi gặp khó khăn khi tham gia các hoạt động tập thể.",
    category: 'social',
    options: normalOptions
  },
  {
    id: 12,
    text: "Tôi cảm thấy mình thuộc về cộng đồng sinh viên của trường.",
    category: 'social',
    options: reversedOptions
  },
  {
    id: 13,
    text: "Tôi ngại giao tiếp với giảng viên hoặc cán bộ nhà trường.",
    category: 'social',
    options: normalOptions
  },
  {
    id: 14,
    text: "Tôi cảm thấy thoải mái khi làm việc nhóm với các bạn mới.",
    category: 'social',
    options: reversedOptions
  },
  {
    id: 15,
    text: "Tôi thường cảm thấy cô đơn kể từ khi vào đại học.",
    category: 'social',
    options: normalOptions
  },
  {
    id: 16,
    text: "Tôi có ít nhất một nhóm bạn khiến tôi cảm thấy được hỗ trợ.",
    category: 'social',
    options: reversedOptions
  },

  // SECTION 3: PSYCHOLOGICAL SHOCK (17 - 24)
  {
    id: 17,
    text: "Tôi thường xuyên cảm thấy căng thẳng khi nghĩ về cuộc sống đại học.",
    category: 'psych',
    options: normalOptions
  },
  {
    id: 18,
    text: "Tôi cảm thấy nhớ nhà hoặc nhớ môi trường cũ.",
    category: 'psych',
    options: normalOptions
  },
  {
    id: 19,
    text: "Tôi thường lo lắng về việc mình có thể thích nghi với đại học hay không.",
    category: 'psych',
    options: normalOptions
  },
  {
    id: 20,
    text: "Tôi cảm thấy mất cân bằng giữa học tập và cuộc sống cá nhân.",
    category: 'psych',
    options: normalOptions
  },
  {
    id: 21,
    text: "Tôi dễ cảm thấy buồn hoặc thất vọng kể từ khi vào đại học.",
    category: 'psych',
    options: normalOptions
  },
  {
    id: 22,
    text: "Tôi cảm thấy kiểm soát tốt cảm xúc của mình.",
    category: 'psych',
    options: reversedOptions
  },
  {
    id: 23,
    text: "Tôi cảm thấy hài lòng với cuộc sống hiện tại ở đại học.",
    category: 'psych',
    options: reversedOptions
  },
  {
    id: 24,
    text: "Tôi thường xuyên cảm thấy kiệt sức về mặt tinh thần.",
    category: 'psych',
    options: normalOptions
  },

  // SECTION 4: EXTRA-CURRICULAR / INSTITUTIONAL SHOCK (25 - 32)
  {
    id: 25,
    text: "Tôi cảm thấy quyết định học tại trường này là đúng đắn.",
    category: 'extra',
    options: reversedOptions
  },
  {
    id: 26,
    text: "Tôi cảm thấy gắn bó với trường đại học của mình.",
    category: 'extra',
    options: reversedOptions
  },
  {
    id: 27,
    text: "Tôi từng nghĩ đến việc chuyển trường hoặc bỏ học.",
    category: 'extra',
    options: normalOptions
  },
  {
    id: 28,
    text: "Tôi cảm thấy tự hào khi là sinh viên của trường.",
    category: 'extra',
    options: normalOptions
  },
  {
    id: 29,
    text: "Tôi cảm thấy các giá trị của trường phù hợp với bản thân.",
    category: 'extra',
    options: reversedOptions
  },
  {
    id: 30,
    text: "Nếu được chọn lại, tôi vẫn muốn học tại trường này.",
    category: 'extra',
    options: reversedOptions
  },
  {
    id: 31,
    text: "Tôi cảm thấy thoải mái khi tham gia các hoạt động học tập và ngoại khóa của trường.",
    category: 'extra',
    options: normalOptions
  },
  {
    id: 32,
    text: "Tôi cảm thấy được nhà trường hỗ trợ khi gặp khó khăn trong quá trình học tập và thích nghi.",
    category: 'extra',
    options: normalOptions
  }
];
