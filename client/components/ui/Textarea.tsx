'use client';

import React from 'react';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({
  label,
  error,
  helperText,
  id,
  className = '',
  rows = 3,
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

      <textarea
        ref={ref}
        id={id}
        rows={rows}
        className={[
          'w-full bg-white border rounded-lg p-3 text-sm text-gray-900 placeholder-gray-400',
          'focus:outline-none focus:ring-2 transition-all duration-150 shadow-sm resize-y',
          error
            ? 'border-red-400 focus:border-red-500 focus:ring-red-100 text-red-900'
            : 'border-gray-300 hover:border-gray-400 focus:border-yellow-500 focus:ring-yellow-100',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...rest}
      />

      {error ? (
        <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>
      ) : helperText ? (
        <p className="mt-1 text-xs text-gray-500">{helperText}</p>
      ) : null}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
