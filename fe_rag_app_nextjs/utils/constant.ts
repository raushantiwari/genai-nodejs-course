export const API_BASE_URL = `http://127.0.0.1:8000`;

export const API_REVALIDATE_TIME = 300;

export const BACKEND_CONFIG = {
  DOCUMENTS: `/api/v1/documents`,
  MODELS: `/api/v1/models`,
  CHAT: `/api/v1/chat`,
} as const;

export type BconfigType = typeof BACKEND_CONFIG;
