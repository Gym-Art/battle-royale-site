'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  glow = true,
  className = '',
  children,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-display uppercase tracking-wider transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: `
      bg-neon-green text-surface-black 
      hover:bg-neon-green/90 
      ${glow ? 'hover:shadow-glow-green' : ''}
      focus:ring-2 focus:ring-neon-green focus:ring-offset-2 focus:ring-offset-surface-black
    `,
    secondary: `
      bg-neon-pink text-surface-black 
      hover:bg-neon-pink/90 
      ${glow ? 'hover:shadow-glow-pink' : ''}
      focus:ring-2 focus:ring-neon-pink focus:ring-offset-2 focus:ring-offset-surface-black
    `,
    outline: `
      bg-transparent text-neon-green border-2 border-neon-green 
      hover:bg-neon-green/10 
      ${glow ? 'hover:shadow-glow-green' : ''}
      focus:ring-2 focus:ring-neon-green focus:ring-offset-2 focus:ring-offset-surface-black
    `,
    ghost: `
      bg-transparent text-text-muted border border-surface-muted 
      hover:text-neon-green hover:border-neon-green 
      ${glow ? 'hover:shadow-glow-green' : ''}
    `,
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
