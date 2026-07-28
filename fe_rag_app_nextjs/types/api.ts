export type DocumentStatus = 'processing' | 'ready' | 'failed';

export type DocumentResponse = {
  id: string;
  filename: string;
  extension: string;
  status: DocumentStatus;
  chunk_count: number;
  error_message?: string | null;
  created_at: string;
};

export type PageDocumentResponse = {
  items: DocumentResponse[];
  total: number;
  limit: number;
  offset: number;
};

export type ModelProvider = 'ollama' | 'openai';

export type ModelOption = {
  provider: ModelProvider;
  model: string;
  available: boolean;
  detail?: string | null;
};

export type ModelsResponse = {
  models: ModelOption[];
};

export type ChatRequest = {
  question: string;
  provider?: ModelProvider;
  document_ids?: string[] | null;
};

export type SourceChunk = {
  document_id: string;
  chunk_index: number;
  text: string;
  score: number;
};

export type ChatResponse = {
  answer: string;
  sources: SourceChunk[];
};
