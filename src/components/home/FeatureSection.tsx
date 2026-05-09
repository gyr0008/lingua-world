import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Headphones, Mic, FileText, Target, Trophy, Users, Zap } from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: '智能单词卡',
    description: '采用间隔重复算法，科学安排复习时间，让记忆更持久',
    color: '#10B981',
    bgColor: 'from-green-400/20 to-emerald-500/20'
  },
  {
    icon: FileText,
    title: '语法练习',
    description: '多样化的语法题型，即时反馈和详细解析',
    color: '#6366F1',
    bgColor: 'from-indigo-400/20 to-purple-500/20'
  },
  {
    icon: Mic,
    title: '口语跟读',
    description: 'AI评分系统，实时纠正发音，提升口语流利度',
    color: '#F43F5E',
    bgColor: 'from-rose-400/20 to-pink-500/20'
  },
  {
    icon: Headphones,
    title: '听力训练',
    description: '多倍速播放，听写练习，全面提升听力能力',
    color: '#3B82F6',
    bgColor: 'from-blue-400/20 to-cyan-500/20'
  }
];

const benefits = [
  { icon: Target, title: '个性化学习路径', description: '基于水平测试，智能推荐适合你的课程' },
  { icon: Trophy, title: '成就激励系统', description: '完成任务解锁徽章，连续学习获得奖励' },
  { icon: Users, title: '社区互动', description: '与其他学习者交流，分享学习心得' },
  { icon: Zap, title: '碎片化学习', description: '每天15分钟，随时随地开启学习' }
];

export default function FeatureSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
            为什么选择 <span className="text-gradient">LinguaWorld</span>？
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            我们提供全方位的语言学习体验，让学习变得轻松有趣
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`bg-gradient-to-br ${feature.bgColor} rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}
            >
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${feature.color}20` }}
              >
                <feature.icon size={28} style={{ color: feature.color }} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{feature.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center">
                <benefit.icon className="text-primary" size={28} />
              </div>
              <h4 className="font-bold text-slate-800 mb-2">{benefit.title}</h4>
              <p className="text-sm text-slate-600">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
