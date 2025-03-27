export interface AppError extends Error {
  code?: string;
  statusCode?: number;
  data?: unknown;
}

export type ApiError = {
  message: string;
  code?: string;
  status?: number;
} 