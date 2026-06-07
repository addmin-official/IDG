export interface AuthProvider {
  login(credentials: any): Promise<any>;
  logout(): Promise<void>;
}
