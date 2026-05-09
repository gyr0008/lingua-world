import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Check, Volume2 } from 'lucide-react';

interface ListeningPlayerProps {
  audioText: string;
  transcript?: string;
  onComplete: (score: number) => void;
  onBack?: () => void;
}

export default function ListeningPlayer({ 
  audioText, 
  transcript,
  onComplete, 
  onBack 
}: ListeningPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(30);
  const [userInput, setUserInput] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const intervalRef = useRef<number | null>(null);

  const speeds = [0.5, 0.75, 1, 1.25, 1.5];
  const [currentSpeed, setCurrentSpeed] = useState(1);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = window.setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return prev + 0.1;
        });
      }, 100);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, duration]);

  const togglePlay = () => {
    if (currentTime >= duration) {
      setCurrentTime(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleSpeedChange = () => {
    const currentIndex = speeds.indexOf(currentSpeed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    setCurrentSpeed(speeds[nextIndex]);
  };

  const calculateScore = () => {
    if (!transcript) return 100;
    
    const targetWords = transcript.toLowerCase().split(/\s+/);
    const userWords = userInput.toLowerCase().split(/\s+/);
    
    let correct = 0;
    targetWords.forEach((word, index) => {
      if (userWords[index] === word) correct++;
    });
    
    return Math.round((correct / targetWords.length) * 100);
  };

  const handleSubmit = () => {
    const calculatedScore = calculateScore();
    setScore(calculatedScore);
    setIsComplete(true);
    onComplete(calculatedScore);
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (currentTime / duration) * 100;

  return (
    <div className="min-h-[500px] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="text-slate-500 hover:text-slate-700">
          ← 返回
        </button>
        <button
          onClick={handleSpeedChange}
          className="px-3 py-1 bg-slate-100 rounded-full text-sm font-medium text-slate-600 hover:bg-slate-200"
        >
          {currentSpeed}x
        </button>
      </div>

      {!isComplete ? (
        <>
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={togglePlay}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center hover:shadow-lg transition-all"
              >
                {isPlaying ? (
                  <Pause className="text-white" size={28} />
                ) : (
                  <Play className="text-white ml-1" size={28} />
                )}
              </button>
              
              <div className="flex-1">
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="bg-gradient-to-r from-primary to-secondary h-full rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              <button className="p-2 rounded-full hover:bg-slate-100">
                <Volume2 className="text-slate-600" size={20} />
              </button>
            </div>

            <div className="bg-blue-50 rounded-xl p-4 mb-6">
              <p className="text-sm text-blue-600 font-medium mb-2">听力内容</p>
              <p className="text-slate-800">{audioText}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-800">听写练习</h3>
              {transcript && !showAnswer && (
                <button
                  onClick={() => setShowAnswer(true)}
                  className="text-sm text-primary hover:underline"
                >
                  查看原文
                </button>
              )}
            </div>
            
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="请输入你听到的内容..."
              className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-xl resize-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />

            {showAnswer && transcript && (
              <div className="mt-4 p-4 bg-green-50 rounded-xl">
                <p className="text-sm text-green-600 font-medium mb-2">正确答案</p>
                <p className="text-slate-700">{transcript}</p>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => {
                setUserInput('');
                setCurrentTime(0);
                setIsComplete(false);
              }}
              className="btn-secondary flex-1 flex items-center justify-center gap-2"
            >
              <RotateCcw size={18} />
              重置
            </button>
            <button
              onClick={handleSubmit}
              disabled={!userInput.trim()}
              className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Check size={18} />
              提交答案
            </button>
          </div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-lg p-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring' }}
            className={`w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center ${
              score >= 80 ? 'bg-green-100' :
              score >= 60 ? 'bg-yellow-100' : 'bg-red-100'
            }`}
          >
            <div>
              <p className={`text-3xl font-bold ${
                score >= 80 ? 'text-green-600' :
                score >= 60 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {score}%
              </p>
            </div>
          </motion.div>

          <h3 className="text-2xl font-bold text-slate-800 mb-2">
            {score >= 80 ? '太棒了！🎉' :
             score >= 60 ? '还不错！👍' : '继续加油！💪'}
          </h3>
          <p className="text-slate-600 mb-6">
            你的听写正确率达到了 {score}%
          </p>

          {transcript && (
            <div className="bg-slate-50 rounded-xl p-4 mb-6 text-left">
              <p className="text-sm font-medium text-slate-700 mb-2">正确答案</p>
              <p className="text-slate-600">{transcript}</p>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={() => {
                setUserInput('');
                setCurrentTime(0);
                setIsComplete(false);
                setScore(0);
              }}
              className="btn-secondary flex-1"
            >
              再听一次
            </button>
            <button
              onClick={() => onComplete(score)}
              className="btn-primary flex-1"
            >
              完成练习
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
