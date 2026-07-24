import api from '../lib/axios';
import type { FormTemplate } from '../types/form';

export const formService = {
  getAllForms: async (signal?: AbortSignal): Promise<FormTemplate[]> => {
    const response = await api.get<FormTemplate[]>('/form', { signal });
    return response.data;
  },

  getFormById: async (id: string, signal?: AbortSignal): Promise<FormTemplate> => {
    const response = await api.get<FormTemplate>(`/form/${id}`, { signal });
    return response.data;
  },

  submitFormData: async (formTemplateId: string, data: Record<string, unknown>) => {
    const response = await api.post(`/form/${formTemplateId}/submit`, { data });
    return response.data;
  },
};
