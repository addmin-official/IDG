export interface AuditPipeline {
  submit(event: AuditEvent): Promise<void>;
}
