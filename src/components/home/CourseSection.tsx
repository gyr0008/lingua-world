import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Play, CheckCircle } from 'lucide-react';
import { LANGUAGE_NAMES } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

const recommendedCourses = [
  {
    language: 'en' as const,
    title: '英语零基础入门',
    description: '从字母和发音开始，建立扎实的英语基础',
    lessons: 24,
    duration: '15小时',
    level: '入门',
    rating: 4.9,
    students: '12.5万'
  },
  {
    language: 'ja' as const,
    title: '日语五十音图特训',
    description: '快速掌握日语假名，打下日语学习基础',
    lessons: 16,
    duration: '8小时',
    level: '入门',
    rating: 4.8,
    students: '8.3万'
  },
  {
    language: 'ko' as const,
    title: '韩语发音入门',
    description: '学习韩语音标和基本发音规则',
    lessons: 12,
    duration: '6小时',
    level: '入门',
    rating: 4.9,
    students: '6.7万'
  }
];

export default function CourseSection() {
  const { isAuthenticated } = useAuth();

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-2">
              推荐课程
            </h2>
            <p className="text-slate-600">精选热门课程，开启你的语言学习之旅</p>
          </div>
          <Link
            to={isAuthenticated ? '/learn/en' : '/register'}
            className="mt-4 sm:mt-0 flex items-center gap-2 text-primary font-medium hover:underline"
          >
            查看全部课程
            <ArrowRight size={18} />
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedCourses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
            >
              <div className={`h-32 relative ${
                course.language === 'en' ? 'bg-gradient-to-br from-green-400 to-emerald-500' :
                course.language === 'ja' ? 'bg-gradient-to-br from-pink-400 to-rose-500' :
                'bg-gradient-to-br from-blue-400 to-indigo-500'
              }`}>
                <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-white text-sm font-medium">{course.level}</span>
                </div>
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-white text-sm">⭐ {course.rating}</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-7xl opacity-30">
                    {course.language === 'en' ? '🇬🇧' : course.language === 'ja' ? '🇯🇵' : '🇰🇷'}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    course.language === 'en' ? 'bg-green-100 text-green-700' :
                    course.language === 'ja' ? 'bg-pink-100 text-pink-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {LANGUAGE_NAMES[course.language]}
                  </span>
                  <span className="text-xs text-slate-500">👥 {course.students}人在学</span>
                </div>
                
                <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-primary transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                  {course.description}
                </p>
                
                <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Play size={14} />
                    {course.lessons} 课时
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle size={14} />
                    {course.duration}
                  </span>
                </div>
                
                <Link
                  to={isAuthenticated ? `/learn/${course.language}` : '/register'}
                  className="w-full btn-primary !py-2.5 !text-sm flex items-center justify-center gap-2"
                >
                  开始学习
                  <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
