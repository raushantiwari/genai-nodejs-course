export const API_BASE_URL = `http://resume-analyzer-be-533550680.us-east-1.elb.amazonaws.com`;
export const SAMPLE_DOWNLOAD_TEMPLATE_BULK_POSITION = `/bulkEditPositions.xlsx`;

export const API_REVALIDATE_TIME = 300;

export const BACKEND_CONFIG = {
  DASHBOARD: {},
  ADMIN: {
    LOGIN: `/api/v1/login`,
  },
} as const;

export type BconfigType = typeof BACKEND_CONFIG;
