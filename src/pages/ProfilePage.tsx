import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Trophy, Flame, Calendar, BookOpen, 
  Headphones, Mic, Target, Settings, 
  ChevronRight, Share2, Award, Star, FileText
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { LANGUAGE_NAMES, LANGUAGE_COLORS, Language } from '../types';
import { achievements } from '../data/courses';
import { CircularProgress } from '../components/common/Progress';

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'achievements' | 'stats'>('overview');

  const stats = [
    { icon: Flame, label: '连续学习', value: `${user.streak || 1}`, unit: '天', color: '#F59E0B' },
    { icon: Star, label: '总经验值', value: user.totalXP.toString(), unit: 'XP', color: '#FBBF24' },
    { icon: BookOpen, label: '学习单词', value: user.languages.reduce((sum, l) => sum + l.wordsLearned, 0).toString(), unit: '个', color: '#10B981' },
    { icon: Trophy, label: '成就数', value: user.achievements.length.toString(), unit: '个', color: '#6366F1' }
  ];

  const tabs = [
    { id: 'overview', label: '学习概况', icon: Target },
    { id: 'achievements', label: '成就墙', icon: Award },
    { id: 'stats', label: '数据统计', icon: Calendar }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-20 pb-8 px-4">
      <div className="max-w-4xl mx-auto">
        {!isAuthenticated ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center">
              <User className="text-slate-400" size={40} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">登录后查看你的学习数据</h2>
            <p className="text-slate-500 mb-6">登录 LinguaWorld 开始你的语言学习之旅</p>
            <a href="/login" className="btn-primary inline-flex items-center gap-2">
              立即登录
              <ChevronRight size={18} />
            </a>
          </div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-xl p-6 mb-6"
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-5xl shadow-lg"
                >
                  {user.avatar}
                </motion.div>
                
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-2xl font-bold text-slate-800 mb-1">{user.nickname}</h1>
                  <p className="text-slate-500 mb-2">{user.email}</p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-2">
                    {user.languages.map(lang => (
                      <span
                        key={lang.language}
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{ 
                          backgroundColor: `${LANGUAGE_COLORS[lang.language]}20`,
                          color: LANGUAGE_COLORS[lang.language]
                        }}
                      >
                        {LANGUAGE_NAMES[lang.language]} · Lv.{Math.floor(lang.xp / 100) + 1}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors">
                    <Share2 className="text-slate-600" size={20} />
                  </button>
                  <button className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors">
                    <Settings className="text-slate-600" size={20} />
                  </button>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg p-4"
                >
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                    style={{ backgroundColor: `${stat.color}15` }}
                  >
                    <stat.icon size={24} style={{ color: stat.color }} />
                  </div>
                  <p className="text-2xl font-bold text-slate-800">
                    {stat.value}
                    <span className="text-sm font-normal text-slate-500 ml-1">{stat.unit}</span>
                  </p>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
              <div className="flex border-b border-slate-100">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`flex-1 py-4 px-6 font-medium transition-colors flex items-center justify-center gap-2 ${
                      activeTab === tab.id
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    <tab.icon size={18} />
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-bold text-slate-800 mb-4">学习语言进度</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        {(['en', 'ja', 'ko'] as Language[]).map(lang => {
                          const progress = user.languages.find(l => l.language === lang);
                          const xp = progress?.xp || 0;
                          const level = Math.floor(xp / 100) + 1;
                          const levelXP = xp % 100;
                          
                          return (
                            <div key={lang} className="bg-slate-50 rounded-xl p-4">
                              <div className="flex items-center gap-3 mb-3">
                                <span className="text-2xl">
                                  {lang === 'en' ? '🇬🇧' : lang === 'ja' ? '🇯🇵' : '🇰🇷'}
                                </span>
                                <div>
                                  <p className="font-medium text-slate-800">{LANGUAGE_NAMES[lang]}</p>
                                  <p className="text-xs text-slate-500">Level {level}</p>
                                </div>
                              </div>
                              <CircularProgress
                                value={levelXP}
                                max={100}
                                size={80}
                                strokeWidth={8}
                                color={LANGUAGE_COLORS[lang]}
                                showValue={false}
                              />
                              <p className="text-center text-sm text-slate-500 mt-2">
                                {levelXP}/100 XP
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-800 mb-4">近期活动</h3>
                      <div className="space-y-3">
                        {[
                          { icon: BookOpen, text: '完成了"问候语"课程', time: '2小时前', xp: '+10 XP', color: '#10B981' },
                          { icon: Mic, text: '完成了"口语跟读"练习', time: '昨天', xp: '+20 XP', color: '#F43F5E' },
                          { icon: Headphones, text: '完成了"听力训练"练习', time: '2天前', xp: '+15 XP', color: '#3B82F6' },
                        ].map((activity, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                            <div 
                              className="w-10 h-10 rounded-full flex items-center justify-center"
                              style={{ backgroundColor: `${activity.color}20` }}
                            >
                              <activity.icon size={18} style={{ color: activity.color }} />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-slate-700">{activity.text}</p>
                              <p className="text-xs text-slate-400">{activity.time}</p>
                            </div>
                            <span className="text-sm font-medium text-amber-500">{activity.xp}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'achievements' && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-slate-800">成就墙</h3>
                      <span className="text-sm text-slate-500">
                        {user.achievements.length}/{achievements.length} 已解锁
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {achievements.map(achievement => {
                        const isUnlocked = user.achievements.includes(achievement.id);
                        return (
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className={`p-4 rounded-xl text-center transition-all ${
                              isUnlocked 
                                ? 'bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300' 
                                : 'bg-slate-100 opacity-60'
                            }`}
                          >
                            <div className={`text-4xl mb-2 ${!isUnlocked && 'grayscale'}`}>
                              {achievement.icon.includes('flame') ? '🔥' :
                               achievement.icon.includes('book') ? '📚' :
                               achievement.icon.includes('trophy') ? '🏆' :
                               achievement.icon.includes('star') ? '⭐' :
                               achievement.icon.includes('crown') ? '👑' :
                               achievement.icon.includes('mic') ? '🎤' :
                               achievement.icon.includes('headphone') ? '🎧' :
                               achievement.icon.includes('file') ? '📄' :
                               achievement.icon.includes('user') ? '👤' :
                               achievement.icon.includes('users') ? '👥' :
                               achievement.icon.includes('footprints') ? '👣' : '🎯'}
                            </div>
                            <h4 className={`font-bold text-sm mb-1 ${!isUnlocked && 'text-slate-500'}`}>
                              {achievement.title}
                            </h4>
                            <p className="text-xs text-slate-500 mb-2">{achievement.description}</p>
                            {isUnlocked ? (
                              <span className="text-xs text-amber-600 font-medium">已解锁</span>
                            ) : (
                              <span className="text-xs text-slate-400">🔒 未解锁</span>
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {activeTab === 'stats' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-bold text-slate-800 mb-4">各语言学习统计</h3>
                      <div className="space-y-4">
                        {user.languages.map(lang => (
                          <div key={lang.language} className="p-4 bg-slate-50 rounded-xl">
                            <div className="flex items-center gap-3 mb-4">
                              <span className="text-2xl">
                                {lang.language === 'en' ? '🇬🇧' : lang.language === 'ja' ? '🇯🇵' : '🇰🇷'}
                              </span>
                              <div>
                                <p className="font-medium text-slate-800">{LANGUAGE_NAMES[lang.language]}</p>
                                <p className="text-sm text-slate-500">{lang.xp} 总经验</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="text-center p-3 bg-white rounded-xl">
                                <BookOpen className="mx-auto mb-1 text-green-500" size={20} />
                                <p className="text-lg font-bold text-slate-800">{lang.wordsLearned}</p>
                                <p className="text-xs text-slate-500">已学单词</p>
                              </div>
                              <div className="text-center p-3 bg-white rounded-xl">
                                <FileText className="mx-auto mb-1 text-purple-500" size={20} />
                                <p className="text-lg font-bold text-slate-800">{lang.grammarCompleted}</p>
                                <p className="text-xs text-slate-500">完成语法</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
