import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Language, LanguageProgress, XP_REWARDS } from '../types';
import { defaultUserData } from '../data/courses';

interface AuthContextType {
  user: User;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, nickname: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  addXP: (amount: number, language: Language) => void;
  updateLanguageProgress: (language: Language, updates: Partial<LanguageProgress>) => void;
  unlockAchievement: (achievementId: string) => void;
  setDailyGoal: (language: Language, goal: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'lingua_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(defaultUserData as User);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUser(parsed);
      } catch {
        setUser(defaultUserData as User);
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    }
  }, [user, isLoading]);

  const getLanguageProgress = (language: Language): LanguageProgress => {
    const existing = user.languages.find(l => l.language === language);
    if (existing) return existing;
    
    return {
      language,
      level: 'beginner',
      xp: 0,
      wordsLearned: 0,
      grammarCompleted: 0,
      speakingScore: 0,
      listeningScore: 0,
      dailyGoal: 50,
      todayXP: 0,
      lastStudyDate: '',
      completedLessons: []
    };
  };

  const updateLanguageInUser = (language: Language, updates: Partial<LanguageProgress>) => {
    setUser(prev => {
      const langIndex = prev.languages.findIndex(l => l.language === language);
      const updatedLanguages = [...prev.languages];
      
      if (langIndex >= 0) {
        updatedLanguages[langIndex] = { ...updatedLanguages[langIndex], ...updates };
      } else {
        updatedLanguages.push({ ...getLanguageProgress(language), ...updates });
      }
      
      const totalXP = updatedLanguages.reduce((sum, l) => sum + l.xp, 0);
      
      return { ...prev, languages: updatedLanguages, totalXP };
    });
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (email && password.length >= 6) {
      const userData: User = {
        id: `user_${Date.now()}`,
        email,
        nickname: email.split('@')[0],
        avatar: '👤',
        role: 'user',
        languages: [],
        totalXP: 0,
        streak: 0,
        achievements: [],
        createdAt: new Date().toISOString(),
        lastStudyDate: ''
      };
      
      setUser(userData);
      return true;
    }
    return false;
  };

  const register = async (email: string, password: string, nickname: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (email && password.length >= 6 && nickname) {
      const userData: User = {
        id: `user_${Date.now()}`,
        email,
        nickname,
        avatar: '👤',
        role: 'user',
        languages: [],
        totalXP: 0,
        streak: 0,
        achievements: [],
        createdAt: new Date().toISOString(),
        lastStudyDate: ''
      };
      
      setUser(userData);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(defaultUserData as User);
    localStorage.removeItem(STORAGE_KEY);
  };

  const updateUser = (updates: Partial<User>) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  const addXP = (amount: number, language: Language) => {
    const today = new Date().toISOString().split('T')[0];
    
    setUser(prev => {
      const langIndex = prev.languages.findIndex(l => l.language === language);
      const updatedLanguages = [...prev.languages];
      
      if (langIndex >= 0) {
        const currentLang = updatedLanguages[langIndex];
        updatedLanguages[langIndex] = {
          ...currentLang,
          xp: currentLang.xp + amount,
          todayXP: currentLang.todayXP + amount,
          lastStudyDate: today
        };
      } else {
        updatedLanguages.push({
          language,
          level: 'beginner',
          xp: amount,
          wordsLearned: 0,
          grammarCompleted: 0,
          speakingScore: 0,
          listeningScore: 0,
          dailyGoal: 50,
          todayXP: amount,
          lastStudyDate: today,
          completedLessons: []
        });
      }
      
      const totalXP = updatedLanguages.reduce((sum, l) => sum + l.xp, 0);
      
      return { ...prev, languages: updatedLanguages, totalXP };
    });
  };

  const updateLanguageProgress = (language: Language, updates: Partial<LanguageProgress>) => {
    updateLanguageInUser(language, updates);
  };

  const unlockAchievement = (achievementId: string) => {
    setUser(prev => {
      if (prev.achievements.includes(achievementId)) return prev;
      return { ...prev, achievements: [...prev.achievements, achievementId] };
    });
  };

  const setDailyGoal = (language: Language, goal: number) => {
    updateLanguageInUser(language, { dailyGoal: goal });
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: user.role !== 'guest',
      login,
      register,
      logout,
      updateUser,
      addXP,
      updateLanguageProgress,
      unlockAchievement,
      setDailyGoal
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
