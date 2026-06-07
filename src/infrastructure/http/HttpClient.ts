import { ApiResponse } from './ApiResponse';

export interface HttpClient {
  get<T>(url: string, context: Record<string, any>): Promise<ApiResponse<T>>;
  post<T>(url: string, data: any, context: Record<string, any>): Promise<ApiResponse<T>>;
  put<T>(url: string, data: any, context: Record<string, any>): Promise<ApiResponse<T>>;
  delete<T>(url: string, context: Record<string, any>): Promise<ApiResponse<T>>;
}
