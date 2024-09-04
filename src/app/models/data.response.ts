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
  status?: number;
}

export interface TokenResponse {
  detail?: string;
  status?: number;
  token?: string;
}
export interface LogOutResponse {
  detail?: string;
  status?: number;
}

interface ProductCategory {
  id: number;
  name: string;
}
export interface ProductResponse {
  id: number;
  price: string;
  prev_price: string;
  category: ProductCategory;
  name?: string;
  image: string;
  property: any[];
  rate: number;
  images: any[];
  description: string;
}

export interface ProductsResponse {
  products: ProductResponse[];
  success: number;
}
