import { CHECKPOINTS } from '../mockData';
import { CheckpointDTO } from '../contracts/CheckpointContract';

export interface CheckpointAdapter {
  fetchAll(): Promise<CheckpointDTO[]>;
}

export const MockCheckpointAdapter: CheckpointAdapter = {
  fetchAll: async () => CHECKPOINTS,
};
