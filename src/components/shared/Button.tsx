import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  isArabic?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  isArabic = false,
  ...props 
}) => {
  const baseClasses = 'px-6 py-2 rounded transition-colors';
  const variantClasses = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className} ${isArabic ? 'font-arabic' : ''}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
