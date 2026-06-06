import { LedgerBlockDTO } from '../contracts/LedgerContract';
import { LedgerRepository } from '../contracts/LedgerContract';
import { MockLedgerAdapter } from '../adapters/MockLedgerAdapter';

export class LedgerRepositoryImpl implements LedgerRepository {
  async getRecentBlocks(limit: number): Promise<LedgerBlockDTO[]> {
    return MockLedgerAdapter.fetchRecent(limit);
  }

  async processTransaction(payload: any): Promise<LedgerBlockDTO> {
    throw new Error('Not implemented');
  }
}
