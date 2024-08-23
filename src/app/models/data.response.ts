export class DataResponse<T> {

  data?: T;
  token?: T;
  message?: string;
  success?: boolean;
  count?: number;
}

export interface LoginResponse {
  detail?: string;
  user_id?: number;
  status?: number
}

export interface TokenResponse {
  detail?: string;
  status?: number
  token?: string;
}
