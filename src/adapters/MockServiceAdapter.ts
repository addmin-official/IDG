import { SystemService } from '../types';
import { SYSTEM_SERVICES } from '../mockData';

export interface ServiceAdapter {
  fetchAllServices(): Promise<SystemService[]>;
}

export const MockServiceAdapter: ServiceAdapter = {
  fetchAllServices: async () => SYSTEM_SERVICES,
};
