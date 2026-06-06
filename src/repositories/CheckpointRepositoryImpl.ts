import { CheckpointDTO } from '../contracts/CheckpointContract';
import { CheckpointRepository } from '../contracts/CheckpointContract';
import { MockCheckpointAdapter } from '../adapters/MockCheckpointAdapter';

export class CheckpointRepositoryImpl implements CheckpointRepository {
  async getAll(): Promise<CheckpointDTO[]> {
    return MockCheckpointAdapter.fetchAll();
  }

  async getById(id: string): Promise<CheckpointDTO | null> {
    const all = await MockCheckpointAdapter.fetchAll();
    return all.find(c => c.id === id) || null;
  }
}
