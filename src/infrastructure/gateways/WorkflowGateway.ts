export interface WorkflowGateway {
  executeStep(stepId: string, payload: any): Promise<any>;
}
