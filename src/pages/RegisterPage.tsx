import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, User, Languages, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/common/Button';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const passwordRequirements = [
    { met: password.length >= 6, text: '至少6个字符' },
    { met: /[A-Z]/.test(password), text: '包含大写字母' },
    { met: /[0-9]/.test(password), text: '包含数字' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password || !nickname) {
      setError('请填写所有字段');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }
    
    if (password.length < 6) {
      setError('密码至少需要6个字符');
      return;
    }
    
    setLoading(true);
    
    try {
      const success = await register(email, password, nickname);
      if (success) {
        navigate('/learn/en');
      } else {
        setError('注册失败，请稍后重试');
      }
    } catch {
      setError('注册过程中出现错误');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-secondary/5 to-primary/5 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center">
              <Languages className="text-white" size={32} />
            </div>
            <h1 className="text-2xl font-bold text-slate-800">创建账户</h1>
            <p className="text-slate-500 mt-2">加入 LinguaWorld 开始学习</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm"
              >
                {error}
              </motion.div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                昵称
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="你的昵称"
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                邮箱地址
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                密码
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              
              {password && (
                <div className="mt-2 space-y-1">
                  {passwordRequirements.map((req, index) => (
                    <div key={index} className={`flex items-center gap-2 text-xs ${req.met ? 'text-green-600' : 'text-slate-400'}`}>
                      <Check size={14} className={req.met ? 'opacity-100' : 'opacity-40'} />
                      {req.text}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                确认密码
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full pl-12 pr-4 py-3.5 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-primary/20 transition-all ${
                    confirmPassword && password !== confirmPassword 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-slate-200 focus:border-primary'
                  }`}
                />
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="mt-1 text-xs text-red-500">两次输入的密码不一致</p>
              )}
            </div>

            <div className="flex items-start gap-2">
              <input 
                type="checkbox" 
                id="terms" 
                className="mt-1 w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
                required
              />
              <label htmlFor="terms" className="text-sm text-slate-600">
                我同意 <a href="#" className="text-primary hover:underline">服务条款</a> 和 <a href="#" className="text-primary hover:underline">隐私政策</a>
              </label>
            </div>

            <Button
              type="submit"
              fullWidth
              loading={loading}
              size="lg"
            >
              创建账户
            </Button>
          </form>

          <p className="mt-6 text-center text-slate-600 text-sm">
            已有账户？{' '}
            <Link to="/login" className="text-primary font-medium hover:underline">
              立即登录
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
