import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Lightbulb, ChevronRight } from 'lucide-react';
import { Exercise } from '../../types';

interface GrammarQuizProps {
  exercises: Exercise[];
  onComplete: (correct: number, total: number) => void;
  onBack?: () => void;
}

export default function GrammarQuiz({ exercises, onComplete, onBack }: GrammarQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentExercise = exercises[currentIndex];
  const isLastQuestion = currentIndex === exercises.length - 1;

  const handleAnswer = (answer: string) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answer);
    setIsAnswered(true);
    setShowExplanation(true);
    
    if (answer === currentExercise.correctAnswer) {
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete(correctCount + (selectedAnswer === currentExercise.correctAnswer ? 0 : 0), exercises.length);
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setShowExplanation(false);
    }
  };

  const getOptionStyle = (option: string) => {
    if (!isAnswered) {
      return 'bg-white border-slate-200 hover:border-primary hover:bg-primary/5 cursor-pointer';
    }
    
    if (option === currentExercise.correctAnswer) {
      return 'bg-green-50 border-green-500 text-green-700';
    }
    
    if (option === selectedAnswer && option !== currentExercise.correctAnswer) {
      return 'bg-red-50 border-red-500 text-red-700';
    }
    
    return 'bg-slate-50 border-slate-200 text-slate-400';
  };

  return (
    <div className="min-h-[500px] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="text-slate-500 hover:text-slate-700">
          ← 返回
        </button>
        <div className="text-sm text-slate-500">
          第 {currentIndex + 1} 题 / 共 {exercises.length} 题
        </div>
      </div>

      <div className="w-full bg-slate-200 rounded-full h-2 mb-8">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex + 1) / exercises.length) * 100}%` }}
          className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
        />
      </div>

      <div className="flex-1">
        <motion.div
          key={currentExercise?.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-6"
        >
          <h3 className="text-xl font-bold text-slate-800 mb-6">
            {currentExercise?.question}
          </h3>

          {currentExercise?.type === 'fill-blank' && currentExercise.hint && (
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
              <Lightbulb size={16} />
              提示: {currentExercise.hint}
            </div>
          )}

          <div className="space-y-3">
            {currentExercise?.options?.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: isAnswered ? 1 : 1.02 }}
                whileTap={{ scale: isAnswered ? 1 : 0.98 }}
                onClick={() => handleAnswer(option)}
                disabled={isAnswered}
                className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all ${getOptionStyle(option)}`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {isAnswered && option === currentExercise.correctAnswer && (
                    <Check className="text-green-500" size={20} />
                  )}
                  {isAnswered && option === selectedAnswer && option !== currentExercise.correctAnswer && (
                    <X className="text-red-500" size={20} />
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {showExplanation && currentExercise.explanation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6"
          >
            <div className="flex items-start gap-3">
              <Lightbulb className="text-blue-500 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="font-medium text-blue-800 mb-1">解析</h4>
                <p className="text-blue-700 text-sm">{currentExercise.explanation}</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <button
        onClick={handleNext}
        disabled={!isAnswered}
        className={`w-full py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
          isAnswered
            ? 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg'
            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
        }`}
      >
        {isLastQuestion ? '完成练习' : '下一题'}
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
