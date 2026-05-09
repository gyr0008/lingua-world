import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, BookOpen, Users, Trophy, User, LogOut, 
  Menu, X, Languages, Sparkles, ChevronDown
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navLinks = [
    { to: '/', icon: Home, label: '首页' },
    { to: '/learn/en', icon: BookOpen, label: '学习' },
    { to: '/community', icon: Users, label: '社区' },
    { to: '/profile', icon: Trophy, label: '成就' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setProfileDropdownOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              <Languages className="text-white" size={22} />
            </div>
            <span className="text-xl font-bold text-gradient">LinguaWorld</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, icon: Icon, label }) => (
              <Link
                key={to}
                to={to}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all
                  ${isActive(to) 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-slate-600 hover:bg-slate-100'
                  }
                `}
              >
                <Icon size={18} />
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-slate-100 transition-colors"
                >
                  <span className="text-2xl">{user.avatar}</span>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-slate-800">{user.nickname}</p>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <Sparkles size={12} className="text-amber-500" />
                      {user.totalXP} XP
                    </p>
                  </div>
                  <ChevronDown size={16} className="text-slate-400" />
                </button>

                {profileDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setProfileDropdownOpen(false)} 
                    />
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-20"
                    >
                      <div className="px-4 py-3 border-b border-slate-100">
                        <p className="font-medium text-slate-800">{user.nickname}</p>
                        <p className="text-sm text-slate-500">{user.email}</p>
                      </div>
                      <Link
                        to="/profile"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors"
                      >
                        <User size={18} className="text-slate-500" />
                        <span className="text-slate-700">个人中心</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors text-red-500"
                      >
                        <LogOut size={18} />
                        <span>退出登录</span>
                      </button>
                    </motion.div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-full font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  登录
                </Link>
                <Link
                  to="/register"
                  className="btn-primary !px-5 !py-2 !text-sm"
                >
                  注册
                </Link>
              </div>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white border-t border-slate-200"
        >
          <nav className="px-4 py-4 space-y-2">
            {navLinks.map(({ to, icon: Icon, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileMenuOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all
                  ${isActive(to) 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-slate-600 hover:bg-slate-100'
                  }
                `}
              >
                <Icon size={20} />
                {label}
              </Link>
            ))}
          </nav>
        </motion.div>
      )}
    </header>
  );
}
