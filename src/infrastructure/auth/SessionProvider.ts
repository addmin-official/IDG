export interface SessionProvider {
  getSession(): any;
  updateSession(session: any): void;
}
