import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic, Square, Play, Pause, Volume2, RotateCcw, Check, X } from 'lucide-react';

interface SpeakingRecorderProps {
  prompt: string;
  expectedAnswer?: string;
  onComplete: (score: number) => void;
  onBack?: () => void;
}

export default function SpeakingRecorder({ 
  prompt, 
  expectedAnswer, 
  onComplete, 
  onBack 
}: SpeakingRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;

      const chunks: Blob[] = [];
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        setRecordedBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);

      const updateLevel = () => {
        if (analyserRef.current) {
          const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
          analyserRef.current.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
          setAudioLevel(average / 128);
        }
        animationRef.current = requestAnimationFrame(updateLevel);
      };
      updateLevel();
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setAudioLevel(0);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
  };

  const playRecording = () => {
    if (recordedBlob && audioRef.current) {
      audioRef.current.src = URL.createObjectURL(recordedBlob);
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const simulateScoring = () => {
    const simulatedScore = Math.floor(Math.random() * 30) + 70;
    setScore(simulatedScore);
    setShowResult(true);
    onComplete(simulatedScore);
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const getScoreEmoji = () => {
    if (score >= 90) return '🌟';
    if (score >= 80) return '👏';
    if (score >= 70) return '👍';
    return '💪';
  };

  return (
    <div className="min-h-[500px] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="text-slate-500 hover:text-slate-700">
          ← 返回
        </button>
      </div>

      {!showResult ? (
        <>
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
            <div className="text-center mb-8">
              <p className="text-sm text-slate-500 mb-2">跟读内容</p>
              <h3 className="text-2xl font-bold text-slate-800">{prompt}</h3>
              {expectedAnswer && (
                <p className="text-lg text-slate-500 mt-2">中文: {expectedAnswer}</p>
              )}
            </div>

            <div className="flex justify-center mb-8">
              <motion.div
                animate={{
                  scale: isRecording ? 1 + audioLevel * 0.3 : 1,
                  boxShadow: isRecording 
                    ? `0 0 ${20 + audioLevel * 40}px rgba(239, 68, 68, ${0.3 + audioLevel * 0.3})`
                    : '0 0 20px rgba(239, 68, 68, 0.2)'
                }}
                className={`w-32 h-32 rounded-full flex items-center justify-center transition-colors ${
                  isRecording ? 'bg-red-100' : 'bg-slate-100'
                }`}
              >
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`w-24 h-24 rounded-full flex items-center justify-center transition-all ${
                    isRecording 
                      ? 'bg-red-500 hover:bg-red-600' 
                      : 'bg-gradient-to-br from-primary to-secondary hover:shadow-lg'
                  }`}
                >
                  {isRecording ? (
                    <Square className="text-white" size={32} />
                  ) : (
                    <Mic className="text-white" size={32} />
                  )}
                </button>
              </motion.div>
            </div>

            <div className="text-center text-slate-500">
              {isRecording ? (
                <p className="text-red-500 font-medium animate-pulse">正在录音...</p>
              ) : recordedBlob ? (
                <p className="text-green-500">录音完成</p>
              ) : (
                <p>点击麦克风开始录音</p>
              )}
            </div>

            {recordedBlob && (
              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={playRecording}
                  disabled={isPlaying}
                  className="btn-secondary flex items-center gap-2"
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                  播放录音
                </button>
                <button
                  onClick={() => {
                    setRecordedBlob(null);
                    setAudioLevel(0);
                  }}
                  className="btn-secondary flex items-center gap-2"
                >
                  <RotateCcw size={18} />
                  重新录音
                </button>
              </div>
            )}
          </div>

          {recordedBlob && (
            <button
              onClick={simulateScoring}
              className="w-full btn-primary py-4"
            >
              提交评分
            </button>
          )}
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
            className="w-40 h-40 mx-auto mb-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center"
          >
            <div>
              <p className="text-5xl mb-2">{getScoreEmoji()}</p>
              <p className="text-3xl font-bold text-white">{score}</p>
            </div>
          </motion.div>

          <h3 className="text-2xl font-bold text-slate-800 mb-2">评分完成！</h3>
          <p className="text-slate-600 mb-6">
            {score >= 90 ? '发音非常标准！' :
             score >= 80 ? '发音很棒！' :
             score >= 70 ? '继续练习会更好！' : '多加练习一定会有进步！'}
          </p>

          <div className="bg-slate-50 rounded-xl p-4 mb-6">
            <h4 className="font-medium text-slate-700 mb-2">建议</h4>
            <ul className="text-sm text-slate-600 text-left space-y-1">
              <li>• 注意语速，不要太快</li>
              <li>• 确保每个音节都发音清晰</li>
              <li>• 多听原音进行模仿</li>
            </ul>
          </div>

          <button
            onClick={() => {
              setRecordedBlob(null);
              setShowResult(false);
              setScore(0);
            }}
            className="btn-secondary w-full"
          >
            再练一次
          </button>
        </motion.div>
      )}

      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
    </div>
  );
}
