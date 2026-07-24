'use client';

import React from 'react';

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'label'> {
  label?: React.ReactNode;
  description?: string;
  error?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({
  label,
  description,
  error,
  id,
  className = '',
  ...rest
}, ref) => {
  return (
    <div className="flex items-start gap-3 select-none">
      <div className="flex items-center h-5">
        <input
          ref={ref}
          type="checkbox"
          id={id}
          className={[
            'w-4 h-4 text-black bg-white border-gray-300 rounded focus:ring-black focus:ring-offset-0 focus:ring-2',
            'transition-colors cursor-pointer accent-black',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          {...rest}
        />
      </div>
      {(label || description) && (
        <div className="text-sm">
          {label && (
            <label htmlFor={id} className="font-medium text-gray-800 cursor-pointer">
              {label}
            </label>
          )}
          {description && <p className="text-gray-500 text-xs">{description}</p>}
          {error && <p className="text-red-500 text-xs mt-0.5">{error}</p>}
        </div>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
