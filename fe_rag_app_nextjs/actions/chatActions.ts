'use server';

import { getServerCookie } from '@/utils/cookies.helper';

type SendMessageResponse = {
  result: {
    summary: string;
    user_query: string;
    confidence: number;
    provider: string;
    model: string;
    timestamp: number;
  };
};

export async function sendMessage(message: string): Promise<SendMessageResponse> {
  const modelInfo = await getServerCookie('selected-model');
  const provider = modelInfo?.split('|')[0];
  const modelName = modelInfo?.split('|')[1];

  const response = await fetch('http://localhost:5000/ask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: message, provider: provider, modelsName: modelName }),
  });

  if (!response.ok) {
    throw new Error('Failed to send message');
  }

  return response.json();
}
