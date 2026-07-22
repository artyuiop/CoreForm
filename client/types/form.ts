export interface FormSchema {
  fields: FormField[];
}

export interface FormTemplate {
  id: string;
  title: string;
  description: string | null;
  schema: FormSchema;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface FormDisplayItem {
  id: string;
  number: string;
  title: string;
  description: string;
}


export interface FieldWrapperProps {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}

export interface FormField {
  key: string;
  type: "string" | "number" | "boolean" | "array";
  format?: "email" | "tel" | "date";
  enum?: string[];
  items?: Omit<FormField, "key" | "required">;
  required?: boolean;
  minItems?: number;
  maxLength?: number;
  minimum?: number;
  maximum?: number;
  "x-multiline"?: boolean;
}

export type FormValue = string | number | boolean | string[] | null | undefined;