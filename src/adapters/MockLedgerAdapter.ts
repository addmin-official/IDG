import { MOCK_LEDGER_BLOCKS } from '../mockData';
import { LedgerBlockDTO } from '../contracts/LedgerContract';

export interface LedgerAdapter {
  fetchRecent(limit: number): Promise<LedgerBlockDTO[]>;
}

export const MockLedgerAdapter: LedgerAdapter = {
  fetchRecent: async (limit: number) => MOCK_LEDGER_BLOCKS.slice(0, limit) as any[],
};
