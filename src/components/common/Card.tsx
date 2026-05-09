import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface CardProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  glow?: boolean;
  glowColor?: string;
}

export default function Card({
  children,
  onClick,
  className = '',
  hover = true,
  padding = 'md',
  glow = false,
  glowColor = 'primary'
}: CardProps) {
  const paddingStyles = {
    none: '',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-8'
  };

  const Component = onClick ? motion.div : 'div';
  const motionProps = onClick ? {
    whileHover: hover ? { y: -4, scale: 1.02 } : {},
    whileTap: { scale: 0.98 }
  } : {};

  return (
    <Component
      onClick={onClick}
      className={`
        bg-white rounded-2xl border border-slate-200/50 shadow-lg
        ${paddingStyles[padding]}
        ${hover ? 'cursor-pointer transition-all duration-300 hover:shadow-2xl hover:border-primary/30' : ''}
        ${glow ? `hover:shadow-2xl hover:shadow-${glowColor}/20` : ''}
        ${className}
      `}
      {...motionProps}
    >
      {children}
    </Component>
  );
}

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  color?: string;
  trend?: { value: number; positive: boolean };
}

export function StatCard({ icon: Icon, label, value, color = '#6366F1', trend }: StatCardProps) {
  return (
    <Card className="relative overflow-hidden">
      <div className="flex items-center gap-4">
        <div 
          className="w-14 h-14 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${color}15` }}
        >
          <Icon size={28} style={{ color }} />
        </div>
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className="text-2xl font-bold text-slate-800">{value}</p>
          {trend && (
            <p className={`text-xs font-medium ${trend.positive ? 'text-green-500' : 'text-red-500'}`}>
              {trend.positive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </p>
          )}
        </div>
      </div>
      <div 
        className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full opacity-10 blur-2xl"
        style={{ backgroundColor: color }}
      />
    </Card>
  );
}

interface LanguageCardProps {
  language: 'en' | 'ja' | 'ko';
  name: string;
  flag: string;
  learners: string;
  onClick?: () => void;
  locked?: boolean;
}

export function LanguageCard({ language, name, flag, learners, onClick, locked }: LanguageCardProps) {
  const colors = {
    en: { bg: 'from-green-400 to-emerald-500', text: 'text-green-600' },
    ja: { bg: 'from-pink-400 to-rose-500', text: 'text-rose-600' },
    ko: { bg: 'from-blue-400 to-indigo-500', text: 'text-blue-600' }
  };

  const color = colors[language];

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={locked ? undefined : onClick}
      className={`
        relative overflow-hidden rounded-3xl cursor-pointer
        ${locked ? 'opacity-60 cursor-not-allowed' : ''}
      `}
    >
      <div className={`bg-gradient-to-br ${color.bg} p-8 h-64 flex flex-col justify-between`}>
        <div className="flex justify-between items-start">
          <span className="text-6xl">{flag}</span>
          {locked && (
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
              <span className="text-white text-sm font-medium">🔒 已锁定</span>
            </div>
          )}
        </div>
        
        <div className="text-white">
          <h3 className="text-3xl font-bold mb-2">{name}</h3>
          <p className="text-white/80 text-sm flex items-center gap-2">
            <span>👥</span> {learners} 正在学习
          </p>
        </div>
      </div>
      
      <div className="absolute -bottom-1 left-0 right-0 h-8 bg-white/30 blur-xl" />
    </motion.div>
  );
}
