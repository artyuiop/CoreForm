'use client';

import React from 'react';

export interface SelectOption {
  label: string;
  value: string | number;
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options?: (string | SelectOption)[];
  placeholder?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({
  label,
  error,
  helperText,
  options = [],
  placeholder = 'เลือก...',
  id,
  className = '',
  children,
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
        <select
          ref={ref}
          id={id}
          className={[
            'w-full bg-white border rounded-lg py-2.5 pl-3.5 pr-10 text-sm text-gray-900 appearance-none',
            'focus:outline-none focus:ring-2 transition-all duration-150 shadow-sm cursor-pointer',
            error
              ? 'border-red-400 focus:border-red-500 focus:ring-red-100 text-red-900'
              : 'border-gray-300 hover:border-black hover:bg-gray-100 focus:border-black focus:ring-black',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          {...rest}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.length > 0
            ? options.map((opt, idx) => {
                const val = typeof opt === 'object' ? opt.value : opt;
                const lab = typeof opt === 'object' ? opt.label : opt;
                return (
                  <option key={idx} value={val}>
                    {lab}
                  </option>
                );
              })
            : children}
        </select>

        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {error ? (
        <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>
      ) : helperText ? (
        <p className="mt-1 text-xs text-gray-500">{helperText}</p>
      ) : null}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
