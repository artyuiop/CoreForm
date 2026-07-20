import React from 'react';
import Link from 'next/link';
import type { FormDisplayItem } from '../../types/form';

interface FormCardProps {
  form: FormDisplayItem;
}

export default function FormCard({ form }: FormCardProps) {
  return (
    <Link
      href={`/forms/${form.id}`}
      className=" group bg-white border border-gray-400 rounded-[6px] transition-all duration-300 overflow-hidden flex flex-col h-full hover:-translate-y-1"
    >
      <div className="w-full h-40 flex items-center justify-center  transition-colors relative shrink-0 overflow-hidden">
        <div className={`absolute inset-0 opacity-20 bg-gray-600 group-hover:opacity-40 transition-opacity duration-500`}/>
        <div className="relative z-10 text-gray-600 group-hover:scale-110 transition-transform duration-300">
          <svg
            className="w-10 h-10 opacity-80"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
      </div>

      <div className="flex-1 flex flex-col p-6">
        <div className="flex justify-between items-baseline mb-3 gap-2">
          <h3 className="text-base font-bold text-gray-900 group-hover:text-gray-600 transition-colors tracking-wide leading-tight line-clamp-1">
            {form.title}
          </h3>
        </div>
        <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-3">
          {form.description}
        </p>
        <span className="text-[10px] font-mono font-bold text-gray-500 flex-shrink-0">
            กดเพื่อกรอกฟอร์ม
          </span>
      </div>
    </Link>
  );
}
