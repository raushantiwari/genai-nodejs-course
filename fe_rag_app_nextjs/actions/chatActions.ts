'use server';

import type { ChatResponse, ModelProvider } from '@/types/api';
import { postChat } from '@/utils/apiClient';
import { getServerCookie } from '@/utils/cookies.helper';

export async function sendMessage(message: string, documentIds?: string[]): Promise<ChatResponse> {
  const modelInfo = await getServerCookie('selected-model');
  const provider = (modelInfo?.split('|')[0] || 'ollama') as ModelProvider;

  return postChat({
    question: message,
    provider,
    document_ids: documentIds?.length ? documentIds : null,
  });
}
