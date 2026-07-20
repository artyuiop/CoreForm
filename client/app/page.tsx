import React from "react";
import { formService } from "../services/form.service";
import type { FormDisplayItem } from "../types/form";
import FormList from "../components/forms/FormList";
import Link from "next/link";

export const revalidate = 60;

export default async function Home() {
  let forms: FormDisplayItem[] = [];
  let hasError = false;

  try {
    const GetFormAll = await formService.getAllForms();
    forms = GetFormAll.map((form, index) => ({
      id: form.id,
      number: String(index + 1).padStart(2, "0"),
      title: form.title || "(ไม่มีชื่อแบบฟอร์ม)",
      description: form.description || "ไม่มีคำอธิบายแบบฟอร์ม",
    }));
  } catch {
    hasError = true;
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-4">
          <h1 className="text-[2rem] leading-none text-gray-900 mb-4 font-bold tracking-tight">
            เลือกแบบฟอร์ม
          </h1>
          <p className="text-gray-500 text-sm font-medium mt-6">
            แบบฟอร์มที่เปิดให้ใช้งานภายในองค์กร ไม่ว่าจะเป็นลางาน,
            เบิกค่าใช้จ่าย, แจ้งซ่อม หรือระบบต่างๆ
          </p>
        </div>

        {/* form error */}
        {hasError ? (
          <div className="flex flex-col items-center justify-center py-24 rounded-xl bg-red-50 text-center">
            <svg
              className="w-12 h-12 mb-4 text-red-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
              />
            </svg>
            <p className="text-sm font-semibold text-red-600 mb-1">
              ไม่สามารถโหลดแบบฟอร์มได้
            </p>
            <p className="text-xs text-red-400 mb-6">
              ระบบไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง
            </p>
            <Link
              href="/"
              className="px-4 py-2 text-xs font-mono font-bold uppercase tracking-widest bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              ลองใหม่
            </Link>
          </div>
        ) : (
          // form list
          <FormList forms={forms} />
        )}
      </main>
    </div>
  );
}
