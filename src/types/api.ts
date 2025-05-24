export interface ApiError {
  detail: string;
  [key: string]: any;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
}