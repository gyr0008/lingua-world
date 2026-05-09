import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Languages } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/common/Button';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('请填写所有字段');
      return;
    }
    
    setLoading(true);
    
    try {
      const success = await login(email, password);
      if (success) {
        navigate('/learn/en');
      } else {
        setError('登录失败，请检查邮箱和密码');
      }
    } catch {
      setError('登录过程中出现错误');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-primary/5 to-secondary/5 p-4">
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
            <h1 className="text-2xl font-bold text-slate-800">欢迎回来</h1>
            <p className="text-slate-500 mt-2">登录到你的 LinguaWorld 账户</p>
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
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary" />
                <span className="text-slate-600">记住我</span>
              </label>
              <a href="#" className="text-primary hover:underline">忘记密码？</a>
            </div>

            <Button
              type="submit"
              fullWidth
              loading={loading}
              size="lg"
            >
              登录
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-slate-500">或</span>
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-slate-600 text-sm">
            还没有账户？{' '}
            <Link to="/register" className="text-primary font-medium hover:underline">
              立即注册
            </Link>
          </p>
        </div>

        <p className="mt-4 text-center text-slate-500 text-xs">
          登录即表示你同意我们的{' '}
          <a href="#" className="text-primary hover:underline">服务条款</a>
          {' '}和{' '}
          <a href="#" className="text-primary hover:underline">隐私政策</a>
        </p>
      </motion.div>
    </div>
  );
}
