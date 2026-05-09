import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, FileText, Mic, Headphones, Trophy, 
  ChevronRight, Lock, CheckCircle, Flame, Sparkles,
  ArrowLeft, GraduationCap, Target, Calendar
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { LANGUAGE_NAMES, LEVEL_NAMES, MODULE_NAMES, LANGUAGE_COLORS, Level, ModuleType } from '../types';
import { getCourseByLanguage, getAllCourses } from '../data/courses';
import FlashCard from '../components/learn/FlashCard';
import GrammarQuiz from '../components/learn/GrammarQuiz';
import SpeakingRecorder from '../components/learn/SpeakingRecorder';
import ListeningPlayer from '../components/learn/ListeningPlayer';
import ProgressBar from '../components/common/Progress';

const modules = [
  { id: 'vocabulary' as ModuleType, icon: BookOpen, color: '#10B981', description: '智能闪卡，间隔重复记忆' },
  { id: 'grammar' as ModuleType, icon: FileText, color: '#6366F1', description: '多样题型，语法解析' },
  { id: 'speaking' as ModuleType, icon: Mic, color: '#F43F5E', description: '口语跟读，AI评分' },
  { id: 'listening' as ModuleType, icon: Headphones, color: '#3B82F6', description: '听力训练，多倍速播放' }
];

export default function LearnPage() {
  const { language = 'en', module: currentModule } = useParams<{ language?: string; module?: string }>();
  const navigate = useNavigate();
  const { user, addXP, updateLanguageProgress } = useAuth();
  
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [showModules, setShowModules] = useState(!currentModule);
  
  const lang = (language || 'en') as 'en' | 'ja' | 'ko';
  const langColor = LANGUAGE_COLORS[lang];
  
  const courses = getCourseByLanguage(lang);
  const langProgress = user.languages.find(l => l.language === lang);
  
  const totalLessons = courses.reduce((sum, c) => sum + c.lessons.length, 0);
  const completedLessons = langProgress?.completedLessons.length || 0;
  const progressPercent = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  const handleLessonComplete = (lessonId: string, xpEarned: number) => {
    if (currentModule) {
      addXP(xpEarned, lang);
      
      const updatedLessons = langProgress 
        ? [...langProgress.completedLessons, lessonId]
        : [lessonId];
      
      updateLanguageProgress(lang, {
        completedLessons: updatedLessons,
        wordsLearned: currentModule === 'vocabulary' 
          ? (langProgress?.wordsLearned || 0) + 5 
          : langProgress?.wordsLearned || 0,
        grammarCompleted: currentModule === 'grammar'
          ? (langProgress?.grammarCompleted || 0) + 1
          : langProgress?.grammarCompleted || 0
      });
      
      setSelectedLesson(null);
      setShowModules(true);
    }
  };

  const renderModuleContent = () => {
    if (selectedLesson) {
      const course = courses.find(c => c.lessons.some(l => l.id === selectedLesson));
      const lesson = course?.lessons.find(l => l.id === selectedLesson);
      
      if (!lesson) return null;
      
      const moduleComponent = {
        vocabulary: (
          <FlashCard 
            exercises={lesson.exercises} 
            onComplete={(correct, total) => handleLessonComplete(lesson.id, lesson.xpReward)}
            onBack={() => setSelectedLesson(null)}
          />
        ),
        grammar: (
          <GrammarQuiz 
            exercises={lesson.exercises} 
            onComplete={(correct, total) => handleLessonComplete(lesson.id, lesson.xpReward)}
            onBack={() => setSelectedLesson(null)}
          />
        ),
        speaking: (
          <SpeakingRecorder 
            prompt={lesson.content.title}
            expectedAnswer={lesson.content.description}
            onComplete={(score) => handleLessonComplete(lesson.id, lesson.xpReward)}
            onBack={() => setSelectedLesson(null)}
          />
        ),
        listening: (
          <ListeningPlayer 
            audioText={lesson.content.description}
            transcript={lesson.content.text}
            onComplete={(score) => handleLessonComplete(lesson.id, lesson.xpReward)}
            onBack={() => setSelectedLesson(null)}
          />
        )
      };
      
      return (
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="mb-6">
            <button
              onClick={() => setSelectedLesson(null)}
              className="flex items-center gap-2 text-slate-500 hover:text-slate-700 mb-4"
            >
              <ArrowLeft size={18} />
              返回课程列表
            </button>
            <h2 className="text-2xl font-bold text-slate-800">{lesson.title}</h2>
            <p className="text-slate-500">完成后可获得 {lesson.xpReward} XP</p>
          </div>
          {moduleComponent[lesson.type]}
        </div>
      );
    }
    
    if (!showModules && currentModule) {
      const module = modules.find(m => m.id === currentModule);
      const moduleLessons = courses.flatMap(c => c.lessons.filter(l => l.type === currentModule));
      
      return (
        <div className="space-y-6">
          <button
            onClick={() => navigate(`/learn/${lang}`)}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-700"
          >
            <ArrowLeft size={18} />
            返回学习中心
          </button>
          
          <div className="flex items-center gap-4 bg-white rounded-2xl p-6 shadow-lg">
            <div 
              className="w-16 h-16 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${module?.color}20` }}
            >
              {module && React.createElement(module.icon, { 
                size: 32, 
                style: { color: module.color } 
              })}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-slate-800">{MODULE_NAMES[currentModule as ModuleType]}</h2>
              <p className="text-slate-500">{module?.description}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {courses.map(course => {
              const courseLessons = course.lessons.filter(l => l.type === currentModule);
              if (courseLessons.length === 0) return null;
              
              return (
                <div key={course.id} className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-800">{course.title}</h3>
                      <span className="text-sm text-slate-500">
                        {LEVEL_NAMES[course.level]}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold" style={{ color: langColor }}>
                        {courseLessons.length}
                      </span>
                      <span className="text-slate-500 text-sm"> 节课</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {courseLessons.map(lesson => {
                      const isCompleted = langProgress?.completedLessons.includes(lesson.id);
                      return (
                        <motion.button
                          key={lesson.id}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => setSelectedLesson(lesson.id)}
                          className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                            isCompleted 
                              ? 'bg-green-50 border border-green-200' 
                              : 'bg-slate-50 hover:bg-slate-100 border border-transparent'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              isCompleted ? 'bg-green-100' : 'bg-slate-200'
                            }`}>
                              {isCompleted ? (
                                <CheckCircle className="text-green-600" size={20} />
                              ) : (
                                <span className="text-slate-600 font-medium">{lesson.id.slice(-1)}</span>
                              )}
                            </div>
                            <div className="text-left">
                              <p className={`font-medium ${isCompleted ? 'text-green-700' : 'text-slate-700'}`}>
                                {lesson.title}
                              </p>
                              <p className="text-xs text-slate-500">{lesson.duration} 分钟</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-amber-500">+{lesson.xpReward} XP</span>
                            <ChevronRight className="text-slate-400" size={20} />
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    
    return (
      <div className="space-y-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-4 mb-6">
            <div 
              className="w-16 h-16 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${langColor}20` }}
            >
              <span className="text-3xl">
                {lang === 'en' ? '🇬🇧' : lang === 'ja' ? '🇯🇵' : '🇰🇷'}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                {LANGUAGE_NAMES[lang]} 学习中心
              </h1>
              <p className="text-slate-500">选择学习模块开始你的学习之旅</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <Flame className="text-orange-500" size={18} />
                <span className="text-sm text-slate-600">连续学习</span>
              </div>
              <p className="text-2xl font-bold text-orange-600">{user.streak || 1} 天</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="text-purple-500" size={18} />
                <span className="text-sm text-slate-600">今日经验</span>
              </div>
              <p className="text-2xl font-bold text-purple-600">{langProgress?.todayXP || 0} XP</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <Target className="text-green-500" size={18} />
                <span className="text-sm text-slate-600">学习进度</span>
              </div>
              <p className="text-2xl font-bold text-green-600">{Math.round(progressPercent)}%</p>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-600">总体进度</span>
              <span className="text-slate-500">{completedLessons}/{totalLessons} 课程</span>
            </div>
            <ProgressBar 
              value={completedLessons} 
              max={totalLessons} 
              color={langColor}
              size="lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {modules.map((module) => {
            const ModuleIcon = module.icon;
            const moduleLessons = courses.flatMap(c => c.lessons.filter(l => l.type === module.id));
            
            return (
              <motion.div
                key={module.id}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/learn/${lang}/${module.id}`)}
                className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer group"
              >
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${module.color}20` }}
                >
                  <ModuleIcon size={28} style={{ color: module.color }} />
                </div>
                <h3 className="font-bold text-slate-800 mb-1">{MODULE_NAMES[module.id]}</h3>
                <p className="text-sm text-slate-500 mb-3">{moduleLessons.length} 节课</p>
                <div className="flex items-center text-sm font-medium" style={{ color: module.color }}>
                  开始学习
                  <ChevronRight size={16} />
                </div>
              </motion.div>
            );
          })}
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-4">课程列表</h2>
          <div className="space-y-4">
            {courses.map(course => {
              const courseProgress = course.lessons.filter(
                l => langProgress?.completedLessons.includes(l.id)
              ).length;
              const coursePercent = (courseProgress / course.lessons.length) * 100;
              
              return (
                <div key={course.id} className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <GraduationCap size={24} className="text-slate-400" />
                      <div>
                        <h3 className="font-bold text-slate-800">{course.title}</h3>
                        <p className="text-sm text-slate-500">{course.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        course.level === 'beginner' ? 'bg-green-100 text-green-700' :
                        course.level === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {LEVEL_NAMES[course.level]}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">{courseProgress}/{course.lessons.length} 已完成</span>
                      <span className="text-slate-500">{Math.round(coursePercent)}%</span>
                    </div>
                    <ProgressBar value={coursePercent} color={langColor} size="sm" />
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {course.lessons.map(lesson => {
                      const isCompleted = langProgress?.completedLessons.includes(lesson.id);
                      return (
                        <span
                          key={lesson.id}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            isCompleted 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {lesson.title}
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-20 pb-8 px-4">
      <div className="max-w-4xl mx-auto">
        {renderModuleContent()}
      </div>
    </div>
  );
}
