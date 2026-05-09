import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Volume2, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { Exercise } from '../../types';

interface FlashCardProps {
  exercises: Exercise[];
  onComplete: (correct: number, total: number) => void;
  onBack?: () => void;
}

export default function FlashCard({ exercises, onComplete, onBack }: FlashCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState<string[]>([]);
  const [unknownCards, setUnknownCards] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const currentExercise = exercises[currentIndex];
  const isLastCard = currentIndex === exercises.length - 1;

  const handleSwipe = (direction: 'left' | 'right') => {
    if (!currentExercise) return;

    if (direction === 'right') {
      setKnownCards([...knownCards, currentExercise.id]);
    } else {
      setUnknownCards([...unknownCards, currentExercise.id]);
    }

    if (isLastCard) {
      setShowResult(true);
    } else {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (showResult) return;
    
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      setIsFlipped(!isFlipped);
    } else if (e.key === 'ArrowLeft') {
      handleSwipe('left');
    } else if (e.key === 'ArrowRight') {
      handleSwipe('right');
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setKnownCards([]);
    setUnknownCards([]);
    setShowResult(false);
  };

  if (showResult) {
    const correct = knownCards.length;
    const total = exercises.length;
    const percentage = Math.round((correct / total) * 100);

    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center p-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`w-32 h-32 rounded-full flex items-center justify-center mb-6 ${
            percentage >= 80 ? 'bg-green-100' :
            percentage >= 50 ? 'bg-yellow-100' : 'bg-red-100'
          }`}
        >
          <span className={`text-4xl font-bold ${
            percentage >= 80 ? 'text-green-600' :
            percentage >= 50 ? 'text-yellow-600' : 'text-red-600'
          }`}>
            {percentage}%
          </span>
        </motion.div>

        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          {percentage >= 80 ? '太棒了！🎉' :
           percentage >= 50 ? '继续加油！💪' : '需要多加练习 📚'}
        </h2>

        <p className="text-slate-600 mb-2">
          你认识了 <span className="font-bold text-green-600">{correct}</span> 个单词
        </p>
        <p className="text-slate-500 mb-8">
          还需要复习 <span className="font-bold text-red-500">{unknownCards.length}</span> 个
        </p>

        <div className="flex gap-4">
          <button
            onClick={handleReset}
            className="btn-secondary flex items-center gap-2"
          >
            <RotateCcw size={18} />
            再学一遍
          </button>
          <button
            onClick={() => onComplete(correct, total)}
            className="btn-primary flex items-center gap-2"
          >
            完成学习
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-[500px] flex flex-col"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="text-slate-500 hover:text-slate-700">
          <ChevronLeft size={24} />
        </button>
        <div className="text-sm text-slate-500">
          {currentIndex + 1} / {exercises.length}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-green-600">✓ {knownCards.length}</span>
          <span className="text-xs text-red-500">✗ {unknownCards.length}</span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div 
          ref={cardRef}
          className="relative w-full max-w-md h-80 cursor-pointer perspective-1000"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentExercise?.id}
              initial={{ rotateY: isFlipped ? -180 : 0 }}
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 w-full h-full"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div 
                className="absolute inset-0 bg-white rounded-2xl shadow-xl border border-slate-200 flex flex-col items-center justify-center p-8"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <p className="text-3xl font-bold text-slate-800 mb-4 text-center">
                  {currentExercise?.question}
                </p>
                <p className="text-sm text-slate-400">点击查看答案</p>
              </div>

              <div 
                className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-2xl shadow-xl flex flex-col items-center justify-center p-8"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              >
                <p className="text-3xl font-bold text-white mb-4 text-center">
                  {currentExercise?.correctAnswer}
                </p>
                {currentExercise?.audioUrl && (
                  <button className="mt-2 text-white/80 hover:text-white">
                    <Volume2 size={24} />
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="flex items-center justify-center gap-6 mt-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleSwipe('left')}
          className="w-16 h-16 rounded-full bg-red-100 text-red-500 flex items-center justify-center hover:bg-red-200 transition-colors"
        >
          <X size={28} />
        </motion.button>
        
        <p className="text-sm text-slate-400">← 不认识 | 认识 →</p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleSwipe('right')}
          className="w-16 h-16 rounded-full bg-green-100 text-green-500 flex items-center justify-center hover:bg-green-200 transition-colors"
        >
          <Check size={28} />
        </motion.button>
      </div>

      <p className="text-center text-xs text-slate-400 mt-4">
        使用空格键翻转，左右方向键选择
      </p>
    </div>
  );
}
