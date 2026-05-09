import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md'
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={`bg-white rounded-2xl shadow-2xl w-full ${sizes[size]} pointer-events-auto max-h-[90vh] overflow-hidden flex flex-col`}
            >
              {title && (
                <div className="flex items-center justify-between p-5 border-b border-slate-100">
                  <h3 className="text-lg font-bold text-slate-800">{title}</h3>
                  <button
                    onClick={onClose}
                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                  >
                    <X size={16} className="text-slate-600" />
                  </button>
                </div>
              )}
              <div className="p-5 overflow-y-auto flex-1">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = '确认',
  cancelText = '取消',
  type = 'info'
}: ConfirmModalProps) {
  const colors = {
    danger: 'bg-red-500 hover:bg-red-600',
    warning: 'bg-yellow-500 hover:bg-yellow-600',
    info: 'bg-primary hover:bg-primary/90'
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <p className="text-slate-600 mb-6">{message}</p>
      <div className="flex gap-3 justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition-colors"
        >
          {cancelText}
        </button>
        <button
          onClick={() => {
            onConfirm();
            onClose();
          }}
          className={`px-4 py-2 rounded-lg text-white font-medium transition-colors ${colors[type]}`}
        >
          {confirmText}
        </button>
      </div>
    </Modal>
  );
}

interface AchievementUnlockProps {
  isOpen: boolean;
  onClose: () => void;
  achievement: {
    title: string;
    description: string;
    icon: string;
  } | null;
}

export function AchievementUnlock({ isOpen, onClose, achievement }: AchievementUnlockProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!achievement) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', damping: 15 }}
            className="relative bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 p-1 rounded-3xl shadow-2xl"
            onClick={onClose}
          >
            <div className="bg-white rounded-3xl p-8 text-center min-w-[300px]">
              <motion.div
                animate={{ 
                  rotate: [0, -10, 10, -10, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-7xl mb-4"
              >
                {achievement.icon}
              </motion.div>
              
              <p className="text-sm text-amber-600 font-medium uppercase tracking-wider mb-2">
                成就解锁
              </p>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">
                {achievement.title}
              </h3>
              <p className="text-slate-600 mb-4">
                {achievement.description}
              </p>
              
              <div className="flex items-center justify-center gap-2 text-amber-600">
                <span className="text-lg">⭐</span>
                <span className="font-bold">+50 XP</span>
              </div>
            </div>
            
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  opacity: 1, 
                  y: 0,
                  x: 0,
                  scale: 1
                }}
                animate={{ 
                  opacity: 0, 
                  y: -200,
                  x: (Math.random() - 0.5) * 200,
                  scale: 0
                }}
                transition={{ 
                  duration: 1 + Math.random(),
                  delay: i * 0.05
                }}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  backgroundColor: ['#FFD700', '#FFA500', '#FF69B4', '#00CED1', '#9370DB'][i % 5],
                  top: '50%',
                  left: '50%'
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
