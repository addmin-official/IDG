export interface IdentityGateway {
  getUserProfile(userId: string): Promise<any>;
}
