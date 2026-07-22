import { notFound } from 'next/navigation';
import DynamicForm from '@/components/forms/DynamicForm';
import { formService } from '@/services/form.service';

const FormPage = async ({ params }: { params: { slug: string } }) => {

    const { slug } = await params;

  const template = await formService.getFormById(slug).catch(() => null);

  if (!template || !template.isActive) {
    notFound();
  }
  console.log(template)
  return (
    <main className="p-8">
     
      <h1 className="text-[2rem] font-bold tracking-tight">{template.title}</h1>
      {template.description && (
        <p className="text-gray-500 text-sm font-medium mt-6">{template.description}</p>
      )}

      <div className="w-full mt-6">
        <DynamicForm
          formTemplateId={template.id}
          schema={template.schema}
        />
      </div>
    </main>
  );
};

export default FormPage;