export interface AuditLogEntry {
  id: string;
  eventType: string;
  timestamp: string;
  subjectUsername: string;
  actionSummary: string;
  status: string;
}

export interface SovereignBlock {
  index: number;
  hash: string;
  prevHash: string;
  timestamp: string;
  data: string;
}

export interface AuditContract {
  logEvent(entry: Omit<AuditLogEntry, 'id' | 'timestamp'>): void;
  getLogs(): AuditLogEntry[];
  getLedgerBlocks(): SovereignBlock[];
}
