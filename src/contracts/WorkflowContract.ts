export interface WorkflowStepDTO {
  id: string;
  title: Record<string, string>;
  actor: Record<string, string>;
  detail: Record<string, string>;
}

export interface WorkflowRepository {
  getSteps(): Promise<WorkflowStepDTO[]>;
}

export interface WorkflowItem {
  id: string;
  importer: string;
  hscode: string;
  duty: string;
  risk: string;
  status: string;
  step: number;
}

export interface WorkflowContract {
  getActiveWorkflows(): WorkflowItem[];
  getWorkflowById(id: string): WorkflowItem | undefined;
  transitionWorkflow(id: string, action: 'APPROVE' | 'REJECT' | 'HOLD'): void;
  getWorkflowSteps(): any[];
}
