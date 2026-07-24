"use client";

import { FormSchema, FormField, FormValue } from '@/types/form'
import { useState } from 'react'
import FieldWrapper from './FieldWrapper'
import FieldResolver from './FieldResolver'
import axios from 'axios'
import { formService } from '@/services/form.service'
import { Button } from '@/constants'
import Link from 'next/link'

const DynamicForm = ({ formTemplateId, schema }: { formTemplateId: string, schema: FormSchema }) => {
  const [formValues, setFormValues] = useState<Record<string, FormValue | FormValue[]>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (key: string, value: unknown) => {
    setFormValues((prev) => ({ ...prev, [key]: value as FormValue }));
    setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  const handleArrayAdd = (key: string) => {
    setFormValues((prev) => {
      const current = (prev[key] as string[]) || [];
      return { ...prev, [key]: [...current, ''] };
    });
  };

  const handleArrayChange = (key: string, index: number, value: unknown) => {
    setFormValues((prev) => {
      const current = [...((prev[key] as string[]) || [])];
      current[index] = value as string;
      return { ...prev, [key]: current };
    });
  };

  const handleArrayRemove = (key: string, index: number) => {
    setFormValues((prev) => {
      const current = (prev[key] as string[]) || [];
      return { ...prev, [key]: current.filter((_, i) => i !== index) };
    });
  };

  const validateClientSide = (): Record<string, string> => {
    const newErrors: Record<string, string> = {};
    for (const field of schema.fields) {
      if (!field.required) continue;
      const val = formValues[field.key];
      const isEmpty =
        field.type === 'array'
          ? !Array.isArray(val) || val.length === 0
          : val === undefined || val === null || val === '';
      if (isEmpty) newErrors[field.key] = 'กรุณากรอกข้อมูลนี้';
    }
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const clientErrors = validateClientSide();
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await formService.submitFormData(formTemplateId, formValues);
      setSubmitStatus('success');
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.status === 400) {
        const body = err.response.data;
        const mapped: Record<string, string> = {};
        (body.errors || []).forEach((e: { path: string; message: string }) => {
          mapped[e.path] = e.message;
        });
        setErrors(mapped);
      } else {
        setSubmitStatus('error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center my-4 shadow-sm animate-fade-in">
        <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">ส่งแบบฟอร์มสำเร็จ!</h3>
        <p className="text-sm text-gray-600 mb-6">ข้อมูลของคุณถูกบันทึกเรียบร้อยแล้ว</p>
        
        <div className="flex justify-center gap-3">
          <Button
            variant="secondary"
            onClick={() => {
              setFormValues({});
              setErrors({});
              setSubmitStatus('idle');
            }}
          >
            กรอกฟอร์มอีกครั้ง
          </Button>
          <Link href="/">
            <Button variant="primary">
              กลับหน้าหลัก
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {schema.fields.map((field) => (
        <FieldWrapper
          key={field.key}
          label={field.key}
          required={field.required}
          error={errors[field.key]}
        >
          {field.type === 'array' ? (
            <div className="space-y-2 bg-gray-50/80 p-4 rounded-xl border border-gray-200">
              {((formValues[field.key] as string[]) || []).map((val, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="flex-1">
                    <FieldResolver
                      field={field.items as FormField}
                      value={val}
                      onChange={(v) => handleArrayChange(field.key, idx, v)}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 shrink-0"
                    onClick={() => handleArrayRemove(field.key, idx)}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="mt-2 text-xs"
                onClick={() => handleArrayAdd(field.key)}
                leftIcon={
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                }
              >
                เพิ่มรายการ
              </Button>
            </div>
          ) : (
            <FieldResolver
              field={field}
              value={formValues[field.key] as FormValue}
              onChange={(v) => handleChange(field.key, v)}
            />
          )}
        </FieldWrapper>
      ))}

      {submitStatus === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center gap-2">
          <svg className="w-5 h-5 shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้ง</span>
        </div>
      )}

      <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
        <Link href="/">
          <Button variant="ghost" size="lg">
            ย้อนกลับ
          </Button>
        </Link>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={isSubmitting}
        >
          {isSubmitting ? 'กำลังบันทึก...' : 'บันทึกแบบฟอร์ม'}
        </Button>
      </div>
    </form>
  )
}

export default DynamicForm