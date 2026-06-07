export interface AuditGateway {
  logEvent(event: any): Promise<void>;
}
