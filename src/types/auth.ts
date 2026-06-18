export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export interface UserRecord extends AuthUser {
  password: string;
}

export interface AuthSession {
  user: AuthUser;
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
