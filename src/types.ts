export type ActiveView = 
  | 'home'
  | 'study-shock'
  | 'social-shock'
  | 'extra-shock'
  | 'psych-shock'
  | 'forum'
  | 'quiz';

export interface ForumComment {
  id: string;
  author: string;
  avatarSeed: string;
  content: string;
  createdAt: string;
  userId?: string;
}

export interface ForumPost {
  id: string;
  author: string;
  avatarSeed: string;
  title?: string;
  content: string;
  category: 'general' | 'study' | 'social' | 'extra' | 'psych';
  likes: number;
  likedByMe?: boolean;
  comments: ForumComment[];
  createdAt: string;
  isOwn?: boolean;
  userId?: string;
}

export interface User {
  id: string;
  username: string;
  fullName: string;
  avatarSeed: string;
  createdAt: string;
}

export interface QuizQuestion {
  id: number;
  text: string;
  category: 'study' | 'social' | 'extra' | 'psych';
  options: {
    score: number; // 5 = high shock, 1 = low shock
    text: string;
  }[];
}

export interface QuizResult {
  studyScore: number;
  socialScore: number;
  extraScore: number;
  psychScore: number;
  overallShockLevel: 'good' | 'mild' | 'moderate' | 'severe';
  averageScore?: number;
}

export interface FPTUClub {
  id: string;
  name: string;
  category: 'academic' | 'art' | 'sport' | 'volunteer';
  description: string;
  membersCount: number;
  logo: string;
}
