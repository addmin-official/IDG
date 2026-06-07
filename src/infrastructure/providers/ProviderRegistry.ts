export interface ProviderRegistry {
  register(name: string, provider: any): void;
  get(name: string): any;
}
