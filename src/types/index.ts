export type Language = 'en' | 'ja' | 'ko';
export type Level = 'beginner' | 'intermediate' | 'advanced';
export type ModuleType = 'vocabulary' | 'grammar' | 'speaking' | 'listening';
export type UserRole = 'guest' | 'user' | 'vip';
export type AchievementCategory = 'streak' | 'vocabulary' | 'grammar' | 'speaking' | 'listening' | 'social';

export interface User {
  id: string;
  email: string;
  nickname: string;
  avatar: string;
  role: UserRole;
  languages: LanguageProgress[];
  totalXP: number;
  streak: number;
  achievements: string[];
  createdAt: string;
  lastStudyDate: string;
}

export interface LanguageProgress {
  language: Language;
  level: Level;
  xp: number;
  wordsLearned: number;
  grammarCompleted: number;
  speakingScore: number;
  listeningScore: number;
  dailyGoal: number;
  todayXP: number;
  lastStudyDate: string;
  completedLessons: string[];
}

export interface Course {
  id: string;
  language: Language;
  level: Level;
  title: string;
  description: string;
  icon: string;
  lessons: Lesson[];
  requiredXP: number;
  totalLessons: number;
}

export interface Lesson {
  id: string;
  title: string;
  type: ModuleType;
  content: LessonContent;
  exercises: Exercise[];
  xpReward: number;
  duration: number;
}

export interface LessonContent {
  title: string;
  description: string;
  examples?: string[];
  audioUrl?: string;
  imageUrl?: string;
  text?: string;
}

export interface Exercise {
  id: string;
  type: 'flashcard' | 'multiple-choice' | 'fill-blank' | 'listening' | 'speaking';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  audioUrl?: string;
  imageUrl?: string;
  hint?: string;
  explanation?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirement: number;
  xpReward: number;
  category: AchievementCategory;
  progress?: number;
  unlockedAt?: string;
}

export interface CommunityPost {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  language: Language;
  title: string;
  content: string;
  likes: number;
  comments: number;
  createdAt: string;
  tags: string[];
}

export interface DailyActivity {
  date: string;
  xp: number;
  minutes: number;
}

export const LANGUAGE_NAMES: Record<Language, string> = {
  en: '英语',
  ja: '日语',
  ko: '韩语'
};

export const LEVEL_NAMES: Record<Level, string> = {
  beginner: '入门',
  intermediate: '进阶',
  advanced: '精通'
};

export const MODULE_NAMES: Record<ModuleType, string> = {
  vocabulary: '单词记忆',
  grammar: '语法练习',
  speaking: '口语跟读',
  listening: '听力训练'
};

export const LANGUAGE_COLORS: Record<Language, string> = {
  en: '#10B981',
  ja: '#F43F5E',
  ko: '#3B82F6'
};

export const LEVEL_THRESHOLDS = {
  beginner: 0,
  intermediate: 500,
  advanced: 1500,
  master: 3000
};

export const XP_REWARDS = {
  vocabulary: 10,
  grammar: 15,
  speaking: 20,
  listening: 15,
  dailyBonus: 50,
  streakBonus: 100
};
