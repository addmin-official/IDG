export interface WorkflowStepDTO {
  id: string;
  title: Record<string, string>;
  actor: Record<string, string>;
  detail: Record<string, string>;
}

export interface WorkflowRepository {
  getSteps(): Promise<WorkflowStepDTO[]>;
}
