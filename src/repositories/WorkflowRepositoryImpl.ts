import { WorkflowStepDTO } from '../contracts/WorkflowContract';
import { WorkflowRepository } from '../contracts/WorkflowContract';
import { MockWorkflowAdapter } from '../adapters/MockWorkflowAdapter';

export class WorkflowRepositoryImpl implements WorkflowRepository {
  async getSteps(): Promise<WorkflowStepDTO[]> {
    return MockWorkflowAdapter.fetchAll();
  }
}
