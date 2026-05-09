import React from 'react';
import HeroSection from '../components/home/HeroSection';
import FeatureSection from '../components/home/FeatureSection';
import CourseSection from '../components/home/CourseSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

export default function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <HeroSection />
      <FeatureSection />
      <CourseSection />
      <TestimonialsSection />
      
      {!isAuthenticated && (
        <section className="py-20 bg-gradient-to-r from-primary via-secondary to-accent">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                准备好开始你的语言学习之旅了吗？
              </h2>
              <p className="text-white/90 text-lg mb-8">
                加入我们，每天15分钟，让学习成为一种习惯
              </p>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                立即免费注册
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                  <span className="text-xl">🌍</span>
                </div>
                <span className="text-xl font-bold">LinguaWorld</span>
              </div>
              <p className="text-slate-400 text-sm">
                让语言学习变得简单有趣
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">学习资源</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">英语课程</a></li>
                <li><a href="#" className="hover:text-white transition-colors">日语课程</a></li>
                <li><a href="#" className="hover:text-white transition-colors">韩语课程</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">关于我们</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">公司介绍</a></li>
                <li><a href="#" className="hover:text-white transition-colors">加入团队</a></li>
                <li><a href="#" className="hover:text-white transition-colors">联系我们</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">支持</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">帮助中心</a></li>
                <li><a href="#" className="hover:text-white transition-colors">使用条款</a></li>
                <li><a href="#" className="hover:text-white transition-colors">隐私政策</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400 text-sm">
            <p>© 2026 LinguaWorld. 保留所有权利。</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
