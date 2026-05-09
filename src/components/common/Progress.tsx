import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number;
  max?: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
  animated?: boolean;
}

export default function ProgressBar({
  value,
  max = 100,
  showLabel = false,
  size = 'md',
  color = '#6366F1',
  className = '',
  animated = true
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  const sizes = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-sm text-slate-600 font-medium">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-200 rounded-full overflow-hidden ${sizes[size]}`}>
        <motion.div
          initial={animated ? { width: 0 } : { width: `${percentage}%` }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-full rounded-full relative"
          style={{ backgroundColor: color }}
        >
          <div 
            className="absolute inset-0 bg-white/30"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)'
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}

interface CircularProgressProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  showValue?: boolean;
  label?: string;
}

export function CircularProgress({
  value,
  max = 100,
  size = 120,
  strokeWidth = 10,
  color = '#6366F1',
  showValue = true,
  label
}: CircularProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E2E8F0"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </svg>
      {showValue && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-slate-800">{Math.round(percentage)}%</span>
          {label && <span className="text-xs text-slate-500">{label}</span>}
        </div>
      )}
    </div>
  );
}

interface XPGaugeProps {
  currentXP: number;
  nextLevelXP: number;
  level: number;
}

export function XPGauge({ currentXP, nextLevelXP, level }: XPGaugeProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm">
        <span className="flex items-center gap-1">
          <span className="w-5 h-5 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
            {level}
          </span>
          <span className="font-medium text-slate-700">Lv.{level}</span>
        </span>
        <span className="text-slate-500">
          {currentXP} / {nextLevelXP} XP
        </span>
      </div>
      <ProgressBar 
        value={currentXP} 
        max={nextLevelXP} 
        color="#FBBF24"
        size="md"
        animated
      />
    </div>
  );
}
