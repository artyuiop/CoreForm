'use client';

import React from 'react';

const variantStyles = {
  primary:
    'bg-yellow-400 text-gray-900 hover:bg-yellow-500 border-transparent font-bold',
  secondary:
    'bg-white text-gray-700 border-gray-200 hover:border-yellow-400 hover:text-yellow-700 hover:bg-yellow-50',
  danger:
    'bg-red-600 text-white hover:bg-red-700 border-transparent font-bold',
  ghost:
    'bg-transparent text-gray-500 border-transparent hover:text-yellow-700 hover:bg-yellow-50',
  link:
    'bg-transparent text-yellow-600 border-transparent hover:text-yellow-800 underline-offset-2 hover:underline p-0 h-auto min-h-0',
} as const;

const sizeStyles = {
  sm: 'px-3 py-1.5 text-[10px] min-h-[28px]',
  md: 'px-4 py-2 text-xs min-h-[36px]',
  lg: 'px-6 py-3 text-sm min-h-[44px]',
} as const;

export type ButtonVariant = keyof typeof variantStyles;
export type ButtonSize = keyof typeof sizeStyles;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled,
  className = '',
  children,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      type="button"
      disabled={isDisabled}
      className={[
        'inline-flex items-center justify-center gap-2 rounded-lg border',
        'font-mono uppercase tracking-widest transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-1',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantStyles[variant],
        sizeStyles[size],
        fullWidth ? 'w-full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {loading && (
        <svg
          className="animate-spin w-3.5 h-3.5 flex-shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      )}

      {!loading && leftIcon && (
        <span className="flex-shrink-0">{leftIcon}</span>
      )}

      <span>{children}</span>

      {!loading && rightIcon && (
        <span className="flex-shrink-0">{rightIcon}</span>
      )}
    </button>
  );
}
