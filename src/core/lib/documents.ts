import { httpService } from './http';

export async function createDocument(body: {
  type: string;
  text?: string;
  file?: Record<string, any>;
  audience?: string;
}) {
  const { data } = await httpService.post('/documents', body);

  return data as { id: string; status: 'PENDING' };
}

export async function getDocument(id: string) {
  const res = await httpService.get(`/documents/${id}`);

  return res.data as {
    id: string;
    status: 'PENDING' | 'COMPLETED' | 'FAILED';
    simplified?: string;
    error?: string | null;
  };
}
