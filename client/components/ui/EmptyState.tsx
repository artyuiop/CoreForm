import React from 'react';
import Button from './Button';

type EmptyStateVariant = 'no-results' | 'empty' | 'error';

interface EmptyStateProps {
  variant: EmptyStateVariant;
  onClear?: () => void;
  onRetry?: () => void;
}

const configs: Record<
  EmptyStateVariant,
  { icon: string; title: string; subtitle?: string; accentClass: string }
> = {
  'no-results': {
    icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
    title: 'ไม่พบแบบฟอร์มที่ค้นหา',
    subtitle: 'ลองใช้คำค้นหาอื่น',
    accentClass: 'text-gray-400',
  },
  empty: {
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    title: 'ยังไม่มีแบบฟอร์มในระบบ',
    accentClass: 'text-gray-400',
  },
  error: {
    icon: 'M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z',
    title: 'ไม่สามารถโหลดแบบฟอร์มได้',
    subtitle: 'ระบบไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง',
    accentClass: 'text-red-400',
  },
};

export default function EmptyState({ variant, onClear, onRetry }: EmptyStateProps) {
  const config = configs[variant];
  const isError = variant === 'error';

  return (
    <div
      className={`flex flex-col items-center justify-center py-24 text-center rounded-xl ${
        isError ? 'bg-red-50 border border-red-100' : ''
      }`}
    >
      <svg
        className={`w-12 h-12 mb-4 opacity-40 ${config.accentClass}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={config.icon} />
      </svg>

      <p className={`text-sm font-semibold ${isError ? 'text-red-600' : 'text-gray-500'} mb-1`}>
        {config.title}
      </p>

      {config.subtitle && (
        <p className={`text-xs ${isError ? 'text-red-400' : 'text-gray-400'} mb-4`}>
          {config.subtitle}
        </p>
      )}

      {variant === 'no-results' && onClear && (
        <Button variant="link" size="sm" onClick={onClear}>
          ล้างการค้นหา
        </Button>
      )}

      {variant === 'error' && onRetry && (
        <Button variant="danger" size="md" onClick={onRetry}>
          ลองใหม่
        </Button>
      )}
    </div>
  );
}
