export interface WorkflowItem {
  id: string;
  importer: string;
  hscode: string;
  duty: string;
  risk: 'low' | 'medium' | 'high';
  status: 'PENDING_CBI' | 'PENDING_COGNITIVE' | 'PENDING_LEDGER' | 'CLEARED' | 'SUSPENDED';
  step: number; 
}

export interface WorkflowContract {
  getActiveWorkflows(): WorkflowItem[];
  getWorkflowById(id: string): WorkflowItem | undefined;
  transitionWorkflow(id: string, action: 'APPROVE' | 'REJECT' | 'HOLD'): void;
}
