export interface AuthUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface AuthSession {
  userId: string;
  name: string;
  email: string;
  token: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

