export interface User {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  departement_id: number;   
  created_at?: string;
  updated_at?: string;
}


export interface CreateUserResponse {
  user: User;
  token: string;
  role: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  role: string;
}
