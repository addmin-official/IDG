export interface DataFabricGateway {
  queryDataset(datasetId: string, query: any): Promise<any>;
}
