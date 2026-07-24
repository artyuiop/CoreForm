import { notFound } from 'next/navigation';
import DynamicForm from '@/components/forms/DynamicForm';
import { formService } from '@/services/form.service';
import Link from 'next/link';

const FormPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;

  const template = await formService.getFormById(slug).catch(() => null);

  if (!template || !template.isActive) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            ย้อนกลับไปหน้าแบบฟอร์มทั้งหมด
          </Link>
        </div>

        {/* Main Form Card */}
        <div className="bg-white border border-gray-200/80 rounded shadow-sm overflow-hidden">
          {/* Header Banner */}
          <div className="text-black p-6  relative">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-gray-400 uppercase mb-2">
              แบบฟอร์มออนไลน์
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-black mb-2">
              {template.title}
            </h1>
            {template.description && (
              <p className="text-gray-300 text-sm leading-relaxed max-w-2xl font-normal">
                {template.description}
              </p>
            )}
          </div>

          {/* Form Body */}
          <div className="p-6  bg-white">
            <DynamicForm
              formTemplateId={template.id}
              schema={template.schema}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPage;