import { initialWorkflowSteps } from '../modules/workflow/data/workflowTemplates';
import { WorkflowStepDTO } from '../contracts/WorkflowContract';

export interface WorkflowAdapter {
  fetchAll(): Promise<WorkflowStepDTO[]>;
}

export const MockWorkflowAdapter: WorkflowAdapter = {
  fetchAll: async () => initialWorkflowSteps,
};
