import { FormSchema } from '@/types/form'
import React from 'react'

const DynamicForm = ({ formTemplateId, schema }: { formTemplateId: string, schema: FormSchema }) => {
  console.log('schema ที่ได้รับ:', schema);

  return (
    <div>
      <h2>field ทั้งหมด</h2>
      <ul>
        {schema.fields.map((field) => (
          <li key={field.key}>
            {field.key} — type: {field.type} {field.required ? '(required)' : ''}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DynamicForm