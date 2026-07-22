import type { FieldWrapperProps } from '@/types/form'
import React from 'react'

const FieldWrapper = ({
    label,
    required,
    error,
    children
}: FieldWrapperProps) => {
  return (
   <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}

export default FieldWrapper