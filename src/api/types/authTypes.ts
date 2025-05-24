export interface User {
  id: number;
  username: string;
  email: string;
  is_admin: boolean;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
  user: User;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: User;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  is_admin?: boolean;
}

export interface RegisterResponse extends AuthResponse {}