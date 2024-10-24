import { Category, ProductsResponse } from './data.response';

export interface Query {
  key: string;
  value: string | number | boolean | null | undefined;
}

export interface LoginBody {
  mobile: string;
}

export interface CheckTokenBody {
  token: string;
  user_id: number;
}

export interface IsLogIn {
  is_login: boolean;
}

export interface GetProducts {
  products: ProductsResponse[];
  count: number;
  status: number;
}

export interface GetCategories {
  count: number;
  status: number;
  categories: Category[];
}
