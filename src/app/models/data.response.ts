export class DataResponse<T> {

  data?: T;
  token?: T;
  message?: string;
  success?: boolean;
  count?: number;
}

export class ListResponse<T> {
  filters?: any;

  data?: [T];
  message?: string;
  success?: boolean;
  count?: number;
}
