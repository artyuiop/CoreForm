import type { FieldWrapperProps } from '@/types/form'
import React from 'react'

const FieldWrapper = ({
    label,
    required,
    error,
    children
}: FieldWrapperProps) => {
  return (
    <div className="mb-5 flex flex-col">
      <label className="block text-xs font-semibold text-gray-700 tracking-wide mb-1.5">
        {label} {required && <span className="text-red-500 font-bold ml-0.5">*</span>}
      </label>
      <div>{children}</div>
      {error && (
        <div className="flex items-center gap-1 mt-1.5 text-xs text-red-500 font-medium">
          <svg className="w-3.5 h-3.5 shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}

export default FieldWrapper