'use client';

import React from 'react';

const sizeStyles = {
  sm: 'py-1.5 px-3 text-xs min-h-[34px]',
  md: 'py-2.5 px-3.5 text-sm min-h-[42px]',
  lg: 'py-3 px-4 text-base min-h-[48px]',
} as const;

export type InputSize = keyof typeof sizeStyles;

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: InputSize;
  leadingIconPath?: string;
  trailingElement?: React.ReactNode;
  error?: string;
  label?: string;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  size = 'md',
  leadingIconPath,
  trailingElement,
  error,
  label,
  helperText,
  id,
  className = '',
  ...rest
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block mb-1.5 text-xs font-semibold text-gray-700 tracking-wide"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {leadingIconPath && (
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
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
          ref={ref}
          id={id}
          className={[
            'w-full bg-white border rounded-lg text-gray-900 placeholder-gray-400',
            'focus:outline-none focus:ring-2 transition-all duration-150 shadow-sm',
            leadingIconPath ? 'pl-10' : '',
            trailingElement ? 'pr-10' : '',
            sizeStyles[size],
            error
              ? 'border-red-400 focus:border-red-500 focus:ring-red-100 text-red-900'
              : 'border-gray-300 hover:border-gray-400 focus:border-gray-500 focus:ring-gray-100',
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

      {error ? (
        <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>
      ) : helperText ? (
        <p className="mt-1 text-xs text-gray-500">{helperText}</p>
      ) : null}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;