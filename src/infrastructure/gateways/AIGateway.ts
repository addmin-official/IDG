export interface AIGateway {
  predict(input: any): Promise<any>;
}
