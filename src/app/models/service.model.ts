export interface Query {
  key: string;
  value: string | number | boolean | null | undefined;
}


export interface LoginResponse {
  token: string;
  user: {
    id: number;
    password: string;
    number: string;
  };
  status: string;
}

