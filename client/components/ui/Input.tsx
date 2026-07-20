'use client';

import React from 'react';

const sizeStyles = {
  sm: 'py-2 pl-9 pr-3 text-[10px] min-h-[32px]',
  md: 'py-3 pl-11 pr-4 text-xs min-h-[42px]',
  lg: 'py-4 pl-12 pr-5 text-sm min-h-[52px]',
} as const;

const iconSizeStyles = {
  sm: 'w-3.5 h-3.5 left-3',
  md: 'w-4 h-4 left-4',
  lg: 'w-5 h-5 left-4',
} as const;

export type InputSize = keyof typeof sizeStyles;

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: InputSize;
  leadingIconPath?: string;
  trailingElement?: React.ReactNode;
  error?: string;
  label?: string;
}

export default function Input({
  size = 'md',
  leadingIconPath,
  trailingElement,
  error,
  label,
  id,
  className = '',
  ...rest
}: InputProps) {
  const inputId = id ?? `input-${Math.random().toString(36).slice(2, 7)}`;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block mb-1.5 text-[11px] font-mono font-semibold uppercase tracking-widest text-gray-500"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {leadingIconPath && (
          <svg
            className={`absolute top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none ${iconSizeStyles[size]}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={leadingIconPath}
            />
          </svg>
        )}

        <input
          id={inputId}
          className={[
            'w-full bg-white border rounded-lg font-mono tracking-widest',
            'text-gray-900 placeholder-gray-400',
            'focus:outline-none focus:ring-1 transition-colors shadow-sm',
            leadingIconPath ? sizeStyles[size] : sizeStyles[size].replace(/pl-\d+/, 'pl-4'),
            trailingElement ? 'pr-10' : '',
            error
              ? 'border-red-300 focus:border-red-400 focus:ring-red-300'
              : 'border-gray-200 focus:border-gray-400 focus:ring-gray-400',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          {...rest}
        />

        {trailingElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {trailingElement}
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1.5 text-[10px] font-mono text-red-500">{error}</p>
      )}
    </div>
  );
}
