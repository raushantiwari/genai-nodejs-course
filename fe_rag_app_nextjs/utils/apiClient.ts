import type {
  ChatRequest,
  ChatResponse,
  DocumentResponse,
  ModelsResponse,
  PageDocumentResponse,
} from '@/types/api';
import { API_BASE_URL, BACKEND_CONFIG } from '@/utils/constant';

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text().catch(() => '');
    throw new Error(errorText || `Request failed with status ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export async function uploadDocument(file: File): Promise<DocumentResponse> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}${BACKEND_CONFIG.DOCUMENTS}`, {
    method: 'POST',
    body: formData,
  });

  return handleResponse<DocumentResponse>(response);
}

export async function listDocuments(limit = 50, offset = 0): Promise<PageDocumentResponse> {
  const params = new URLSearchParams({
    limit: String(limit),
    offset: String(offset),
  });

  const response = await fetch(`${API_BASE_URL}${BACKEND_CONFIG.DOCUMENTS}?${params.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  return handleResponse<PageDocumentResponse>(response);
}

export async function deleteDocument(documentId: string): Promise<void> {
  const response = await fetch(
    `${API_BASE_URL}${BACKEND_CONFIG.DOCUMENTS}/${encodeURIComponent(documentId)}`,
    {
      method: 'DELETE',
    },
  );

  await handleResponse<void>(response);
}

export async function listModels(): Promise<ModelsResponse> {
  const response = await fetch(`${API_BASE_URL}${BACKEND_CONFIG.MODELS}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  return handleResponse<ModelsResponse>(response);
}

export async function postChat(req: ChatRequest): Promise<ChatResponse> {
  const response = await fetch(`${API_BASE_URL}${BACKEND_CONFIG.CHAT}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
  });

  return handleResponse<ChatResponse>(response);
}
