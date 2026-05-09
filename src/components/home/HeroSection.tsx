import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Users, Award, Clock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function HeroSection() {
  const { isAuthenticated } = useAuth();

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              支持英语、日语、韩语
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="text-gradient">沉浸式</span>
              <br />
              语言学习体验
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-600 mb-8 max-w-lg mx-auto lg:mx-0">
              通过游戏化设计、智能复习系统和个性化学习路径，让语言学习变得有趣且高效
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to={isAuthenticated ? '/learn/en' : '/register'}
                className="btn-primary inline-flex items-center justify-center gap-2 text-lg px-8 py-4"
              >
                {isAuthenticated ? '继续学习' : '免费开始'}
                <ArrowRight size={20} />
              </Link>
              
              <button className="btn-secondary inline-flex items-center justify-center gap-2 text-lg px-8 py-4">
                <Play size={20} />
                观看介绍
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full opacity-20 blur-3xl animate-pulse" />
              
              <div className="relative grid grid-cols-2 gap-4">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="bg-white rounded-2xl p-6 shadow-xl"
                >
                  <div className="text-4xl mb-3">🇬🇧</div>
                  <h3 className="font-bold text-slate-800 mb-1">英语</h3>
                  <p className="text-sm text-slate-500">2.5M+ 学习者</p>
                </motion.div>
                
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                  className="bg-white rounded-2xl p-6 shadow-xl mt-8"
                >
                  <div className="text-4xl mb-3">🇯🇵</div>
                  <h3 className="font-bold text-slate-800 mb-1">日语</h3>
                  <p className="text-sm text-slate-500">1.2M+ 学习者</p>
                </motion.div>
                
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
                  className="bg-white rounded-2xl p-6 shadow-xl -mt-4"
                >
                  <div className="text-4xl mb-3">🇰🇷</div>
                  <h3 className="font-bold text-slate-800 mb-1">韩语</h3>
                  <p className="text-sm text-slate-500">980K+ 学习者</p>
                </motion.div>
                
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                  className="bg-white rounded-2xl p-6 shadow-xl mt-4"
                >
                  <div className="text-4xl mb-3">🌟</div>
                  <h3 className="font-bold text-slate-800 mb-1">更多语言</h3>
                  <p className="text-sm text-slate-500">即将推出</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { icon: Users, value: '500万+', label: '活跃学习者' },
            { icon: Clock, value: '15分钟/天', label: '高效学习' },
            { icon: Award, value: '95%', label: '学习效果' },
            { icon: Play, value: '5000+', label: '课程内容' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center">
                <stat.icon className="text-primary" size={24} />
              </div>
              <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
              <p className="text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
