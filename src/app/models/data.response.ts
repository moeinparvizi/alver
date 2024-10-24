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

export interface Category {
  id?: number;
  name?: string;
  image?: string;
}
interface Company {
  id: number;
  name: string;
}
export interface ProductResponse {
  id: number;
  name: string;
  price: string;
  prev_price: string;
  category: Category;
  compony: Company;
  image: string;
  property: any[]; // If you have specific structure for properties, define it here
  rate: number;
  images: any[]; // Array of image URLs
  description: string;
  unit?: any[];
}

export interface ProductsResponse {
  products: ProductResponse[];
  count: number;
  status: number;
}

export interface CategoryResponse {
  count: number;
  status: number;
  categories: Category[];
}
