import { SystemService } from '../types';

export interface ServiceRepository {
  getServices(): Promise<SystemService[]>;
}

import { MockServiceAdapter } from '../adapters/MockServiceAdapter';

export class ServiceRepositoryImpl implements ServiceRepository {
  async getServices(): Promise<SystemService[]> {
    return MockServiceAdapter.fetchAllServices();
  }
}
