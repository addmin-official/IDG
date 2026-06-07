export interface CustomsGateway {
  validateManifest(manifest: any): Promise<any>;
}
