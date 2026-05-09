import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  fullWidth?: boolean;
}

export default function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  className = '',
  fullWidth = false
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:scale-105 active:scale-95 focus:ring-primary/50 disabled:opacity-50 disabled:hover:scale-100',
    secondary: 'bg-white text-primary border-2 border-primary/20 shadow-lg hover:bg-primary hover:text-white hover:border-primary active:scale-95 focus:ring-primary/50 disabled:opacity-50',
    ghost: 'bg-transparent text-slate-600 hover:bg-slate-100 active:scale-95 focus:ring-slate-300 disabled:opacity-50',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:shadow-red-500/30 hover:scale-105 active:scale-95 focus:ring-red-500/50 disabled:opacity-50'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm gap-1.5',
    md: 'px-6 py-3 text-base gap-2',
    lg: 'px-8 py-4 text-lg gap-2.5'
  };

  const iconSizes = {
    sm: 16,
    md: 18,
    lg: 20
  };

  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={onClick}
      type={type}
      disabled={disabled || loading}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {loading ? (
        <svg className="animate-spin" width={iconSizes[size]} height={iconSizes[size]} viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : Icon && iconPosition === 'left' ? (
        <Icon size={iconSizes[size]} />
      ) : null}
      {children}
      {!loading && Icon && iconPosition === 'right' ? (
        <Icon size={iconSizes[size]} />
      ) : null}
    </motion.button>
  );
}
